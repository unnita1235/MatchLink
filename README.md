# MatchLink - Profile Discovery UI

> A modern profile browsing interface prototype for a matchmaking platform, built with Next.js 15 and TypeScript.

**Status**: 🎨 Frontend Prototype  
**Live Demo**: https://match-link-tau.vercel.app

---

## 📸 What This Is

MatchLink is a **frontend UI prototype** that demonstrates a Tinder-like profile browsing experience. It showcases modern web design patterns, responsive layouts, and clean React component architecture.

**Important**: This is currently a frontend-only demo with hardcoded profile data. No actual matching algorithm, database, or user authentication exists yet.

---

## ✨ Current Features

### What Works Now
- ✅ **Profile Discovery Page** - Browse 10+ demo profiles
- ✅ **Profile Detail View** - Detailed profile pages with routing
- ✅ **Responsive Cards** - Profile cards that work on all devices
- ✅ **Filter UI** - Filter interface (visual only, no backend)
- ✅ **Package Display** - Subscription tier cards
- ✅ **Modern UI/UX** - Clean, professional design

### What's Not Implemented
- ❌ No user authentication
- ❌ No database (profiles are hardcoded arrays)
- ❌ No AI matching algorithm
- ❌ No messaging system
- ❌ No payment processing
- ❌ No data persistence

---

## 🛠️ Tech Stack

**Frontend**:
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- React components
- Dynamic routing

**Deployment**:
- Vercel

**Planned (Not Yet Implemented)**:
- Firebase Authentication
- Firestore Database
- AI matching logic
- Payment integration

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

# Start development server
npm run dev

# Open http://localhost:3000
```

---

## 📁 Project Structure

```
MatchLink/
├── src/
│   ├── app/
│   │   ├── page.tsx           # Discovery page (home)
│   │   ├── profile/[id]/      # Dynamic profile pages
│   │   ├── match/             # AI Matcher page (UI only)
│   │   ├── packages/          # Subscription packages
│   │   └── settings/          # Settings page
│   ├── components/
│   │   ├── ui/               # Reusable UI components
│   │   ├── ProfileCard.tsx   # Profile card component
│   │   └── FilterPanel.tsx   # Filter sidebar
│   └── lib/
│       ├── data.ts           # Hardcoded profile data
│       └── types.ts          # TypeScript types
└── package.json
```

---

## 🎯 What This Project Demonstrates

### Frontend Skills
- Next.js App Router with dynamic routes
- TypeScript for type safety
- Responsive design (mobile-first)
- Component composition
- Clean code organization
- Modern UI patterns

### What's Missing
- No backend server
- No real user accounts
- No actual matching algorithm
- No data storage
- Demo data only

---

## 📊 Demo Data

The app includes 10 hardcoded profiles with:
- Names and ages
- Locations
- Profile photos (from Picsum)
- Bio text
- Interests (placeholder)

**Note**: All data is static and resets on page refresh.

---

## 🔧 Available Scripts

```bash
npm run dev        # Development server
npm run build      # Production build
npm run start      # Production server
npm run lint       # ESLint check
```

---

## 📝 Current Limitations

This is a **UI/UX demonstration project**:

1. **Static Data**: All profiles are hardcoded in `/src/lib/data.ts`
2. **No Backend**: No API, database, or server
3. **No Authentication**: Login/signup are placeholder pages
4. **No Matching**: The "AI Matcher" page is visual only
5. **No Messaging**: No chat or communication features
6. **Demo Only**: Not suitable for production use

---

## 🗺️ Development Roadmap

### Phase 1 (Current) - UI ✅
- [x] Profile browsing interface
- [x] Detail pages with routing
- [x] Responsive design
- [x] Filter UI mockup

### Phase 2 (Planned) - Backend
- [ ] Firebase Authentication setup
- [ ] Firestore database integration
- [ ] User profile CRUD operations
- [ ] Profile photo uploads
- [ ] Real filter functionality

### Phase 3 (Future) - Features
- [ ] Basic matching algorithm
- [ ] Messaging system
- [ ] Notification system
- [ ] Payment integration
- [ ] Advanced AI matching

---

## 🎨 Design Highlights

- **Color Scheme**: Modern gradient backgrounds
- **Typography**: Clean, readable fonts
- **Layout**: Card-based grid system
- **Images**: Picsum Photos placeholders
- **Responsive**: Mobile, tablet, desktop optimized

---

## 📄 License

MIT License - Portfolio/Learning Project

---

## 👤 Author

**Unni T A**  
Frontend Developer

- GitHub: [@unnita1235](https://github.com/unnita1235)
- Email: unnita1235@gmail.com

---

## 🙏 Acknowledgments

- Next.js for the excellent framework
- Tailwind CSS for styling
- Picsum Photos for placeholder images
- Vercel for hosting

---

## 💡 Learning Focus

This project demonstrates my frontend development skills including:
- React/Next.js proficiency
- TypeScript usage
- Responsive design
- Component architecture
- Modern UI/UX patterns

Currently learning backend development to add real functionality!

---

**Status**: UI Prototype - Backend development in progress

*Last updated: January 2026*
