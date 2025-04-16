import React, { useEffect, useState } from "react";
import { Layout } from "../../Components/Layout/Layout";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const EventPage = () =>{
    const {eventslug} = useParams();
    const [event, setEvent] = useState([]);
    const navigate = useNavigate();


    const getEvent = async() =>{
      try {
         await fetch("/events.json").then((res) => res.json()).then((data) => {
            const filteredEvts = data.filter((event) => event.slug == eventslug);
            if(filteredEvts.length == 0){
                navigate("/noevtfound")
            }
            setEvent(filteredEvts);
         } );
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() =>{
        getEvent();
    }, [])


    const handleRegister = async() =>{
      try {
        
      } catch (error) {
        
      }
    }



    //  function to get event data from db


    // const getEvent = async() =>{
    //     try {
    //     } catch (error) {
    //       console.log(error);
    //     }
    // }




    return (
        <>
         <Layout>
            <div className="w-full md:w-6xl mx-auto px-4 py-8 min-h-screen">
               <h2 className="text-4xl text-gray-900 font-bold text-center">{event[0]?.title}</h2>

              <div className="flex flex-row w-full min-h-screen my-8 gap-4">
                 <div className="w-3/4 h-full">
                    <img src={event[0]?.image} alt={event[0]?.title} className="w-full h-100 object-cover rounded-lg" />
                    <p className="text-gray-700 text-lg mt-4">{event[0]?.description}</p>
                 </div>
                <div className="w-1/4 h-100 bg-white  p-4 rounded-lg shadow-lg">
                    <h3 className="text-xl text-gray-800  text-center font-bold">Event Details</h3>
                     <p className="text-gray-700 text-lg mt-2">Happening on</p>
                     <p className="text-gray-900 text-md mt-2 font-bold">{event[0]?.date}</p>
                     <p className="text-gray-700 text-lg mt-2">Venue</p>
                     <p className="text-gray-900 text-md mt-2 font-bold">{event[0]?.venue}</p>
                     <p className="text-gray-700 text-lg mt-2">Organizer</p>
                     <p className="text-gray-900 text-md mt-2 font-bold">{event[0]?.organizer}</p>

                     {new Date(event[0]?.date).getTime() > Date.now() ?
                      <button className="bg-blue-500 px-4 py-2 rounded-lg text-gray-100 w-full mt-4 text-lg cursor-pointer" onClick={handleRegister}>Register</button>
                       :
                      <button className="bg-blue-500 px-4 py-2 rounded-lg text-gray-100 w-full mt-4 text-lg">Ended</button>
                     }
                </div>

              </div>


            </div>
         </Layout>
        </>
    )
}