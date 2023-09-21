// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7rmqwb475jCdsZP9tDsOjxI0e28rxFs8",
  authDomain: "cvrhackthon.firebaseapp.com",
  projectId: "cvrhackthon",
  storageBucket: "cvrhackthon.appspot.com",
  messagingSenderId: "916731582267",
  appId: "1:916731582267:web:f6d51de01dccf38dac891e",
  measurementId: "G-GJCBYV3LQF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);