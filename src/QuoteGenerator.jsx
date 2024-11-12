import React, { useState } from 'react';

const QuoteGenerator = () => {
  const quotes = [
    {
      text: "You are not alone in this journey. Every step forward is progress.",
      author: "Self-Care Wisdom"
    },
    {
      text: "Your feelings are valid. It's okay to take time to process them.",
      author: "Mental Health Journey"
    },
    {
      text: "Sometimes the smallest step in the right direction ends up being the biggest step of your life.",
      author: "Mindful Living"
    },
    {
      text: "Growth is not always linear. Be patient with yourself.",
      author: "Personal Growth"
    },
    {
      text: "Your worth is not measured by your productivity.",
      author: "Self-Worth Reminder"
    },
    {
      text: "Each day is a new beginning. Your past does not define your future.",
      author: "Daily Wisdom"
    },
    {
      text: "Take care of yourself as you would a dear friend.",
      author: "Self-Compassion"
    },
    {
      text: "You've overcome difficult times before. You have that strength within you.",
      author: "Inner Strength"
    }
  ];

  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [animation, setAnimation] = useState('');

  const getNewQuote = () => {
    setAnimation('fade-out');
    setTimeout(() => {
      const newQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setCurrentQuote(newQuote);
      setAnimation('fade-in');
    }, 500);
  };

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
      <div className={`space-y-4 ${animation}`}>
        <p className="text-lg font-medium text-gray-800">"{currentQuote.text}"</p>
        <p className="text-gray-600">- {currentQuote.author}</p>
      </div>
      
      <button
        onClick={getNewQuote}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        New Quote ✨
      </button>

      <style jsx>{`
        .fade-out {
          opacity: 0;
          transition: opacity 0.5s ease-out;
        }
        .fade-in {
          opacity: 1;
          transition: opacity 0.5s ease-in;
        }
      `}</style>
    </div>
  );
};

export default QuoteGenerator;