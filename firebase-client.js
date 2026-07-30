// Firebase client initialization for Fremenatos Hospital Management System
// Uses Firestore and Auth in compat mode for existing plain HTML pages.

const firebaseConfig = {
  apiKey: "AIzaSyCnXf0xnW36WaeB6uBuAHcjN3g71rv04hw",
  authDomain: "managment-system-3f0c7.firebaseapp.com",
  projectId: "managment-system-3f0c7",
  storageBucket: "managment-system-3f0c7.firebasestorage.app",
  messagingSenderId: "125259438452",
  appId: "1:125259438452:web:3589e11d62c38d44e07421",
  measurementId: "G-6SX66CYV1C"
};

(function initializeFirebase() {
  if (typeof firebase === 'undefined') {
    console.error('Firebase sdk is not loaded. Add the Firebase compat scripts before firebase-client.js');
    return;
  }

  if (!window.firebaseApp) {
    window.firebaseApp = firebase.initializeApp(firebaseConfig);
    window.firebaseDB = firebase.firestore();
    window.firebaseAuth = firebase.auth();
    window.firebaseFieldValue = firebase.firestore.FieldValue;
    window.firebaseTimestamp = firebase.firestore.Timestamp;
    console.log('Firebase initialized:', window.firebaseApp.name);
  }
})();
