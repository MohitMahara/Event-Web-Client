import React, { useEffect, useState } from "react"
import { UseFirebase } from "../../Contexts/firebaseContext"
import axios from "axios";
import toast from "react-hot-toast";
import {Link} from "react-router-dom"
import NoEventsFound from "../EventComponents/NoEventsFound";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";

export const OrganizedEvents = () =>{
    const {userInfo, loading} = UseFirebase();
    const [organizedEvts, setOrganizedEvts] = useState([]);

    const getOrganizedEvents = async() =>{
      try{

       const userId = userInfo?.user?._id;

       const res = await axios.get(`${import.meta.env.VITE_SERVER_API}/api/v1/events/organized-events/${userId}`);

       if(res.data.success){
        // Format the date to "MM-DD-YY"
         const formattedEvents = res.data.organizedEvents.map(event => ({
             ...event,
            date: new Date(event.date).toLocaleDateString('en-US', {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
            })
         }));

          setOrganizedEvts(formattedEvents);
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
       getOrganizedEvents();
    }, [])


    const handleDeleteEvent = async(event) =>{
        try {
            const res = await axios.delete(`${import.meta.env.VITE_SERVER_API}/api/v1/events/delete-event/${event._id}`);
           
            if(res.data.success){
                toast.success("Event deleted successfully");
                getOrganizedEvents();
            }
            else{
                toast.error(res.data.msg);
            }
            
        } catch (error) {
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


    const handleEditEvent = async(event) =>{
        try {
            
        } catch (error) {
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


    return (
        <>
       <div className="w-full flex flex-col items-center">
         {organizedEvts?.length === 0 && <NoEventsFound/>}
         {organizedEvts?.map((event) =>  <EventCard event={event} handleDeleteEvent={handleDeleteEvent} handleEditEvent={handleEditEvent}/> )}
        </div>
        </>
    )
}


const EventCard = ({ event, handleEditEvent, handleDeleteEvent }) => (
    <div className="flex flex-col bg-white shadow-lg rounded-xl p-4 hover:shadow-xl transition duration-300 mb-4 w-full">
      <Link to={`/${event.slug}`} >
        <img src={event.image} alt={event.name} className="w-full h-30 object-cover rounded-md mb-3" />
      </Link>
  
      <div>
         <h2 className="text-lg font-semibold text-gray-900">{event.name}</h2>
         <p className="text-gray-900 font-bold text-sm mt-1">{event.date}</p>
         <p className="text-gray-700 text-sm mt-2">{event.description.slice(0 ,200) + "..."}</p>
      </div>

      <div className="flex ms-auto gap-4 mt-4">
        <MdOutlineEdit className="text-lg cursor-pointer" onClick={() => handleEditEvent(event)}/>
        <AiOutlineDelete className="text-lg cursor-pointer" onClick={ () => handleDeleteEvent(event)}/>
      </div>

    </div>
  );