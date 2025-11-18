# 🎃 Simple Deployment Guide

## The Problem
Your app has two parts:
1. **Backend** (Express server) - needs to run on a server
2. **Frontend** (React app) - needs to know where the backend is

## Solution: Deploy Separately

### Part 1: Deploy Backend (2 minutes)

```bash
cd backend
npm install -g vercel
vercel login
vercel --prod
```

You'll get a URL like: `https://snackmood-backend-abc123.vercel.app`

**COPY THIS URL!** You need it for the frontend.

---

### Part 2: Deploy Frontend (2 minutes)

```bash
cd ../frontend
```

Create a file called `.env.production`:
```bash
echo "VITE_API_URL=https://your-backend-url-here.vercel.app" > .env.production
```

Replace `your-backend-url-here` with your actual backend URL from Part 1.

Then deploy:
```bash
vercel --prod
```

You'll get a URL like: `https://snackmood-frontend-xyz789.vercel.app`

**DONE!** Visit your frontend URL and test it! 🎉

---

## Alternative: Use the Script

If you want to automate this:

```bash
./deploy.sh
```

The script will:
1. Deploy backend
2. Capture the backend URL
3. Configure frontend with that URL
4. Deploy frontend
5. Give you both URLs

---

## Troubleshooting

### "Cannot find module" error
```bash
cd backend && npm install
cd ../frontend && npm install
```

### Frontend can't reach backend
Check that `.env.production` has the correct backend URL:
```bash
cat frontend/.env.production
```

Should show:
```
VITE_API_URL=https://your-backend-url.vercel.app
```

### CORS errors
The backend already has CORS enabled. If you still get errors:
1. Check the backend URL is correct
2. Make sure backend is deployed and running
3. Visit the backend URL directly - you should see "Cannot GET /"

---

## Testing Your Deployment

1. Visit your frontend URL
2. Open browser console (F12)
3. Upload a snack image
4. Check console for any errors
5. If it works, you'll see spooky results! 👻

---

## What Gets Deployed

**Backend:**
- Express server
- OCR logic (Google Vision or mock)
- Scoring algorithm
- API endpoints

**Frontend:**
- React app
- Halloween UI
- Animations
- Sound effects

Both are separate deployments that talk to each other via API calls.
