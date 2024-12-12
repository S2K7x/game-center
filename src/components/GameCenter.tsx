import React, { useState } from 'react';
import { Settings, Gamepad2, Github } from 'lucide-react';
import { Snake } from './games/snake/Snake';
import { Tetris } from './games/tetris/Tetris';
import { GameSelector } from './ui/GameSelector';
import { SettingsModal } from './ui/SettingsModal';
import { useGameSettings } from '../hooks/useGameSettings';

export const GameCenter = () => {
  const [currentGame, setCurrentGame] = useState<'snake' | 'tetris'>('snake');
  const [showSettings, setShowSettings] = useState(false);
  const { settings, updateSettings } = useGameSettings();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-lg shadow-lg">
              <Gamepad2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Game Center
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <GameSelector currentGame={currentGame} onSelect={setCurrentGame} />
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              title="Settings"
            >
              <Settings className="w-6 h-6" />
            </button>
            <a
              href="https://github.com/yourusername/game-center"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Game Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 transform hover:scale-[1.01] transition-transform duration-300">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-gray-700/50">
              {currentGame === 'snake' ? (
                <Snake settings={settings} />
              ) : (
                <Tetris settings={settings} />
              )}
            </div>
          </div>
          <div className="lg:col-span-1">
            {/* Add your leaderboard or additional content here */}
          </div>
        </div>
      </div>

      <SettingsModal
        show={showSettings}
        settings={settings}
        onClose={() => setShowSettings(false)}
        onSave={updateSettings}
      />
    </div>
  );
};