#!/bin/bash

echo "🎃 Deploying SnackMood Frontend 🎃"
echo ""
echo "Backend URL: https://snackmood-backend-7ywbfuxzb-dalimis-projects-204479de.vercel.app"
echo ""

cd frontend

echo "📦 Building frontend..."
npm run build

echo ""
echo "🚀 Deploying to Vercel..."
vercel --prod

echo ""
echo "✅ Frontend deployment complete!"
echo ""
echo "📝 Test your app:"
echo "1. Visit the URL provided above"
echo "2. Upload a snack image"
echo "3. See the spooky results! 👻"
echo ""
