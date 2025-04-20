import React  from "react";
import { Layout } from "../Layout/Layout";
import { UseFirebase } from "../../Contexts/firebaseContext";
import { NavLink } from "react-router-dom";
import { OrganizedEvents } from "./OrganizedEvents";

export const OrganizedEventsPage = () =>{
    const {userInfo} = UseFirebase();

    return ( <>
          <Layout>
            <div className="flex flex-row px-4 py-8 bg-gray-100 w-auto min-h-screen">
              <div className="left-sidebar w-1/4 bg-white p-4 rounded-lg shadow-md h-auto">
                <div className="profile-header flex flex-col items-center justify-center mb-4">
                  {userInfo?.user?.photoURL ? (
                    <>
                      <img
                        src={userInfo?.user?.photoURL}
                        className="rounded-full w-16  h-16"
                        alt="user profile pic"
                      />
    
                      <h3 className="pt-1 text-lg font-bold">
                        {userInfo?.user.name}
                      </h3>
                    </>
                  ) : (
                    <>
                      <div className="w-24 h-24 bg-gray-500 rounded-full flex items-center justify-center text-white text-xl mb-4">
                          <p className="text-3xl">{userInfo?.user?.name?.charAt(0)}</p>
                      </div>
                      <h3 className="pt-1 text-lg font-bold">
                        {userInfo?.user?.name}
                      </h3>
    
                    </>
                  )}
                </div>
    
                <hr className="text-gray-400 mb-4"></hr>
    

    
                <div className="flex flex-col items-center justify-center profile-info mb-4">
                    <NavLink to="/user-dashboard" className="mb-3 bg-gray-300 p-2 w-full text-center rounded-sm text-md hover:bg-gray-500 cursor-pointer hover:text-white transition duration-200">Profile</NavLink>
             
                     <NavLink to="/attended-events" className="mb-3 bg-gray-300 p-2 w-full text-center rounded-sm text-md hover:bg-gray-500 cursor-pointer hover:text-white transition duration-200">Attended Events</NavLink>

                     <NavLink to="/organized-events" className="mb-3 bg-gray-300 p-2 w-full text-center rounded-sm text-md hover:bg-gray-500 cursor-pointer hover:text-white transition duration-200">Organized Events</NavLink>
               </div>


              </div>
              <div className="right-content w-3/4  p-4  ml-4 flex flex-col items-center">
                <OrganizedEvents/>
              </div>
            </div>
          </Layout>
    </>
    )
}