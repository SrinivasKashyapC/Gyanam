# 🚀 Render Deployment Guide for Gnyaan

## Prerequisites
- GitHub account
- Render account (sign up at https://render.com)
- MongoDB Atlas account (already set up)

## Step 1: Push to GitHub

1. Initialize git (if not already done):
```bash
git init
git add .
git commit -m "Ready for deployment"
```

2. Create a new repository on GitHub:
   - Go to https://github.com/new
   - Name it `gnyaan` (or any name you prefer)
   - Don't initialize with README (you already have code)
   - Create repository

3. Push your code:
```bash
git remote add origin https://github.com/YOUR_USERNAME/gnyaan.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy on Render

1. **Sign up/Login to Render**
   - Go to https://render.com
   - Sign up with GitHub (easiest way)

2. **Create New Web Service**
   - Click "New +" button
   - Select "Web Service"
   - Connect your GitHub repository
   - Select the `gnyaan` repository

3. **Configure the Service**
   - **Name:** gnyaan (or your preferred name)
   - **Region:** Choose closest to you
   - **Branch:** main
   - **Root Directory:** Leave blank
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free (or choose paid if you want)

4. **Add Environment Variables**
   Click "Advanced" and add these environment variables:
   
   ```
   NODE_ENV = production
   MONGODB_URI = your_mongodb_connection_string_here
   DB_NAME = practice_database
   GEMINI_API_KEY = your_gemini_api_key_here
   GROQ_API_KEY = your_groq_api_key_here
   PORT = 3000
   ```

   **Note:** Copy the actual values from your `.env` file

5. **Create Web Service**
   - Click "Create Web Service"
   - Wait 2-3 minutes for deployment
   - Your app will be live at: `https://gnyaan.onrender.com` (or similar)

## Step 3: Update Firebase (Important!)

1. Go to Firebase Console: https://console.firebase.google.com
2. Select your project: `gyaanam-ai`
3. Go to **Authentication** → **Settings** → **Authorized domains**
4. Add your Render domain: `gnyaan.onrender.com`

## Step 4: Test Your Deployment

1. Visit your Render URL
2. Test login/signup
3. Create notes, take quizzes
4. Verify everything works

## Your Deployed URLs

- **Frontend:** `https://gnyaan.onrender.com`
- **API Health Check:** `https://gnyaan.onrender.com/api/health`
- **Guru API:** `https://gnyaan.onrender.com/api/guru/test`

## Free Tier Limitations

- App sleeps after 15 minutes of inactivity
- First request after sleep takes ~30-60 seconds
- 750 hours/month free (enough for personal use)
- Upgrade to $7/month for always-on service

## Troubleshooting

### If deployment fails:
1. Check Render logs (click on your service → Logs)
2. Verify all environment variables are set
3. Make sure `package.json` has all dependencies

### If app loads but features don't work:
1. Check browser console for errors
2. Verify API endpoints use relative paths (already configured)
3. Check MongoDB Atlas allows connections from anywhere (0.0.0.0/0)

### MongoDB Connection Issues:
1. Go to MongoDB Atlas
2. Network Access → Add IP Address → Allow Access from Anywhere (0.0.0.0/0)

## Updating Your App

After making changes:
```bash
git add .
git commit -m "Your update message"
git push
```

Render will automatically redeploy! 🎉

## Need Help?

- Render Docs: https://render.com/docs
- MongoDB Atlas: https://cloud.mongodb.com
- Firebase: https://console.firebase.google.com

---

**Ready to go live!** 🚀
