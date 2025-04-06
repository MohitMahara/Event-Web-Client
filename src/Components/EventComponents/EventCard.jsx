import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";


export const EventCard = ({ event }) => {
  return (
    <>
      <div key={event.id} className="flex flex-col md:flex-row h-auto md:h-90 w-full bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-200 p-2 cursor-pointer" >
        <img src={event.image} alt={event.title} className="w-full md:w-1/2 h-40 md:h-full object-cover rounded-lg"/>
        <div className="flex flex-col px-6 py-4 w-full md:w-1/2 h-auto md:h-full">
          <h3 className="text-3xl font-bold text-gray-900 mb-2">
            {event.title}
          </h3>
          <p className="text-gray-600 mt-2">{event.description}</p>
          <div className="flex flex-col items-left mt-5 text-gray-500 text-sm h-auto">
            <p>{event.date}</p>
            <div className="flex gap-2 items-center mt-2">
              <FaLocationDot />
              <p>{event.venue}</p>
            </div>
            <p className="mt-2">
              <strong>Organized by:</strong>{event.organizer}
            </p>
          </div>
          <Link to="/completed-events" className="mt-3 inline-block text-gray-500 hover:text-blue-500">
            View More
          </Link>
        </div>
      </div>
    </>
  );
};
