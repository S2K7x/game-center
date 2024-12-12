import { GameScore } from '../types/game';

export const saveScore = (score: GameScore) => {
  const scores = getScores();
  scores.push(score);
  scores.sort((a, b) => b.score - a.score);
  const topScores = scores.slice(0, 10);
  localStorage.setItem('gameScores', JSON.stringify(topScores));
};

export const getScores = (): GameScore[] => {
  const saved = localStorage.getItem('gameScores');
  return saved ? JSON.parse(saved) : [];
};