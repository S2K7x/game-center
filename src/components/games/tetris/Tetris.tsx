import React, { useRef, useState } from 'react';
import { useTetris } from '../../../hooks/useTetris';
import { GameConfig } from '../../../types/game';
import { Instructions } from '../../ui/Instructions';
import { Leaderboard } from '../../ui/Leaderboard';
import { GameControls } from '../../ui/GameControls';

interface TetrisProps {
  settings: GameConfig;
}

export const Tetris: React.FC<TetrisProps> = ({ settings }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showModal, setShowModal] = useState(false);
  const game = useTetris(canvasRef, settings, () => setShowModal(true));

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Tetris</h1>
        <GameControls game={game} />
      </div>
      
      <div className="flex gap-8">
        <div>
          <canvas
            ref={canvasRef}
            width={300}
            height={600}
            className="bg-gray-700 rounded-lg"
          />
        </div>
        
        <div className="flex-1">
          <Instructions
            instructions={[
              'Left/Right Arrow: Move piece',
              'Up Arrow: Rotate piece',
              'Down Arrow: Soft drop',
              'Space: Hard drop',
              'P: Pause game',
            ]}
          />
          <Leaderboard scores={game.highScores} gameName="tetris" />
        </div>
      </div>
    </div>
  );
};