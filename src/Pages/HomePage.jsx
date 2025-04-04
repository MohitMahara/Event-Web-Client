import React from "react";
import { Layout } from "../Components/Layout/Layout";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <>
      <Layout>
        <section className="relative w-full h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 text-center">
          {/* <div className="absolute inset-0 bg-black bg-opacity-40"></div> */}

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
              Find the best events at your college, or host your own with ease!
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="flex flex-col md:flex-row gap-4 justify-center"
            >
              <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-200 transition">
                Explore Events
              </button>
              <button className="px-6 py-3 bg-purple-700 font-semibold rounded-full hover:bg-purple-800 transition">
                Organize an Event
              </button>
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default HomePage;
