import React, { useEffect, useState } from "react";
import { Layout } from "../../Components/Layout/Layout";
import { EventCard } from "../../Components/EventComponents/EventCard";
import { TabBtn } from "../../Components/Btn/TabBtn";
import Fuse from "fuse.js";


export const BrowseEventsPage = () => {
  const [openedTab, setOpenedTab] = useState(1);
  const [allEvents, setAllEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [completedEvents, setCompletedEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  const getEvents = async() =>{
    try {
       await fetch("/events.json").then((res) => res.json()).then((data) =>{
          const currentTime = new Date().getTime();
          // Filter and sort events based on the current time
          const completedEvts = data.filter(event => new Date(event.date).getTime() < currentTime).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          const upcomingEvts  = data.filter(event => new Date(event.date).getTime() > currentTime).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          
          setAllEvents(data);
          setCompletedEvents(completedEvts);
          setUpcomingEvents(upcomingEvts);
       })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() =>{
    getEvents();
  }, [searchTerm]);


  // initialize fuse.js for searching

  const fuse = new Fuse(allEvents, {
    keys: ["title", "description", "organizer"], 
    threshold: 0.3,
    ignoreLocation: true,
  });


  const handleSearch = async() =>{
    try{

      const filteredItems = fuse.search(searchTerm).map((result) => result.item);
      setAllEvents(filteredItems);
      setOpenedTab(1);

    }catch{
      console.log(error);
    }
  }


  const handleFilter = () => {
    try {
      alert("Filter button clicked!");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Layout>
        <div className="w-full items-center min-h-screen py-8 px-4 mx-auto">
          
          <div className="md:w-md w-sm flex justify-center bg-blue-500 p-3 rounded-lg mb-8 mx-auto">
           <TabBtn text={"All"} tabNo={1} openedTab={openedTab} setOpenedTab={setOpenedTab} />
           <TabBtn text={"Upcoming"} tabNo={2} openedTab={openedTab} setOpenedTab={setOpenedTab} />
           <TabBtn text={"Completed"} tabNo={3} openedTab={openedTab} setOpenedTab={setOpenedTab} />
          </div>

          <div className="w-sm md:w-6xl mb-8 flex gap-2 md:gap-4 mx-auto h-auto">
            
             <div className="w-[80%] flex justify-between rounded-lg bg-white p-3 rounded-xl">
               <input type="text" className="w-[95%] p-3 rounded-lg bg-gray-200 focus:outline-none" placeholder="Search for events..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
               <button id="filter-btn" className="text-gray-700 cursor-pointer" onClick={handleFilter}>
                  <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                  >
                 <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7"/>
                 </svg>
               </button>
             </div>
            
             <button className="w-30 bg-blue-500 text-white px-4  rounded-lg cursor-pointer" onClick={handleSearch}>Search</button>
          </div>

      
            <div className="w-full md:w-6xl flex flex-col gap-15 mx-auto min:h-screen">
              {openedTab == 1 && allEvents.map((event) => (
                <EventCard key={event.id} event={event}/>
              ))}

              {openedTab == 2 && upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event}/>
              ))}

              {openedTab == 3 && completedEvents.map((event) => (
                <EventCard key={event.id} event={event}/>
              ))}

            </div>
   
         </div>
      </Layout>
    </>
  );
};
