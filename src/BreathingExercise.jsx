import React, { useState, useEffect } from 'react';

const BreathingExercise = () => {
  const [isBreathing, setIsBreathing] = useState(false);
  const [phase, setPhase] = useState('ready'); // ready, inhale, hold, exhale
  const [timer, setTimer] = useState(0);

  const startBreathing = () => {
    setIsBreathing(true);
    setPhase('inhale');
  };

  useEffect(() => {
    let interval;
    if (isBreathing) {
      interval = setInterval(() => {
        setTimer(prev => {
          const newTime = prev + 1;
          
          // 4-7-8 breathing technique
          if (phase === 'inhale' && newTime >= 4) {
            setPhase('hold');
            return 0;
          } else if (phase === 'hold' && newTime >= 7) {
            setPhase('exhale');
            return 0;
          } else if (phase === 'exhale' && newTime >= 8) {
            setPhase('inhale');
            return 0;
          }
          
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isBreathing, phase]);

  const getInstructions = () => {
    switch (phase) {
      case 'inhale': return 'Breathe in slowly...';
      case 'hold': return 'Hold your breath...';
      case 'exhale': return 'Exhale slowly...';
      default: return 'Click to start';
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-blue-50 rounded-lg">
      <h3 className="text-xl font-bold mb-4">Breathing Exercise</h3>
      
      <div className="relative w-48 h-48 mb-4">
        <div
          className={`absolute inset-0 bg-blue-200 rounded-full transition-all duration-1000 
            ${phase === 'inhale' ? 'scale-150 opacity-50' : 
              phase === 'hold' ? 'scale-150 opacity-70' : 
              'scale-100 opacity-50'}`}
        />
        <div
          className={`absolute inset-0 bg-blue-400 rounded-full transition-all duration-1000
            ${phase === 'inhale' ? 'scale-125' : 
              phase === 'hold' ? 'scale-125' : 
              'scale-100'}`}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white font-bold text-2xl">{timer}</p>
        </div>
      </div>

      <p className="text-lg mb-4">{getInstructions()}</p>
      
      {!isBreathing && (
        <button
          onClick={startBreathing}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Start Breathing Exercise
        </button>
      )}
    </div>
  );
};

export default BreathingExercise;