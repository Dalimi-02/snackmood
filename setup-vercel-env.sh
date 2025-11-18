#!/bin/bash

echo "🎃 Setting up Google Vision API for Vercel"
echo ""

if [ ! -f "backend/vision.json" ]; then
    echo "❌ Error: backend/vision.json not found"
    exit 1
fi

echo "📋 Reading credentials from backend/vision.json..."
CREDENTIALS=$(cat backend/vision.json | tr -d '\n')

echo ""
echo "🚀 Adding to Vercel..."
echo ""
echo "Run this command:"
echo ""
echo "cd backend && vercel env add GOOGLE_CREDENTIALS_JSON production"
echo ""
echo "When prompted, paste this (copy it now):"
echo ""
echo "$CREDENTIALS"
echo ""
echo "Then redeploy:"
echo "vercel --prod"
echo ""
