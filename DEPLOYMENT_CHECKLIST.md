# ✅ Deployment Checklist

## Pre-Deployment

- [x] Backend code ready
- [x] Frontend code ready
- [x] Environment variables configured
- [x] Build tested locally
- [x] API endpoints working
- [x] CORS enabled
- [x] Error handling added

## Deployment Steps

### Backend
- [ ] Install Vercel CLI: `npm install -g vercel`
- [ ] Login: `vercel login`
- [ ] Deploy: `cd backend && vercel --prod`
- [ ] Copy backend URL: `https://snackmood-backend-xxx.vercel.app`
- [ ] Test backend: Visit URL, should see "Cannot GET /"

### Frontend
- [ ] Create `.env.production` with backend URL
- [ ] Build: `npm run build`
- [ ] Deploy: `vercel --prod`
- [ ] Copy frontend URL: `https://snackmood-frontend-xxx.vercel.app`

## Post-Deployment Testing

- [ ] Visit frontend URL
- [ ] UI loads correctly
- [ ] Upload button works
- [ ] Upload a test image
- [ ] Results appear with animations
- [ ] Sound effects play
- [ ] Music button works
- [ ] Try on mobile device
- [ ] Check browser console for errors

## Optional: Google Vision API

- [ ] Enable billing on Google Cloud
- [ ] Add credentials to Vercel: `vercel env add GOOGLE_APPLICATION_CREDENTIALS`
- [ ] Redeploy backend: `vercel --prod`
- [ ] Test with real snack label

## Troubleshooting

If something doesn't work:

1. **Check backend URL in frontend**
   ```bash
   cat frontend/.env.production
   ```

2. **Check backend is running**
   Visit backend URL directly

3. **Check browser console**
   Look for error messages

4. **Rebuild and redeploy**
   ```bash
   cd frontend
   npm run build
   vercel --prod
   ```

## Success Criteria

✅ Frontend loads without errors
✅ Can upload images
✅ Results display correctly
✅ Animations work
✅ Sound effects play
✅ Works on mobile
✅ No console errors

## Your URLs

Backend: `_______________________________`

Frontend: `_______________________________`

Deployed on: `_______________________________`

## Share Your App!

Once everything works, share your frontend URL with friends and let them scan their snacks! 🎃👻
