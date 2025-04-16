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
            <div className="w-full md:m-5xl mx-auto px-4 py-4">
               <h2 className="text-4xl text-gray-900 font-bold text-center">{event[0].title}</h2>




            </div>
         </Layout>
        </>
    )
}