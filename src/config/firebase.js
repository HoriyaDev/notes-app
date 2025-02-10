// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDfQP7KpSi_070MelQ6EBeVCd2f98i9e9g",
  authDomain: "notes-app-7e8ca.firebaseapp.com",
  projectId: "notes-app-7e8ca",
  storageBucket: "notes-app-7e8ca.firebasestorage.app",
  messagingSenderId: "250814097471",
  appId: "1:250814097471:web:ff7b36e4dd39dee548708a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
 export const db = getFirestore(app);