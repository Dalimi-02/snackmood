# SnackMood Deployment Guide

## Option 1: Deploy to Vercel (Recommended - Easiest)

### Prerequisites
- Install Vercel CLI: `npm install -g vercel`
- Create a Vercel account at https://vercel.com

### Steps

1. **Login to Vercel**
```bash
vercel login
```

2. **Deploy from root directory**
```bash
vercel
```

3. **Follow the prompts:**
   - Set up and deploy? Yes
   - Which scope? (Select your account)
   - Link to existing project? No
   - Project name: snackmood (or your choice)
   - Directory: `./` (root)
   - Override settings? No

4. **Set Environment Variables (Optional - for Google Vision API)**
```bash
vercel env add GOOGLE_APPLICATION_CREDENTIALS
```
Paste the contents of your `backend/snackmood-54c3078c5caf.json` file

5. **Deploy to Production**
```bash
vercel --prod
```

Your app will be live at: `https://snackmood-xxx.vercel.app`

---

## Option 2: Deploy to Render

### Backend (Render Web Service)

1. Go to https://render.com and create account
2. Click "New +" → "Web Service"
3. Connect your GitHub repo
4. Configure:
   - Name: `snackmood-backend`
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Add Environment Variable:
     - Key: `GOOGLE_APPLICATION_CREDENTIALS`
     - Value: (paste JSON content)

### Frontend (Render Static Site)

1. Click "New +" → "Static Site"
2. Connect your GitHub repo
3. Configure:
   - Name: `snackmood-frontend`
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
   - Add Environment Variable:
     - Key: `VITE_API_URL`
     - Value: `https://snackmood-backend.onrender.com`

---

## Option 3: Deploy to Railway

### Steps

1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway will auto-detect both services
5. Add environment variables in the dashboard
6. Deploy!

---

## Option 4: Manual VPS Deployment (DigitalOcean, AWS, etc.)

### Backend Setup

```bash
# SSH into your server
ssh user@your-server-ip

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone your repo
git clone your-repo-url
cd snackmood/backend

# Install dependencies
npm install

# Install PM2 for process management
sudo npm install -g pm2

# Start backend
pm2 start index.js --name snackmood-backend
pm2 save
pm2 startup
```

### Frontend Setup

```bash
cd ../frontend
npm install
npm run build

# Serve with nginx
sudo apt-get install nginx
sudo cp -r dist/* /var/www/html/
```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        root /var/www/html;
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Testing Your Deployment

1. Visit your deployed URL
2. Upload a snack image
3. Check that results appear with animations
4. Test the spooky music button
5. Try different snack images

---

## Troubleshooting

### CORS Issues
If you get CORS errors, make sure your backend has the correct CORS configuration in `backend/index.js`

### API Connection Failed
- Check that `VITE_API_URL` environment variable is set correctly
- Verify backend is running and accessible

### Google Vision API Not Working
- Ensure billing is enabled on your Google Cloud project
- Verify credentials are properly set in environment variables
- Check that Vision API is enabled in Google Cloud Console

---

## Quick Local Test Before Deployment

```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Visit http://localhost:5173 to test locally first!
