import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyB5mR5gRbbdwmae5SV6mNUATaqi-_0uvK0",
  authDomain: "reactgf-960c4.firebaseapp.com",
  projectId: "reactgf-960c4",
  storageBucket: "reactgf-960c4.appspot.com",
  messagingSenderId: "898567524684",
  appId: "1:898567524684:web:c7f38b4e0005acf3087fe9",
  measurementId: "G-DT2746P505"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);

export { db };