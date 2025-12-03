# 🤝 MatchLink

[![Status](https://img.shields.io/badge/status-in_development-orange)]()
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

> **AI-Powered Professional Networking & Matching Platform**

Intelligent networking platform that uses AI algorithms to match professionals based on skills, interests, and career goals. Think LinkedIn meets Tinder with smart recommendations.

---

## 🎯 The Problem

Traditional networking is:
- 🎲 **Random**: No intelligent matchmaking
- ⏰ **Time-consuming**: Manual searching through profiles
- 🤷 **Low-quality connections**: Irrelevant connection requests
- 📊 **No insights**: Can't see compatibility before connecting

**MatchLink** uses AI to connect you with the right professionals at the right time.

---

## ✨ Key Features

### Smart Matching
- 🧠 **AI-Powered Recommendations**: Machine learning algorithm matches compatible professionals
- 🎯 **Skill-based Matching**: Connect with complementary or similar skill sets
- 💼 **Goal Alignment**: Find mentors, collaborators, or co-founders based on objectives
- 🌍 **Location & Timezone**: Smart filtering for remote work compatibility

### Profile & Discovery
- 📝 **Rich Profiles**: Skills, experience, interests, availability
- 🔍 **Advanced Search**: Filter by role, industry, tech stack, location
- 💬 **Icebreaker Prompts**: AI-generated conversation starters
- ⭐ **Compatibility Score**: See match percentage before connecting

### Networking Features
- 💌 **Swipe Interface**: Tinder-like UX for quick decisions
- 💬 **Real-time Chat**: Instant messaging with matched connections
- 📅 **Virtual Coffee**: Schedule 15-min intro calls
- 🤝 **Mutual Interests**: Discover shared skills and goals
- 📊 **Networking Analytics**: Track connections, response rates

### Community
- 🎓 **Skill Circles**: Join groups based on expertise
- 📚 **Knowledge Sharing**: Post articles, resources
- 🎤 **Events**: Virtual meetups and webinars
- 🏆 **Leaderboards**: Active community members

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Framer Motion (animations)
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Real-time**: Socket.io client

### Backend (Planned)
- **API**: Next.js API Routes
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Auth**: NextAuth.js (Google, LinkedIn OAuth)
- **Real-time**: Socket.io server
- **File Storage**: Cloudinary (profile pictures)
- **Search**: Algolia / Meilisearch (fast profile search)

### AI/ML (Planned)
- **Matching Algorithm**: Python microservice
- **Tech Stack**: FastAPI + scikit-learn
- **Features**: 
  - Cosine similarity for skill matching
  - Collaborative filtering for recommendations
  - NLP for bio analysis
- **Model**: Custom trained on professional profiles

### DevOps
- **Hosting**: Vercel (Frontend), Railway (Backend + ML)
- **CI/CD**: GitHub Actions
- **Monitoring**: Posthog (analytics)

---

## 📐 System Architecture
```
┌─────────────────────────────────────────────┐
│         Next.js Frontend                     │
│  (Profiles, Matching, Chat, Discovery)       │
└──────────────────┬──────────────────────────┘
                   │
       ┌───────────┼───────────┐
       │           │           │
  ┌────▼────┐ ┌───▼────┐ ┌───▼────┐
  │  Auth   │ │  API   │ │ Socket │
  │ Service │ │ Routes │ │  .io   │
  └────┬────┘ └───┬────┘ └───┬────┘
       │          │          │
       └──────────┴──────────┘
                  │
      ┌───────────┴───────────┐
      │                       │
 ┌────▼─────┐          ┌─────▼──────┐
 │PostgreSQL│          │  ML Service│
 │(Profiles)│          │  (Python)  │
 └──────────┘          │  FastAPI   │
                       └────────────┘
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone repository
git clone https://github.com/unnita1235/MatchLink.git
cd MatchLink

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure
```
MatchLink/
├── src/
│   ├── app/
│   │   ├── (auth)/              # Login, signup
│   │   ├── discover/            # Swipe interface
│   │   ├── matches/             # Your connections
│   │   ├── profile/             # User profile
│   │   ├── chat/                # Messaging
│   │   └── api/                 # API routes
│   ├── components/
│   │   ├── matching/            # Swipe cards
│   │   ├── profile/             # Profile display
│   │   ├── chat/                # Chat UI
│   │   └── ui/                  # shadcn components
│   ├── lib/
│   │   ├── matching/            # Matching algorithm
│   │   ├── socket/              # Socket.io client
│   │   └── utils/               # Helper functions
│   ├── store/                   # Zustand stores
│   └── types/                   # TypeScript types
└── ml-service/                  # Python ML service (planned)
    ├── models/                  # Trained models
    ├── algorithm.py             # Matching logic
    └── api.py                   # FastAPI endpoints
```

---

## 🎨 Current Implementation Status

| Feature | Status | Notes |
|---------|--------|-------|
| Landing Page | ✅ Done | Hero, features, CTA |
| Profile Creation | ✅ Done | Skills, bio, interests |
| Discover UI | ✅ Done | Swipe interface |
| Match Algorithm | 📅 Planned | AI integration |
| Real-time Chat | 📅 Planned | Socket.io |
| Authentication | 📅 Planned | OAuth |
| Notifications | 📅 Planned | Email + push |

---

## 🔐 Environment Variables
```bash
# Database
DATABASE_URL="postgresql://..."

# Authentication
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
LINKEDIN_CLIENT_ID="..."
LINKEDIN_CLIENT_SECRET="..."

# ML Service
ML_SERVICE_URL="http://localhost:8000"

# File Upload
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."

# Real-time
SOCKET_SERVER_URL="http://localhost:3001"

# Search
ALGOLIA_APP_ID="..."
ALGOLIA_API_KEY="..."
```

---

## 🧪 Matching Algorithm (Planned)

### How It Works
```python
# Matching score calculation
def calculate_match_score(user_a, user_b):
    # 1. Skill Similarity (40%)
    skill_score = cosine_similarity(user_a.skills, user_b.skills)
    
    # 2. Interest Overlap (30%)
    interest_score = jaccard_similarity(user_a.interests, user_b.interests)
    
    # 3. Career Goal Alignment (20%)
    goal_score = compare_goals(user_a.goals, user_b.goals)
    
    # 4. Availability Match (10%)
    availability_score = timezone_compatibility(user_a.timezone, user_b.timezone)
    
    # Weighted average
    total_score = (
        skill_score * 0.4 +
        interest_score * 0.3 +
        goal_score * 0.2 +
        availability_score * 0.1
    )
    
    return total_score * 100  # Convert to percentage
```

### Recommendation Types

1. **Complementary Skills**: Frontend dev ↔ Backend dev
2. **Similar Experience**: Both senior engineers looking for co-founders
3. **Mentor/Mentee**: Experienced dev ↔ Junior dev learning same stack
4. **Collaboration**: Designers + Developers for side projects

---

## 📊 Database Schema (Planned)
```sql
-- Core Tables
users (id, name, email, role, bio, location, timezone)
skills (id, user_id, skill_name, proficiency_level)
interests (id, user_id, interest_name)
goals (id, user_id, goal_type, description)

-- Matching
swipes (id, user_id, target_user_id, action, timestamp) -- action: like/pass
matches (id, user_a_id, user_b_id, match_score, created_at)

-- Messaging
conversations (id, match_id, created_at)
messages (id, conversation_id, sender_id, content, timestamp, read)

-- Analytics
match_analytics (id, user_id, total_swipes, total_matches, avg_match_score)
```

---

## 🎯 Roadmap

### Phase 1 (Current - Month 1-2)
- [x] Landing page
- [x] Profile creation UI
- [x] Swipe interface
- [ ] Authentication
- [ ] Database setup

### Phase 2 (Month 3-4)
- [ ] Basic matching algorithm
- [ ] Match notifications
- [ ] Profile search
- [ ] User settings

### Phase 3 (Month 5-6)
- [ ] Real-time chat
- [ ] Video call integration
- [ ] AI-powered recommendations
- [ ] Event scheduling

### Phase 4 (Month 7+)
- [ ] Community features
- [ ] Skill circles
- [ ] Analytics dashboard
- [ ] Mobile app

---

## 🏆 Technical Highlights

1. **Swipe Animation**: Smooth Framer Motion gestures
2. **Real-time Updates**: Instant match notifications via WebSocket
3. **Intelligent Caching**: Redis for fast profile lookups
4. **Scalable Architecture**: Microservices ready
5. **Privacy First**: Users control visibility

---

## 📚 Key Learnings & Challenges

### Challenge 1: Cold Start Problem
**Problem**: New users have no match data
**Solution**: Use skill/interest similarity + manual preferences

### Challenge 2: Match Quality
**Problem**: Algorithm matching irrelevant people
**Solution**: Weighted scoring + user feedback loop to improve

### Challenge 3: Real-time Performance
**Problem**: Chat lag with many concurrent users
**Solution**: Socket.io rooms + Redis pub/sub

---

## 🎨 Design Inspiration

- Tinder (swipe UX)
- LinkedIn (professional context)
- Bumble Bizz (networking focus)
- Coffee Meets Bagel (curated matches)

---

## 🤝 Contributing

Open to feedback and collaboration ideas!

---

## 📄 License

MIT License

---

## 👤 Author

**Unni T A**
- GitHub: [@unnita1235](https://github.com/unnita1235)
- Email: unnita1235@gmail.com

---

## 🙏 Acknowledgments

- Framer Motion for animations
- Socket.io for real-time features
- scikit-learn for ML algorithms

---

**Note**: Active development. AI matching algorithm in design phase.
