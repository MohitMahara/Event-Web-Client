import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { EventCard } from "../../Components/EventComponents/EventCard";
import { NavLink } from "react-router-dom";


const CompletedEvents = () => {

  const [completedEvents, setCompletedEvents]  = useState([]);

    const getCompletedEvents = async () =>{
          await fetch("/events.json").then((res) => res.json()).then((data) => {
            const currentTime = new Date().getTime();
            const completedEvents = data.filter(event => new Date(event.date).getTime() < currentTime).
            sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).
            slice(0, 6);
            setCompletedEvents(completedEvents);
       })
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
