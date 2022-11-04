import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBiHPQ5a_26H3crhQch3bj1FhDnEOKLp-4",
  authDomain: "division5reacttestproject.firebaseapp.com",
  projectId: "division5reacttestproject",
  storageBucket: "division5reacttestproject.appspot.com",
  messagingSenderId: "6723637307",
  appId: "1:6723637307:web:029e7878a2d5f12bf30c1e",
  measurementId: "G-QGSVDYTPJS",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
