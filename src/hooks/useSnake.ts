import { useCallback, useEffect, useRef, useState } from 'react';
import { GameConfig, GameScore, Position } from '../types/game';
import { playSound } from '../utils/sound';
import { gameThemes } from '../utils/themes';
import { saveScore, getScores } from '../utils/scores';

const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
];

export const useSnake = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  settings: GameConfig,
  onGameOver: () => void
) => {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<string>('right');
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [highScores, setHighScores] = useState<GameScore[]>(() => getScores());

  const gameLoop = useRef<number>();
  const nextDirection = useRef(direction);

  const generateFood = useCallback(() => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * settings.gridSize),
        y: Math.floor(Math.random() * settings.gridSize),
      };
    } while (
      snake.some((segment) => segment.x === newFood.x && segment.y === newFood.y)
    );
    setFood(newFood);
  }, [snake, settings.gridSize]);

  const submitScore = useCallback((playerName: string) => {
    const newScore: GameScore = {
      playerName,
      score,
      game: 'snake',
      date: new Date().toISOString(),
    };
    saveScore(newScore);
    setHighScores(getScores());
  }, [score]);

  const endGame = useCallback(() => {
    setGameOver(true);
    setIsPaused(true);
    if (settings.soundEnabled) {
      playSound('gameOver');
    }
    onGameOver();
  }, [settings.soundEnabled, onGameOver]);

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    setSnake((currentSnake) => {
      const head = { ...currentSnake[0] };

      switch (nextDirection.current) {
        case 'up':
          head.y -= 1;
          break;
        case 'down':
          head.y += 1;
          break;
        case 'left':
          head.x -= 1;
          break;
        case 'right':
          head.x += 1;
          break;
      }

      // Check collision with walls
      if (
        head.x < 0 ||
        head.x >= settings.gridSize ||
        head.y < 0 ||
        head.y >= settings.gridSize
      ) {
        endGame();
        return currentSnake;
      }

      // Check collision with self
      if (
        currentSnake.some(
          (segment) => segment.x === head.x && segment.y === head.y
        )
      ) {
        endGame();
        return currentSnake;
      }

      const newSnake = [head];
      const ateFood = head.x === food.x && head.y === food.y;

      if (ateFood) {
        setScore((s) => s + 10);
        generateFood();
        if (settings.soundEnabled) {
          playSound('eat');
        }
      }

      // Add the rest of the snake
      for (let i = 0; i < (ateFood ? currentSnake.length : currentSnake.length - 1); i++) {
        newSnake.push({ ...currentSnake[i] });
      }

      return newSnake;
    });
  }, [food, gameOver, isPaused, generateFood, endGame, settings]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const theme = gameThemes[settings.theme];
    const cellSize = canvas.width / settings.gridSize;

    // Clear canvas
    ctx.fillStyle = theme.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? theme.primary : theme.secondary;
      ctx.fillRect(
        segment.x * cellSize,
        segment.y * cellSize,
        cellSize - 1,
        cellSize - 1
      );
    });

    // Draw food
    ctx.fillStyle = theme.accent;
    ctx.fillRect(
      food.x * cellSize,
      food.y * cellSize,
      cellSize - 1,
      cellSize - 1
    );
  }, [snake, food, settings, canvasRef]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === ' ') {
        if (gameOver) {
          resetGame();
        } else {
          setIsPaused((p) => !p);
        }
        return;
      }

      if (isPaused) return;

      const key = event.key.toLowerCase();
      const directions: { [key: string]: string } = {
        arrowup: 'up',
        arrowdown: 'down',
        arrowleft: 'left',
        arrowright: 'right',
        w: 'up',
        s: 'down',
        a: 'left',
        d: 'right',
      };

      if (directions[key]) {
        const newDirection = directions[key];
        const opposites = {
          up: 'down',
          down: 'up',
          left: 'right',
          right: 'left',
        };

        if (opposites[newDirection] !== nextDirection.current) {
          nextDirection.current = newDirection;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameOver, isPaused]);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        moveSnake();
        draw();
      }, settings.speed);

      return () => clearInterval(interval);
    }
  }, [isPaused, moveSnake, draw, settings.speed]);

  const startGame = useCallback(() => {
    setIsPaused(false);
  }, []);

  const pauseGame = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    generateFood();
    setDirection('right');
    nextDirection.current = 'right';
    setScore(0);
    setGameOver(false);
    setIsPaused(true);
  }, [generateFood]);

  return {
    score,
    highScores,
    gameOver,
    isPaused,
    startGame,
    pauseGame,
    resetGame,
    submitScore,
  };
};