// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCu-j4jpX89hE3zihqb6Ibet22syYFDh1o",
  authDomain: "scriptobot-1.firebaseapp.com",
  projectId: "scriptobot-1",
  storageBucket: "scriptobot-1.firebasestorage.app",
  messagingSenderId: "463059915239",
  appId: "1:463059915239:web:9a5446d23c2c19286b6d42",
  measurementId: "G-X027DDY1PN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Get Firestore instance

export { db };