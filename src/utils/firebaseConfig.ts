// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBWNs_c_NNlnU604mcHc5biCtUfE3mMRG4",
  authDomain: "zayn-deals.firebaseapp.com",
  projectId: "zayn-deals",
  storageBucket: "zayn-deals.appspot.com",
  messagingSenderId: "403616065289",
  appId: "1:403616065289:web:8d4e761cbb0001c9ad15d8",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
