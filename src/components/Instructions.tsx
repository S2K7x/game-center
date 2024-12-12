import React from 'react';

export const Instructions = () => {
  return (
    <div className="mt-4 text-gray-300">
      <h3 className="font-semibold mb-2">How to Play:</h3>
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Use arrow keys or WASD to control the snake</li>
        <li>Collect food to grow and earn points</li>
        <li>Avoid hitting walls and yourself</li>
        <li>Press Space to pause/resume</li>
      </ul>
    </div>
  );
};