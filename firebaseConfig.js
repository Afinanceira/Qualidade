// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtxvlcx4BPrTO-jBgxJFC6qsRq07zhKXg",
  authDomain: "escala-nova-d596e.firebaseapp.com",
  databaseURL: "https://escala-nova-d596e-default-rtdb.firebaseio.com",
  projectId: "escala-nova-d596e",
  storageBucket: "escala-nova-d596e.firebasestorage.app",
  messagingSenderId: "612241634323",
  appId: "1:612241634323:web:729a8ac37184eb92b47be6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);