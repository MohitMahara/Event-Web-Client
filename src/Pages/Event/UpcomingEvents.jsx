import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const events = [
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

export const UpcomingEvents = () => {
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
        {events.map((event) => (
          <SwiperSlide key={event.id} className="p-4">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={event.image} alt={event.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold">{event.name}</h3>
                <p className="text-gray-600">{event.date}</p>
                <p className="text-sm text-gray-700 mt-2">{event.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
