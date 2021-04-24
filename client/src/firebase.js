import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyADhw75NVFw1L9x7pS4uY_lvsTWL5DEr8Q",
  authDomain: "chatapp-5756e.firebaseapp.com",
  projectId: "chatapp-5756e",
  storageBucket: "chatapp-5756e.appspot.com",
  messagingSenderId: "1085163238871",
  appId: "1:1085163238871:web:aab05036f3c9b03a8c8792",
  measurementId: "G-FLSRH51HFX",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
