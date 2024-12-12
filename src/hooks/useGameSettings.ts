import { useState, useEffect } from 'react';
import { GameConfig } from '../types/game';

const DEFAULT_SETTINGS: GameConfig = {
  gridSize: 20,
  speed: 100,
  soundEnabled: true,
  theme: 'classic',
};

export const useGameSettings = () => {
  const [settings, setSettings] = useState<GameConfig>(() => {
    const saved = localStorage.getItem('gameSettings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const updateSettings = (newSettings: GameConfig) => {
    setSettings(newSettings);
    localStorage.setItem('gameSettings', JSON.stringify(newSettings));
  };

  return { settings, updateSettings };
};