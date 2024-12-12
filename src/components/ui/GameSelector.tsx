import React from 'react';
import { Joystick, Grid3X3 } from 'lucide-react';

interface GameSelectorProps {
  currentGame: string;
  onSelect: (game: 'snake' | 'tetris') => void;
}

export const GameSelector: React.FC<GameSelectorProps> = ({ currentGame, onSelect }) => {
  return (
    <div className="flex gap-3">
      <button
        onClick={() => onSelect('snake')}
        className={`px-6 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg ${
          currentGame === 'snake'
            ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-green-500/25'
            : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
        }`}
      >
        <Joystick className="w-5 h-5" />
        Snake
      </button>
      <button
        onClick={() => onSelect('tetris')}
        className={`px-6 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg ${
          currentGame === 'tetris'
            ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-green-500/25'
            : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
        }`}
      >
        <Grid3X3 className="w-5 h-5" />
        Tetris
      </button>
    </div>
  );
};