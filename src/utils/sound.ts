const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

const sounds: { [key: string]: OscillatorNode } = {};

export const playSound = (type: 'eat' | 'gameOver') => {
  try {
    if (sounds[type]) {
      sounds[type].stop();
    }

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    switch (type) {
      case 'eat':
        oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
        break;
      case 'gameOver':
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        oscillator.start();
        oscillator.frequency.exponentialRampToValueAtTime(
          110,
          audioContext.currentTime + 0.5
        );
        oscillator.stop(audioContext.currentTime + 0.5);
        break;
    }

    sounds[type] = oscillator;
  } catch (error) {
    console.error('Error playing sound:', error);
  }
};