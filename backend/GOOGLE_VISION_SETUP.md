# Google Vision API Setup

To enable real OCR for reading snack labels, follow these steps:

## 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Vision API** for your project

## 2. Create Service Account Credentials

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **Service Account**
3. Fill in the service account details
4. Click **Create and Continue**
5. Grant the role: **Cloud Vision API User**
6. Click **Done**
7. Click on the created service account
8. Go to **Keys** tab
9. Click **Add Key** > **Create New Key**
10. Choose **JSON** format
11. Download the JSON key file

## 3. Set Up Authentication

### Option A: Environment Variable (Recommended)
```bash
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/credentials.json"
```

Add this to your `~/.zshrc` or `~/.bash_profile` to make it permanent.

### Option B: Place in Project
1. Save the credentials file as `backend/google-credentials.json`
2. Add to `.gitignore` to keep it private
3. Set the environment variable:
```bash
export GOOGLE_APPLICATION_CREDENTIALS="./google-credentials.json"
```

## 4. Enable Billing (Required for Vision API)

1. Go to [Google Cloud Console Billing](https://console.cloud.google.com/billing)
2. Link a billing account to your project
3. Enable the **Cloud Vision API** in the [API Library](https://console.cloud.google.com/apis/library/vision.googleapis.com)
4. Wait a few minutes for changes to propagate

**Note:** You won't be charged unless you exceed the free tier (1,000 requests/month)

## 5. Restart Your Backend

```bash
npm start
```

## Testing

The app will automatically use Google Vision API if credentials are configured. If not, it falls back to mock data.

## Pricing

- First 1,000 requests per month: **FREE**
- After that: $1.50 per 1,000 images

Perfect for development and small-scale use!

## Current Status

✅ Credentials file found: `snackmood-54c3078c5caf.json`
✅ Added to .gitignore (safe from git commits)
⚠️  Billing needs to be enabled on your Google Cloud project

Visit: https://console.developers.google.com/billing/enable?project=567890185630
