import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";


export const UpcomingEvents = () => {

  const [upcomingEvents, setUpcomingEvents] = useState([]);

  const getUpcomingEvents = async () =>{
        await fetch("/events.json").then((res) => res.json()).then((data) => {
          const currentTime = new Date().getTime();
          const upcomingEvents = data.filter(event => new Date(event.date).getTime() > currentTime).
          sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).
          slice(0, 6);
          setUpcomingEvents(upcomingEvents);
     })
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
          <SwiperSlide key={event.id} className="p-4">
            <NavLink to={`/${event.slug}`} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={event.image} alt={event.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold">{event.name}</h3>
                <p className="text-gray-600">{event.date}</p>
                <p className="text-sm text-gray-700 mt-2">{event.description}</p>
              </div>
            </NavLink>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
