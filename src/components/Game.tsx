import React, { useEffect, useRef, useState } from 'react';
import { useGame } from '../hooks/useGame';
import { Trophy, Play, RotateCcw, Pause } from 'lucide-react';
import { GameOverModal } from './GameOverModal';
import { Instructions } from './Instructions';
import { Leaderboard } from './Leaderboard';

export const Game = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showModal, setShowModal] = useState(false);
  const {
    score,
    highScores,
    gameOver,
    isPaused,
    startGame,
    pauseGame,
    resetGame,
    handleKeyPress,
  } = useGame(canvasRef, () => setShowModal(true));

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Snake Game</h1>
                <div className="flex items-center gap-4">
                  <span className="text-xl">Score: {score}</span>
                  {!gameOver && (
                    <button
                      onClick={isPaused ? startGame : pauseGame}
                      className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                    >
                      {isPaused ? (
                        <Play className="w-6 h-6" />
                      ) : (
                        <Pause className="w-6 h-6" />
                      )}
                    </button>
                  )}
                  <button
                    onClick={resetGame}
                    className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                  >
                    <RotateCcw className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <canvas
                ref={canvasRef}
                width={480}
                height={480}
                className="bg-gray-700 rounded-lg w-full max-w-[480px] mx-auto"
              />
              <Instructions />
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-6 h-6 text-yellow-500" />
                <h2 className="text-xl font-bold">High Scores</h2>
              </div>
              <Leaderboard scores={highScores} />
            </div>
          </div>
        </div>
      </div>
      <GameOverModal
        show={showModal}
        score={score}
        onClose={() => setShowModal(false)}
        onRestart={resetGame}
      />
    </div>
  );
};