# 🔧 Add Google Vision API to Vercel

Your app is currently using **mock data** because Google Vision credentials aren't configured on Vercel. Here's how to fix it:

## Step 1: Copy Your Credentials

Copy the entire contents of `backend/vision.json` file.

## Step 2: Add to Vercel

### Via Vercel Dashboard (Easiest):

1. Go to https://vercel.com/dashboard
2. Click on your **backend** project (`snackmood`)
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Configure:
   - **Name:** `GOOGLE_CREDENTIALS_JSON`
   - **Value:** Paste the entire JSON content from `backend/vision.json`
   - **Environment:** Production, Preview, Development (select all)
6. Click **Save**
7. Go to **Deployments** tab
8. Click the **...** menu on the latest deployment
9. Click **Redeploy**

### Via CLI:

```bash
cd backend

# Add the environment variable
vercel env add GOOGLE_CREDENTIALS_JSON production

# When prompted, paste the entire contents of vision.json

# Redeploy
vercel --prod
```

## Step 3: Test

After redeployment:
1. Visit https://snackmood-dtjb.vercel.app/
2. Upload different snack images
3. You should now get different results for different snacks!

## Verify It's Working

Check the Vercel deployment logs:
- Should see: `✅ Google Vision API enabled (from env)`
- Instead of: `⚠️ Google Vision API not configured. Using mock data.`

---

## Important Notes

- The credentials are stored securely in Vercel
- They won't be visible in your code or GitHub
- Make sure billing is enabled on your Google Cloud project
- First 1,000 requests per month are FREE

---

## Troubleshooting

### Still getting same results?
- Check that the environment variable is set correctly
- Make sure you redeployed after adding the variable
- Check deployment logs for errors

### "Billing not enabled" error?
- Go to https://console.cloud.google.com/billing
- Enable billing for your project
- Wait a few minutes and try again

### Want to test locally?
Your local setup already works! Just run:
```bash
cd backend
npm start
```
