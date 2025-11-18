# 🚀 Deploy SnackMood Now!

## Easiest Way: Vercel (5 minutes)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login
```bash
vercel login
```
(Opens browser - login with GitHub/Email)

### Step 3: Deploy Backend First
```bash
cd backend
vercel --prod
```

Answer the prompts:
- Set up and deploy? **Y**
- Which scope? (Choose your account)
- Link to existing project? **N**
- Project name? **snackmood-backend**
- Override settings? **N**

**Copy the backend URL** (e.g., `https://snackmood-backend-xxx.vercel.app`)

### Step 4: Deploy Frontend
```bash
cd ../frontend
```

Create `.env.production` file:
```bash
echo "VITE_API_URL=https://snackmood-backend-xxx.vercel.app" > .env.production
```
(Replace with your actual backend URL)

Then deploy:
```bash
vercel --prod
```

Answer the prompts:
- Project name? **snackmood-frontend**
- Override settings? **N**

**Done!** 🎉 Your app is live!

---

## Alternative: Netlify (Also Easy)

### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 2: Build Frontend
```bash
cd frontend
npm run build
cd ..
```

### Step 3: Deploy
```bash
netlify deploy
```

Follow prompts, then:
```bash
netlify deploy --prod
```

---

## What You Get

✅ Live URL (e.g., https://snackmood-xxx.vercel.app)
✅ Automatic HTTPS
✅ Global CDN
✅ Auto-deploy on git push (if connected to GitHub)

---

## After Deployment

### Test Your App
1. Visit your live URL
2. Upload a snack image
3. See the spooky results! 👻

### Enable Google Vision API (Optional)
If you want real OCR instead of mock data:

**For Vercel:**
```bash
vercel env add GOOGLE_APPLICATION_CREDENTIALS
```
Paste the contents of `backend/snackmood-54c3078c5caf.json`

**For Netlify:**
Go to Site Settings → Environment Variables → Add variable

---

## Troubleshooting

### "Command not found: vercel"
Run: `npm install -g vercel`

### CORS Errors
The backend already has CORS enabled. If issues persist, check your API URL.

### Build Fails
Make sure you're in the project root directory and run:
```bash
cd frontend && npm install && cd ..
cd backend && npm install && cd ..
```

---

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
- Check `DEPLOYMENT.md` for more deployment options
