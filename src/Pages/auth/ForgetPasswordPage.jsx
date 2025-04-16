import React, { useState } from "react";
import { AuthHeader } from "./AuthHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const ForgetPasswordPage = () =>{
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("Enter your registered email to receive an OTP for resetting your password.");
  const [btnText, setBtnText] = useState("Send OTP");
  const navigate = useNavigate();


  const generateOtp = async(e) =>{
    e.preventDefault();
    try {

      if(!email){
        toast.error("Please enter your email address");
        return;
      }

      setBtnText("Generating...");

      const res = await axios.post(`${import.meta.env.VITE_SERVER_API}/api/v1/auth/generate-otp`, {
        email
      });

      if(res.data.success){
        setBtnText("Verify OTP");
        setStep(2);
        setMsg("Please enter the OTP sent to your registered email to continue.");
      }
    } catch (error) {
      setBtnText("Send OTP");

      if (error.response) {
        const status = error.response.status;
        const msg = error.response.data?.msg || 'Something went wrong';
  
        if (status === 400 || status === 404) {
          toast.error(msg); 
        } else {
          toast.error('Unexpected error. Please try again.');
        }
      } else {
        toast.error('Network error. Please check your connection.');
      }
    }
  }


  const verifyOtp = async(e) =>{
    e.preventDefault();

    try {

      if(!otp){
        toast.error("Please enter the OTP sent to your email");
        return;
      }

      setBtnText("Verifying...");

      const res = await axios.post(`${import.meta.env.VITE_SERVER_API}/api/v1/auth/verify-otp`, {
        otp, email
      });

      if(res.data.success){
        setStep(3);
        setBtnText("Reset Password");
        setMsg("Create a new password");
      }
    } catch (error) {
      setBtnText("Verify OTP");

      if (error.response) {
        const status = error.response.status;
        const msg = error.response.data?.msg || 'Something went wrong';
  
        if (status === 400 || status === 404) {
          toast.error(msg); 
        } else {
          toast.error('Unexpected error. Please try again.');
        }
      } else {
        toast.error('Network error. Please check your connection.');
      }
    }
  }


  const resetPassword = async(e) =>{
    e.preventDefault();

    try {

      const res = await axios.post(`${import.meta.env.VITE_SERVER_API}/api/v1/auth/reset-password`, {
        email, password
      });

      if(res.data.success){
        alert('password reset successfully');
        navigate('/login');
      }
      
    } catch (error) {
      setBtnText("Reset Password");

      if (error.response) {
        const status = error.response.status;
        const msg = error.response.data?.msg || 'Something went wrong';
  
        if (status === 400 || status === 404) {
          toast.error(msg); 
        } else {
          toast.error('Unexpected error. Please try again.');
        }
      } else {
        toast.error('Network error. Please check your connection.');
      }
    }
  }



  return (
    <>
      <AuthHeader/>
        <div className="bg-gray-100 flex items-center justify-center h-screen">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-center text-gray-800 my-4">Reset Password</h2>
            <p className="text-md px-2 text-center text-gray-700">{msg}</p>
            {/* Email verification and OTP generation */}
            {step == 1 &&           
             <form className="p-8">
                 <div className="mb-4">
                   <input type="email"
                   placeholder="Enter your email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   className="w-full px-4 py-2 border rounded-md focus:outline-none"
                   required
                   />
                 </div>

                 <button
                 type="submit"
                 className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600 transition"
                 onClick={generateOtp}
                 >{btnText}</button>
             </form> 
             }

           {/* OTP Verification */}

           {step == 2 &&           
             <form className="p-8">
                 <div className="mb-4">
                   <input type="text"
                   placeholder="Enter the OTP"
                   value={otp}
                   onChange={(e) => setOtp(e.target.value)}
                   className="w-full px-4 py-2 border rounded-md focus:outline-none"
                   required
                   />
                 </div>

                 <button
                 type="submit"
                 className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600 transition"
                 onClick={verifyOtp}
                 >{btnText}</button>
             </form> 
             }


           {/* Password reset */}

          {step == 3 &&           
             <form className="p-8">
                 <div className="mb-4">
                   <input type="password"
                   placeholder="New Password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   className="w-full px-4 py-2 border rounded-md focus:outline-none"
                   required
                   />
                 </div>

                 <button
                 type="submit"
                 className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600 transition"
                 onClick={resetPassword}
                 >{btnText}</button>
             </form> 
             }

          </div>
        </div>
    </>
  )
}
