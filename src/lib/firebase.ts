// Firebase should only be imported and used in browser environments
// On the server/build-time, we export empty stubs

let app: any = undefined;
let auth: any = undefined;
let db: any = undefined;

// Only initialize Firebase in browser environment and when API key is available
if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
  try {
    const { initializeApp, getApps, getApp } = require('firebase/app');
    const { getAuth } = require('firebase/auth');
    const { getFirestore } = require('firebase/firestore');

    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };

    app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (error) {
    console.error('Firebase initialization failed:', error);
  }
} else if (typeof window !== 'undefined') {
    console.warn('Firebase API key missing. Firebase services will not be available.');
}

export { app, auth, db };
