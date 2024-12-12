import React from 'react';
import { Trophy } from 'lucide-react';
import { GameScore } from '../../types/game';
import { formatDate } from '../../utils/date';

interface LeaderboardProps {
  scores: GameScore[];
  gameName: string;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ scores, gameName }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 mt-4">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-5 h-5 text-yellow-500" />
        <h2 className="text-lg font-semibold">Top Scores</h2>
      </div>
      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
        {scores.filter(score => score.game === gameName).map((score, index) => (
          <div
            key={`${score.playerName}-${score.date}`}
            className="flex items-center gap-3 p-2 bg-gray-700/50 rounded-lg transition-all hover:bg-gray-700"
          >
            <span className="font-mono text-lg text-gray-400 w-6">{index + 1}</span>
            <div className="flex-1">
              <div className="font-medium">{score.playerName}</div>
              <div className="text-sm text-gray-400">{formatDate(score.date)}</div>
            </div>
            <div className="font-mono text-lg text-green-500">{score.score}</div>
          </div>
        ))}
        {scores.length === 0 && (
          <div className="text-center text-gray-400 py-4">No scores yet!</div>
        )}
      </div>
    </div>
  );
};