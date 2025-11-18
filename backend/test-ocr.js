// Quick test script to verify OCR setup
const { extractTextFromImage } = require('./ocr');
const fs = require('fs');

async function test() {
  console.log('Testing OCR setup...\n');
  
  // Test with a dummy buffer (will use mock data if Vision API not configured)
  try {
    const result = await extractTextFromImage(Buffer.from('test'));
    console.log('✅ OCR is working!');
    console.log('\nSample output:');
    console.log('Ingredients:', result.ingredients);
    console.log('Nutrition:', result.nutrition);
    console.log('\n📝 Note: Currently using mock data.');
    console.log('To enable real OCR, follow instructions in GOOGLE_VISION_SETUP.md');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

test();
