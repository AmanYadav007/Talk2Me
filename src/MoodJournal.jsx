import React, { useState, useRef, useEffect } from 'react';
import BreathingExercise from './BreathingExercise';
import MoodVisualization from './MoodVisualization';
import QuoteGenerator from './QuoteGenerator';
import SpiderGif from './spider.gif'


const AICompanion = ({ message, isThinking }) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    if (isThinking) {
      const interval = setInterval(() => {
        setDots(prev => prev.length >= 3 ? '' : prev + '.');
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isThinking]);


  return (
    <div className="flex items-start gap-4 mb-6">
      <div className="relative w-24 h-24 flex-shrink-0">
        <img 
          src= {SpiderGif}
          alt="AI Assistant"
          className="w-full h-full rounded-full object-cover"
        />
        {isThinking && (
          <div className="absolute -top-1 -right-1 w-4 h-4">
            <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></div>
            <div className="relative inline-flex rounded-full h-4 w-4 bg-purple-500"></div>
          </div>
        )}
      </div>

      {/* Message Bubble */}
      <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4 max-w-md shadow-lg">
        <p className="text-gray-800">
          {isThinking ? `Thinking${dots}` : message}
        </p>
      </div>
    </div>
  );
};

// Music Player Component
const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);
  
  const tracks = [
    {
      name: "Calm Meditation",
      emoji: "🌅",
      url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3"
    },
    {
      name: "Peaceful Rain",
      emoji: "🌧",
      url: "https://cdn.pixabay.com/download/audio/2022/03/24/audio_017a2186d4.mp3"
    },
    {
      name: "Ocean Waves",
      emoji: "🌊",
      url: "https://cdn.pixabay.com/download/audio/2021/08/09/audio_dc39bde808.mp3"
    },
    {
      name: "Forest Ambience",
      emoji: "🌲",
      url: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0fd6a9524.mp3"
    },
    {
      name: "Soft Piano",
      emoji: "🎹",
      url: "https://cdn.pixabay.com/download/audio/2022/03/09/audio_2dbe9922c9.mp3"
    }
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = tracks[currentTrack].url;
      if (isPlaying) {
        audioRef.current.play().catch(error => console.log("Audio play failed:", error));
      }
    }
  }, [currentTrack, tracks]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => console.log("Audio play failed:", error));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTrackEnd = () => {
    const nextTrack = (currentTrack + 1) % tracks.length;
    setCurrentTrack(nextTrack);
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 w-72">
      <audio
        ref={audioRef}
        onEnded={handleTrackEnd}
        loop={false}
      />
      
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-medium">Ambient Sounds</h4>
        <div className="flex items-center gap-2">
          <button 
            onClick={togglePlay}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
          >
            {isPlaying ? "⏸️" : "▶️"}
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-2">Volume</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div className="space-y-2 max-h-48 overflow-y-auto">
        {tracks.map((track, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentTrack(index);
              setIsPlaying(true);
            }}
            className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between
              ${currentTrack === index ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
          >
            <div className="flex items-center gap-2">
              <span>{track.emoji}</span>
              <span className="text-sm">{track.name}</span>
            </div>
            {currentTrack === index && isPlaying && (
              <div className="flex gap-1">
                <div className="w-1 h-4 bg-blue-600 animate-[soundbar_500ms_ease-in-out_infinite]"></div>
                <div className="w-1 h-4 bg-blue-600 animate-[soundbar_600ms_ease-in-out_infinite]"></div>
                <div className="w-1 h-4 bg-blue-600 animate-[soundbar_400ms_ease-in-out_infinite]"></div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

// Main Journal Component
const MoodJournal = () => {
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState('');
  const [mood, setMood] = useState('neutral');
  const [view, setView] = useState('journal');
  const [aiMessage, setAIMessage] = useState("Hi there! I'm here to listen and support you. How are you feeling today?");
  const [isThinking, setIsThinking] = useState(false);
  const [gratitudeList, setGratitudeList] = useState([]);
  const [gratitudeInput, setGratitudeInput] = useState('');

  const copingStrategies = [
    {
      emoji: "🫁",
      title: "Deep Breathing",
      description: "Take 5 deep breaths, counting to 4 on inhale and 6 on exhale"
    },
    {
      emoji: "🚶‍♂️",
      title: "Quick Walk",
      description: "Go for a short walk to clear your mind"
    },
    {
      emoji: "🎵",
      title: "Music Therapy",
      description: "Listen to your favorite uplifting song"
    },
    {
      emoji: "✍️",
      title: "Achievement Log",
      description: "Write down three things you're proud of accomplishing"
    },
    {
      emoji: "🤝",
      title: "Connect",
      description: "Reach out to a friend or family member for support"
    },
    {
      emoji: "🎁",
      title: "Self-Care",
      description: "Do something kind for yourself today"
    },
    {
      emoji: "🧘‍♂️",
      title: "Mindfulness",
      description: "Practice mindfulness for 5 minutes"
    },
    {
      emoji: "📝",
      title: "Reflection",
      description: "Write down your thoughts and feelings without judgment"
    }
  ];

  const aiResponses = {
    difficult: [
      "I hear you, and what you're feeling is valid. Would you like to explore these feelings together?",
      "That sounds challenging. Remember, it's okay to not be okay sometimes. What do you need right now?",
      "I'm here to listen without judgment. Would you like to tell me more about what's on your mind?"
    ],
    neutral: [
      "How are you processing things today? Sometimes talking it out can help bring clarity.",
      "Taking time to reflect is valuable. What's on your mind today?",
      "I'm here to support you. Would you like to explore what you're feeling?"
    ],
    hopeful: [
      "It's wonderful to see you feeling hopeful! What's bringing you joy today?",
      "Your resilience is inspiring. Would you like to share what's helping you stay positive?",
      "I'm glad you're feeling better! Remember this feeling for times when things get tough."
    ]
  };

  const getAIResponse = (mood) => {
    setIsThinking(true);
    setTimeout(() => {
      const responses = aiResponses[mood];
      const response = responses[Math.floor(Math.random() * responses.length)];
      setAIMessage(response);
      setIsThinking(false);
    }, 1500);
  };

  const addEntry = () => {
    if (currentEntry.trim()) {
      const newEntry = {
        text: currentEntry,
        mood: mood,
        date: new Date().toLocaleString(),
        id: Date.now()
      };
      setEntries([newEntry, ...entries]);
      setCurrentEntry('');
      getAIResponse(mood);
    }
  };

  const addGratitude = () => {
    if (gratitudeInput.trim()) {
      setGratitudeList([...gratitudeList, {
        text: gratitudeInput,
        date: new Date().toLocaleString(),
        id: Date.now()
      }]);
      setGratitudeInput('');
    }
  };

  const getMoodStats = () => {
    const total = entries.length;
    if (total === 0) return [];
    
    const moodCounts = entries.reduce((acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(moodCounts).map(([mood, count]) => ({
      mood,
      percentage: Math.round((count / total) * 100)
    }));
  };



  const Navigation = () => (
    <div className="flex gap-2 mb-6 flex-wrap">
      {[
        ['journal', '📝 Journal'],
        ['analytics', '📊 Insights'],
        ['breathing', '🫁 Breathing'],
        ['coping', '🌟 Self-Care'],
        ['gratitude', '🙏 Gratitude'],
        ['quotes', '💭 Quotes']
      ].map(([key, label]) => (
        <button
          key={key}
          onClick={() => setView(key)}
          className={`px-4 py-2 rounded-lg ${
            view === key ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );

  const renderView = () => {
    switch(view) {
      case 'analytics':
        return <MoodVisualization entries={entries} />;

      case 'breathing':
        return <BreathingExercise />;

      case 'quotes':
        return <QuoteGenerator />;

      case 'coping':
        return (
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Self-Care Toolkit</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {copingStrategies.map((strategy, index) => (
                <div key={index} className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{strategy.emoji}</span>
                    <h4 className="font-medium">{strategy.title}</h4>
                  </div>
                  <p className="text-gray-600">{strategy.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'gratitude':
        return (
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Gratitude Practice</h3>
            <div className="mb-4">
              <textarea
                value={gratitudeInput}
                onChange={(e) => setGratitudeInput(e.target.value)}
                placeholder="What are you grateful for today?"
                className="w-full h-24 p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={addGratitude}
                className="w-full mt-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                Add Gratitude ✨
              </button>
            </div>
            <div className="space-y-4">
              {gratitudeList.map(item => (
                <div key={item.id} className="p-4 bg-green-50 rounded-lg">
                  <p className="text-green-800">{item.text}</p>
                  <div className="text-sm text-gray-500 mt-2">{item.date}</div>
                </div>
              ))}
            </div>
          </div>
        );


      default: // journal view
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Safe Space Journal</h3>
              <div className="flex gap-4 mb-4">
                <button
                  onClick={() => setMood('difficult')}
                  className={`p-2 rounded-full ${mood === 'difficult' ? 'bg-blue-100' : 'bg-gray-50'}`}
                >
                  💙
                </button>
                <button
                  onClick={() => setMood('neutral')}
                  className={`p-2 rounded-full ${mood === 'neutral' ? 'bg-blue-100' : 'bg-gray-50'}`}
                >
                  💜
                </button>
                <button
                  onClick={() => setMood('hopeful')}
                  className={`p-2 rounded-full ${mood === 'hopeful' ? 'bg-blue-100' : 'bg-gray-50'}`}
                >
                  ✨
                </button>
              </div>
              <textarea
                value={currentEntry}
                onChange={(e) => setCurrentEntry(e.target.value)}
                placeholder="How are you feeling? This is a safe space to express yourself..."
                className="w-full h-32 p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 mb-4"
              />
              <button
                onClick={addEntry}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Share Your Thoughts ❤️
              </button>
            </div>

            <QuoteGenerator />

            <div className="space-y-4">
              {entries.map(entry => (
                <div key={entry.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-2">{entry.date}</div>
                  <p className="text-gray-700 whitespace-pre-wrap">{entry.text}</p>
                  <div className="flex items-center gap-2 mt-4">
                    <span className="text-sm text-blue-600">👍 You're not alone</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 min-h-screen bg-gray-50">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Safe Space</h1>
        <p className="text-gray-600">A place to express, reflect, and grow</p>
      </div>
      
      <div className="mb-6">
        <Navigation />
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <AICompanion message={aiMessage} isThinking={isThinking} />
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          {renderView()}
        </div>
      </div>

      <MusicPlayer />

      <style jsx global>{`
        @keyframes soundbar {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
};

export default MoodJournal;