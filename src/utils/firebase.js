// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import Firebase Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCizByxu1ROlV6akr--na2JxdtQL4AM1qA",
  authDomain: "realtime-audio-31ee0.firebaseapp.com",
  projectId: "realtime-audio-31ee0",
  storageBucket: "realtime-audio-31ee0.appspot.com",
  messagingSenderId: "196816930108",
  appId: "1:196816930108:web:88f1356ff0ee6ac21a0a39",
  measurementId: "G-QC1KRJ8B41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services and get references to them
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // Export Firebase Storage reference
