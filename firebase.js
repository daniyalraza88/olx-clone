// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6jJWO-3SJNQVN9TKbqX6wka8Q-YGOIcA",
  authDomain: "olx-clone-final.firebaseapp.com",
  projectId: "olx-clone-final",
  storageBucket: "olx-clone-final.appspot.com",
  messagingSenderId: "460931745027",
  appId: "1:460931745027:web:41e7e8adba2a8066679536",
  measurementId: "G-JE3RZH9R8J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)
export {auth,db, storage}



// search functionality (Done)
// multiple images dynamic (Done)
// my ads
// ui/responsiveness
// routes