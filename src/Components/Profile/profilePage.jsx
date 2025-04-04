import React from "react";
import { UseFirebase } from "../../Contexts/firebaseContext";

export const ProfilePage = () => {
  const { userInfo } = UseFirebase();

  return (
      <div className="w-[70%] bg-white shadow-lg rounded-xl p-6 flex flex-col items-center h-full">
        
        <div className="w-full">
          <ProfileField label="First Name" value={userInfo?.user?.name || "N/A"} />
          <ProfileField label="Last Name" value={userInfo?.user?.name || "N/A"} />
          <ProfileField label="Email" value={userInfo?.user?.email || "N/A"} />
          <ProfileField label="Password" value={"********" || "N/A"} />
          <ProfileField label="Course" value={userInfo?.user?.course || "N/A"} />

        </div>
    </div>
  );
};

const ProfileField = ({ label, value }) => (
  <div className="mb-4">
    <p className="text-gray-600 font-medium">{label}</p>
    <p className="w-full bg-gray-100 p-3 rounded-lg text-center text-gray-800">{value}</p>
  </div>
);
