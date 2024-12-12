import React, { useRef, useState } from 'react';
import { useSnake } from '../../../hooks/useSnake';
import { GameConfig } from '../../../types/game';
import { Instructions } from '../../ui/Instructions';
import { Leaderboard } from '../../ui/Leaderboard';
import { GameControls } from '../../ui/GameControls';
import { GameStats } from '../../ui/GameStats';
import { PlayerNameModal } from '../../ui/PlayerNameModal';
import { useGameTimer } from '../../../hooks/useGameTimer';

interface SnakeProps {
  settings: GameConfig;
}

export const Snake: React.FC<SnakeProps> = ({ settings }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showGameOver, setShowGameOver] = useState(false);
  const [showNameModal, setShowNameModal] = useState(true);
  
  const {
    score,
    highScores,
    gameOver,
    isPaused,
    startGame,
    pauseGame,
    resetGame,
    submitScore,
  } = useSnake(canvasRef, settings, () => setShowGameOver(true));

  const { time } = useGameTimer(!isPaused && !gameOver);

  const handleNameSubmit = (playerName: string) => {
    setShowNameModal(false);
    localStorage.setItem('playerName', playerName);
  };

  return (
    <div className="space-y-6">
      <GameStats
        score={score}
        time={time}
        bestScore={Math.max(...highScores.map(s => s.score), 0)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Snake</h1>
              <GameControls
                game={{ isPaused, gameOver, startGame, pauseGame, resetGame }}
              />
            </div>
            <canvas
              ref={canvasRef}
              width={480}
              height={480}
              className="bg-gray-700 rounded-lg w-full aspect-square"
            />
            <Instructions
              instructions={[
                'Use Arrow keys or WASD to move',
                'Collect food to grow and score points',
                'Avoid hitting walls and yourself',
                'Press Space to pause/resume',
              ]}
            />
          </div>
        </div>
        <div className="lg:col-span-1">
          <Leaderboard scores={highScores} gameName="snake" />
        </div>
      </div>

      <PlayerNameModal
        show={showNameModal}
        onSubmit={handleNameSubmit}
      />
    </div>
  );
};