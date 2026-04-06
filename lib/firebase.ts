import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD43SV67K0L06PIXQ_Lc7xC2tmbCNTkr74",
  authDomain: "skillbridge-ai-57bdd.firebaseapp.com",
  projectId: "skillbridge-ai-57bdd",
  storageBucket: "skillbridge-ai-57bdd.firebasestorage.app",
  messagingSenderId: "894812779038",
  appId: "1:894812779038:web:b23e2556ec4756e94df40f",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);