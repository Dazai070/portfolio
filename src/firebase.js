import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase config (paste yours here)
const firebaseConfig = {
    apiKey: "AIzaSyCa3rMM_I8G1grrbNnQCHhBI7_mdNWt8-s",
    authDomain: "rishi-portfolio-54c1e.firebaseapp.com",
    projectId: "rishi-portfolio-54c1e",
    storageBucket: "rishi-portfolio-54c1e.firebasestorage.app",
    messagingSenderId: "864325406956",
    appId: "1:864325406956:web:23d402a6f68c03fad415c9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Connect Firestore database
export const db = getFirestore(app);