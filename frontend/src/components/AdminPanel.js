import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const IntroScreen = () => {
  const navigate = useNavigate();

  const handlePlay = () => {
    navigate('/select-character');
  };

  const handleAdminLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-900 to-blue-700 text-white p-8">
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-center mb-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        WHAT IS THE EXPOSOME?
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-4xl">
        {[
          "The exposome encompasses all the environmental exposures a person experiences throughout their life — from the air they breathe to the food they eat and even their social experiences.",
          "It includes chemical, physical, and biological exposures, and helps us understand how our environment shapes our health beyond just genetics.",
          "Understanding the exposome helps researchers tackle chronic diseases, improve public health, and personalize medicine.",
          "In this interactive journey, explore the impact of everyday choices on your health, resources, and community!"
        ].map((text, index) => (
          <motion.div
            key={index}
            className="bg-yellow-100 text-blue-900 p-6 rounded-lg shadow-lg text-base md:text-lg font-medium"
            initial={{ opacity: 0, y: 20, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ delay: 0.5 + index * 0.4, duration: 0.6 }}
          >
            {text}
          </motion.div>
        ))}
      </div>

      <div className="flex gap-6 mt-4">
        <motion.button
          onClick={handlePlay}
          className="bg-green-500 text-white text-xl font-bold px-10 py-4 rounded-full hover:bg-green-600 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          PLAY
        </motion.button>
        <motion.button
          onClick={handleAdminLogin}
          className="bg-white text-blue-900 text-xl font-bold px-10 py-4 rounded-full border border-white hover:bg-blue-100 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          LOGIN AS ADMIN
        </motion.button>
      </div>
    </div>
  );
};

export default IntroScreen;
