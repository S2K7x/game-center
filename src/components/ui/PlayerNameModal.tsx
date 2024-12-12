import React, { useState } from 'react';
import { User } from 'lucide-react';

interface PlayerNameModalProps {
  show: boolean;
  onSubmit: (name: string) => void;
}

export const PlayerNameModal: React.FC<PlayerNameModalProps> = ({ show, onSubmit }) => {
  const [name, setName] = useState('');

  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content max-w-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-600/20 rounded-lg">
            <User className="w-6 h-6 text-green-500" />
          </div>
          <h2 className="text-xl font-semibold">Enter Your Name</h2>
        </div>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full px-4 py-2 bg-gray-700 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          maxLength={20}
          autoFocus
        />

        <button
          onClick={() => onSubmit(name || 'Player')}
          disabled={name.length > 20}
          className="game-button w-full"
        >
          Start Playing
        </button>

        {name.length > 20 && (
          <p className="text-red-500 text-sm mt-2">
            Name must be 20 characters or less
          </p>
        )}
      </div>
    </div>
  );
};