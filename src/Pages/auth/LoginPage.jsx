import React, { useState } from "react";
import { AuthHeader } from "./AuthHeader";
import { NavLink, Link } from "react-router-dom";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UseFirebase } from "../../Contexts/firebaseContext";

export const LoginPage = () =>{

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {userInfo, setUserInfo, signInGoogle} = UseFirebase();
  const navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault();

    try {
       const res = await axios.post(`${import.meta.env.VITE_SERVER_API}/api/v1/auth/login`, {
        email, password
       });

       if(res.data.success){

          setUserInfo({
            ...userInfo,
            user: res.data.user,
            token: res.data.token,
        });

        localStorage.setItem("msi", JSON.stringify(res.data));

        navigate('/');

       }

    } catch (error) {
      console.log(error);
    }
  }


  const loginwithGoogle = async (e) => {
    e.preventDefault();
    try {

      const snapshot = await signInGoogle();
      const data = snapshot?.user;
      const token = snapshot?._tokenResponse.idToken;

      const userData = {
          name : data.displayName,
          email : data.email,
          photoURL : data.photoURL,
          googleId : data.uid
      }
       
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_API}/api/v1/auth/register-google`,{
          userData,
        }
      );

      if(res.data.success){

        const user = res.data?.isExists || res.data?.user;

        setUserInfo({
          ...userInfo,
          user: user,
          token: token,
        });
  
        localStorage.setItem("msi", JSON.stringify({user, token}));

        navigate("/");
      }



    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <AuthHeader/>
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input 
              type="email" 
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input 
              type="password" 
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
         
          <div className="mb-4">
          <NavLink to="/forget-password" className="text-blue-500">Forget Password ?</NavLink>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
            onClick={handleSubmit}
          >
            Log in
          </button>


           <div className="flex items-center my-4">
               <div className="flex-grow border-t border-gray-300"></div>
               <span className="px-2 text-gray-500">OR</span>
               <div className="flex-grow border-t border-gray-300"></div>
           </div>

           <div className="mb-4">
             <button className="w-full flex items-center justify-center bg-white border border-gray-300 p-2 rounded-lg hover:bg-gray-100 transition" onClick={loginwithGoogle}>
               <img src="/google-logo.png"  alt="Google Logo" className="w-8 h-8 mr-2"/>
                 Sign in with Google
            </button>
           </div>

        </form>
        <p className="text-sm text-gray-600 mt-4 text-center">
          Don't have an account? <Link to="/register" className="text-blue-500">Register</Link>
        </p>
      </div>
    </div>
    </>
  )
}
