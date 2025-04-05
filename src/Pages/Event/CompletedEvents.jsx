import React from "react";
import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";


const completedEvents = [
    {
        id: 1,
        name: "TechFest 2025",
        date: "March 10, 2025",
        image : 'https://content.skyscnr.com/m/6428abfa2f4eadc7/original/TechConference_H.jpg?resize=1224%3Aauto',
        description: "The biggest tech fest of the year with hackathons, workshops, and more!",
      },
      {
        id: 2,
        name: "AI Conference",
        date: "April 5, 2025",
        image : 'https://content.skyscnr.com/m/6428abfa2f4eadc7/original/TechConference_H.jpg?resize=1224%3Aauto',
        description: "Join industry experts to explore the future of AI.",
      },
      {
        id: 3,
        name: "Annual Cultural Fest",
        date: "April 15, 2025",
        image : 'https://content.skyscnr.com/m/6428abfa2f4eadc7/original/TechConference_H.jpg?resize=1224%3Aauto',
        description: "An evening filled with mesmerizing performances.",
      },
      {
        id: 1,
        name: "TechFest 2025",
        date: "March 10, 2025",
        image : 'https://content.skyscnr.com/m/6428abfa2f4eadc7/original/TechConference_H.jpg?resize=1224%3Aauto',
        description: "The biggest tech fest of the year with hackathons, workshops, and more!",
      },
      {
        id: 2,
        name: "AI Conference",
        date: "April 5, 2025",
        image : 'https://content.skyscnr.com/m/6428abfa2f4eadc7/original/TechConference_H.jpg?resize=1224%3Aauto',
        description: "Join industry experts to explore the future of AI.",
      },
      {
        id: 3,
        name: "Annual Cultural Fest",
        date: "April 15, 2025",
        image : 'https://content.skyscnr.com/m/6428abfa2f4eadc7/original/TechConference_H.jpg?resize=1224%3Aauto',
        description: "An evening filled with mesmerizing performances.",
      },
];

const CompletedEvents = () => {
  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-center">Completed Events</h2>
            <Link to='/events' className="text-gray-800 hover:text-blue-500">Browse more</Link>
        </div>
        <div className="flex flex-col gap-15 w-5xl">
          {completedEvents.map((event) => (
            <div key={event.id} className="relative flex h-90 w-full bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-200 p-2 cursor-pointer">
              <img src={event.image} alt={event.name} className="w-1/2 h-full object-cover" />
              <div className="flex flex-col px-6 py-4 w-1/2 h-full">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{event.name}</h3>
                <p className="text-gray-600 mt-2">{event.description}</p>
                <div className="flex flex-col items-left mt-5 text-gray-500 text-sm">
                  <p>{event.date}</p>
                  <div className="flex gap-2 items-center mt-2">
                    <FaLocationDot/>
                    <p>MBA Building Seminar Hall-6</p>
                  </div>
                  <p className="mt-2"><strong>Organized by:</strong> Software Development Cell, MSI</p>
                </div>
                <Link  to ="/completed-events" className="absolute mt-3 bottom-10  inline-block text-gray-500 hover:text-blue-500">
                    View More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
};

export default CompletedEvents;
