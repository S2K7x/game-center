import React from 'react';
import { Clock, Target, Trophy } from 'lucide-react';

interface GameStatsProps {
  score: number;
  time: number;
  bestScore: number;
}

export const GameStats: React.FC<GameStatsProps> = ({ score, time, bestScore }) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="grid grid-cols-3 gap-4 mb-4">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3">
        <div className="flex items-center gap-2 text-gray-400 mb-1">
          <Target className="w-4 h-4" />
          <span className="text-sm">Score</span>
        </div>
        <div className="font-mono text-xl">{score}</div>
      </div>
      
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3">
        <div className="flex items-center gap-2 text-gray-400 mb-1">
          <Clock className="w-4 h-4" />
          <span className="text-sm">Time</span>
        </div>
        <div className="font-mono text-xl">{formatTime(time)}</div>
      </div>
      
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3">
        <div className="flex items-center gap-2 text-gray-400 mb-1">
          <Trophy className="w-4 h-4" />
          <span className="text-sm">Best</span>
        </div>
        <div className="font-mono text-xl">{bestScore}</div>
      </div>
    </div>
  );
};