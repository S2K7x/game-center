import React from 'react';

interface LeaderboardProps {
  scores: number[];
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ scores }) => {
  return (
    <div className="space-y-2">
      {scores.map((score, index) => (
        <div
          key={index}
          className="flex justify-between items-center p-2 bg-gray-700 rounded"
        >
          <span className="font-semibold">#{index + 1}</span>
          <span>{score} points</span>
        </div>
      ))}
      {scores.length === 0 && (
        <p className="text-gray-400 text-center">No high scores yet!</p>
      )}
    </div>
  );
};