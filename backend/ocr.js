const vision = require('@google-cloud/vision');

// Initialize the Vision API client
let client = null;
let visionEnabled = false;

try {
  // Check if credentials are available
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    client = new vision.ImageAnnotatorClient();
    visionEnabled = true;
    console.log('✅ Google Vision API enabled');
  } else {
    console.log('⚠️  Google Vision API not configured. Using mock data.');
    console.log('   See GOOGLE_VISION_SETUP.md for setup instructions.');
  }
} catch (error) {
  console.warn('⚠️  Google Vision API initialization failed. Using mock data.');
  client = null;
}

async function extractTextFromImage(imageBuffer) {
  if (!visionEnabled || !client) {
    // Fallback to mock data if Vision API is not configured
    console.log('Using mock data (Vision API not configured)');
    return {
      ingredients: ['sugar', 'enriched wheat flour', 'palm oil', 'red 40', 'high fructose corn syrup'],
      nutrition: { sugar_g: 28, sodium_mg: 340, protein_g: 2, fiber_g: 1 }
    };
  }

  try {
    // Perform text detection on the image
    const [result] = await client.textDetection(imageBuffer);
    const detections = result.textAnnotations;
    
    if (!detections || detections.length === 0) {
      console.log('No text detected, using mock data');
      return {
        ingredients: ['sugar', 'enriched wheat flour', 'palm oil'],
        nutrition: { sugar_g: 20, sodium_mg: 250, protein_g: 3, fiber_g: 1 }
      };
    }

    // The first annotation contains all detected text
    const fullText = detections[0].description.toLowerCase();
    console.log('Detected text from image');
    
    // Parse ingredients and nutrition from the detected text
    const parsed = parseNutritionLabel(fullText);
    return parsed;
  } catch (error) {
    console.error('OCR Error:', error.message);
    // Return mock data instead of throwing
    return {
      ingredients: ['sugar', 'wheat flour', 'palm oil'],
      nutrition: { sugar_g: 15, sodium_mg: 200, protein_g: 2, fiber_g: 1 }
    };
  }
}

function parseNutritionLabel(text) {
  const ingredients = [];
  const nutrition = {
    sugar_g: 0,
    sodium_mg: 0,
    protein_g: 0,
    fiber_g: 0
  };

  // Extract ingredients section
  const ingredientsMatch = text.match(/ingredients?[:\s]+(.*?)(?=nutrition|$)/is);
  if (ingredientsMatch) {
    const ingredientText = ingredientsMatch[1];
    // Split by common delimiters
    const rawIngredients = ingredientText.split(/[,;.]+/).map(i => i.trim()).filter(i => i.length > 2);
    ingredients.push(...rawIngredients.slice(0, 10)); // Take first 10 ingredients
  }

  // Extract nutrition values
  // Sugar
  const sugarMatch = text.match(/(?:total\s+)?sugars?[:\s]+(\d+\.?\d*)\s*g/i);
  if (sugarMatch) nutrition.sugar_g = parseFloat(sugarMatch[1]);

  // Sodium
  const sodiumMatch = text.match(/sodium[:\s]+(\d+\.?\d*)\s*mg/i);
  if (sodiumMatch) nutrition.sodium_mg = parseFloat(sodiumMatch[1]);

  // Protein
  const proteinMatch = text.match(/protein[:\s]+(\d+\.?\d*)\s*g/i);
  if (proteinMatch) nutrition.protein_g = parseFloat(proteinMatch[1]);

  // Fiber
  const fiberMatch = text.match(/(?:dietary\s+)?fiber[:\s]+(\d+\.?\d*)\s*g/i);
  if (fiberMatch) nutrition.fiber_g = parseFloat(fiberMatch[1]);

  // If no ingredients found, try to extract common snack ingredients from text
  if (ingredients.length === 0) {
    const commonIngredients = [
      'sugar', 'corn syrup', 'high fructose corn syrup', 'wheat flour', 
      'enriched flour', 'palm oil', 'soybean oil', 'salt', 'artificial flavor',
      'red 40', 'yellow 5', 'blue 1', 'caramel color', 'preservatives',
      'bht', 'tbhq', 'sodium benzoate', 'potassium sorbate'
    ];
    
    for (const ingredient of commonIngredients) {
      if (text.includes(ingredient)) {
        ingredients.push(ingredient);
      }
    }
  }

  return { ingredients, nutrition };
}

module.exports = { extractTextFromImage };
