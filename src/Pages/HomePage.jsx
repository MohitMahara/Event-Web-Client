import React from "react";
import { Layout } from "../Components/Layout/Layout";
import { motion } from "framer-motion";
import { UpcomingEvents } from "./Event/UpcomingEvents";
import CompletedEvents from "./Event/CompletedEvents";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <Layout>
        <section className="relative w-full h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 text-center">

          <div className="relative z-10 max-w-3xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-4"
            >
              Discover. Attend. Organize.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-lg md:text-xl mb-6"
            >
            Find all the events happening at MSI in one place, or seamlessly organize your own
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="flex flex-col md:flex-row gap-4 justify-center"
            >
              <NavLink to="/browse-events" className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-200 transition">
                Explore Events
              </NavLink>
              <NavLink to="/create-event" className="px-6 py-3 bg-purple-700 font-semibold rounded-full hover:bg-purple-800 transition">
                Organize an Event
              </NavLink>
            </motion.div>
          </div>
        </section>

        <section className="w-full h-auto flex bg-gray-100 ">
          <UpcomingEvents/>
        </section>

        <section className="w-full min-h-screen flex bg-gray-100">
          <CompletedEvents/>
        </section>
      </Layout>
    </>
  );
};

export default HomePage;
