// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-f165b.firebaseapp.com",
  projectId: "mern-auth-f165b",
  storageBucket: "mern-auth-f165b.appspot.com",
  messagingSenderId: "470806459949",
  appId: "1:470806459949:web:e8d4c9b2057ace83b32aa4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
