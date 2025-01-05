import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDxGj7nWTkJnUS9DQViSeEWkSUUIBYEhNQ",
  authDomain: "ai-trip-generator-53410.firebaseapp.com",
  projectId: "ai-trip-generator-53410",
  storageBucket: "ai-trip-generator-53410.firebasestorage.app",
  messagingSenderId: "461415962246",
  appId: "1:461415962246:web:8243d761e70a16b8ab6307",
  measurementId: "G-LTBRT7GP6P"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
