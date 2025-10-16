// ASCII Snake Game
import { clearScreen } from '../utils/console.js';

export class ASCIISnakeGame {
  constructor() {
    this.width = 20;
    this.height = 15;
    this.snake = [{x: 10, y: 7}];
    this.direction = {x: 1, y: 0};
    this.food = this.generateFood();
    this.score = 0;
    this.gameOver = false;
    this.gameContainer = null;
  }

  generateFood() {
    let food;
    do {
      food = {
        x: Math.floor(Math.random() * this.width),
        y: Math.floor(Math.random() * this.height)
      };
    } while (this.snake.some(segment => segment.x === food.x && segment.y === food.y));
    return food;
  }

  moveSnake() {
    if (this.gameOver) return;

    const head = {
      x: this.snake[0].x + this.direction.x,
      y: this.snake[0].y + this.direction.y
    };

    // Check wall collision
    if (head.x < 0 || head.x >= this.width || head.y < 0 || head.y >= this.height) {
      this.gameOver = true;
      return;
    }

    // Check self collision
    if (this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
      this.gameOver = true;
      return;
    }

    this.snake.unshift(head);

    // Check food collision
    if (head.x === this.food.x && head.y === this.food.y) {
      this.score += 10;
      this.food = this.generateFood();
    } else {
      this.snake.pop();
    }
  }

  changeDirection(newDirection) {
    // Prevent reversing into itself
    if (newDirection.x === -this.direction.x && newDirection.y === -this.direction.y) {
      return;
    }
    this.direction = newDirection;
  }

  render() {
    if (!this.gameContainer) return;

    let gameBoard = '';
    
    // Create the game board
    for (let y = 0; y < this.height; y++) {
      let row = '';
      for (let x = 0; x < this.width; x++) {
        if (this.snake.some(segment => segment.x === x && segment.y === y)) {
          row += '█';
        } else if (this.food.x === x && this.food.y === y) {
          row += '●';
        } else {
          row += ' ';
        }
      }
      gameBoard += row + '\n';
    }

    this.gameContainer.innerHTML = `
      <div class="ascii-game-container">
        <div class="game-header">
          <h2>ASCII Snake Game</h2>
          <div class="game-stats">
            <span>Score: ${this.score}</span>
            ${this.gameOver ? '<span class="game-over">GAME OVER!</span>' : ''}
          </div>
        </div>
        <div class="game-board">
          <pre>${gameBoard}</pre>
        </div>
        <div class="game-controls">
          <p>Use WASD or Arrow Keys to move</p>
          <p>Eat the food (●) to grow and score points!</p>
          ${this.gameOver ? '<button onclick="location.reload()">Play Again</button>' : ''}
        </div>
      </div>
    `;
  }

  setupControls() {
    document.addEventListener('keydown', (e) => {
      if (this.gameOver) return;

      switch(e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          this.changeDirection({x: 0, y: -1});
          break;
        case 's':
        case 'arrowdown':
          this.changeDirection({x: 0, y: 1});
          break;
        case 'a':
        case 'arrowleft':
          this.changeDirection({x: -1, y: 0});
          break;
        case 'd':
        case 'arrowright':
          this.changeDirection({x: 1, y: 0});
          break;
      }
    });
  }

  start(container) {
    this.gameContainer = container;
    this.setupControls();
    
    const gameLoop = () => {
      this.moveSnake();
      this.render();
      
      if (!this.gameOver) {
        setTimeout(gameLoop, 200);
      }
    };

    gameLoop();
  }
}

// Export for use in main application
export function initASCIISnakeGame(container) {
  const game = new ASCIISnakeGame();
  game.start(container);
  return game;
}
