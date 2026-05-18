"use client";
import { createContext, useEffect, useState } from "react";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  GoogleAuthProvider, 
  signInWithPopup,
  updateProfile
} from "firebase/auth";
// 🎯 এখানে app এর বদলে সরাসরি auth ইম্পোর্ট করা হয়েছে যা Turbopack সাজেস্ট করেছে
import { auth } from "@/firebase/firebase.config"; 

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. নতুন ইউজার রেজিস্টার করার ফাংশন
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // 2. ইমেইল-পাসওয়ার্ড দিয়ে লগইন করার ফাংশন
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 3. গুগল দিয়ে সোশ্যাল লগইন করার ফাংশন
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // 4. ইউজারের নাম ও প্রোফাইল ছবি আপডেট করার ফাংশন
  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL
    });
  };

  // 5. লগআউট ফাংশন
  const logOut = () => {
    setLoading(true);
    localStorage.removeItem("mediqueue-access-token");
    return signOut(auth);
  };

  // 🔑 ইউজারের লাইভ স্টেট ট্র্যাকিং এবং অটোমেটিক JWT টোকেন ম্যানেজমেন্ট
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      
      if (currentUser?.email) {
        fetch("http://localhost:5000/jwt", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ email: currentUser.email })
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.token) {
              localStorage.setItem("mediqueue-access-token", data.token);
              setLoading(false);
            }
          })
          .catch(() => setLoading(false));
      } else {
        localStorage.removeItem("mediqueue-access-token");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    signInWithGoogle,
    updateUserProfile,
    logOut
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
}