# 🚀 FuturePath - Quick Setup Guide

## Step-by-Step Setup Instructions

### 1️⃣ Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- MongoDB & Mongoose
- NextAuth.js
- OpenAI SDK
- Framer Motion
- And more...

### 2️⃣ Set Up MongoDB

#### Option A: MongoDB Atlas (Recommended for beginners)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (choose the free tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database password
7. Use this in your `.env` file

Example:
```env
MONGODB_URI=mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/futurepath
```

#### Option B: Local MongoDB

1. Install MongoDB locally from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB:
   - Windows: MongoDB runs as a service automatically
   - Mac: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongod`
3. Use this in your `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/futurepath
```

### 3️⃣ Get OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or sign in
3. Go to API Keys section
4. Click "Create new secret key"
5. Copy the key (starts with `sk-`)
6. Add to `.env` file:
```env
OPENAI_API_KEY=sk-your-key-here
```

**Note:** OpenAI offers $5 free credits for new accounts. The app uses GPT-3.5-turbo which is very cost-effective (~$0.002 per quiz).

### 4️⃣ Set Up Google OAuth (Optional)

Only needed if you want Google Sign-In feature. Users can still sign up with email/password without this.

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable "Google+ API"
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret
7. Add to `.env`:
```env
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
```

### 5️⃣ Create Environment File

Copy `.env.example` to `.env`:

```bash
# On Windows PowerShell:
Copy-Item .env.example .env

# On Mac/Linux:
cp .env.example .env
```

Then edit `.env` and fill in your values:

```env
# Required
MONGODB_URI=your-mongodb-connection-string
NEXTAUTH_SECRET=your-secret-here
OPENAI_API_KEY=your-openai-key

# Optional
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Auto-filled
NEXTAUTH_URL=http://localhost:3000
```

### 6️⃣ Generate NextAuth Secret

Run this command to generate a secure secret:

**Windows PowerShell:**
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Mac/Linux:**
```bash
openssl rand -base64 32
```

Copy the output and paste it as `NEXTAUTH_SECRET` in your `.env` file.

### 7️⃣ Run the Application

```bash
npm run dev
```

The application will start at [http://localhost:3000](http://localhost:3000)

### 8️⃣ Test the Application

1. **Landing Page**: Visit http://localhost:3000
2. **Sign Up**: Click "Sign In" → "Sign Up" and create an account
3. **Take Quiz**: Click "Start Now" on the homepage
4. **Answer Questions**: Complete the 8-question quiz
5. **View Results**: See your career and university recommendations
6. **Dashboard**: Check your points and badges

## 🎯 Minimum Setup (Just to Test)

If you just want to test the app quickly:

1. Install dependencies: `npm install`
2. Set up MongoDB (Atlas free tier is easiest)
3. Get OpenAI API key
4. Create `.env` with MongoDB URI, OpenAI key, and NextAuth secret
5. Run `npm run dev`

Google OAuth is optional - users can sign up with email/password.

## ⚠️ Common Issues & Solutions

### "Cannot connect to MongoDB"
- **Check**: Is MongoDB running?
- **Check**: Is your connection string correct?
- **For Atlas**: Did you whitelist your IP address?
- **For Local**: Try `mongodb://127.0.0.1:27017/futurepath` instead

### "OpenAI API Error"
- **Check**: Is your API key correct?
- **Check**: Do you have credits? ($5 free for new accounts)
- **Note**: The app has fallback recommendations if API fails

### "NextAuth Error"
- **Check**: Did you set `NEXTAUTH_SECRET`?
- **Check**: Is `NEXTAUTH_URL` set to `http://localhost:3000`?

### "Google OAuth Not Working"
- This is optional - you can skip it
- If needed, verify redirect URI is exactly: `http://localhost:3000/api/auth/callback/google`

## 📱 Testing Features

### Test User Authentication
1. Sign up with email/password
2. Sign out
3. Sign in again
4. (Optional) Test Google OAuth if configured

### Test Quiz System
1. Click "Start Now"
2. Answer all 8 questions
3. View results with careers and universities
4. Check that points were added (if logged in)

### Test Guest Mode
1. Sign out or use incognito mode
2. Click "Start Now"
3. Complete quiz as guest
4. View results (won't save progress)

### Test Dashboard
1. Sign in
2. Go to Dashboard
3. Check points, badges, and quiz history

### Test University Browser
1. Go to "Universities" page
2. Test search functionality
3. Filter by country
4. Filter by field

## 🎨 Customization Ideas

### Add More Universities
Edit `data/universities.json` and add new entries.

### Change Colors
Edit `tailwind.config.ts` to modify the color scheme.

### Customize Quiz Questions
Edit `lib/openai.ts` → `generateQuizQuestions()` function.

### Add New Badges
Edit `lib/badges.ts` and add new badge definitions.

## 📊 Understanding the Database

The app uses 2 main collections:

1. **users** - Stores user accounts, points, badges
2. **quizresults** - Stores quiz submissions and results

You can view your data using:
- MongoDB Compass (GUI)
- MongoDB Atlas web interface
- mongosh (CLI)

## 🚀 Deployment (Future)

To deploy to production:

1. Set up MongoDB Atlas (if not already)
2. Deploy to Vercel, Netlify, or any platform supporting Next.js
3. Add environment variables in deployment settings
4. Update `NEXTAUTH_URL` to your production URL
5. Update Google OAuth redirect URIs (if using)

## 💡 Pro Tips

1. **Save Often**: Your `.env` file is gitignored - back it up
2. **Test Guest Mode**: This is great for demos
3. **Monitor OpenAI Usage**: Check your usage at platform.openai.com
4. **Start Simple**: You can always add Google OAuth later
5. **Read Console**: Check browser console and terminal for helpful errors

## 🎓 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [MongoDB Docs](https://docs.mongodb.com/)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [NextAuth.js Docs](https://next-auth.js.org/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## ✅ Setup Checklist

- [ ] Installed Node.js 18+
- [ ] Ran `npm install`
- [ ] Set up MongoDB (Atlas or local)
- [ ] Got OpenAI API key
- [ ] Created `.env` file
- [ ] Added MongoDB URI to `.env`
- [ ] Added OpenAI key to `.env`
- [ ] Generated and added NextAuth secret
- [ ] (Optional) Set up Google OAuth
- [ ] Ran `npm run dev`
- [ ] Tested signing up
- [ ] Tested taking quiz
- [ ] Tested viewing results
- [ ] Tested dashboard

## 🆘 Need Help?

1. Check error messages in terminal
2. Check browser console (F12)
3. Review `.env` file
4. Verify MongoDB connection
5. Check OpenAI API key and credits
6. Re-read this guide

---

**You're all set! Start discovering futures! 🚀**


