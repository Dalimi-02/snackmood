# 🎃 SnackMood - Quick Start Guide

## What is SnackMood?

A spooky Halloween-themed app that scans snack labels and rates their healthiness with:
- 👻 Animated ghosts and spooky effects
- 🎵 Halloween background music
- 🔊 Score-based sound effects
- 📊 Health scoring based on ingredients and nutrition

---

## Run Locally (Development)

### 1. Install Dependencies
```bash
# Backend
cd backend
npm install

# Frontend (in new terminal)
cd frontend
npm install
```

### 2. Start Both Servers
```bash
# Terminal 1 - Backend (port 3000)
cd backend
npm start

# Terminal 2 - Frontend (port 5173)
cd frontend
npm run dev
```

### 3. Open Browser
Visit: http://localhost:5173

---

## Deploy to Production

### Option A: One-Command Deploy (Vercel)
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Option B: Use Deploy Script
```bash
./deploy.sh
```

### Option C: Manual Deploy
See [DEPLOY_NOW.md](DEPLOY_NOW.md) for step-by-step instructions

---

## Features to Test

1. **Upload a snack image** - Click or drag & drop
2. **See spooky animations** - Ghosts float around results
3. **Hear sound effects** - Different sounds for different scores
4. **Toggle background music** - Click 🎵 button (bottom-right)
5. **Try different snacks** - Each gets analyzed differently

---

## Project Status

✅ Frontend built and ready
✅ Backend with Google Vision API integration
✅ Halloween theme with animations
✅ Sound effects and music
✅ Responsive design
✅ Deployment configs ready

---

## What's Next?

1. **Deploy** - Follow [DEPLOY_NOW.md](DEPLOY_NOW.md)
2. **Enable Google Vision** - See `backend/GOOGLE_VISION_SETUP.md`
3. **Share** - Send your live URL to friends!
4. **Customize** - Edit colors, animations, scoring logic

---

## File Structure

```
snackmood/
├── frontend/
│   ├── src/
│   │   ├── App.jsx              # Main app
│   │   ├── SnackScanner.jsx     # Scanner with sound effects
│   │   ├── SpookyAudio.jsx      # Background music
│   │   └── styles.css           # Halloween theme
│   └── package.json
├── backend/
│   ├── index.js                 # Express server
│   ├── ocr.js                   # Google Vision integration
│   └── package.json
├── DEPLOY_NOW.md               # Deployment guide
├── DEPLOYMENT.md               # Detailed deployment options
└── README.md                   # Project overview
```

---

## Need Help?

- **Local issues**: Check that both servers are running
- **Deployment**: See [DEPLOY_NOW.md](DEPLOY_NOW.md)
- **Google Vision**: See `backend/GOOGLE_VISION_SETUP.md`
- **Customization**: Edit files in `frontend/src/`

Happy haunting! 🎃👻
