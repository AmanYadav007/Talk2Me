import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MoodVisualization = ({ entries }) => {
  const moodToValue = {
    'difficult': 1,
    'neutral': 2,
    'hopeful': 3
  };

  const chartData = entries.map(entry => ({
    date: new Date(entry.date).toLocaleDateString(),
    mood: moodToValue[entry.mood],
    moodLabel: entry.mood
  })).reverse();

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const moodNames = {
        1: 'Difficult',
        2: 'Neutral',
        3: 'Hopeful'
      };
      
      return (
        <div className="bg-white p-2 rounded shadow">
          <p className="text-sm">{payload[0].payload.date}</p>
          <p className="text-sm font-bold">{moodNames[payload[0].value]}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-64 bg-white rounded-lg p-4">
      <h3 className="text-xl font-bold mb-4">Mood Trends</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date"
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            domain={[1, 3]}
            ticks={[1, 2, 3]}
            tickFormatter={(value) => {
              const moodNames = {
                1: 'Difficult',
                2: 'Neutral',
                3: 'Hopeful'
              };
              return moodNames[value];
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="mood" 
            stroke="#4F46E5" 
            strokeWidth={2}
            dot={{ fill: '#4F46E5' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MoodVisualization;