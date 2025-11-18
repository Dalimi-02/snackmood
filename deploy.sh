#!/bin/bash

echo "🎃 SnackMood Deployment Script 🎃"
echo ""

# Check if vercel is installed
if ! command -v vercel &> /dev/null
then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

echo "📝 This script will deploy both backend and frontend to Vercel"
echo ""

# Deploy Backend
echo "🔧 Step 1: Deploying Backend..."
cd backend
echo "Deploying backend to production..."
BACKEND_URL=$(vercel --prod --yes 2>&1 | grep -o 'https://[^ ]*')

if [ -z "$BACKEND_URL" ]; then
    echo "❌ Backend deployment failed or URL not captured"
    echo "Please deploy manually:"
    echo "  cd backend && vercel --prod"
    exit 1
fi

echo "✅ Backend deployed to: $BACKEND_URL"
cd ..

# Configure Frontend
echo ""
echo "🎨 Step 2: Configuring Frontend..."
echo "VITE_API_URL=$BACKEND_URL" > frontend/.env.production
echo "✅ Frontend configured with backend URL"

# Deploy Frontend
echo ""
echo "🚀 Step 3: Deploying Frontend..."
cd frontend
npm run build
FRONTEND_URL=$(vercel --prod --yes 2>&1 | grep -o 'https://[^ ]*')

if [ -z "$FRONTEND_URL" ]; then
    echo "⚠️  Frontend deployment completed but URL not captured"
    echo "Check your Vercel dashboard for the URL"
else
    echo "✅ Frontend deployed to: $FRONTEND_URL"
fi

cd ..

echo ""
echo "🎉 Deployment Complete!"
echo ""
echo "📋 Your URLs:"
echo "   Backend:  $BACKEND_URL"
echo "   Frontend: $FRONTEND_URL"
echo ""
echo "📝 Next steps:"
echo "1. Visit your frontend URL"
echo "2. Test uploading a snack image"
echo "3. Optional: Enable Google Vision API"
echo "   cd backend && vercel env add GOOGLE_APPLICATION_CREDENTIALS"
echo ""
