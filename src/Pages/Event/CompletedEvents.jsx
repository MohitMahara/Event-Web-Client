import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { EventCard } from "../../Components/EventComponents/EventCard";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const CompletedEvents = () => {

  const [completedEvents, setCompletedEvents]  = useState([]);

  const getCompletedEvents = async () => {
     try {

        const res = await axios.get(`${import.meta.env.VITE_SERVER_API}/api/v1/events/get-all-events`);
        if(res.data.success){
          const currentTime = new Date();
          const filteredEvents = res.data.allEvents.filter(event => new Date(event.date) < currentTime).sort((a, b) => new Date(b.date) -  new Date(a.date) ).slice(0, 6);
          setCompletedEvents(filteredEvents);
        }
        else{
          toast.error(res.data.message);
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
  
    useEffect(() =>{
      getCompletedEvents();
    }, []);

  return (
      <div className="w-6xl max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center md:justify-between mb-8 gap-3 w-full">
            <h2 className="text-3xl font-bold text-center">Completed Events</h2>
            <NavLink to='/browse-events' className="text-gray-800 hover:text-blue-500">Browse more</NavLink>
        </div>
        <div className="w-full flex flex-col gap-15">
          {completedEvents.map((event) => (
              <EventCard event={event} />
          ))}
        </div>
      </div>
  );
};

export default CompletedEvents;
