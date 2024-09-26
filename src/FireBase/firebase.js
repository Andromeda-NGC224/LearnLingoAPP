import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: window.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: window.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: window.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: window.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: window.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: window.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: window.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
