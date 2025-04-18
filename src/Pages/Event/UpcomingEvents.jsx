import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import axios from "axios";
import toast from "react-hot-toast";


export const UpcomingEvents = () => {

  const [upcomingEvents, setUpcomingEvents] = useState([]);

  const getUpcomingEvents = async () =>{
    try {

    const res = await axios.get(`${import.meta.env.VITE_SERVER_API}/api/v1/events/get-all-events`);

    if(res.data.success){
      const currentTime = new Date();
      const filteredEvts = res.data.allEvents.filter(event => new Date(event.date) > currentTime).sort((a, b) => new Date(a.date) -  new Date (b.date) ).slice(0, 6);
      // Format the date to "MM-DD-YY"

      const formattedEvents = filteredEvts.map(event => ({
        ...event,
        date: new Date(event.date).toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        })
      }));
      
      setUpcomingEvents(formattedEvents);
    }
    else{
      toast.error(res.data.message);
    }

    } catch (error) {
      if(error.response){
        const status = error.response.status;
        const msg = error.response.data?.msg || 'Something went wrong';
  
        if (status === 400 || status === 404) {
          toast.error(msg); 
        } else {
          toast.error('Unexpected error. Please try again.');
        }
      }else{
        toast.error('Network error. Please check your connection.');
      }
    }

  }

  useEffect(() =>{
    getUpcomingEvents();
  }, []);



  return (
    <div className="w-full max-w-5xl mx-auto my-10">
      <h2 className="text-3xl font-bold text-center mb-6">Upcoming Events</h2>
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full pb-10"
      >
        {upcomingEvents.map((event) => (
          <SwiperSlide key={event?.id} className="p-4">
            <NavLink to={`/${event?.slug}`} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={event?.image} alt={event?.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold">{event?.name}</h3>
                <p className="text-gray-600">{event?.date}</p>
                <p className="text-sm text-gray-700 mt-2">{event?.description?.slice(0, 100) + "..."}</p>
              </div>
            </NavLink>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
