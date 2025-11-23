# Deploying to Netlify

## Prerequisites
1. A GitHub account
2. A Netlify account (free at netlify.com)
3. Git installed on your computer

## Step 1: Push to GitHub

### Initialize Git (if not already done)
```bash
cd "d:\Pendrive Backup\portfolio"
git init
git add .
git commit -m "Initial commit with visitor tracking"
```

### Create GitHub Repository
1. Go to https://github.com/new
2. Create a new repository named "portfolio" (or any name)
3. Don't initialize with README (you already have files)

### Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Netlify

### Option A: Deploy via Netlify UI (Recommended)

1. **Login to Netlify**
   - Go to https://app.netlify.com
   - Sign up or login with GitHub

2. **Create New Site**
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub"
   - Authorize Netlify to access your repositories
   - Select your portfolio repository

3. **Configure Build Settings**
   - Build command: Leave empty (it's a static site)
   - Publish directory: `.` (root directory)
   - Click "Deploy site"

4. **Site is Live!**
   - Your site will be deployed at `https://random-name.netlify.app`
   - You can change the site name in Site settings → Domain management

### Option B: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
cd "d:\Pendrive Backup\portfolio"
netlify deploy --prod
```

## Step 3: Verify Visitor Tracking

1. Visit your deployed site
2. Go to Netlify Dashboard → Functions
3. Click on "track-visitor" function
4. Check the function logs to see tracked visitors
5. Each visit will be logged in real-time

## Visitor Tracking on Netlify

### How It Works
- The `tracking.js` script runs on page load
- It collects browser, OS, device info client-side
- Sends data to Netlify Function (serverless)
- Function logs are viewable in Netlify Dashboard
- Logs are kept for 7 days on free plan

### Viewing Tracked Visitors
1. Go to Netlify Dashboard
2. Select your site
3. Go to "Functions" tab
4. Click on "track-visitor"
5. View "Function log" for visitor data

### Persistent Storage Options

For long-term storage beyond 7 days, integrate with:

#### Option 1: Google Sheets (Free)
```javascript
// In track-visitor.js function
const { GoogleSpreadsheet } = require('google-spreadsheet');
// Add visitor data to Google Sheet
```

#### Option 2: Firebase (Free tier)
```javascript
const admin = require('firebase-admin');
// Store in Firestore
```

#### Option 3: MongoDB Atlas (Free tier)
```javascript
const { MongoClient } = require('mongodb');
// Store in MongoDB
```

#### Option 4: Netlify Forms (Free - 100 submissions/month)
Create a hidden form and submit tracking data to it.

## Custom Domain (Optional)

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow instructions to configure DNS
4. Netlify provides free SSL certificate

## Environment Variables

If you add database integration:
1. Go to Site settings → Environment variables
2. Add your API keys/secrets
3. Use `process.env.YOUR_VAR_NAME` in functions

## Continuous Deployment

- Every push to GitHub main branch triggers auto-deployment
- Preview deployments for pull requests
- Instant rollback if needed

## Monitoring

### View Analytics
- Netlify Analytics (paid) for detailed stats
- Function logs for visitor tracking data
- Build & deploy logs for troubleshooting

## Cost
- **Free tier includes:**
  - 100 GB bandwidth/month
  - 125k serverless function requests/month
  - Unlimited sites
  - Continuous deployment
  - SSL certificate
  - Forms (100 submissions/month)

## Troubleshooting

### Functions not working?
1. Check `netlify.toml` is in root directory
2. Verify functions are in `netlify/functions/` folder
3. Check function logs in Netlify dashboard

### Site not updating?
1. Clear browser cache
2. Check deploy logs in Netlify
3. Trigger manual deploy if needed

### Tracking not working?
1. Open browser console
2. Look for tracking errors
3. Check function logs in Netlify dashboard

## Support
- Netlify Docs: https://docs.netlify.com
- Community Forum: https://answers.netlify.com
