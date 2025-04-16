import React, {useState} from "react";
import { AuthHeader } from "./AuthHeader";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const RegisterPage = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();


  const handleSubmit = async () =>{
    try {
       const res = await axios.post(`${import.meta.env.VITE_SERVER_API}/api/v1/auth/register`, {
        name, email, password, role
       });

       if(res.data.success){
          alert('user registered successfully');
          navigate('/login');
       }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <AuthHeader/>
      <div className="bg-gray-100 flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Register
          </h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
             <label className="block text-gray-700">Role</label>
             <select value={role} onChange = {(e) => setRole(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
               <option value="user">User</option>
               <option value="admin">Organizer</option>
             </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
              onClick={handleSubmit}
            >
              Register
            </button>
          </form>
          <p className="text-sm text-gray-600 mt-4 text-center">
            Already have an account?
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
