import React, { useEffect, useState } from "react"
import { UseFirebase } from "../../Contexts/firebaseContext"
import axios from "axios";
import toast from "react-hot-toast";
import {Link} from "react-router-dom"
import NoEventsFound from "../EventComponents/NoEventsFound";

export const AttendedEvents = () =>{
    const {userInfo, loading} = UseFirebase();
    const [attendedEvts, setAttendedEvts] = useState([]);

    const getAttendedEvents = async() =>{
      try{

       const userId = userInfo?.user?._id;

       const res = await axios.get(`${import.meta.env.VITE_SERVER_API}/api/v1/events/attended-events/${userId}`);

       if(res.data.success){
        // Format the date to "MM-DD-YY"
         const formattedEvents = res.data.attendedEvents.map(event => ({
             ...event,
            date: new Date(event.date).toLocaleDateString('en-US', {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
            })
         }));

          setAttendedEvts(formattedEvents);
       }
       else{
          toast.error(res.data.msg);
       }
       
      }catch(error){

        if(error.response){
          const status = error.response.status;
          const msg = error.response.data?.msg || "Something went wrong";

          if(status == 400 || status == 404){
            toast.error(msg);
          }
          else{
            toast.error("Unexpected Error. Please try again");
          }
      }
      else{
       toast.error("Network error. Please check your connection");
      }
      }
    }

    useEffect(() =>{
       getAttendedEvents();
    }, [])


    return (
        <>
       <div className="w-full flex flex-col items-center">
         {attendedEvts?.length === 0 && <NoEventsFound/>}
         {attendedEvts?.map((event) =>  <EventCard event={event} /> )}
        </div>
        </>
    )
}


const EventCard = ({ event }) => (
    <Link to={`/${event.slug}`} className="bg-white shadow-lg rounded-xl p-4 hover:shadow-xl transition duration-300 cursor-pointer mb-4 w-full">
      <img src={event.image} alt={event.name} className="w-full h-30 object-cover rounded-md mb-3" />
  
      <h2 className="text-lg font-semibold text-gray-900">{event.name}</h2>
      <p className="text-gray-900 font-bold text-sm mt-1">{event.date}</p>
      <p className="text-gray-700 text-sm mt-2">{event.description.slice(0 ,200) + "..."}</p>
    </Link>
  );