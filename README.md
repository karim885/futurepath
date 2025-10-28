# 🚀 FuturePath - Discover Your Future

FuturePath is a modern, AI-powered web application designed to help teenagers discover their future career paths and find top universities worldwide based on their interests, goals, and personalized AI-generated questions.

![FuturePath](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-green?style=for-the-badge&logo=mongodb)
![OpenAI](https://img.shields.io/badge/OpenAI-API-brightgreen?style=for-the-badge&logo=openai)

## ✨ Features

### 🎯 Core Features

- **Eye-catching Landing Page** - Modern hero section with smooth animations and motivational tagline
- **AI-Powered Quiz** - Interactive chatbot that asks personalized questions about:
  - Interests and passions
  - Preferred subjects
  - Career goals
  - Dream countries to study in
  - Budget and study preferences
- **Smart Results Dashboard** - AI-analyzed recommendations including:
  - Top career paths with match percentages
  - List of top universities worldwide filtered by field and country
  - University details with rankings, websites, and country information
- **Gamification System** - Earn points for completing quizzes and unlock badges
- **User Authentication** - Sign up with Google OAuth or email/password
- **Guest Mode** - Continue without signing up
- **University Browser** - Explore 20+ top universities with advanced filtering

### 🎨 Design Highlights

- Youthful and inspiring design with gradient backgrounds
- Smooth animations using Framer Motion
- Fully responsive for all devices
- Modern glass-morphism effects
- Custom color scheme (blue, purple, teal)

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB** - NoSQL database with Mongoose ODM
- **NextAuth.js** - Authentication (Google OAuth + Credentials)

### AI & Data
- **OpenAI API (GPT-3.5)** - AI-powered quiz analysis and career recommendations
- **University Dataset** - Curated list of top 20 universities worldwide

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB instance (local or MongoDB Atlas)
- OpenAI API key
- Google OAuth credentials (optional, for Google sign-in)

### Installation

1. **Clone the repository** (or use this project)
```bash
cd "UNI HAWK"
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/futurepath
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/futurepath

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-generate-with-openssl-rand-base64-32

# Google OAuth (optional - get from Google Cloud Console)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# OpenAI API Key (get from platform.openai.com)
OPENAI_API_KEY=sk-your-openai-api-key-here
```

4. **Generate NextAuth secret**
```bash
openssl rand -base64 32
```

5. **Run the development server**
```bash
npm run dev
```

6. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
futurepath/
├── app/                      # Next.js App Router
│   ├── api/                  # API Routes
│   │   ├── auth/            # Authentication endpoints
│   │   ├── quiz/            # Quiz endpoints
│   │   ├── results/         # Results endpoints
│   │   └── user/            # User endpoints
│   ├── auth/                # Auth pages (signin, signup)
│   ├── dashboard/           # User dashboard
│   ├── profile/             # User profile
│   ├── quiz/                # Quiz interface
│   ├── results/             # Results page
│   ├── universities/        # Universities browser
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Landing page
├── components/              # React components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── SessionProvider.tsx
├── data/                    # Static data
│   └── universities.json    # University dataset
├── lib/                     # Utility libraries
│   ├── mongodb.ts           # MongoDB connection
│   ├── openai.ts            # OpenAI integration
│   └── badges.ts            # Badge system
├── models/                  # Mongoose models
│   ├── User.ts
│   └── QuizResult.ts
├── types/                   # TypeScript definitions
│   └── next-auth.d.ts
├── .env.example             # Environment variables template
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

## 🎮 Usage Guide

### For Users

1. **Visit the Landing Page** - Learn about FuturePath
2. **Take the Quiz** - Click "Start Now" to begin the AI-powered quiz
3. **Answer Questions** - Interact with the AI chatbot (8 questions)
4. **View Results** - Get personalized career and university recommendations
5. **Earn Points** - Each quiz completion earns points
6. **Unlock Badges** - Achieve milestones to unlock special badges
7. **Explore Universities** - Browse and filter universities by country and field
8. **Track Progress** - View your dashboard to see stats and history

### Guest vs Signed-In Users

**Guest Users:**
- Can take quizzes
- View results
- Browse universities
- ❌ Cannot save progress or earn points

**Signed-In Users:**
- All guest features
- ✅ Save quiz history
- ✅ Earn points and badges
- ✅ Track progress over time
- ✅ View personalized dashboard

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/signin` - Sign in user
- `POST /api/auth/signout` - Sign out user

### Quiz
- `GET /api/quiz/questions` - Get quiz questions
- `POST /api/quiz/submit` - Submit quiz answers

### Results
- `GET /api/results/[id]` - Get quiz results by ID

### User
- `GET /api/user/dashboard` - Get user dashboard data

## 🎯 Gamification System

### Points
- Complete a quiz: **80 points** (10 points per question × 8 questions)
- Points accumulate over multiple quizzes

### Badges

| Badge | Icon | Requirement |
|-------|------|-------------|
| Early Bird | 🐦 | Join FuturePath |
| First Steps | 🎯 | Complete 1 quiz |
| Explorer | 🧭 | Complete 5 quizzes |
| Pathfinder | 🗺️ | Complete 10 quizzes |
| Rising Star | ⭐ | Earn 100 points |
| Achiever | 🏆 | Earn 500 points |
| Legend | 👑 | Earn 1000 points |

## 🌍 University Data

The application includes 20 top universities worldwide:
- MIT, Stanford, Harvard (USA)
- Oxford, Cambridge, Imperial College (UK)
- ETH Zurich (Switzerland)
- NUS (Singapore)
- University of Toronto (Canada)
- And many more!

Each university includes:
- Official name and ranking
- Country
- Website
- Fields of study
- Ranking information

## 🔐 Environment Setup Details

### MongoDB Setup

**Option 1: Local MongoDB**
```bash
# Install MongoDB locally
# Start MongoDB service
mongod

# Use in .env
MONGODB_URI=mongodb://localhost:27017/futurepath
```

**Option 2: MongoDB Atlas (Recommended)**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Add to `.env`

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Secret to `.env`

### OpenAI API Setup

1. Create account at [OpenAI Platform](https://platform.openai.com/)
2. Generate API key
3. Add to `.env` as `OPENAI_API_KEY`

## 🎨 Customization

### Adding More Universities

Edit `data/universities.json`:
```json
{
  "name": "University Name",
  "country": "Country",
  "ranking": 21,
  "website": "https://university.edu",
  "fields": ["Field1", "Field2"]
}
```

### Customizing Quiz Questions

Edit `lib/openai.ts` in the `generateQuizQuestions()` function.

### Adding More Badges

Edit `lib/badges.ts` to add new badge definitions.

## 🚨 Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- For Atlas, whitelist your IP address

**OpenAI API Error:**
- Verify API key is correct
- Check you have credits in your OpenAI account
- The app has fallback recommendations if API fails

**Google OAuth Not Working:**
- Verify redirect URI is correct
- Check Client ID and Secret
- Ensure Google+ API is enabled

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🤝 Contributing

This is a complete, production-ready application. Feel free to:
- Add more universities
- Customize the design
- Add new features
- Improve AI prompts
- Add more badge types

## 📄 License

This project is open source and available for educational purposes.

## 🙏 Acknowledgments

- **Next.js** - Amazing React framework
- **OpenAI** - Powerful AI capabilities
- **Tailwind CSS** - Beautiful styling
- **Framer Motion** - Smooth animations
- **MongoDB** - Flexible database

## 📧 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the `.env.example` file
3. Ensure all dependencies are installed
4. Check MongoDB and OpenAI connections

---

**Built with ❤️ for students exploring their future**

*Discover your future. Find your path.* 🚀

#   f u t u r e p a t h  
 