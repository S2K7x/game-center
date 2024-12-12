import React from 'react';
import { GameConfig } from '../../types/game';

interface SettingsModalProps {
  show: boolean;
  settings: GameConfig;
  onClose: () => void;
  onSave: (settings: GameConfig) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  show,
  settings,
  onClose,
  onSave,
}) => {
  const [tempSettings, setTempSettings] = React.useState(settings);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">Game Settings</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Grid Size</label>
            <input
              type="range"
              min="10"
              max="30"
              value={tempSettings.gridSize}
              onChange={(e) =>
                setTempSettings({
                  ...tempSettings,
                  gridSize: Number(e.target.value),
                })
              }
              className="w-full"
            />
            <span className="text-sm text-gray-400">{tempSettings.gridSize}x{tempSettings.gridSize}</span>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Game Speed</label>
            <input
              type="range"
              min="50"
              max="200"
              step="10"
              value={tempSettings.speed}
              onChange={(e) =>
                setTempSettings({
                  ...tempSettings,
                  speed: Number(e.target.value),
                })
              }
              className="w-full"
            />
            <span className="text-sm text-gray-400">
              {tempSettings.speed === 50 ? 'Fast' : tempSettings.speed === 200 ? 'Slow' : 'Normal'}
            </span>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Theme</label>
            <select
              value={tempSettings.theme}
              onChange={(e) =>
                setTempSettings({
                  ...tempSettings,
                  theme: e.target.value as GameConfig['theme'],
                })
              }
              className="w-full bg-gray-700 rounded px-3 py-2"
            >
              <option value="classic">Classic</option>
              <option value="neon">Neon</option>
              <option value="retro">Retro</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="sound"
              checked={tempSettings.soundEnabled}
              onChange={(e) =>
                setTempSettings({
                  ...tempSettings,
                  soundEnabled: e.target.checked,
                })
              }
              className="w-4 h-4"
            />
            <label htmlFor="sound" className="text-sm font-medium">
              Enable Sound Effects
            </label>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={() => {
              onSave(tempSettings);
              onClose();
            }}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Save Settings
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};