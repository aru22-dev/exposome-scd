import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { characters } from '../data/characters';
import { AnimatePresence, motion } from 'framer-motion';

const CharacterIntro = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const character = characters[index];

  const getDescription = (name) => {
    switch (name.toLowerCase()) {
      case 'farmer':
        return 'The Farmer is grounded in tradition and sustainability, providing vital food and resources to the community through hard work and deep knowledge of the land.';
      case 'student':
        return 'The Student is curious and driven, always learning and questioning. They bring fresh ideas, adaptability, and energy to every challenge they face.';
      case 'elder':
        return 'The Elder offers wisdom and stability. With years of experience and a calming presence, they guide others through thoughtful insight and mentorship.';
      default:
        return 'This character brings unique strengths to your team—choose wisely and lead them to success!';
    }
  };

  const handleNext = () => {
    localStorage.setItem('selectedCharacterIndex', index);
    navigate('/character-quiz');
  };

  const handlePrevious = () => {
    setDirection(-1);
    setIndex((prevIndex) => (prevIndex - 1 + characters.length) % characters.length);
  };

  const handleForward = () => {
    setDirection(1);
    setIndex((prevIndex) => (prevIndex + 1) % characters.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-extrabold text-white mb-8 tracking-wider drop-shadow-xl text-center">Choose Your Persona</h1>

      <div className="relative w-full max-w-6xl flex items-center justify-center mt-4 mb-12\">
        {/* Left Arrow */}
        <button
          onClick={handlePrevious}
          className="absolute left-0 w-20 h-20 bg-white/30 hover:bg-white/40 rounded-full flex items-center justify-center text-white text-4xl shadow-xl"
        >
          ❬
        </button>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ x: direction === 1 ? 300 : -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction === 1 ? -300 : 300, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/10 p-8 rounded-3xl shadow-2xl flex flex-col items-center border border-white/30 relative w-full max-w-3xl mt-12\"
          >
            <img
              src={character.image}
              alt={character.name}
              className="w-72 h-72 object-cover rounded-full shadow-xl border-4 border-white mb-6"
            />
            <h2 className="text-3xl font-bold text-white mb-3 tracking-wide drop-shadow">{character.name}</h2>
            <p className="text-white text-base mb-6 text-center px-6 max-w-xl leading-relaxed">
              {getDescription(character.name)}
            </p>

            <button
              onClick={handleNext}
              className="mt-4 px-10 py-3 bg-green-500 text-white font-bold text-lg rounded-full shadow-lg hover:bg-green-600 transition duration-200 ease-in-out"
            >
              NEXT
            </button>
          </motion.div>
        </AnimatePresence>

        {/* Right Arrow */}
        <button
          onClick={handleForward}
          className="absolute right-0 w-20 h-20 bg-white/30 hover:bg-white/40 rounded-full flex items-center justify-center text-white text-4xl shadow-xl"
        >
          ❭
        </button>
      </div>
    </div>
  );
};

export default CharacterIntro;
