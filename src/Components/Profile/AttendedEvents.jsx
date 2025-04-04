import React from "react"
import { UseFirebase } from "../../Contexts/firebaseContext"

export const AttendedEvents = () =>{
    const {userInfo} = UseFirebase();

    const event = {
       image : 'https://content.skyscnr.com/m/6428abfa2f4eadc7/original/TechConference_H.jpg?resize=1224%3Aauto',
       name : 'Avensis',
       date : '2025-1-23',
       description : "Avensis is a tech event organized by sdc with collaboration with msi placement cell."
    }


    return (
        <>
       <div className="w-full flex flex-col items-center">
        
           <EventCard event={event} />
           <EventCard event={event} />
           <EventCard event={event} />
           <EventCard event={event} />
           <EventCard event={event} />
           <EventCard event={event} />

        </div>
        </>
    )
}


const EventCard = ({ event }) => (
    <div className="bg-white shadow-lg rounded-xl p-4 hover:shadow-xl transition duration-300 cursor-pointer mb-4 w-full">
      <img src={event.image} alt={event.name} className="w-full h-30 object-cover rounded-md mb-3" />
  
      <h2 className="text-lg font-semibold text-gray-900">{event.name}</h2>
      <p className="text-gray-600 text-sm mt-1">{event.date}</p>
      <p className="text-gray-700 text-sm mt-2">{event.description}</p>
    </div>
  );