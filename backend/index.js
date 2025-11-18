const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { extractTextFromImage } = require('./ocr');
const app = express();
const upload = multer({ storage: multer.memoryStorage() });
app.use(cors());
app.use(express.json());

// --- Welcome route ---
app.get('/', (req, res) => {
  res.json({
    message: '🎃 SnackMood Backend API',
    status: 'running',
    endpoints: {
      upload: 'POST /api/upload - Upload snack image',
      analyze: 'POST /api/analyze - Analyze snack data'
    },
    version: '1.0.0'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    visionConfigured: !!process.env.GOOGLE_CREDENTIALS_JSON || !!process.env.GOOGLE_APPLICATION_CREDENTIALS
  });
});

// --- OCR endpoint with Google Vision API ---
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }
    
    // Use Google Vision API to extract text from image
    const data = await extractTextFromImage(req.file.buffer);
    res.json(data);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to process image: ' + error.message });
  }
});

// --- Local scoring logic (same rules used in the project spec) ---
function scoreSnack(nutrition, ingredients) {
  let score = 100;
  const sugar = nutrition.sugar_g || 0;
  const sodium = nutrition.sodium_mg || 0;
  const protein = nutrition.protein_g || 0;
  const fiber = nutrition.fiber_g || 0;

  // Check for common unhealthy ingredients in chocolate/candy
  const unhealthyKeywords = [
    'chocolate', 'cocoa', 'sugar', 'corn syrup', 'high fructose',
    'candy', 'chips', 'cookie', 'cake', 'brownie', 'candy coating',
    'milk chocolate', 'semisweet', 'sweetened', 'confection'
  ];
  
  const ingredientText = ingredients.join(' ').toLowerCase();
  const hasUnhealthyIngredients = unhealthyKeywords.some(keyword => 
    ingredientText.includes(keyword)
  );

  // If it's clearly a sweet/chocolate product, assume high sugar if not detected
  if (hasUnhealthyIngredients && sugar === 0) {
    // Penalize heavily for likely high-sugar products with missing data
    score -= 40;
  }

  // Sugar penalties
  if (sugar > 10) score -= 2 * (sugar - 10);
  if (sugar > 20) score -= 10; // Extra penalty for very high sugar
  
  // Sodium penalties
  if (sodium > 200) score -= Math.floor((sodium - 200) / 100) * 1;

  // artificial colors / sweeteners penalty
  const artificial = ingredients.filter(i => /red\s?\d+|blue\s?\d+|yellow\s?\d+|tartrazine|aspartame|sucralose|acesulfame|high fructose corn syrup/i.test(i));
  if (artificial.length) score -= 10;

  // Penalize for processed ingredients
  const processed = ingredients.filter(i => 
    /palm oil|hydrogenated|partially hydrogenated|modified|enriched/i.test(i)
  );
  score -= processed.length * 3;

  // fiber/protein bonuses
  score += Math.floor(fiber / 3) * 5;
  score += Math.floor(protein / 5) * 5;

  if (score < 0) score = 0;
  if (score > 100) score = 100;
  return Math.round(score);
}

function verdictFromScore(score) {
  if (score >= 75) return { verdict: 'Healthy Hero', emoji: '💚' };
  if (score >= 50) return { verdict: 'Focus Phantom', emoji: '🕯️' };
  if (score >= 30) return { verdict: 'Energy Vampire', emoji: '🦇' };
  return { verdict: 'Sugar Demon', emoji: '🍬' };
}

function topConcerns(nutrition, ingredients) {
  const concerns = [];
  const sugar = nutrition.sugar_g || 0;
  const sodium = nutrition.sodium_mg || 0;
  
  // Check for sweet products
  const ingredientText = ingredients.join(' ').toLowerCase();
  const isSweetProduct = /chocolate|cocoa|sugar|candy|cookie|cake|sweet/i.test(ingredientText);
  
  if (sugar > 10) {
    concerns.push(`${sugar}g sugar (major crash risk)`);
  } else if (isSweetProduct && sugar === 0) {
    concerns.push('High sugar content likely (not detected on label)');
  }
  
  if (sodium > 300) concerns.push(`${sodium}mg sodium (high)`);
  
  const artificial = ingredients.filter(i => /red\s?\d+|blue\s?\d+|yellow\s?\d+|tartrazine|aspartame|sucralose|acesulfame|high fructose corn syrup/i.test(i));
  artificial.forEach(a => concerns.push(`${a} (artificial additive)`));
  
  const processed = ingredients.filter(i => /palm oil|hydrogenated|partially hydrogenated/i.test(i));
  if (processed.length > 0) concerns.push('Contains processed oils');
  
  return concerns.slice(0,3);
}

// --- Analyze endpoint ---
// If ANTHROPIC_API_KEY is set and you'd like to call a model, add that logic here.
app.post('/api/analyze', async (req, res) => {
  try {
    const { ingredients = [], nutrition = {} } = req.body || {};

    if (!Array.isArray(ingredients)) {
      return res.status(400).json({ error: 'Ingredients must be an array' });
    }

    if (typeof nutrition !== 'object' || nutrition === null) {
      return res.status(400).json({ error: 'Nutrition must be an object' });
    }

    // Local analysis
    const score = scoreSnack(nutrition, ingredients);
    const v = verdictFromScore(score);
    const concerns = topConcerns(nutrition, ingredients);

    const output = {
      verdict: v.verdict,
      score,
      emoji: v.emoji,
      topConcerns: concerns,
      suggestion: generateSuggestion(ingredients, nutrition),
      vibeMessage: spookyMessage(v.verdict, score)
    };

    res.json(output);
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze snack' });
  }
});

function generateSuggestion(ingredients, nutrition) {
  const suggestions = [];
  const sugar = nutrition.sugar_g || 0;
  const protein = nutrition.protein_g || 0;
  const ingredientText = ingredients.join(' ').toLowerCase();
  const isSweetProduct = /chocolate|cocoa|sugar|candy|cookie|cake|sweet/i.test(ingredientText);
  
  if (sugar > 10 || (isSweetProduct && sugar === 0)) {
    suggestions.push('Pair with nuts or protein to slow the sugar crash.');
  }
  
  if (protein < 5) {
    suggestions.push('Add a protein source—yogurt or almonds would help.');
  }
  
  if (isSweetProduct) {
    suggestions.push('Consider dark chocolate (70%+ cocoa) as a healthier alternative.');
  }
  
  if (suggestions.length === 0) return 'Nice! Eat mindfully and stay hydrated.';
  return suggestions.slice(0, 2).join(' ');
}

function spookyMessage(verdict, score) {
  if (verdict === 'Healthy Hero') return '👻 This snack is BOO-tifully balanced!';
  if (verdict === 'Focus Phantom') return '🎃 Not bad, mortal. A few red flags, but nothing deadly.';
  if (verdict === 'Energy Vampire') return '🦇 Yikes! This snack will spike your blood sugar and haunt your afternoon.';
  return '🍬 Beware, mortal! This treat is cursed with sugar – expect a crash!';
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`SnackMood backend running on port ${PORT}`));
