import React from 'react';

interface InstructionsProps {
  instructions: string[];
}

export const Instructions: React.FC<InstructionsProps> = ({ instructions }) => {
  return (
    <div className="mt-4 text-gray-300">
      <h3 className="font-semibold mb-2">How to Play:</h3>
      <ul className="list-disc list-inside space-y-1 text-sm">
        {instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ul>
    </div>
  );
};