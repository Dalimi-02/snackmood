# 🎃 SnackMood - Fixed Deployment Guide

## The Issue (Now Fixed!)

The problem was that the frontend was hardcoded to use `localhost:3000`, which doesn't work in production.

**What I Fixed:**
1. ✅ Frontend now uses environment variables for API URL
2. ✅ Separate Vercel configs for backend and frontend
3. ✅ Automatic detection of production vs development mode
4. ✅ Better error handling in API calls
5. ✅ Deployment scripts that handle everything

---

## Quick Deploy (Automated)

```bash
./deploy.sh
```

This script will:
1. Deploy backend to Vercel
2. Capture the backend URL
3. Configure frontend with that URL
4. Build and deploy frontend
5. Give you both URLs

---

## Manual Deploy (Step by Step)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
vercel login
```

### Step 2: Deploy Backend
```bash
cd backend
vercel --prod
```

Copy the URL you get (e.g., `https://snackmood-backend-abc.vercel.app`)

### Step 3: Configure Frontend
```bash
cd ../frontend
echo "VITE_API_URL=https://snackmood-backend-abc.vercel.app" > .env.production
```
(Replace with your actual backend URL)

### Step 4: Deploy Frontend
```bash
npm run build
vercel --prod
```

Copy the frontend URL (e.g., `https://snackmood-frontend-xyz.vercel.app`)

### Step 5: Test!
Visit your frontend URL and upload a snack image! 🎃

---

## How It Works Now

### Development Mode
- Frontend runs on `localhost:5173`
- Backend runs on `localhost:3000`
- Frontend automatically uses `http://localhost:3000` for API

### Production Mode
- Frontend deployed to Vercel
- Backend deployed to Vercel (separate)
- Frontend uses `VITE_API_URL` environment variable
- Both communicate via HTTPS

---

## Environment Variables

### Frontend (.env.production)
```
VITE_API_URL=https://your-backend-url.vercel.app
```

### Backend (Vercel Dashboard)
Optional - only if using Google Vision API:
```
GOOGLE_APPLICATION_CREDENTIALS=<paste JSON content>
```

---

## Verification Checklist

After deployment, verify:

1. **Backend is running:**
   - Visit `https://your-backend-url.vercel.app/api/upload`
   - Should see: "Cannot POST /api/upload" (this is good!)

2. **Frontend loads:**
   - Visit your frontend URL
   - Should see the Halloween-themed UI

3. **API connection works:**
   - Open browser console (F12)
   - Upload a snack image
   - Check Network tab - should see calls to `/api/upload` and `/api/analyze`
   - Should get results with animations!

---

## Troubleshooting

### "Failed to fetch" error
**Problem:** Frontend can't reach backend

**Solution:**
```bash
cd frontend
cat .env.production
```
Make sure it shows your correct backend URL.

Rebuild and redeploy:
```bash
npm run build
vercel --prod
```

### "CORS error"
**Problem:** Backend not allowing frontend requests

**Solution:** Backend already has CORS enabled. If you still get errors:
1. Make sure you're using the correct backend URL
2. Check backend is deployed: visit the URL directly
3. Redeploy backend: `cd backend && vercel --prod`

### "Module not found"
**Problem:** Dependencies not installed

**Solution:**
```bash
cd backend && npm install
cd ../frontend && npm install
```

### Backend returns mock data
**Problem:** Google Vision API not configured

**Solution:** This is normal! The app works with mock data. To enable real OCR:
1. Enable billing on Google Cloud project
2. Add credentials to Vercel:
```bash
cd backend
vercel env add GOOGLE_APPLICATION_CREDENTIALS
```
Paste the contents of `snackmood-54c3078c5caf.json`

---

## File Structure (What Got Fixed)

```
snackmood/
├── backend/
│   ├── index.js                    ✅ CORS enabled
│   ├── vercel.json                 ✅ NEW - Vercel config
│   └── package.json
├── frontend/
│   ├── src/
│   │   └── SnackScanner.jsx        ✅ FIXED - Uses env vars
│   ├── .env.production             ✅ NEW - Production config
│   ├── .env.development            ✅ NEW - Dev config
│   ├── vercel.json                 ✅ NEW - Vercel config
│   └── package.json
├── deploy.sh                       ✅ FIXED - Automated deploy
├── DEPLOY_SIMPLE.md                ✅ NEW - Simple guide
└── DEPLOYMENT_FIXED.md             ✅ NEW - This file
```

---

## Success! 🎉

Once deployed, your app will:
- ✅ Load the Halloween-themed UI
- ✅ Accept snack image uploads
- ✅ Analyze ingredients and nutrition
- ✅ Show spooky animations
- ✅ Play sound effects
- ✅ Work on mobile and desktop

Share your URL and let people scan their snacks! 👻🎃
