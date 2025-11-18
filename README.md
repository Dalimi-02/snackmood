# 🎃 SnackMood — Your Spooky Snack Sidekick

**Live App:** https://snackmood-6jgh.vercel.app/

## What you get
- Frontend: Vite + React (minimal), simple UI to upload a snack image and show results.
- Backend: Express server with two endpoints:
  - POST /api/upload -> mock OCR (for demo) returns ingredients + nutrition
  - POST /api/analyze -> runs local scoring logic (or can call Anthropic/Claude if configured)
- A ready-to-run zip. Follow instructions below to run locally.

## Quick start (requires Node.js 18+)

### Backend
```bash
cd backend
npm install
# Option A: Run with local scoring (no keys needed)
npm run dev
# Option B: If you want to use Anthropic / Claude, set ANTHROPIC_API_KEY in env before running.
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Open the frontend dev URL shown by Vite (usually http://localhost:5173) and the backend runs at http://localhost:3000.

## Features
- 🎃 Halloween-themed UI with spooky animations
- 👻 Floating ghost effects when results appear
- 🎵 Optional background spooky music
- 🔊 Score-based sound effects
- 📸 Real OCR with Google Vision API
- 🎨 Responsive design for mobile and desktop

## Deployment

### Quick Deploy (Automated)
```bash
./deploy.sh
```

### Manual Deploy
See [DEPLOYMENT_FIXED.md](DEPLOYMENT_FIXED.md) for step-by-step instructions.

**Quick version:**
1. Deploy backend: `cd backend && vercel --prod`
2. Copy backend URL
3. Configure frontend: `echo "VITE_API_URL=<backend-url>" > frontend/.env.production`
4. Deploy frontend: `cd frontend && vercel --prod`

More deployment options in [DEPLOYMENT.md](DEPLOYMENT.md):
- Vercel (recommended)
- Render
- Railway
- Manual VPS deployment

## Notes
- The backend uses Google Vision API for OCR (see `backend/GOOGLE_VISION_SETUP.md`)
- Falls back to mock data if Vision API is not configured
- Local scoring function analyzes nutrition and ingredients
- Sound effects use Web Audio API (no external files needed)

## Project structure
- backend/
  - index.js (Express server)
  - ocr.js (Google Vision integration)
  - package.json
- frontend/
  - src/App.jsx (Main app)
  - src/SnackScanner.jsx (Scanner component)
  - src/SpookyAudio.jsx (Background music)
  - src/styles.css (Halloween theme)
  - package.json
