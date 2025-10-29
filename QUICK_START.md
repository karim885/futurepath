# ⚡ FuturePath - Quick Start

## 🚀 Get Running in 5 Minutes

### Step 1: Install (1 min)
```bash
npm install
```

### Step 2: Setup MongoDB (2 min)

**Easy Option - MongoDB Atlas (Free):**
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up → Create Free Cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string

**OR Local MongoDB:**
- Already installed? Just use: `mongodb://localhost:27017/futurepath`

### Step 3: Get OpenAI Key (1 min)
1. Go to https://platform.openai.com/
2. Sign up → API Keys → Create new key
3. Copy the key (starts with `sk-`)

### Step 4: Create .env File (1 min)

Create a file named `.env` in the project root:

```env
# Required
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/futurepath
OPENAI_API_KEY=sk-your-key-here
NEXTAUTH_SECRET=run-this-command-to-generate

# Required URLs
NEXTAUTH_URL=http://localhost:3000

# Optional (for Google login)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

**Generate NEXTAUTH_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Step 5: Run! (30 sec)
```bash
npm run dev
```

Open: **http://localhost:3000** 🎉

---

## ✅ Quick Test Checklist

1. ✅ Landing page loads
2. ✅ Click "Sign Up" and create account
3. ✅ Click "Start Now" to take quiz
4. ✅ Answer 8 questions
5. ✅ View results with careers and universities
6. ✅ Check dashboard for points and badges

---

## 🆘 Quick Fixes

### "Cannot connect to MongoDB"
- Check your connection string in `.env`
- For Atlas: Whitelist your IP (0.0.0.0/0 for testing)

### "OpenAI Error"
- Check API key is correct
- Verify you have credits ($5 free for new accounts)
- App has fallback recommendations if API fails

### "NextAuth Error"
- Make sure you set `NEXTAUTH_SECRET` in `.env`

---

## 🎯 What You Can Do Now

### Without Account (Guest):
- ✅ Take quizzes
- ✅ Get recommendations
- ✅ Browse universities

### With Account:
- ✅ Everything above +
- ✅ Save progress
- ✅ Earn points
- ✅ Unlock badges
- ✅ View dashboard

---

## 📱 Main Pages

- **/** - Landing page
- **/quiz** - Take AI quiz
- **/results/[id]** - View results
- **/universities** - Browse universities
- **/dashboard** - Your stats (login required)
- **/profile** - Your badges (login required)

---

## 🎮 Try These Features

1. **Take a Quiz** - Click "Start Now"
2. **Guest Mode** - Take quiz without account
3. **Browse Universities** - Filter by country/field
4. **Earn Badges** - Complete quizzes to unlock
5. **Share Results** - Share button on results page

---

## 🎨 Customization Ideas

### Add Universities
Edit `data/universities.json`

### Change Colors
Edit `tailwind.config.ts` → colors section

### Modify Questions
Edit `lib/openai.ts` → `generateQuizQuestions()`

### Add Badges
Edit `lib/badges.ts`

---

## 📚 Need More Help?

- **Full Setup**: Read `SETUP_GUIDE.md`
- **Features**: Read `PROJECT_SUMMARY.md`
- **Overview**: Read `README.md`
- **Structure**: Read `FILE_STRUCTURE.txt`

---

## 🎉 You're Ready!

Your app should now be running at **http://localhost:3000**

**Enjoy discovering futures!** 🚀✨

---

### Quick Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Check code quality
```

### Environment Variables

| Variable | Required | Where to Get |
|----------|----------|--------------|
| MONGODB_URI | ✅ Yes | MongoDB Atlas or local |
| OPENAI_API_KEY | ✅ Yes | platform.openai.com |
| NEXTAUTH_SECRET | ✅ Yes | Generate with crypto |
| NEXTAUTH_URL | ✅ Yes | http://localhost:3000 |
| GOOGLE_CLIENT_ID | ❌ No | Google Cloud Console |
| GOOGLE_CLIENT_SECRET | ❌ No | Google Cloud Console |

---

**That's it! You're all set! 🎊**



