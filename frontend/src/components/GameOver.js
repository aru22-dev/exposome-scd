import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import QRCode from 'react-qr-code';
import { useNavigate } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const GameResultsScreen = ({ onPlayAgain }) => {
  const [performanceData, setPerformanceData] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const stored = localStorage.getItem('performanceData');
    if (stored) {
      setPerformanceData(JSON.parse(stored));
    }
  }, []);

  if (!Array.isArray(performanceData) || performanceData.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-red-600 font-bold text-lg">
        Error: No performance data found.
      </div>
    );
  }

  const avgCommunity = (
    performanceData.reduce((sum, q) => sum + q.community, 0) / performanceData.length
  ).toFixed(2);
  const avgResources = (
    performanceData.reduce((sum, q) => sum + q.resources, 0) / performanceData.length
  ).toFixed(2);
  const avgHealth = (
    performanceData.reduce((sum, q) => sum + q.health, 0) / performanceData.length
  ).toFixed(2);

  return (
    <div className="h-screen w-full bg-gradient-to-br from-blue-100 to-indigo-100 flex flex-col items-center px-6 py-4 font-sans">
      
      {/* 🧠 Header */}
      <motion.div
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="flex flex-col items-center mb-6"
>
  <div className="flex items-center gap-2">
    <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xl shadow-md">
      🤩
    </div>
    <div className="relative bg-white px-4 py-1 rounded-full text-indigo-700 font-semibold text-sm shadow">
      I did it!
      <div className="absolute -left-1.5 top-1/2 w-2 h-2 bg-white rotate-45 shadow-sm"></div>
    </div>
  </div>
</motion.div>

      {/* 🔍 Main Section */}
      <div className="flex flex-1 w-full max-w-6xl gap-6 items-stretch overflow-hidden">
        
        {/* 📊 Chart Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex-1 bg-white rounded-3xl shadow-md p-6 flex flex-col justify-start"
        >
          <h3 className="text-md font-semibold text-center text-indigo-700 mb-4">
            Score Progression by Question
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="question" fontSize={10} />
              <YAxis fontSize={10} />
              <Tooltip />
              <Legend verticalAlign="top" height={30} />
              <Line type="monotone" dataKey="community" stroke="#10B981" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="resources" stroke="#F59E0B" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="health" stroke="#6366F1" strokeWidth={2.5} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* 📈 Right Panel */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-80 flex flex-col justify-between bg-white rounded-3xl shadow-md p-6"
        >
          {/* Stats */}
          <div className="space-y-4">
            {[
              { label: 'Avg Community', value: avgCommunity, color: 'text-green-600' },
              { label: 'Avg Resources', value: avgResources, color: 'text-yellow-600' },
              { label: 'Avg Health', value: avgHealth, color: 'text-indigo-600' },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm text-center">
                <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
              </div>
            ))}
          </div>

          {/* QR & Button */}
          <div className="mt-6 flex flex-col items-center gap-3">
            <div className="bg-indigo-100 p-3 rounded-xl shadow-md">
              <QRCode value="https://en.wikipedia.org/wiki/Exposome" size={120} />
            </div>
            <p className="text-xs text-indigo-600">Learn about exposomes</p>
            <button
              onClick={() => navigate('/')}
              className="mt-1 px-6 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-full hover:scale-105 transition-transform shadow"
            >
              🔁 Play Again
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GameResultsScreen;
