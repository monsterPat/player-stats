// Import the functions you need from the SDKs you need
//import * as admin from 'firebase-admin';
import { initializeApp } from "firebase/app";
import {initializeFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries




const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = initializeFirestore(app, {
    experimentalForceLongPolling: true
});
//setLogLevel("debug");
export {auth, db};

//q
//const admin = require('firebase-admin');

// Initialize the Firebase Admin SDK
/*admin.initializeApp();

const uid = '0yRqkQwEEJhGgB9VC7wWTGDcgi02'; // Replace with the user's UID

// Set the "admin" custom claim to true
admin.auth().setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log('Admin claim set successfully!');
  })
  .catch((error) => {
    console.error('Error setting admin claim:', error);
  });
  */
