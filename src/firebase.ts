// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD13feVfnHk7Y-emIhld-wUtdNyNoE8cLU",
  authDomain: "print-gallary.firebaseapp.com",
  databaseURL: "https://print-gallary-default-rtdb.firebaseio.com",
  projectId: "print-gallary",
  storageBucket: "print-gallary.firebasestorage.app",
  messagingSenderId: "14309648420",
  appId: "1:14309648420:web:7fb43539270fcf9a6450b1",
  measurementId: "G-C76X5F7FQG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };
