import { useCallback, useEffect, useRef, useState } from 'react';
import { playSound } from '../utils/sound';

const GRID_SIZE = 20;
const GAME_SPEED = 100;
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
];

interface Position {
  x: number;
  y: number;
}

export const useGame = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  onGameOver: () => void
) => {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<string>('right');
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [highScores, setHighScores] = useState<number[]>(() => {
    const saved = localStorage.getItem('snakeHighScores');
    return saved ? JSON.parse(saved) : [];
  });

  const gameLoop = useRef<number>();
  const nextDirection = useRef(direction);

  const generateFood = useCallback(() => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (
      snake.some((segment) => segment.x === newFood.x && segment.y === newFood.y)
    );
    setFood(newFood);
  }, [snake]);

  const updateHighScores = useCallback((newScore: number) => {
    const newHighScores = [...highScores, newScore]
      .sort((a, b) => b - a)
      .slice(0, 5);
    setHighScores(newHighScores);
    localStorage.setItem('snakeHighScores', JSON.stringify(newHighScores));
  }, [highScores]);

  const endGame = useCallback(() => {
    setGameOver(true);
    setIsPaused(true);
    updateHighScores(score);
    onGameOver();
    playSound('gameOver');
  }, [score, updateHighScores, onGameOver]);

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
        head.x >= GRID_SIZE ||
        head.y < 0 ||
        head.y >= GRID_SIZE
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
        playSound('eat');
      }

      // Add the rest of the snake
      for (let i = 0; i < (ateFood ? currentSnake.length : currentSnake.length - 1); i++) {
        newSnake.push({ ...currentSnake[i] });
      }

      return newSnake;
    });
  }, [food, gameOver, isPaused, generateFood, endGame]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cellSize = canvas.width / GRID_SIZE;

    // Clear canvas
    ctx.fillStyle = '#374151';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#10B981' : '#34D399';
      ctx.fillRect(
        segment.x * cellSize,
        segment.y * cellSize,
        cellSize - 1,
        cellSize - 1
      );
    });

    // Draw food
    ctx.fillStyle = '#EF4444';
    ctx.fillRect(
      food.x * cellSize,
      food.y * cellSize,
      cellSize - 1,
      cellSize - 1
    );
  }, [snake, food]);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === ' ') {
        if (gameOver) {
          resetGame();
        } else {
          setIsPaused((p) => !p);
        }
        return;
      }

      const key = event.key.toLowerCase();
      
      if (isPaused) return;

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
    },
    [gameOver, isPaused]
  );

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

  useEffect(() => {
    const runGameLoop = () => {
      moveSnake();
      draw();
      gameLoop.current = requestAnimationFrame(runGameLoop);
    };

    if (!isPaused) {
      const interval = setInterval(() => {
        runGameLoop();
      }, GAME_SPEED);

      return () => {
        clearInterval(interval);
        if (gameLoop.current) {
          cancelAnimationFrame(gameLoop.current);
        }
      };
    }
  }, [isPaused, moveSnake, draw]);

  return {
    score,
    highScores,
    gameOver,
    isPaused,
    startGame,
    pauseGame,
    resetGame,
    handleKeyPress,
  };
};