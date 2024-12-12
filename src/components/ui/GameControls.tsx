import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface GameControlsProps {
  game: {
    isPaused: boolean;
    gameOver: boolean;
    startGame: () => void;
    pauseGame: () => void;
    resetGame: () => void;
  };
}

export const GameControls: React.FC<GameControlsProps> = ({ game }) => {
  return (
    <div className="flex items-center gap-4">
      {!game.gameOver && (
        <button
          onClick={game.isPaused ? game.startGame : game.pauseGame}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors"
        >
          {game.isPaused ? (
            <Play className="w-6 h-6" />
          ) : (
            <Pause className="w-6 h-6" />
          )}
        </button>
      )}
      <button
        onClick={game.resetGame}
        className="p-2 rounded-full hover:bg-gray-700 transition-colors"
      >
        <RotateCcw className="w-6 h-6" />
      </button>
    </div>
  );
};