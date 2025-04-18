import React, { useEffect, useState } from "react";
import { Layout } from "../../Components/Layout/Layout";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast"
import { UseFirebase } from "../../Contexts/firebaseContext";

export const EventPage = () =>{
    const {eventslug} = useParams();
    const [event, setEvent] = useState(null);
    const navigate = useNavigate();
    const {userInfo, setUserInfo} = UseFirebase();
    const [isRegistered, setIsRegistered] = useState(false);

    const eventDate = event?.date ? new Date(event.date).toLocaleDateString('en-US', {
      month: 'short',  
      day: '2-digit',   
      year: 'numeric'
    }): null;


    const getEvent = async() =>{
      try {

         const res = await axios.get(`${import.meta.env.VITE_SERVER_API}/api/v1/events/get-event/${eventslug}`);

         if(res.data.success){
            setEvent(res.data.event);
            const registerStatus = await res.data.event.registeredUsers.includes(userInfo?.user?._id);
            setIsRegistered(registerStatus);
         }
         else{
            navigate("/noevtfound");
         } 

      } catch (error) {
         if(error.response){
            const status = error.response.status;
            const msg = error.response.data?.msg || 'Something went wrong';
      
            if (status === 400 || status === 404) {
              toast.error(msg); 
              navigate("/noevtfound")
            } else {
              toast.error('Unexpected error. Please try again.');
            }
          }else{
            toast.error('Network error. Please check your connection.');
          }
      }
    }


    useEffect(() =>{
        getEvent();
    }, [])


    const handleRegister = async(e) =>{
      e.preventDefault();
      try {

         if(userInfo?.token == null) {
            toast.error("SignUp first");
            return
         }

         if(isRegistered) return;

         const userId = userInfo?.user?._id;

         const res = await axios.post(`${import.meta.env.VITE_SERVER_API}/api/v1/events/${event?._id}/register`, {userId});

         if(res.data.success){
            toast.success(res.data.msg);
            setIsRegistered(true);
         }
         else{
            toast.error(res.data.msg);
         } 

      } catch (error) {
         if(error.response){
            const status = error.response.status;
            const msg = error.response.data?.msg || 'Something went wrong';
      
            if (status === 400 || status === 404) {
              toast.error(msg); 
            } else {
              toast.error('Unexpected error. Please try again.');
            }
          }else{
            toast.error('Network error. Please check your connection.');
          }
      }
    }

    return (
        <>
         <Layout>
            <div className="w-full md:w-6xl mx-auto px-4 py-8 min-h-screen">
               <h2 className="text-4xl text-gray-900 font-bold text-center">{event?.title}</h2>

              <div className="flex flex-row w-full min-h-screen my-8 gap-4">
                 <div className="w-3/4 h-full">
                    <img src={event?.image} alt={event?.title} className="w-full h-100 object-cover rounded-lg" />
                    <p className="text-gray-700 text-lg mt-4">{event?.description}</p>
                 </div>
                <div className="w-1/4 h-100 bg-white  p-4 rounded-lg shadow-lg">
                    <h3 className="text-xl text-gray-800  text-center font-bold">Event Details</h3>
                     <p className="text-gray-700 text-lg mt-2">Happening on</p>
                     <p className="text-gray-900 text-md mt-2 font-bold">{eventDate}</p>
                     <p className="text-gray-700 text-lg mt-2">Venue</p>
                     <p className="text-gray-900 text-md mt-2 font-bold">{event?.venue}</p>
                     <p className="text-gray-700 text-lg mt-2">Organizer</p>
                     <p className="text-gray-900 text-md mt-2 font-bold">{event?.organizer}</p>
                     <p className="text-gray-700 text-lg mt-2">Registrations</p>
                     <p className="text-gray-900 text-md mt-2 font-bold">{event?.registeredUsers.length}</p>


                     {new Date(event?.date) > new Date() ?
                      <button className="bg-blue-500 px-4 py-2 rounded-lg text-gray-100 w-full mt-4 text-lg cursor-pointer" onClick={handleRegister}>{isRegistered ? "Registered" : "Register" }</button>
                       :
                      <button className="bg-blue-500 px-4 py-2 rounded-lg text-gray-100 w-full mt-4 text-lg">Ended</button>
                     }
                </div>

              </div>


            </div>
         </Layout>
        </>
    )
}