import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { characters } from '../data/characters';
import { motion } from 'framer-motion';

const CharacterQuiz = () => {
  const navigate = useNavigate();
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const index = localStorage.getItem('selectedCharacterIndex');
    if (index !== null) {
      setSelectedCharacter(characters[parseInt(index)]);
    } else {
      navigate('/');
    }
  }, [navigate]);

  const questions = [
    {
      question: 'How does your character prefer to solve problems?',
      options: ['Analytical thinking', 'Collaboration', 'Trial and error'],
    },
    {
      question: 'What motivates your character the most?',
      options: ['Helping others', 'Achieving goals', 'Learning new things'],
    },
    {
      question: 'How does your character contribute to the community?',
      options: ['Providing resources', 'Sharing knowledge', 'Leading initiatives'],
    },
  ];

  const handleAnswer = (questionIndex, optionIndex) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }));
    setError('');
  };

  const handleNext = () => {
    if (answers[currentQuestion] === undefined) {
      setError('Please select one option before proceeding.');
      return;
    }
    setCurrentQuestion((prev) => prev + 1);
  };

  const handleSubmit = () => {
    if (answers[currentQuestion] === undefined) {
      setError('Please select one option before proceeding.');
      return;
    }
    const health = Math.floor(Math.random() * 51) + 50;
    const community = Math.floor(Math.random() * 51) + 50;
    const resources = Math.floor(Math.random() * 51) + 50;

    localStorage.setItem('characterStats', JSON.stringify({ health, community, resources }));

    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-800 to-blue-600 text-white px-10 py-12 grid grid-rows-[auto_auto_1fr_auto] gap-8">
      {selectedCharacter && (
        <>
          <motion.div
            className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-white shadow-xl mx-auto overflow-hidden"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={selectedCharacter.image}
              alt={selectedCharacter.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center drop-shadow-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {selectedCharacter.name}
          </motion.h2>

          <motion.div
            className="w-full max-w-5xl mx-auto bg-blue-600/40 p-10 rounded-3xl shadow-2xl backdrop-blur-md\"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-lg md:text-xl font-semibold mb-8 text-center">
              {questions[currentQuestion].question}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {questions[currentQuestion].options.map((opt, j) => (
                <motion.button
                  key={j}
                  onClick={() => handleAnswer(currentQuestion, j)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative group bg-gradient-to-br from-white to-blue-100 text-blue-900 border border-blue-300 shadow-lg rounded-3xl px-6 py-8 h-32 flex items-center justify-center text-xl font-bold transition-all duration-300 ${
                    answers[currentQuestion] === j
                      ? 'ring-4 ring-green-400 scale-105'
                      : 'hover:scale-105 hover:shadow-xl'
                  }`}
                >
                  {String.fromCharCode(65 + j)}. {opt}
                </motion.button>
              ))}
            </div>
            {error && <p className="text-red-400 text-sm mt-4 text-center">{error}</p>}
          </motion.div>

          <motion.div
            className="mt-10 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {currentQuestion < questions.length - 1 ? (
              <motion.button
                onClick={handleNext}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-700 hover:bg-blue-800 text-white px-10 py-3 text-lg font-bold rounded-full shadow-lg transition-all"
              >
                NEXT ➜
              </motion.button>
            ) : (
              <motion.button
                onClick={handleSubmit}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-500 hover:bg-green-600 text-white px-10 py-3 text-lg font-bold rounded-full shadow-lg transition-all"
              >
                🎮 START GAME
              </motion.button>
            )}
          </motion.div>
        </>
      )}
    </div>
  );
};

export default CharacterQuiz;
