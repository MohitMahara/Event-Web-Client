import React from "react";
import { NavLink } from "react-router-dom";

export const AuthHeader = () => {
  return (
    <>
      <div className="bg-gray-100">
        <div className="container mx-auto pt-3">
          <NavLink to={"/"}>
            <img
              src="android-chrome-192x192.png"
              alt="MSI logo"
              className="h-12 w-12"
            />
          </NavLink>
        </div>
      </div>
    </>
  );
};
