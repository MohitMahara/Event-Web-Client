import React from "react";
import { NavLink } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";


export const EventCard = ({ event }) => {

  const eventDate = new Date(event.date).toLocaleDateString('en-US', {
    month : "short",
    day : "2-digit",
    year : "numeric",
  })


  return (
    <>
      <NavLink to={`/event/${event.slug}`} key={event.id} className="flex flex-col md:flex-row h-auto md:h-90 w-full bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-200 p-2 cursor-pointer" >
        <img src={event.image} alt={event.title} className="w-full md:w-1/2 h-40 md:h-full object-cover rounded-lg"/>
        <div className="flex flex-col px-6 py-4 w-full md:w-1/2 h-auto md:h-full justify-left">
          <h3 className="text-3xl font-bold text-gray-900 mb-2">
            {event.title.length > 38 ? event.title.slice(0, 38) + "..." : event.title}
          </h3>
          <p className="text-gray-600 mt-2">{event.description.length > 100 ? event.description.slice(0, 100) + "..." : event.description}</p>
          <div className="flex flex-col items-left mt-5 text-gray-500 text-sm h-auto">
            <p>{eventDate}</p>
            <div className="flex gap-2 items-center mt-2">
              <FaLocationDot />
              <p>{event.venue}</p>
            </div>
            <p className="mt-2">
              <strong>Organized by:</strong>{event.organizer}
            </p>
          </div>

          {new Date(event?.date) > new Date() ?
            <button className="mt-6 text-gray-200 bg-blue-500 py-2 px-4 rounded-md w-[30%] hover:bg-blue-700 transition duration-200" type="submit">Register</button>
              :
            <button className="mt-6 text-gray-200 bg-blue-500 py-2 px-4 rounded-md w-[30%] hover:bg-blue-700 transition duration-200" type="submit">Ended</button>

          }
        </div>
      </NavLink>
    </>
  );
};
