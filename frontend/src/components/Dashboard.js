// Updated styling for Dashboard screen
import React, { useState } from 'react';
import { characters } from '../data/characters';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const questions = [
  {
    id: 1,
    text: "Your dishwasher has become faulty and is creating a lot of noise affecting your roommates and neighbors.",
    options: [
      {
        label: "A",
        text: "Get a handy man to fix your dishwasher.",
        effects: { community: 10, resources: -15 },
      },
      {
        label: "B",
        text: "Fix it yourself.",
        effects: { community: 5, resources: -10 },
      },
      {
        label: "C",
        text: "Leave it and let it continue to make noise.",
        effects: { community: -10, resources: 0 },
      },
    ],
  },
  {
    id: 2,
    text: "You notice your neighbor's trash overflowing onto the street.",
    options: [
      { label: "A", text: "Politely let them know and offer to help clean it.", effects: { community: 10, resources: -5 } },
      { label: "B", text: "Ignore the situation.", effects: { community: -5, resources: 0 } },
      { label: "C", text: "Report them anonymously.", effects: { community: 0, resources: -2 } }
    ]
  },
  {
    id: 3,
    text: "Your roommate fell sick and asked for help with groceries.",
    options: [
      { label: "A", text: "Do their groceries and cook a meal.", effects: { community: 15, resources: -10 } },
      { label: "B", text: "Just order food online for them.", effects: { community: 5, resources: -5 } },
      { label: "C", text: "Tell them you’re too busy.", effects: { community: -10, resources: 0 } }
    ]
  },
  {
    id: 4,
    text: "You notice mold forming on the walls in your shared apartment, which could impact everyone's respiratory health.",
    options: [
      { label: "A", text: "Call maintenance immediately to get it fixed.", effects: { community: 10, resources: -10 } },
      { label: "B", text: "Try to clean it with a basic cleaning solution.", effects: { community: 5, resources: -3 } },
      { label: "C", text: "Ignore it and hope someone else deals with it.", effects: { community: -10, resources: 0 } }
    ]
  },
  {
    id: 5,
    text: "The air quality around your neighborhood has worsened due to increased traffic emissions.",
    options: [
      { label: "A", text: "Organize a carpool initiative to reduce vehicle usage.", effects: { community: 10, resources: -5 } },
      { label: "B", text: "Start wearing a mask when outdoors.", effects: { community: 2, resources: -2 } },
      { label: "C", text: "Continue your routine without taking any action.", effects: { community: -5, resources: 0 } }
    ]
  }
];

const ScoreBar = ({ label, value, color, dynamicColor = false, lastEffects, fadeEffect }) => {
  const segments = label === 'Community' ? 40 : 20;
  const isCommunity = label.toLowerCase() === 'community';
  const adjustedValue = isCommunity
    ? Math.round(((value + 100) / 200) * segments)
    : Math.round((value / 100) * segments);

  const actualColor = (i) => {
    if (!dynamicColor) return color;
    if (label === 'Community') return i < segments / 2 ? 'bg-red-500' : 'bg-blue-500';
    return value < 0 ? 'bg-red-500' : 'bg-blue-500';
  };

  return (
    <div className="mb-6 relative overflow-visible flex items-center">
      <div className="w-24 text-sm font-bold text-blue-900 mr-4">{label}</div>
      <div className="flex-1 relative">
        <div className="relative mb-1">
          <div className="absolute -top-6 left-0 w-full px-4 flex justify-between text-xs font-semibold text-blue-900 z-20 pointer-events-none">
            {label === 'Community' ? (
              <>
                <span>-100</span>
                <span>0</span>
                <span>100</span>
              </>
            ) : (
              <>
                <span>0</span>
                <span className="mx-auto">50</span>
                <span>100</span>
              </>
            )}
          </div>

          <div className="flex border border-white w-full h-6 rounded overflow-hidden relative">
            {[...Array(segments)].map((_, i) => (
              <div
                key={i}
                className={`w-full h-full border-r border-white last:border-r-0 ${i < adjustedValue ? actualColor(i) : 'bg-gray-200'} flex items-center justify-center text-[10px] font-bold text-black transition-all duration-300 ease-in-out`}
              ></div>
            ))}
          </div>
        </div>

        {label === 'Community' && fadeEffect?.community && lastEffects && (
          <span className={`absolute top-1/2 left-full ml-2 transform -translate-y-1/2 text-sm font-semibold ${lastEffects.community > 0 ? 'text-green-400' : 'text-red-400'} animate-fade`}>
            {lastEffects.community > 0 ? `+${lastEffects.community}` : lastEffects.community}
          </span>
        )}

        {label === 'Resources' && fadeEffect?.resources && lastEffects && (
          <span className={`absolute top-1/2 left-full ml-2 transform -translate-y-1/2 text-sm font-semibold ${lastEffects.resources > 0 ? 'text-green-400' : 'text-red-400'} animate-fade`}>
            {lastEffects.resources > 0 ? `+${lastEffects.resources}` : lastEffects.resources}
          </span>
        )}
      </div>
    </div>
  );
};

const DashboardWithQuestions = () => {
  const navigate = useNavigate();
  const selectedIndex = parseInt(localStorage.getItem('selectedCharacterIndex'), 10);
  const character = characters[selectedIndex];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selections, setSelections] = useState([]);
  const [score, setScore] = useState({
    health: Math.min(100, character.health),
    community: Math.min(100, character.community),
    resources: Math.min(100, character.resources),
  });
  const [lastEffects, setLastEffects] = useState(null);
  const [fadeEffect, setFadeEffect] = useState({ community: false, resources: false });
  const [showResultPopup, setShowResultPopup] = useState(false);

  const handleOptionSelect = (effects) => {
    setLastEffects(effects);
    setShowResultPopup(true);
    setFadeEffect({ community: true, resources: true });
    setTimeout(() => setFadeEffect({ community: false, resources: false }), 2000);

    setScore(prev => {
      const updated = {
        ...prev,
        community: Math.max(-100, Math.min(100, prev.community + effects.community)),
        resources: Math.max(0, Math.min(100, prev.resources + effects.resources)),
        health: Math.max(0, Math.min(100, prev.health)),
      };

      if (updated.health <= 0 || updated.resources <= 0 || updated.community <= -100) {
        navigate('/gameover');
        return prev;
      }

      return updated;
    });
  };

  const handleNext = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex >= questions.length) {
      navigate('/gameover');
    } else {
      setCurrentQuestionIndex(nextIndex);
      setShowResultPopup(false);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const pieData = {
    labels: ['Community', 'Resources'],
    datasets: [
      {
        label: 'Impact',
        data: [lastEffects?.community || 0, lastEffects?.resources || 0],
        backgroundColor: [
          lastEffects?.community > 0 ? '#34D399' : '#F87171',
          lastEffects?.resources > 0 ? '#FBBF24' : '#F87171'
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 p-8 flex flex-col items-center justify-center text-white relative">
      {showResultPopup && <div className="absolute inset-0 bg-black bg-opacity-50 z-40 transition-opacity"></div>}

      <div className="absolute top-8 w-full max-w-6xl z-10">
        <div className="flex justify-between items-center mb-2">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`flex flex-col items-center flex-1 ${i === currentQuestionIndex ? 'text-yellow-400' : 'text-white'}`}
            >
              <div
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold mb-1 transition-all duration-300 ease-in-out
                  ${i === currentQuestionIndex ? 'border-yellow-400 bg-yellow-400 text-blue-900 shadow-lg scale-110' : 'border-white bg-transparent'}`}
              >
                {i === currentQuestionIndex ? <Star size={16} className="mr-1" /> : null}
                {i + 1}
              </div>
              <span className="text-[10px]">Lvl {i + 1}</span>
            </div>
          ))}
        </div>
        <div className="flex h-2 rounded bg-white bg-opacity-20 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`flex-1 transition-all mx-0.5 rounded-full ${i <= currentQuestionIndex ? 'bg-yellow-400' : 'bg-white bg-opacity-20'}`}
            ></div>
          ))}
        </div>
      </div>

      {showResultPopup && lastEffects && (
        <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 bg-white text-blue-900 rounded-xl shadow-xl p-8 w-[600px] z-50">
          <h2 className="text-xl font-bold mb-4 text-center">Impact of Your Choice</h2>
          <div className="flex gap-4 items-center">
          <div className="flex-1 text-base sm:text-lg">
    <p className="mb-2">Based on your choice, the situation had a noticeable impact:</p>
    <ul className="list-disc list-inside text-sm sm:text-base">
      <li>Your decision affected the community engagement score by {lastEffects.community > 0 ? `+${lastEffects.community}` : lastEffects.community} points.</li>
      <li>Resource consumption changed by {lastEffects.resources > 0 ? `+${lastEffects.resources}` : lastEffects.resources} points.</li>
    </ul>
  </div>
  <div className="w-48 h-48">
    <Pie data={pieData} />
  </div>
</div>

          <button onClick={handleNext} className="mt-6 block mx-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow">
            Next
          </button>
        </div>
      )}

      <div className="flex w-full max-w-6xl gap-10 items-start mt-32 z-10">
        <div className="flex flex-col items-center w-1/3">
          <img
            src={character.image}
            alt={character.name}
            className={`w-60 h-60 object-cover rounded-full shadow-lg mb-4 transition-transform duration-300 ${lastEffects ? (lastEffects.community > 0 || lastEffects.resources > 0 ? 'scale-105' : 'scale-95') : ''}`}
          />
          <h2 className="text-2xl font-bold mb-2 text-white">{character.name}</h2>
          <div className="text-base text-white text-center space-y-1">
            <p>Health: {score.health}</p>
            <p>Community: {score.community}</p>
            <p>Resources: {score.resources}</p>
          </div>
        </div>

        <div className="w-2/3 bg-blue-100 bg-opacity-90 backdrop-blur-md rounded-2xl shadow-lg p-8 text-blue-900">
          {currentQuestion && !showResultPopup ? (
            <>
              <div className="relative mb-10">
                <div className="bg-white bg-opacity-90 border-l-8 border-blue-500 rounded-xl shadow-md px-6 py-6 md:px-8 md:py-8 text-lg md:text-2xl font-semibold text-left text-blue-900 leading-relaxed">
                  {currentQuestion.text}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {currentQuestion.options.map((opt, idx) => (
                  <div
                    key={idx}
                    className="border rounded-lg p-4 cursor-pointer hover:bg-blue-100 hover:bg-opacity-50"
                    onClick={() => {
                      setSelections(prev => {
                        const updated = [
                          ...prev,
                          {
                            questionId: currentQuestion.id,
                            optionIndex: idx,
                            effects: opt.effects
                          }
                        ];
                    
                        // Store immediately if it's the last question
                        if (currentQuestionIndex + 1 >= questions.length) {
                          const scoreTimeline = [];
                          let community = character.community;
                          let resources = character.resources;
                          let health = character.health;
                    
                          updated.forEach((s, i) => {
                            community = Math.max(-100, Math.min(100, community + s.effects.community));
                            resources = Math.max(0, Math.min(100, resources + s.effects.resources));
                            // If health changes in future, update it too
                            scoreTimeline.push({
                              question: `Q${i + 1}`,
                              community,
                              resources,
                              health
                            });
                          });
                    
                          localStorage.setItem('performanceData', JSON.stringify(scoreTimeline));
                        }
                    
                        return updated;
                      });
                    
                      handleOptionSelect(opt.effects);
                    }}
                    
                    
                    
                  >
                    <p className="font-bold text-lg mb-2">Option {opt.label}</p>
                    <p className="mb-2">{opt.text}</p>
                    <p className="text-sm">Community/Outreach: {opt.effects.community > 0 ? '+' : ''}{opt.effects.community}</p>
                    <p className="text-sm">Resources: {opt.effects.resources > 0 ? '+' : ''}{opt.effects.resources}</p>
                  </div>
                ))}
              </div>
            </>
          ) : null}

          <div className="mt-10 space-y-6">
            <ScoreBar label="Health" value={score.health} color="bg-green-500" />
            <ScoreBar label="Community" value={score.community} dynamicColor={true} lastEffects={lastEffects} fadeEffect={fadeEffect} />
            <ScoreBar label="Resources" value={score.resources} color="bg-yellow-500" lastEffects={lastEffects} fadeEffect={fadeEffect} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardWithQuestions;
