import React from "react";
import { AuthHeader } from "./authHeader";

export const LoginPage = () =>{
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
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input 
              type="password" 
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
          >
            Register
          </button>


           <div className="flex items-center my-4">
               <div className="flex-grow border-t border-gray-300"></div>
               <span className="px-2 text-gray-500">OR</span>
               <div className="flex-grow border-t border-gray-300"></div>
           </div>

           <div className="mb-4">
             <button className="w-full flex items-center justify-center bg-white border border-gray-300 p-2 rounded-lg hover:bg-gray-100 transition">
               <img src="/google-logo.png"  alt="Google Logo" className="w-8 h-8 mr-2"/>
                 Sign in with Google
            </button>
           </div>

        </form>
        <p className="text-sm text-gray-600 mt-4 text-center">
          Don't have an account? <a href="/register" className="text-blue-500">Register</a>
        </p>
      </div>
    </div>
    </>
  )
}
