# 💕 MatchLink - AI-Powered Matchmaking Platform

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://match-link-tau.vercel.app/)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org)

> An intelligent matchmaking platform with AI-powered compatibility matching, profile management, and subscription packages.

## 🌐 Live Demo

**URL**: [match-link-tau.vercel.app](https://match-link-tau.vercel.app/)

---

## 📸 Features

### Profile Discovery
- Browse user profiles with photos and details
- Filter by age, location, interests
- View detailed profile information

### AI Matcher
- Intelligent compatibility scoring
- Preference-based recommendations
- Match suggestions based on interests

### Subscription Packages
- Multiple tier offerings
- Premium features for subscribers
- Secure payment integration (planned)

### Admin Panel
- User management dashboard
- Profile moderation tools
- Analytics and insights

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| State Management | React Context |
| Deployment | Vercel |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/unnita1235/MatchLink.git
cd MatchLink

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your Firebase credentials

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure
MatchLink/
├── src/
│   ├── app/
│   │   ├── page.tsx           # Home/Discover page
│   │   ├── match/             # AI Matcher
│   │   ├── packages/          # Subscription plans
│   │   ├── profile/[id]/      # Profile details
│   │   └── settings/          # User settings
│   ├── components/
│   │   ├── ProfileCard.tsx
│   │   ├── MatchScore.tsx
│   │   └── ui/
│   └── lib/
│       ├── api.ts
│       └── types.ts
└── package.json

---

## ✨ Key Features Explained

### Profile Discovery
Users can browse through profiles displayed as cards with:
- Profile photo
- Name and age
- Location
- Quick bio preview

### AI Matching Algorithm
The matching system considers:
- Age preferences
- Location proximity
- Shared interests
- Compatibility scores

### Admin Dashboard
Administrators can:
- View all registered profiles
- Moderate content
- Access platform analytics

---

## 🎯 Roadmap

| Feature | Status |
|---------|--------|
| Profile browsing | ✅ Complete |
| Profile details | ✅ Complete |
| AI matcher page | ✅ Complete |
| Subscription packages | ✅ Complete |
| User authentication | 🚧 In Progress |
| Real-time messaging | 📅 Planned |
| Video calls | 📅 Planned |
| Mobile app | 📅 Planned |

---

## 🤝 Contributing

Contributions are welcome! Please read the contributing guidelines first.

---

## 📄 License

MIT License - see LICENSE file for details.

---

## 👤 Author

**Unni T A**
- GitHub: [@unnita1235](https://github.com/unnita1235)
- Email: unnita1235@gmail.com
