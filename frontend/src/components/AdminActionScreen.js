import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminActionTiles = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center p-6 relative">
      <div className="absolute top-6 right-6">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-xl shadow-lg transition-all"
        >
          Logout
        </button>
      </div>

      <div className="max-w-6xl w-full text-center">
        <h1 className="text-4xl font-extrabold text-blue-800 mb-12">Choose Your Action</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/questions')}
            className="cursor-pointer bg-white rounded-3xl p-10 shadow-xl hover:bg-blue-50 transition"
          >
            <h2 className="text-2xl font-bold text-blue-700 mb-4">Add Exposure</h2>
            <p className="text-blue-600">Create a new exposome question to engage users in their environmental journey.</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/add-opportunity')}
            className="cursor-pointer bg-white rounded-3xl p-10 shadow-xl hover:bg-blue-50 transition"
          >
            <h2 className="text-2xl font-bold text-blue-700 mb-4">Add Opportunity Card</h2>
            <p className="text-blue-600">Design a special opportunity card that offers unique boosts or decisions.</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/add-global')}
            className="cursor-pointer bg-white rounded-3xl p-10 shadow-xl hover:bg-blue-50 transition"
          >
            <h2 className="text-2xl font-bold text-blue-700 mb-4">Add Global Card</h2>
            <p className="text-blue-600">Define impactful global events that influence all players in the game.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminActionTiles;
