import { initializeApp } from "firebase/app";
import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
const provider = new GoogleAuthProvider();

// Firebase Initialization

const firebaseConfig = {
    apiKey: "AIzaSyDKKJNtZDfYv5QQskXNEdzJbL-ZNpdWVvA",
    authDomain: "msi-events-eadd7.firebaseapp.com",
    projectId: "msi-events-eadd7",
    storageBucket: "msi-events-eadd7.firebasestorage.app",
    messagingSenderId: "667414533170",
    appId: "1:667414533170:web:8116e6d18998e12372982b",
    measurementId: "G-ZY890M32YB"
};


export const firebaseApp = initializeApp(firebaseConfig);

// Firebase context

export const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {

  const auth = getAuth();
  const [loading, setLoading] = useState(true);

  const [userInfo, setUserInfo] = useState({
    user: null,
    token: null,
  });


  const signInGoogle = async() =>{
    try {
      return await signInWithPopup(auth, provider)
      
    } catch (error) {
      console.log(error);
    }
  }

  // Default header for all requests made via axios.

  axios.defaults.headers.common['Authorization'] =  userInfo?.token

  useEffect(() => {
    const data = localStorage.getItem("msi");

    if (data) {
      const parseData = JSON.parse(data);

      setUserInfo({
        ...userInfo,
        user: parseData.user,
        token: parseData.token,
      });
    }

    setLoading(false);

  }, []);



  return (
    <FirebaseContext.Provider value={{ userInfo, loading, setUserInfo, signInGoogle}}>
      {!loading && children}
    </FirebaseContext.Provider>
  );
};

// custome hooks

export const UseFirebase = () => useContext(FirebaseContext);