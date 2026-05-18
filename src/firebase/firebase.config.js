import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyD5q13_v0R5cVzPJs1yg_vkPyuBuzFtAhU",
  authDomain: "mediqueue-92728.firebaseapp.com",
  projectId: "mediqueue-92728",
  storageBucket: "mediqueue-92728.firebasestorage.app",
  messagingSenderId: "660685536878",
  appId: "1:660685536878:web:af7c6d7aedad0be66ab07f"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);