import { useState, useEffect } from 'react';

export const useGameTimer = (isPlaying: boolean) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: number;

    if (isPlaying) {
      interval = window.setInterval(() => {
        setTime(t => t + 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying]);

  const resetTimer = () => setTime(0);

  return { time, resetTimer };
};