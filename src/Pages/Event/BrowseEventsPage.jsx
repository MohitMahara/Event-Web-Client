import React, { useEffect, useState } from "react";
import { Layout } from "../../Components/Layout/Layout";
import { EventCard } from "../../Components/EventComponents/EventCard";
import { TabBtn } from "../../Components/Btn/TabBtn";
import Fuse from "fuse.js";
import NoEventsFound from "../../Components/EventComponents/NoEventsFound";


export const BrowseEventsPage = () => {
  const [openedTab, setOpenedTab] = useState(1);
  const [allEvents, setAllEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [completedEvents, setCompletedEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpened, setIsFilterOpened] = useState(false);
  const [category, setCategory] = useState("All categories");
  const [happening, setHappening] = useState("Anytime");

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
  }, [searchTerm, category, happening]);


  // initialize fuse.js for searching

  const fuse = new Fuse(allEvents, {
    keys: ["title", "description", "organizer"], 
    threshold: 0.3,
    ignoreLocation: true,
  });


  const handleSearch = async() =>{
    try{
      if(searchTerm == "") return;
      const filteredItems = fuse.search(searchTerm).map((result) => result.item);
      setAllEvents(filteredItems);
      setOpenedTab(1);

    }catch{
      console.log(error);
    }
  }

  const handleFilterToggle = () => {
     if(isFilterOpened) setIsFilterOpened(false);
     else setIsFilterOpened(true);
  }





  const filterEventsByHappening = (events, filterType) => {

    const today = new Date();
    
    return events.filter(event => {
      const eventDate = new Date(event.date);
      
      switch (filterType) {
        case "This week":
          const nextWeek = new Date();
          nextWeek.setDate(today.getDate() + 7);
          return eventDate >= today && eventDate <= nextWeek;
  
        case "This month":
          return eventDate.getFullYear() === today.getFullYear() && eventDate.getMonth() === today.getMonth();
  
        case "This year":
          return eventDate.getFullYear() === today.getFullYear();
  
        default:
          return true;
      }
    });
  };



  const filterEventsByCategory = async() =>{
    await fetch("/events.json").then((res) => res.json()).then((data) =>{
      // Filter and sort events based on the selected category
      const filteredEvts = data.filter(event => event.category == category).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      setAllEvents(filteredEvts);
   })
  }
  


  const applyFilters = async() =>{
    try {

      if(category == "All Categories" && happening == "Anytime"){
        getEvents();
        return;
      }
      else if(category == "All Categories" && happening != "Anytime"){
         const filteredEvts =  filterEventsByHappening(allEvents,happening);
         setAllEvents(filteredEvts);
      }
      else if(category != "All Categories" && happening == "Anytime"){
          filterEventsByCategory();
      }
      else{
         filterEventsByCategory();
        const filteredEvts =  filterEventsByHappening(allEvents, happening);
        setAllEvents(filteredEvts);
      }

      setOpenedTab(1);
    } catch (error) {
      console.log(error);
    }
  }


  const resetFilters = () =>{
    try {
      setCategory("All Categories");
      setHappening("Anytime");
      getEvents();

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

          <div className="w-sm md:w-6xl mb-2 flex gap-2 md:gap-4 mx-auto h-auto justify-between">
            
             <div className="w-[90%] flex justify-between rounded-lg bg-white p-2 rounded-xl gap-2">
               <input type="text" className="w-[95%] p-3 border border-blue-900 hover:border-blue-500 rounded-lg bg-gray-200 focus:outline-none transition duration-200" placeholder="Search for events..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
               <button id="filter-btn" className="text-gray-700 cursor-pointer" onClick={handleFilterToggle}>
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
          
          {isFilterOpened && <>
       
           <div className="w-full md:w-6xl mt-4 flex justify-left mx-auto h-auto pl-3">
              <div className="w-sm md:w-4xl flex flex-col bg-gray-200 h-auto p-8 rounded-md text-white">
                <h3 className="text-gray-900 text-lg mb-4">Filters</h3>
                <div className="flex flex-col">
                  <label className="text-md text-gray-900 mb-1">Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 rounded-md text-gray-900 w-40 mb-4">
                     <option value="All Categories">All Categories</option>
                     <option value="Tech">Tech</option>
                     <option value="Educational">Educational</option>
                     <option value="Cultural">Cultural</option>
                     <option value="Sports">Sports</option>
                     <option value="Gaming">Gaming</option>
                     <option value="Others">Others</option>
                  </select>
                  <label className="text-md text-gray-900 mb-1">Happening</label>

                  <select value={happening} onChange={(e) => setHappening(e.target.value)} className="border p-2 rounded-md text-gray-900 w-40 mb-4">
                     <option value="Anytime">Anytime</option>
                     <option value="This week">This week</option>
                     <option value="This month">This month</option>
                     <option value="This year">This year</option>
                  </select>
                </div>

                <div className="flex gap-2">
                  <button className="bg-green-700 w-20 py-2 px-4 rounded-md mt-3 cursor-pointer" onClick={applyFilters}>Apply</button>
                  <button className="bg-blue-600 w-20 py-2 px-4 rounded-md mt-3 cursor-pointer" onClick={resetFilters}>Reset</button>
                </div>
               
             </div>   
           </div>
       
          </>}   


      
            <div className="w-full md:w-6xl flex flex-col gap-15 mx-auto min:h-screen mt-8">
              {openedTab == 1 && 
                 allEvents.map((event) => (
                    <EventCard key={event.id} event={event}/>
                 ))
              }

              {openedTab == 2 && upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event}/>
              ))}

              {openedTab == 3 && completedEvents.map((event) => (
                <EventCard key={event.id} event={event}/>
              ))}

              {openedTab == 1 && allEvents.length == 0 && <NoEventsFound/>}
              {openedTab == 2 && upcomingEvents.length == 0 && <NoEventsFound/>}
              {openedTab == 3 && completedEvents.length == 0 && <NoEventsFound/>}

            </div>
   
         </div>
      </Layout>
    </>
  );
};
