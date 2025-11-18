# 🔧 Fix Deployment Issue

## The Problem

Both frontend and backend are deployed to the same Vercel project. They need to be separate.

## Solution: Deploy Backend Separately

### Step 1: Delete Current Deployment (Optional)

If you want to start fresh:
1. Go to https://vercel.com/dashboard
2. Find the `snackmood-dtjb` project
3. Settings → General → Delete Project

### Step 2: Deploy Backend First

**Via Vercel Dashboard:**
1. Go to https://vercel.com/new
2. Import: `Dalimi-02/snackmood`
3. Configure:
   - **Project Name:** `snackmood-backend`
   - **Root Directory:** `backend` ⚠️ IMPORTANT!
   - **Framework Preset:** Other
   - Click **Deploy**

4. After deployment, copy the URL (e.g., `https://snackmood-backend.vercel.app`)

### Step 3: Update Frontend Environment Variable

1. Go to the frontend project in Vercel
2. Settings → Environment Variables
3. Update `VITE_API_URL` to the backend URL from Step 2
4. Redeploy

### Step 4: Deploy Frontend

**Via Vercel Dashboard:**
1. Go to https://vercel.com/new
2. Import: `Dalimi-02/snackmood` (same repo)
3. Configure:
   - **Project Name:** `snackmood-frontend`
   - **Root Directory:** `frontend` ⚠️ IMPORTANT!
   - **Framework Preset:** Vite
   - **Environment Variables:**
     - Name: `VITE_API_URL`
     - Value: `https://snackmood-backend.vercel.app` (your backend URL)
   - Click **Deploy**

---

## Quick Fix (If You Want to Keep Current Setup)

If your current project is the frontend:

1. Create a NEW project for backend:
   - Go to https://vercel.com/new
   - Import `Dalimi-02/snackmood`
   - Root Directory: `backend`
   - Deploy

2. Update your current project's environment variable:
   - Go to current project settings
   - Update `VITE_API_URL` to new backend URL
   - Redeploy

---

## Verify Setup

After deployment, you should have:

✅ **Backend:** `https://snackmood-backend-xxx.vercel.app`
   - Visit `/` → Should show API info
   - Visit `/health` → Should show `{"status":"ok"}`

✅ **Frontend:** `https://snackmood-frontend-xxx.vercel.app`
   - Should load the Halloween UI
   - Should be able to upload images

---

## Current URLs (Wrong Setup)

❌ Both are the same project:
- Frontend: `https://snackmood-dtjb.vercel.app`
- Backend: `https://snackmood-dtjb-git-main-dalimis-projects-204479de.vercel.app`

This won't work because they're the same deployment!
