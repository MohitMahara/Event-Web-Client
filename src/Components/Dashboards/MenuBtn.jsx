import React from "react";
import { UseFirebase } from "../../Contexts/firebaseContext";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export const MenuBtn = () => {
  const { userInfo } = UseFirebase();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (open) setOpen(false);
    else setOpen(true);
  }

  return (
    <>
      <button className="md:hidden mb-4 ml-2 text-xl" onClick={handleClick}>
        &#9776; Menu
      </button>

      <div className={`md:hidden fixed left-0 w-64 bg-white p-4 shadow-lg z-20 ${open ? "block" : "hidden"}`}>
        <div className="profile-header flex flex-col items-center justify-center mb-4">
          {userInfo?.user?.photoURL ? (
            <>
              <img
                src={userInfo?.user?.photoURL}
                className="rounded-full w-16  h-16"
                alt="user profile pic"
              />

              <h3 className="pt-1 text-lg font-bold">{userInfo?.user.name}</h3>
            </>
          ) : (
            <>
              <div className="w-24 h-24 bg-gray-500 rounded-full flex items-center justify-center text-white text-xl mb-4">
                <p className="text-3xl">{userInfo?.user?.name?.charAt(0)}</p>
              </div>
              <h3 className="pt-1 text-lg font-bold">{userInfo?.user?.name}</h3>
            </>
          )}
        </div>
        <hr className="text-gray-400 mb-4"></hr>

        <div className="flex flex-col items-center justify-center profile-info mb-4">
          <NavLink
            to="/user-dashboard"
            className="mb-3 bg-gray-300 p-2 w-full text-center rounded-sm text-md hover:bg-gray-500 cursor-pointer hover:text-white transition duration-200"
          >
            Profile
          </NavLink>

          <NavLink
            to="/attended-events"
            className="mb-3 bg-gray-300 p-2 w-full text-center rounded-sm text-md hover:bg-gray-500 cursor-pointer hover:text-white transition duration-200"
          >
            Attended Events
          </NavLink>

          <NavLink
            to="/organized-events"
            className="mb-3 bg-gray-300 p-2 w-full text-center rounded-sm text-md hover:bg-gray-500 cursor-pointer hover:text-white transition duration-200"
          >
            Organized Events
          </NavLink>
        </div>
      </div>


      {open && (
            <div onClick={() => setOpen(false)} className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"></div>
         )}
    </>
  );
};
