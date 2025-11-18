# 🎃 START HERE - SnackMood Quick Guide

## What is This?

A Halloween-themed web app that scans snack labels and rates their healthiness with spooky animations, sound effects, and ghost emojis! 👻

---

## Run Locally (Right Now!)

### Terminal 1 - Backend
```bash
cd backend
npm install
npm start
```

### Terminal 2 - Frontend
```bash
cd frontend
npm install
npm run dev
```

Visit: **http://localhost:5173**

---

## Deploy to Internet (5 minutes)

### Option 1: Automated Script
```bash
./deploy.sh
```

### Option 2: Manual (Recommended for first time)

**Step 1:** Deploy backend
```bash
cd backend
npm install -g vercel
vercel login
vercel --prod
```
Copy the URL you get (e.g., `https://snackmood-backend-xxx.vercel.app`)

**Step 2:** Configure frontend
```bash
cd ../frontend
echo "VITE_API_URL=https://your-backend-url-here.vercel.app" > .env.production
```
(Replace with your actual backend URL)

**Step 3:** Deploy frontend
```bash
vercel --prod
```

**Done!** Visit your frontend URL! 🎉

---

## Detailed Guides

- **[DEPLOYMENT_FIXED.md](DEPLOYMENT_FIXED.md)** - Complete deployment guide with troubleshooting
- **[DEPLOY_SIMPLE.md](DEPLOY_SIMPLE.md)** - Simplified deployment steps
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - All deployment options (Vercel, Render, Railway, VPS)
- **[QUICK_START.md](QUICK_START.md)** - Project overview and features
- **[backend/GOOGLE_VISION_SETUP.md](backend/GOOGLE_VISION_SETUP.md)** - Enable real OCR

---

## What You Get

✅ Halloween-themed UI with animations
✅ Spooky sound effects based on score
✅ Optional background music
✅ Floating ghost emojis
✅ Health scoring algorithm
✅ Google Vision OCR (or mock data)
✅ Fully responsive design
✅ Ready to deploy

---

## Quick Test

1. Run locally (see above)
2. Visit http://localhost:5173
3. Upload a snack image (any food label photo)
4. See the spooky results! 👻
5. Click 🎵 button for background music

---

## Need Help?

**Local issues:**
- Make sure both backend and frontend are running
- Check ports 3000 (backend) and 5173 (frontend) are free

**Deployment issues:**
- See [DEPLOYMENT_FIXED.md](DEPLOYMENT_FIXED.md)
- Check that backend URL is correct in frontend `.env.production`

**Google Vision API:**
- See [backend/GOOGLE_VISION_SETUP.md](backend/GOOGLE_VISION_SETUP.md)
- App works with mock data if not configured

---

## Project Status

✅ **Ready to use!**
- All features implemented
- Tested and working
- Deployment configs ready
- Documentation complete

Just run it locally or deploy it! 🚀
