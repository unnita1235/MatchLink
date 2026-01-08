# MatchLink â¤ï¸ AI-Powered Professional Matchmaking

![MatchLink Dashboard](screenshots/dashboard.png)

**MatchLink** is a modern, AI-driven matchmaking platform designed to connect professionals for meaningful relationships. By leveraging **Google Gemini AI** and **Firebase GenKit**, MatchLink goes beyond simple swipes to analyze compatibility based on shared interests, values, and life goals.

---

## ðŸš€ Key Features

### ðŸ¤– AI Smart Matching
- **Deep Compatibility Analysis**: Uses **Gemini 1.5 Flash** to analyze user profiles and suggest matches with a detailed "Why it's a match" reasoning.
- **Intelligent Scoring**: Provides a compatibility score (0-100%) for every potential connection.

### ðŸ”’ Secure & Verified (Demo Mode Active)
- **Authentication**: Built with **Firebase Authentication** for secure sign-ups and logins.
- **Demo Mode**: Includes a robust **Offline Mode** that allows you to explore the dashboard, discover profiles, and test the AI matching flow without needing active Firebase API keys.

### ðŸ’¬ Engagement Tools
- **Rich Messaging UI**: A beautiful, real-time ready chat interface for connecting with matches.
- **Discovery Flow**: Tinder-style "Swipe, Like, Pass" interface with smooth animations.
- **Premium Packages**: UI implementation for subscription tiers (Gold, Platinum).

---

## ðŸ› ï¸ Tech Stack

**Frontend**
- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Forms**: React Hook Form + Zod

**Backend & AI**
- **Auth & Database**: [Firebase](https://firebase.google.com/) (Auth, Firestore)
- **AI Integration**: [Firebase GenKit](https://firebase.google.com/docs/genkit)
- **Model**: Google Gemini 1.5 Flash

---

## ðŸ’» Getting Started

### Prerequisites
- Node.js 18+ installed
- A Firebase project (optional for Demo Mode)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/unnita1235/MatchLink.git
    cd MatchLink
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the application**
    ```bash
    npm run dev
    ```

4.  **Open in Browser**
    Visit `http://localhost:9002` to see the app in action.

### Configuration (Optional)
To enable full backend functionality (Live Auth, Real AI), create a `.env.local` file:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
GOOGLE_GENAI_API_KEY=your_gemini_key
```

> **Note**: If these keys are missing, the app automatically switches to **Demo Mode**, using mock data and simulated AI responses.

---

## ðŸ“¸ Screenshots

| Discovery | AI Matching |
|:---:|:---:|
| <img src="screenshots/dashboard.png" width="400" alt="Discovery Page" /> | <img src="screenshots/ai-matching.png" width="400" alt="AI Matching Page" /> |

| Packages | Messages |
|:---:|:---:|
| <img src="screenshots/packages.png" width="400" alt="Packages Page" /> | *High-fidelity mock messaging interface* |

---

## ðŸ“£ Project Status

| Feature | Status | details |
| :--- | :--- | :--- |
| **UI/UX Design** | âœ… Complete | Premium, responsive design implemented. |
| **AI Matching** | âœ… Functional | Server Actions connected to Gemini (Mock fallback active). |
| **Demo Mode** | âœ… Active | Full app navigability without backend dependency. |
| **Real-time Chat** | ðŸš§ Prototype | UI fully built; backend pending Firestore integration. |
| **Payments** | ðŸš§ Prototype | UI for packages built; Stripe integration pending. |

---

## ðŸ¤ Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

Built with â¤ï¸ by [Unni T A](https://github.com/unnita1235)
