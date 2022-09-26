import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAl6tPVtANDO5Sbv8Mh_ovFRWf74Yqx5k0",
  authDomain: "foody-69f0a.firebaseapp.com",
  projectId: "foody-69f0a",
  storageBucket: "foody-69f0a.appspot.com",
  messagingSenderId: "84113810633",
  appId: "1:84113810633:web:0b98bbd130cb409e1c9918",
  measurementId: "G-P4DG42JTNW",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage=getStorage(app)
