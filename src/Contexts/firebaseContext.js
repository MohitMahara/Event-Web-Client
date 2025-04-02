// import { initializeApp } from "firebase/app";
// import { useState, createContext, useContext, useEffect } from "react";
// import axios from "axios";
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// const provider = new GoogleAuthProvider();

// // Firebase Initialization

// const firebaseConfig = {
//   apiKey: "AIzaSyA_qbotMTb_YXwQKUKoJgjH6CIy4z2js74",
//   authDomain: "reliefnow-f2ef4.firebaseapp.com",
//   projectId: "reliefnow-f2ef4",
//   storageBucket: "reliefnow-f2ef4.firebasestorage.app",
//   messagingSenderId: "970189524969",
//   appId: "1:970189524969:web:3c563b488a4fd1a4a7c578",
//   measurementId: "G-0N2K83KTJ2"
// };


// export const firebaseApp = initializeApp(firebaseConfig);

// // Firebase context

// export const FirebaseContext = createContext();

// export const FirebaseProvider = ({ children }) => {

//   const auth = getAuth();

//   const [userInfo, setUserInfo] = useState({
//     user: null,
//     token: null,
//   });


//   const signInGoogle = async() =>{
//     try {
//       return await signInWithPopup(auth, provider)
      
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   // Default header for all requests made via axios.

//   axios.defaults.headers.common['Authorization'] =  userInfo?.token

//   useEffect(() => {
//     const data = localStorage.getItem("reliefNow");

//     if (data) {
//       const parseData = JSON.parse(data);

//       setUserInfo({
//         ...userInfo,
//         user: parseData.user,
//         token: parseData.token,
//       });
//     }
//   }, []);



//   return (
//     <FirebaseContext.Provider value={{ userInfo, setUserInfo, signInGoogle}}>
//       {children}
//     </FirebaseContext.Provider>
//   );
// };

// // custome hooks

// export const UseFirebase = () => useContext(FirebaseContext);