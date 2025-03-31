import React, { useState } from "react";

export const Header = () => {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    try {
       if(visible) setVisible(false);
       else setVisible(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <a href="/" className="flex text-2xl font-bold content-center">
              <img src="/android-chrome-192x192.png" alt="" className="h-10 w-10" />
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
                <a href="/register" className="text-gray-700 hover:text-blue-600">
                  SignUp
                </a>
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
