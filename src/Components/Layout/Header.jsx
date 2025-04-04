import React, { useState } from "react";
import { UseFirebase } from "../../Contexts/firebaseContext";
import { FaRegUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const [visible, setVisible] = useState(false);
  const { userInfo, setUserInfo } = UseFirebase();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();


// For handling the mobile menu

  const handleClick = () => {
      if (visible) setVisible(false);
      else setVisible(true);
  };

  // For handling the profile menu

  const handleMenu = () =>{
    if (isOpen) setIsOpen(false);
    else setIsOpen(true);
  }


  // For handling the Logout

  const handleLogOut = async() =>{
    try {
      await setUserInfo({
        ...userInfo,
        user : null,
        token : null
       })

       localStorage.removeItem("msi");
       setIsOpen(false);
       navigate("/login");

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <a href="/" className="flex text-2xl font-bold content-center">
              <img
                src="/android-chrome-192x192.png"
                alt=""
                className="h-10 w-10"
              />
              <p className="ps-2">MSI Events</p>
            </a>
            <ul className="hidden md:flex space-x-6">
              <li>
                <a href="/" className="text-gray-700 hover:text-blue-600">
                  Home
                </a>
              </li>
              <li>
                <a href="/events" className="text-gray-700 hover:text-blue-600">
                  Events
                </a>
              </li>

              <li>
                {userInfo?.token ? (
                  <>
                    <div className="relative flex flex-col items-center justify-center inline-block cursor-pointer mr-2">
                      {userInfo?.user?.photoURL ? (
                        <img src={userInfo?.user?.photoURL} className="rounded-full w-8 border h-8" alt="user profile pic" onClick={handleMenu}/>
                      ) : (
                        
                         <FaRegUser className="w-5 h-5" onClick={handleMenu}/>
                      )}

                     {isOpen && (
                      <div className="absolute flex flex-col bg-gray-800 text-md border shadow-lg rounded-md text-white text-center top-10 left-1/2 transform -translate-x-1/2 w-22">
                        <NavLink className="px-2 py-1.5 transition duration-200 ease-in-out hover:bg-gray-600 hover:text-white rounded-t-md">
                          Profile
                        </NavLink>
                        <NavLink className="px-2 py-1.5 transition duration-200 ease-in-out hover:bg-gray-600 hover:text-white rounded-b-md" onClick={handleLogOut}>
                          Logout
                        </NavLink>
                      </div>
                     )}

                    </div>
                  </>
                ) : (
                  <a
                    href="/register"
                    className="text-gray-700 hover:text-blue-600"
                  >
                    SignUp
                  </a>
                )}
              </li>
            </ul>

            <button
              id="menu-btn"
              className="md:hidden text-gray-700"
              onClick={handleClick}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
          {visible && (
            <>
              <div id="mobile-menu" className="md:hidden">
                <ul className="flex flex-col space-y-4 py-4 text-center bg-gray-50">
                  <li>
                    <a
                      href="/"
                      className="block text-gray-700 hover:text-blue-600"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="/events"
                      className="block text-gray-700 hover:text-blue-600"
                    >
                      Events
                    </a>
                  </li>
                  <li>
                    <a
                      href="/register"
                      className="block text-gray-700 hover:text-blue-600"
                    >
                      SignUp
                    </a>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
};
