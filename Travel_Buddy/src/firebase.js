// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "travel-buddy-887a3.firebaseapp.com",
  projectId: "travel-buddy-887a3",
  storageBucket: "travel-buddy-887a3.appspot.com",
  messagingSenderId: "937880216455",
  appId: "1:937880216455:web:1c3219c6a9fb4b6d8ae922"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);