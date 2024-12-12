export interface GameConfig {
  gridSize: number;
  speed: number;
  soundEnabled: boolean;
  theme: 'classic' | 'neon' | 'retro';
}

export interface Position {
  x: number;
  y: number;
}

export interface GameScore {
  playerName: string;
  score: number;
  game: string;
  date: string;
}