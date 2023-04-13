// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaA2S8r2t77UU6_dOMVLbfJmc3xuPHbxQ",
  authDomain: "foodio-8f38e.firebaseapp.com",
  projectId: "foodio-8f38e",
  storageBucket: "foodio-8f38e.appspot.com",
  messagingSenderId: "189207721643",
  appId: "1:189207721643:web:2eb0b754961a94eb8c29ee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseauth = getAuth(app);
export const firebasedb = getFirestore(app)