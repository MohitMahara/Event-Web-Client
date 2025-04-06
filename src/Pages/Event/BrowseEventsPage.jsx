import React, { useEffect, useState } from "react";
import { Layout } from "../../Components/Layout/Layout";
import { EventCard } from "../../Components/EventComponents/EventCard";


export const BrowseEventsPage = () => {
  const [openedTab, setOpenedTab] = useState(1);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [completedEvents, setCompletedEvents] = useState([]);


  const getEvents = async() =>{
    try {
       await fetch("/events.json").then((res) => res.json()).then((data) =>{
          const currentTime = new Date().getTime();
          // Filter and sort events based on the current time
          const completedEvts = data.filter(event => new Date(event.date).getTime() < currentTime).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          const upcomingEvts  = data.filter(event => new Date(event.date).getTime() > currentTime).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

          setCompletedEvents(completedEvts);
          setUpcomingEvents(upcomingEvts);
       })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() =>{
    getEvents();
  }, []);

  return (
    <>
      <Layout>
        <div className="w-full items-center min-h-screen py-8 px-4 mx-auto">
          
          <div className="md:w-md w-sm flex justify-center bg-blue-500 p-3 rounded-lg mb-8 mx-auto">
            <button
              className={`px-6 py-2 rounded-full font-medium transition ${
                openedTab == 1
                  ? "bg-white text-blue-500 shadow-md1"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              onClick={() => setOpenedTab(1)}
            >
              Upcoming
            </button>

            <button
              className={`px-6 py-2 mx-2 rounded-full font-medium transition ${
                openedTab == 2
                  ? "bg-white text-blue-500 shadow-md1"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              onClick={() => setOpenedTab(2)}
            >
              Completed
            </button>
          </div>

          <div className="w-sm md:w-6xl mb-8 flex gap-2 md:gap-4 mx-auto p-2 bg-white h-auto my-4 rounded-xl">
             <input type="text" className="w-[90%] p-2 md:p-4 m-1 rounded-lg bg-gray-200 focus:outline-none" placeholder="Search for events..." />
             <button className="w-30 bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer">Search</button>
          </div>

          {openedTab == 1 ? (
            <>
            <div className="w-full md:w-6xl flex flex-col gap-15 mx-auto min:h-screen">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event}/>
              ))}

            </div>
            </>
          ): 
          (
            <div className="w-full md:w-6xl mx-auto min:h-screen">
              {completedEvents.map((event) => (
                <EventCard key={event.id} event={event}/>
              ))}
            </div>

          )}

        </div>

      </Layout>
    </>
  );
};
