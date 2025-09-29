// Project data with 150+ Python projects
const projects = [
  // ASCII Art & Terminal Games Category
  {
    title: "ASCII Snake Game",
    category: "ascii",
    description: "Classic snake game rendered entirely in ASCII characters in the terminal.",
    tags: ["console", "ascii-art", "terminal"],
    difficulty: 2,
    lines: "~120 lines",
    code: `import random
import time
import os
import sys

# Snake game in ASCII
WIDTH = 40
HEIGHT = 20

def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

def print_board(snake, food):
    clear_screen()
    board = [[' ' for _ in range(WIDTH)] for _ in range(HEIGHT)]
    
    # Place food
    board[food[1]][food[0]] = '●'
    
    # Place snake
    for i, segment in enumerate(snake):
        if i == 0:
            board[segment[1]][segment[0]] = '◉'  # Head
        else:
            board[segment[1]][segment[0]] = '○'  # Body
    
    # Print border and board
    print('╔' + '═' * WIDTH + '╗')
    for row in board:
        print('║' + ''.join(row) + '║')
    print('╚' + '═' * WIDTH + '╝')
    print(f'Score: {len(snake) - 3}')

def main():
    snake = [[20, 10], [19, 10], [18, 10]]
    direction = [1, 0]
    food = [random.randint(0, WIDTH-1), random.randint(0, HEIGHT-1)]
    
    while True:
        print_board(snake, food)
        
        # Move snake
        new_head = [snake[0][0] + direction[0], snake[0][1] + direction[1]]
        
        # Check collisions
        if (new_head[0] < 0 or new_head[0] >= WIDTH or 
            new_head[1] < 0 or new_head[1] >= HEIGHT or 
            new_head in snake):
            print("Game Over!")
            break
        
        snake.insert(0, new_head)
        
        # Check if food eaten
        if new_head == food:
            food = [random.randint(0, WIDTH-1), random.randint(0, HEIGHT-1)]
        else:
            snake.pop()
        
        time.sleep(0.1)

if __name__ == '__main__':
    main()`
  },
  {
    title: "ASCII Dungeon Crawler",
    category: "ascii",
    description: "Explore dungeons, fight monsters, and collect loot in ASCII graphics.",
    tags: ["console", "ascii-art", "roguelike"],
    difficulty: 4,
    lines: "~500 lines"
  },
  {
    title: "ASCII Chess",
    category: "ascii",
    description: "Full chess game with ASCII board and piece representation.",
    tags: ["console", "ascii-art", "board-game"],
    difficulty: 4,
    lines: "~400 lines"
  },
  {
    title: "ASCII Tetris",
    category: "ascii",
    description: "Tetris game using ASCII blocks in the terminal.",
    tags: ["console", "ascii-art", "puzzle"],
    difficulty: 3,
    lines: "~250 lines"
  },
  {
    title: "ASCII Pong",
    category: "ascii",
    description: "Two-player Pong rendered with ASCII characters.",
    tags: ["console", "ascii-art", "arcade"],
    difficulty: 2,
    lines: "~150 lines"
  },
  {
    title: "ASCII Art Portrait Generator",
    category: "ascii",
    description: "Convert photos into detailed ASCII art portraits.",
    tags: ["PIL", "ascii-art", "image-processing"],
    difficulty: 3,
    lines: "~180 lines"
  },
  {
    title: "ASCII Animation Player",
    category: "ascii",
    description: "Play ASCII art animations from text files with frame control.",
    tags: ["console", "ascii-art", "animation"],
    difficulty: 2,
    lines: "~120 lines"
  },
  {
    title: "ASCII Maze Game",
    category: "ascii",
    description: "Navigate through ASCII mazes with enemies and power-ups.",
    tags: ["console", "ascii-art", "maze"],
    difficulty: 3,
    lines: "~300 lines"
  },
  {
    title: "ASCII Space Invaders",
    category: "ascii",
    description: "Space shooter with ASCII aliens and player ship.",
    tags: ["console", "ascii-art", "shooter"],
    difficulty: 3,
    lines: "~280 lines"
  },
  {
    title: "ASCII Flappy Bird",
    category: "ascii",
    description: "Flappy Bird clone in the terminal with ASCII graphics.",
    tags: ["console", "ascii-art", "arcade"],
    difficulty: 2,
    lines: "~180 lines"
  },
  {
    title: "ASCII Text Banner Creator",
    category: "ascii",
    description: "Create large ASCII text banners with various fonts.",
    tags: ["pyfiglet", "ascii-art", "text"],
    difficulty: 1,
    lines: "~60 lines"
  },
  {
    title: "ASCII Breakout",
    category: "ascii",
    description: "Brick breaker game rendered in ASCII in the terminal.",
    tags: ["console", "ascii-art", "arcade"],
    difficulty: 3,
    lines: "~220 lines"
  },
  {
    title: "ASCII Tic Tac Toe",
    category: "ascii",
    description: "Simple tic tac toe with ASCII board and AI opponent.",
    tags: ["console", "ascii-art", "board-game"],
    difficulty: 2,
    lines: "~100 lines",
    code: `# ASCII Tic Tac Toe
def print_board(board):
    print("\\n")
    print(f" {board[0]} | {board[1]} | {board[2]} ")
    print("---|---|---")
    print(f" {board[3]} | {board[4]} | {board[5]} ")
    print("---|---|---")
    print(f" {board[6]} | {board[7]} | {board[8]} ")
    print("\\n")

def check_winner(board, player):
    wins = [[0,1,2], [3,4,5], [6,7,8], 
            [0,3,6], [1,4,7], [2,5,8],
            [0,4,8], [2,4,6]]
    return any(all(board[i] == player for i in combo) for combo in wins)

def main():
    board = [str(i+1) for i in range(9)]
    current_player = 'X'
    
    for turn in range(9):
        print_board(board)
        move = int(input(f"Player {current_player}, enter position (1-9): ")) - 1
        
        if 0 <= move < 9 and board[move] not in ['X', 'O']:
            board[move] = current_player
            if check_winner(board, current_player):
                print_board(board)
                print(f"Player {current_player} wins!")
                return
            current_player = 'O' if current_player == 'X' else 'X'
        else:
            print("Invalid move!")
    
    print_board(board)
    print("It's a tie!")

if __name__ == '__main__':
    main()`
  },
  {
    title: "ASCII Connect Four",
    category: "ascii",
    description: "Drop pieces in ASCII columns to connect four.",
    tags: ["console", "ascii-art", "strategy"],
    difficulty: 2,
    lines: "~150 lines"
  },
  {
    title: "ASCII Battleship",
    category: "ascii",
    description: "Naval combat game with ASCII grid and ships.",
    tags: ["console", "ascii-art", "strategy"],
    difficulty: 3,
    lines: "~320 lines"
  },
  {
    title: "ASCII Minesweeper",
    category: "ascii",
    description: "Classic minesweeper in the terminal with ASCII graphics.",
    tags: ["console", "ascii-art", "puzzle"],
    difficulty: 3,
    lines: "~250 lines"
  },
  {
    title: "ASCII Sudoku",
    category: "ascii",
    description: "Play and solve Sudoku puzzles in ASCII format.",
    tags: ["console", "ascii-art", "puzzle"],
    difficulty: 3,
    lines: "~200 lines"
  },
  {
    title: "ASCII RPG Battle System",
    category: "ascii",
    description: "Turn-based RPG combat with ASCII characters and monsters.",
    tags: ["console", "ascii-art", "rpg"],
    difficulty: 4,
    lines: "~400 lines"
  },
  {
    title: "ASCII Weather Display",
    category: "ascii",
    description: "Show weather conditions with ASCII art icons.",
    tags: ["console", "ascii-art", "api"],
    difficulty: 2,
    lines: "~120 lines"
  },
  {
    title: "ASCII Progress Bars",
    category: "ascii",
    description: "Create customizable progress bars with ASCII characters.",
    tags: ["console", "ascii-art", "utility"],
    difficulty: 1,
    lines: "~80 lines"
  },
  {
    title: "ASCII Hangman",
    category: "ascii",
    description: "Word guessing game with ASCII hangman drawings.",
    tags: ["console", "ascii-art", "word-game"],
    difficulty: 2,
    lines: "~150 lines"
  },
  {
    title: "ASCII Logo Designer",
    category: "ascii",
    description: "Design ASCII art logos with various tools and effects.",
    tags: ["console", "ascii-art", "design"],
    difficulty: 3,
    lines: "~280 lines"
  },
  {
    title: "ASCII Chart Plotter",
    category: "ascii",
    description: "Plot data as ASCII charts and graphs in terminal.",
    tags: ["console", "ascii-art", "data-viz"],
    difficulty: 2,
    lines: "~180 lines"
  },
  {
    title: "ASCII Fireworks",
    category: "ascii",
    description: "Animated fireworks display in ASCII art.",
    tags: ["console", "ascii-art", "animation"],
    difficulty: 3,
    lines: "~200 lines"
  },
  {
    title: "ASCII Racing Game",
    category: "ascii",
    description: "Top-down racing game with ASCII track and cars.",
    tags: ["console", "ascii-art", "racing"],
    difficulty: 3,
    lines: "~280 lines"
  },

  // Turtle Graphics Category
  {
    title: "Turtle Race Simulator",
    category: "turtle",
    description: "Watch colorful turtles race across the screen.",
    tags: ["turtle", "animation", "game"],
    difficulty: 2,
    lines: "~120 lines"
  },
  {
    title: "Turtle Spirograph",
    category: "turtle",
    description: "Create mesmerizing spirograph patterns with turtle graphics.",
    tags: ["turtle", "mathematics", "patterns"],
    difficulty: 2,
    lines: "~100 lines"
  },
  {
    title: "Turtle Fractal Tree",
    category: "turtle",
    description: "Generate beautiful fractal trees with recursion.",
    tags: ["turtle", "fractals", "recursion"],
    difficulty: 3,
    lines: "~80 lines"
  },
  {
    title: "Turtle Mandala Creator",
    category: "turtle",
    description: "Draw intricate mandala patterns with symmetry.",
    tags: ["turtle", "geometry", "patterns"],
    difficulty: 3,
    lines: "~150 lines"
  },
  {
    title: "Turtle Snake Game",
    category: "turtle",
    description: "Classic snake game implemented with turtle graphics.",
    tags: ["turtle", "game", "arcade"],
    difficulty: 3,
    lines: "~200 lines"
  },
  {
    title: "Turtle Pong Game",
    category: "turtle",
    description: "Two-player pong using turtle graphics.",
    tags: ["turtle", "game", "arcade"],
    difficulty: 3,
    lines: "~180 lines"
  },
  {
    title: "Turtle Drawing App",
    category: "turtle",
    description: "Interactive drawing application with color picker.",
    tags: ["turtle", "drawing", "interactive"],
    difficulty: 2,
    lines: "~150 lines"
  },
  {
    title: "Turtle Clock",
    category: "turtle",
    description: "Animated analog clock with turtle graphics.",
    tags: ["turtle", "animation", "time"],
    difficulty: 3,
    lines: "~200 lines"
  },
  {
    title: "Turtle Maze Solver",
    category: "turtle",
    description: "Visualize maze solving algorithms with turtle.",
    tags: ["turtle", "algorithms", "visualization"],
    difficulty: 4,
    lines: "~250 lines"
  },
  {
    title: "Turtle Snowflake Generator",
    category: "turtle",
    description: "Generate unique snowflake patterns using turtle.",
    tags: ["turtle", "fractals", "patterns"],
    difficulty: 2,
    lines: "~100 lines"
  },
  {
    title: "Turtle Kaleidoscope",
    category: "turtle",
    description: "Create kaleidoscope effects with symmetrical patterns.",
    tags: ["turtle", "symmetry", "art"],
    difficulty: 3,
    lines: "~180 lines"
  },
  {
    title: "Turtle Polygon Designer",
    category: "turtle",
    description: "Draw and animate various polygon shapes.",
    tags: ["turtle", "geometry", "shapes"],
    difficulty: 2,
    lines: "~120 lines"
  },
  {
    title: "Turtle Tic Tac Toe",
    category: "turtle",
    description: "Play tic tac toe with turtle graphics interface.",
    tags: ["turtle", "game", "board-game"],
    difficulty: 3,
    lines: "~220 lines"
  },
  {
    title: "Turtle Star Patterns",
    category: "turtle",
    description: "Generate various star and polygon patterns.",
    tags: ["turtle", "geometry", "patterns"],
    difficulty: 2,
    lines: "~100 lines"
  },
  {
    title: "Turtle Circle Art",
    category: "turtle",
    description: "Create art with overlapping circles and arcs.",
    tags: ["turtle", "art", "circles"],
    difficulty: 2,
    lines: "~130 lines"
  },
  {
    title: "Turtle Bouncing Ball",
    category: "turtle",
    description: "Simulate physics with bouncing ball animation.",
    tags: ["turtle", "physics", "animation"],
    difficulty: 2,
    lines: "~120 lines"
  },
  {
    title: "Turtle Rainbow Spiral",
    category: "turtle",
    description: "Draw colorful spiral patterns with gradient colors.",
    tags: ["turtle", "colors", "spirals"],
    difficulty: 2,
    lines: "~90 lines"
  },
  {
    title: "Turtle Brick Breaker",
    category: "turtle",
    description: "Classic brick breaker game with turtle graphics.",
    tags: ["turtle", "game", "arcade"],
    difficulty: 4,
    lines: "~300 lines"
  },
  {
    title: "Turtle Fireworks",
    category: "turtle",
    description: "Animated fireworks display with particle effects.",
    tags: ["turtle", "animation", "particles"],
    difficulty: 3,
    lines: "~200 lines"
  },
  {
    title: "Turtle Sierpinski Triangle",
    category: "turtle",
    description: "Draw the famous Sierpinski triangle fractal.",
    tags: ["turtle", "fractals", "mathematics"],
    difficulty: 3,
    lines: "~100 lines"
  },
  {
    title: "Turtle Olympic Rings",
    category: "turtle",
    description: "Draw the Olympic rings with precise positioning.",
    tags: ["turtle", "shapes", "art"],
    difficulty: 2,
    lines: "~80 lines"
  },
  {
    title: "Turtle Chess Board",
    category: "turtle",
    description: "Draw a chess board with alternating colors.",
    tags: ["turtle", "patterns", "grid"],
    difficulty: 2,
    lines: "~100 lines"
  },
  {
    title: "Turtle Random Walk",
    category: "turtle",
    description: "Visualize random walk algorithms with turtle.",
    tags: ["turtle", "random", "simulation"],
    difficulty: 2,
    lines: "~90 lines"
  },
  {
    title: "Turtle Heart Shape",
    category: "turtle",
    description: "Draw a heart using mathematical curves.",
    tags: ["turtle", "shapes", "mathematics"],
    difficulty: 2,
    lines: "~80 lines"
  },
  {
    title: "Turtle Grid Pattern",
    category: "turtle",
    description: "Create various grid-based patterns and designs.",
    tags: ["turtle", "patterns", "grid"],
    difficulty: 2,
    lines: "~110 lines"
  },

  // GUI/Pygame Games Category
  {
    title: "Snake Game",
    category: "games",
    description: "Classic snake game with pygame. Control the snake to eat food and grow longer while avoiding walls and yourself.",
    tags: ["pygame", "graphics", "input-handling"],
    difficulty: 2,
    lines: "~150 lines"
  },
  {
    title: "Tetris Clone",
    category: "games",
    description: "Full-featured Tetris game with piece rotation, line clearing, and scoring system.",
    tags: ["pygame", "matrix-manipulation", "game-logic"],
    difficulty: 4,
    lines: "~400 lines"
  },
  {
    title: "Pong Game",
    category: "games",
    description: "Two-player Pong game with paddle controls and ball physics.",
    tags: ["pygame", "collision-detection", "physics"],
    difficulty: 2,
    lines: "~120 lines"
  },
  {
    title: "Space Invaders",
    category: "games",
    description: "Retro space shooter with enemy waves, power-ups, and increasing difficulty.",
    tags: ["pygame", "sprites", "collision-detection"],
    difficulty: 4,
    lines: "~500 lines"
  },
  {
    title: "Flappy Bird Clone",
    category: "games",
    description: "Side-scrolling game where you navigate a bird through pipes.",
    tags: ["pygame", "gravity", "endless-runner"],
    difficulty: 3,
    lines: "~200 lines"
  },
  {
    title: "Pac-Man Game",
    category: "games",
    description: "Classic maze game with ghosts, pellets, and power-ups.",
    tags: ["pygame", "pathfinding", "game-ai"],
    difficulty: 5,
    lines: "~800 lines"
  },
  {
    title: "2048 Game",
    category: "games",
    description: "Number puzzle game where you combine tiles to reach 2048.",
    tags: ["tkinter", "matrix-operations", "game-logic"],
    difficulty: 3,
    lines: "~250 lines"
  },
  {
    title: "Breakout Game",
    category: "games",
    description: "Brick-breaking game with paddle, ball, and destructible blocks.",
    tags: ["pygame", "physics", "collision-detection"],
    difficulty: 3,
    lines: "~300 lines"
  },
  {
    title: "Chess Game",
    category: "games",
    description: "Complete chess game with piece movement validation and checkmate detection.",
    tags: ["pygame", "game-logic", "algorithms"],
    difficulty: 5,
    lines: "~1000 lines"
  },
  {
    title: "Tic Tac Toe AI",
    category: "games",
    description: "Tic Tac Toe with unbeatable AI using minimax algorithm.",
    tags: ["tkinter", "minimax", "ai"],
    difficulty: 3,
    lines: "~180 lines"
  },
  {
    title: "Maze Generator",
    category: "games",
    description: "Generate random mazes using various algorithms and solve them.",
    tags: ["pygame", "algorithms", "pathfinding"],
    difficulty: 4,
    lines: "~350 lines"
  },
  {
    title: "Tower Defense",
    category: "games",
    description: "Strategy game where you place towers to defend against enemy waves.",
    tags: ["pygame", "pathfinding", "strategy"],
    difficulty: 5,
    lines: "~700 lines"
  },
  {
    title: "Sudoku Solver",
    category: "games",
    description: "Interactive Sudoku game with automatic solver using backtracking.",
    tags: ["tkinter", "backtracking", "puzzle"],
    difficulty: 4,
    lines: "~300 lines"
  },
  {
    title: "Memory Card Game",
    category: "games",
    description: "Match pairs of cards in this memory-testing game.",
    tags: ["pygame", "memory", "card-game"],
    difficulty: 2,
    lines: "~200 lines"
  },
  {
    title: "Rock Paper Scissors",
    category: "games",
    description: "Classic game with GUI and computer opponent.",
    tags: ["tkinter", "random", "gui"],
    difficulty: 1,
    lines: "~80 lines"
  },
  {
    title: "Blackjack Game",
    category: "games",
    description: "Casino-style Blackjack with betting system and card counting.",
    tags: ["pygame", "card-game", "probability"],
    difficulty: 3,
    lines: "~400 lines"
  },
  {
    title: "Minesweeper",
    category: "games",
    description: "Classic mine-finding puzzle game with different difficulty levels.",
    tags: ["tkinter", "grid-logic", "recursion"],
    difficulty: 4,
    lines: "~350 lines"
  },
  {
    title: "Connect Four",
    category: "games",
    description: "Two-player strategy game with AI opponent option.",
    tags: ["pygame", "minimax", "strategy"],
    difficulty: 3,
    lines: "~250 lines"
  },
  {
    title: "Asteroids Game",
    category: "games",
    description: "Space shooter where you destroy asteroids while avoiding collisions.",
    tags: ["pygame", "vector-math", "physics"],
    difficulty: 4,
    lines: "~450 lines"
  },

  // Graphics & Art Category
  {
    title: "Fractal Generator",
    category: "graphics",
    description: "Generate beautiful fractals like Mandelbrot and Julia sets with zoom functionality.",
    tags: ["matplotlib", "numpy", "complex-numbers"],
    difficulty: 4,
    lines: "~200 lines"
  },
  {
    title: "ASCII Art Generator",
    category: "graphics",
    description: "Convert images to ASCII art with customizable character sets and density.",
    tags: ["PIL", "image-processing", "ascii"],
    difficulty: 3,
    lines: "~150 lines"
  },
  {
    title: "Pixel Art Editor",
    category: "graphics",
    description: "Simple pixel art creation tool with color palette and export functionality.",
    tags: ["pygame", "graphics", "editor"],
    difficulty: 3,
    lines: "~400 lines"
  },
  {
    title: "3D Wireframe Renderer",
    category: "graphics",
    description: "Render 3D wireframe objects with rotation and projection.",
    tags: ["pygame", "3d-math", "linear-algebra"],
    difficulty: 5,
    lines: "~300 lines"
  },
  {
    title: "Spirograph Generator",
    category: "graphics",
    description: "Create beautiful spirograph patterns with customizable parameters.",
    tags: ["turtle", "mathematics", "patterns"],
    difficulty: 2,
    lines: "~100 lines"
  },
  {
    title: "Color Palette Extractor",
    category: "graphics",
    description: "Extract dominant colors from images using K-means clustering.",
    tags: ["PIL", "sklearn", "color-analysis"],
    difficulty: 3,
    lines: "~120 lines"
  },
  {
    title: "Image Filter Effects",
    category: "graphics",
    description: "Apply various filters like blur, sharpen, edge detection to images.",
    tags: ["PIL", "numpy", "image-processing"],
    difficulty: 3,
    lines: "~250 lines"
  },
  {
    title: "Mandala Generator",
    category: "graphics",
    description: "Create intricate mandala patterns with symmetrical designs.",
    tags: ["turtle", "geometry", "patterns"],
    difficulty: 3,
    lines: "~180 lines"
  },
  {
    title: "QR Code Generator",
    category: "graphics",
    description: "Generate QR codes with custom data and styling options.",
    tags: ["qrcode", "PIL", "encoding"],
    difficulty: 2,
    lines: "~80 lines"
  },
  {
    title: "Barcode Generator",
    category: "graphics",
    description: "Create various types of barcodes (Code128, EAN, UPC).",
    tags: ["python-barcode", "PIL", "encoding"],
    difficulty: 2,
    lines: "~100 lines"
  },
  {
    title: "Image Mosaic Creator",
    category: "graphics",
    description: "Create photo mosaics using a collection of smaller images.",
    tags: ["PIL", "image-processing", "algorithms"],
    difficulty: 4,
    lines: "~300 lines"
  },
  {
    title: "Geometric Pattern Generator",
    category: "graphics",
    description: "Generate various geometric patterns and tessellations.",
    tags: ["turtle", "matplotlib", "geometry"],
    difficulty: 3,
    lines: "~200 lines"
  },
  {
    title: "Digital Clock Display",
    category: "graphics",
    description: "Stylish digital clock with customizable fonts and colors.",
    tags: ["tkinter", "datetime", "gui"],
    difficulty: 2,
    lines: "~120 lines"
  },
  {
    title: "Logo Generator",
    category: "graphics",
    description: "Simple logo creation tool with text and shape combinations.",
    tags: ["PIL", "graphics", "design"],
    difficulty: 3,
    lines: "~250 lines"
  },
  {
    title: "Particle System",
    category: "graphics",
    description: "Simulate particle effects like fire, smoke, and explosions.",
    tags: ["pygame", "physics", "simulation"],
    difficulty: 4,
    lines: "~350 lines"
  },
  {
    title: "L-System Tree Generator",
    category: "graphics",
    description: "Generate fractal trees and plants using L-system rules.",
    tags: ["turtle", "fractals", "algorithms"],
    difficulty: 4,
    lines: "~200 lines"
  },
  {
    title: "Image Watermark Tool",
    category: "graphics",
    description: "Add text or image watermarks to photos with transparency control.",
    tags: ["PIL", "image-processing", "watermark"],
    difficulty: 2,
    lines: "~150 lines"
  },
  {
    title: "Collage Maker",
    category: "graphics",
    description: "Automatically arrange multiple images into an attractive collage.",
    tags: ["PIL", "layout-algorithms", "image-processing"],
    difficulty: 3,
    lines: "~280 lines"
  },
  {
    title: "Color Blindness Simulator",
    category: "graphics",
    description: "Simulate how images appear to people with different types of color blindness.",
    tags: ["PIL", "color-theory", "accessibility"],
    difficulty: 3,
    lines: "~180 lines"
  },
  {
    title: "Animated GIF Creator",
    category: "graphics",
    description: "Create animated GIFs from image sequences or video frames.",
    tags: ["PIL", "imageio", "animation"],
    difficulty: 3,
    lines: "~200 lines"
  },

  // AI & Machine Learning Category
  {
    title: "Chatbot with NLTK",
    category: "ai",
    description: "Simple rule-based chatbot using natural language processing.",
    tags: ["nltk", "nlp", "chatbot"],
    difficulty: 3,
    lines: "~200 lines"
  },
  {
    title: "Image Classifier",
    category: "ai",
    description: "Train a CNN to classify images using TensorFlow/Keras.",
    tags: ["tensorflow", "keras", "cnn"],
    difficulty: 4,
    lines: "~300 lines"
  },
  {
    title: "Sentiment Analysis",
    category: "ai",
    description: "Analyze sentiment of text using machine learning models.",
    tags: ["sklearn", "nltk", "text-analysis"],
    difficulty: 3,
    lines: "~180 lines"
  },
  {
    title: "Face Detection",
    category: "ai",
    description: "Detect faces in images and videos using OpenCV.",
    tags: ["opencv", "computer-vision", "detection"],
    difficulty: 3,
    lines: "~150 lines"
  },
  {
    title: "Handwriting Recognition",
    category: "ai",
    description: "Recognize handwritten digits using neural networks.",
    tags: ["tensorflow", "mnist", "neural-networks"],
    difficulty: 4,
    lines: "~250 lines"
  },
  {
    title: "Stock Price Predictor",
    category: "ai",
    description: "Predict stock prices using LSTM neural networks.",
    tags: ["tensorflow", "lstm", "time-series"],
    difficulty: 5,
    lines: "~400 lines"
  },
  {
    title: "Recommendation System",
    category: "ai",
    description: "Build a movie/book recommendation system using collaborative filtering.",
    tags: ["pandas", "sklearn", "recommendation"],
    difficulty: 4,
    lines: "~300 lines"
  },
  {
    title: "Text Generator",
    category: "ai",
    description: "Generate text using Markov chains or RNN models.",
    tags: ["tensorflow", "nlp", "text-generation"],
    difficulty: 4,
    lines: "~350 lines"
  },
  {
    title: "Object Detection",
    category: "ai",
    description: "Detect and classify objects in images using YOLO or SSD.",
    tags: ["opencv", "yolo", "object-detection"],
    difficulty: 5,
    lines: "~400 lines"
  },
  {
    title: "Voice Assistant",
    category: "ai",
    description: "Create a voice-controlled assistant with speech recognition.",
    tags: ["speech-recognition", "pyttsx3", "voice"],
    difficulty: 4,
    lines: "~300 lines"
  },
  {
    title: "Spam Email Classifier",
    category: "ai",
    description: "Classify emails as spam or not spam using machine learning.",
    tags: ["sklearn", "nlp", "classification"],
    difficulty: 3,
    lines: "~200 lines"
  },
  {
    title: "Gesture Recognition",
    category: "ai",
    description: "Recognize hand gestures using computer vision techniques.",
    tags: ["opencv", "mediapipe", "gesture-recognition"],
    difficulty: 4,
    lines: "~250 lines"
  },
  {
    title: "Music Genre Classifier",
    category: "ai",
    description: "Classify music genres using audio feature extraction.",
    tags: ["librosa", "sklearn", "audio-processing"],
    difficulty: 4,
    lines: "~350 lines"
  },
  {
    title: "Neural Style Transfer",
    category: "ai",
    description: "Apply artistic styles to images using deep learning.",
    tags: ["tensorflow", "style-transfer", "cnn"],
    difficulty: 5,
    lines: "~400 lines"
  },
  {
    title: "Anomaly Detection",
    category: "ai",
    description: "Detect anomalies in data using unsupervised learning.",
    tags: ["sklearn", "anomaly-detection", "clustering"],
    difficulty: 4,
    lines: "~280 lines"
  },
  {
    title: "Language Translator",
    category: "ai",
    description: "Translate text between languages using pre-trained models.",
    tags: ["transformers", "nlp", "translation"],
    difficulty: 3,
    lines: "~150 lines"
  },
  {
    title: "Pose Estimation",
    category: "ai",
    description: "Estimate human pose from images or video streams.",
    tags: ["opencv", "mediapipe", "pose-estimation"],
    difficulty: 4,
    lines: "~200 lines"
  },
  {
    title: "Fake News Detector",
    category: "ai",
    description: "Detect fake news articles using NLP and machine learning.",
    tags: ["sklearn", "nltk", "text-classification"],
    difficulty: 4,
    lines: "~300 lines"
  },
  {
    title: "Emotion Recognition",
    category: "ai",
    description: "Recognize emotions from facial expressions in real-time.",
    tags: ["opencv", "tensorflow", "emotion-recognition"],
    difficulty: 4,
    lines: "~320 lines"
  },
  {
    title: "Q-Learning Game AI",
    category: "ai",
    description: "Train an AI to play games using reinforcement learning.",
    tags: ["numpy", "q-learning", "reinforcement-learning"],
    difficulty: 5,
    lines: "~450 lines"
  },

  // Web Development Category
  {
    title: "Personal Portfolio Website",
    category: "web",
    description: "Create a responsive portfolio website using Flask and Bootstrap.",
    tags: ["flask", "html", "css", "bootstrap"],
    difficulty: 3,
    lines: "~400 lines"
  },
  {
    title: "Blog Platform",
    category: "web",
    description: "Full-featured blog with user authentication and CRUD operations.",
    tags: ["django", "sqlite", "authentication"],
    difficulty: 4,
    lines: "~800 lines"
  },
  {
    title: "URL Shortener",
    category: "web",
    description: "Create short URLs with click tracking and analytics.",
    tags: ["flask", "sqlite", "url-shortening"],
    difficulty: 3,
    lines: "~250 lines"
  },
  {
    title: "Weather App",
    category: "web",
    description: "Display weather information using external API integration.",
    tags: ["flask", "api", "requests"],
    difficulty: 2,
    lines: "~200 lines"
  },
  {
    title: "Todo List App",
    category: "web",
    description: "Task management application with user accounts and categories.",
    tags: ["django", "postgresql", "crud"],
    difficulty: 3,
    lines: "~500 lines"
  },
  {
    title: "Chat Application",
    category: "web",
    description: "Real-time chat app using WebSockets and Flask-SocketIO.",
    tags: ["flask-socketio", "websockets", "real-time"],
    difficulty: 4,
    lines: "~400 lines"
  },
  {
    title: "E-commerce Store",
    category: "web",
    description: "Online store with shopping cart, payment integration, and admin panel.",
    tags: ["django", "stripe", "e-commerce"],
    difficulty: 5,
    lines: "~1200 lines"
  },
  {
    title: "Social Media Dashboard",
    category: "web",
    description: "Aggregate and display social media metrics from multiple platforms.",
    tags: ["flask", "api-integration", "dashboard"],
    difficulty: 4,
    lines: "~600 lines"
  },
  {
    title: "File Upload Service",
    category: "web",
    description: "Secure file upload and sharing service with access controls.",
    tags: ["flask", "file-handling", "security"],
    difficulty: 3,
    lines: "~300 lines"
  },
  {
    title: "Recipe Sharing Platform",
    category: "web",
    description: "Share and discover recipes with ratings and comments.",
    tags: ["django", "user-generated-content", "ratings"],
    difficulty: 4,
    lines: "~700 lines"
  },
  {
    title: "Event Management System",
    category: "web",
    description: "Create and manage events with RSVP functionality.",
    tags: ["flask", "calendar", "event-management"],
    difficulty: 4,
    lines: "~550 lines"
  },
  {
    title: "News Aggregator",
    category: "web",
    description: "Collect and display news from multiple sources with categorization.",
    tags: ["django", "web-scraping", "rss"],
    difficulty: 3,
    lines: "~400 lines"
  },
  {
    title: "Online Quiz Platform",
    category: "web",
    description: "Create and take quizzes with scoring and leaderboards.",
    tags: ["flask", "quiz-logic", "scoring"],
    difficulty: 3,
    lines: "~450 lines"
  },
  {
    title: "Expense Tracker",
    category: "web",
    description: "Track personal expenses with categories and budget alerts.",
    tags: ["django", "charts", "financial"],
    difficulty: 3,
    lines: "~500 lines"
  },
  {
    title: "Job Board",
    category: "web",
    description: "Post and search for jobs with application tracking.",
    tags: ["flask", "search", "job-board"],
    difficulty: 4,
    lines: "~600 lines"
  },
  {
    title: "Booking System",
    category: "web",
    description: "Appointment booking system with calendar integration.",
    tags: ["django", "calendar", "booking"],
    difficulty: 4,
    lines: "~650 lines"
  },
  {
    title: "Forum Platform",
    category: "web",
    description: "Discussion forum with threads, replies, and moderation.",
    tags: ["django", "forum", "moderation"],
    difficulty: 4,
    lines: "~800 lines"
  },
  {
    title: "API Rate Limiter",
    category: "web",
    description: "Implement rate limiting for APIs with different strategies.",
    tags: ["flask", "rate-limiting", "middleware"],
    difficulty: 3,
    lines: "~200 lines"
  },
  {
    title: "Content Management System",
    category: "web",
    description: "Simple CMS for managing website content and pages.",
    tags: ["django", "cms", "admin-interface"],
    difficulty: 5,
    lines: "~1000 lines"
  },
  {
    title: "Real Estate Listings",
    category: "web",
    description: "Property listing website with search and filtering.",
    tags: ["flask", "geolocation", "search"],
    difficulty: 4,
    lines: "~700 lines"
  },

  // Automation Category
  {
    title: "Web Scraper",
    category: "automation",
    description: "Scrape data from websites and save to CSV or database.",
    tags: ["beautifulsoup", "requests", "csv"],
    difficulty: 3,
    lines: "~200 lines"
  },
  {
    title: "Email Automation",
    category: "automation",
    description: "Send automated emails with attachments and HTML templates.",
    tags: ["smtplib", "email", "automation"],
    difficulty: 2,
    lines: "~150 lines"
  },
  {
    title: "File Organizer",
    category: "automation",
    description: "Automatically organize files by type, date, or custom rules.",
    tags: ["os", "shutil", "file-management"],
    difficulty: 2,
    lines: "~120 lines"
  },
  {
    title: "Social Media Bot",
    category: "automation",
    description: "Automate social media posting and engagement.",
    tags: ["tweepy", "instagram-api", "social-media"],
    difficulty: 3,
    lines: "~250 lines"
  },
  {
    title: "Backup Script",
    category: "automation",
    description: "Automated backup system with compression and cloud storage.",
    tags: ["zipfile", "cloud-storage", "scheduling"],
    difficulty: 3,
    lines: "~200 lines"
  },
  {
    title: "System Monitor",
    category: "automation",
    description: "Monitor system resources and send alerts when thresholds are exceeded.",
    tags: ["psutil", "monitoring", "alerts"],
    difficulty: 3,
    lines: "~180 lines"
  },
  {
    title: "Log Analyzer",
    category: "automation",
    description: "Parse and analyze log files for patterns and anomalies.",
    tags: ["regex", "log-analysis", "reporting"],
    difficulty: 3,
    lines: "~220 lines"
  },
  {
    title: "Database Backup Tool",
    category: "automation",
    description: "Automated database backup with scheduling and rotation.",
    tags: ["sqlite3", "mysql", "backup"],
    difficulty: 3,
    lines: "~180 lines"
  },
  {
    title: "Website Monitor",
    category: "automation",
    description: "Monitor website uptime and performance with notifications.",
    tags: ["requests", "monitoring", "notifications"],
    difficulty: 2,
    lines: "~150 lines"
  },
  {
    title: "PDF Report Generator",
    category: "automation",
    description: "Generate PDF reports from data with charts and tables.",
    tags: ["reportlab", "matplotlib", "pdf"],
    difficulty: 3,
    lines: "~250 lines"
  },
  {
    title: "Excel Automation",
    category: "automation",
    description: "Automate Excel tasks like data processing and report generation.",
    tags: ["openpyxl", "pandas", "excel"],
    difficulty: 3,
    lines: "~200 lines"
  },
  {
    title: "Image Batch Processor",
    category: "automation",
    description: "Batch process images with resizing, format conversion, and filters.",
    tags: ["PIL", "batch-processing", "image-processing"],
    difficulty: 2,
    lines: "~180 lines"
  },
  {
    title: "FTP File Sync",
    category: "automation",
    description: "Synchronize files between local and remote FTP servers.",
    tags: ["ftplib", "file-sync", "networking"],
    difficulty: 3,
    lines: "~220 lines"
  },
  {
    title: "Task Scheduler",
    category: "automation",
    description: "Schedule and execute tasks at specific times or intervals.",
    tags: ["schedule", "cron", "task-scheduling"],
    difficulty: 2,
    lines: "~150 lines"
  },
  {
    title: "API Data Collector",
    category: "automation",
    description: "Collect data from multiple APIs and store in database.",
    tags: ["requests", "api", "data-collection"],
    difficulty: 3,
    lines: "~200 lines"
  },
  {
    title: "Selenium Web Automation",
    category: "automation",
    description: "Automate web browser interactions for testing or data collection.",
    tags: ["selenium", "web-automation", "testing"],
    difficulty: 4,
    lines: "~300 lines"
  },
  {
    title: "Network Scanner",
    category: "automation",
    description: "Scan network for active devices and open ports.",
    tags: ["socket", "networking", "security"],
    difficulty: 4,
    lines: "~250 lines"
  },
  {
    title: "Configuration Manager",
    category: "automation",
    description: "Manage application configurations across different environments.",
    tags: ["configparser", "yaml", "configuration"],
    difficulty: 2,
    lines: "~120 lines"
  },
  {
    title: "Automated Testing Suite",
    category: "automation",
    description: "Comprehensive testing framework with reporting and CI integration.",
    tags: ["pytest", "unittest", "testing"],
    difficulty: 4,
    lines: "~400 lines"
  },
  {
    title: "Cloud Storage Sync",
    category: "automation",
    description: "Synchronize files with cloud storage services like Google Drive or Dropbox.",
    tags: ["google-api", "dropbox-api", "cloud-sync"],
    difficulty: 4,
    lines: "~350 lines"
  },

  // Data Science Category
  {
    title: "Sales Data Analyzer",
    category: "data",
    description: "Analyze sales data with visualizations and trend analysis.",
    tags: ["pandas", "matplotlib", "seaborn"],
    difficulty: 3,
    lines: "~250 lines"
  },
  {
    title: "Stock Market Dashboard",
    category: "data",
    description: "Real-time stock market data visualization and analysis.",
    tags: ["yfinance", "plotly", "dash"],
    difficulty: 4,
    lines: "~400 lines"
  },
  {
    title: "COVID-19 Data Tracker",
    category: "data",
    description: "Track and visualize COVID-19 statistics with interactive charts.",
    tags: ["pandas", "plotly", "api"],
    difficulty: 3,
    lines: "~300 lines"
  },
  {
    title: "Weather Data Analysis",
    category: "data",
    description: "Analyze historical weather data and create predictive models.",
    tags: ["pandas", "sklearn", "weather-api"],
    difficulty: 3,
    lines: "~280 lines"
  },
  {
    title: "Customer Segmentation",
    category: "data",
    description: "Segment customers using clustering algorithms and RFM analysis.",
    tags: ["sklearn", "kmeans", "customer-analysis"],
    difficulty: 4,
    lines: "~350 lines"
  },
  {
    title: "A/B Test Analyzer",
    category: "data",
    description: "Analyze A/B test results with statistical significance testing.",
    tags: ["scipy", "statistics", "hypothesis-testing"],
    difficulty: 4,
    lines: "~200 lines"
  },
  {
    title: "Social Media Analytics",
    category: "data",
    description: "Analyze social media engagement and sentiment trends.",
    tags: ["tweepy", "nltk", "sentiment-analysis"],
    difficulty: 4,
    lines: "~400 lines"
  },
  {
    title: "Financial Portfolio Analyzer",
    category: "data",
    description: "Analyze investment portfolio performance and risk metrics.",
    tags: ["yfinance", "numpy", "portfolio-analysis"],
    difficulty: 4,
    lines: "~350 lines"
  },
  {
    title: "Survey Data Processor",
    category: "data",
    description: "Process and analyze survey responses with statistical insights.",
    tags: ["pandas", "matplotlib", "statistics"],
    difficulty: 3,
    lines: "~250 lines"
  },
  {
    title: "Time Series Forecasting",
    category: "data",
    description: "Forecast future values using ARIMA and other time series models.",
    tags: ["statsmodels", "time-series", "forecasting"],
    difficulty: 5,
    lines: "~400 lines"
  },
  {
    title: "Web Analytics Dashboard",
    category: "data",
    description: "Create interactive dashboard for website analytics data.",
    tags: ["dash", "plotly", "web-analytics"],
    difficulty: 4,
    lines: "~500 lines"
  },
  {
    title: "Market Basket Analysis",
    category: "data",
    description: "Find associations between products using market basket analysis.",
    tags: ["mlxtend", "association-rules", "retail-analytics"],
    difficulty: 4,
    lines: "~300 lines"
  },
  {
    title: "Churn Prediction Model",
    category: "data",
    description: "Predict customer churn using machine learning techniques.",
    tags: ["sklearn", "classification", "churn-analysis"],
    difficulty: 4,
    lines: "~350 lines"
  },
  {
    title: "Data Quality Checker",
    category: "data",
    description: "Assess and report on data quality issues in datasets.",
    tags: ["pandas", "data-quality", "validation"],
    difficulty: 3,
    lines: "~200 lines"
  },
  {
    title: "Correlation Analysis Tool",
    category: "data",
    description: "Find correlations between variables with heatmaps and statistics.",
    tags: ["pandas", "seaborn", "correlation"],
    difficulty: 2,
    lines: "~150 lines"
  },
  {
    title: "Outlier Detection System",
    category: "data",
    description: "Detect outliers in datasets using statistical and ML methods.",
    tags: ["sklearn", "statistics", "outlier-detection"],
    difficulty: 3,
    lines: "~200 lines"
  },
  {
    title: "Data Visualization Suite",
    category: "data",
    description: "Create various types of charts and visualizations from data.",
    tags: ["matplotlib", "seaborn", "plotly"],
    difficulty: 3,
    lines: "~300 lines"
  },
  {
    title: "ETL Pipeline",
    category: "data",
    description: "Extract, transform, and load data from multiple sources.",
    tags: ["pandas", "sqlalchemy", "etl"],
    difficulty: 4,
    lines: "~400 lines"
  },
  {
    title: "Geospatial Data Analyzer",
    category: "data",
    description: "Analyze and visualize geospatial data with maps and statistics.",
    tags: ["geopandas", "folium", "geospatial"],
    difficulty: 4,
    lines: "~350 lines"
  },
  {
    title: "Text Mining Tool",
    category: "data",
    description: "Extract insights from text data using NLP techniques.",
    tags: ["nltk", "wordcloud", "text-mining"],
    difficulty: 3,
    lines: "~280 lines"
  },

  // Tools & Utilities Category
  {
    title: "Password Generator",
    category: "tools",
    description: "Generate secure passwords with customizable criteria and strength checking.",
    tags: ["random", "security", "password"],
    difficulty: 2,
    lines: "~100 lines"
  },
  {
    title: "File Encryption Tool",
    category: "tools",
    description: "Encrypt and decrypt files using various encryption algorithms.",
    tags: ["cryptography", "security", "encryption"],
    difficulty: 3,
    lines: "~200 lines"
  },
  {
    title: "QR Code Scanner",
    category: "tools",
    description: "Scan and decode QR codes from images or webcam feed.",
    tags: ["opencv", "pyzbar", "qr-code"],
    difficulty: 3,
    lines: "~150 lines"
  },
  {
    title: "Unit Converter",
    category: "tools",
    description: "Convert between different units of measurement (length, weight, temperature).",
    tags: ["tkinter", "conversion", "gui"],
    difficulty: 2,
    lines: "~180 lines"
  },
  {
    title: "Color Picker Tool",
    category: "tools",
    description: "Pick colors from screen and get RGB, HEX, and HSV values.",
    tags: ["tkinter", "PIL", "color"],
    difficulty: 2,
    lines: "~120 lines"
  },
  {
    title: "Text Editor",
    category: "tools",
    description: "Simple text editor with syntax highlighting and file operations.",
    tags: ["tkinter", "text-editor", "syntax-highlighting"],
    difficulty: 4,
    lines: "~500 lines"
  },
  {
    title: "Calculator App",
    category: "tools",
    description: "Scientific calculator with advanced mathematical functions.",
    tags: ["tkinter", "math", "calculator"],
    difficulty: 3,
    lines: "~250 lines"
  },
  {
    title: "Hash Generator",
    category: "tools",
    description: "Generate various hash values (MD5, SHA1, SHA256) for text or files.",
    tags: ["hashlib", "security", "hashing"],
    difficulty: 2,
    lines: "~100 lines"
  },
  {
    title: "Image Metadata Extractor",
    category: "tools",
    description: "Extract EXIF and other metadata from image files.",
    tags: ["PIL", "exifread", "metadata"],
    difficulty: 2,
    lines: "~120 lines"
  },
  {
    title: "Duplicate File Finder",
    category: "tools",
    description: "Find and remove duplicate files based on content comparison.",
    tags: ["os", "hashlib", "file-management"],
    difficulty: 3,
    lines: "~200 lines"
  },
  {
    title: "Clipboard Manager",
    category: "tools",
    description: "Manage clipboard history with search and categorization.",
    tags: ["pyperclip", "tkinter", "clipboard"],
    difficulty: 3,
    lines: "~250 lines"
  },
  {
    title: "Screen Recorder",
    category: "tools",
    description: "Record screen activity and save as video files.",
    tags: ["opencv", "pyautogui", "screen-recording"],
    difficulty: 4,
    lines: "~300 lines"
  },
  {
    title: "Pomodoro Timer",
    category: "tools",
    description: "Productivity timer with work/break intervals and notifications.",
    tags: ["tkinter", "threading", "productivity"],
    difficulty: 2,
    lines: "~180 lines"
  },
  {
    title: "Bandwidth Monitor",
    category: "tools",
    description: "Monitor network bandwidth usage and generate reports.",
    tags: ["psutil", "matplotlib", "networking"],
    difficulty: 3,
    lines: "~200 lines"
  },
  {
    title: "System Information Tool",
    category: "tools",
    description: "Display detailed system information including hardware and software.",
    tags: ["psutil", "platform", "system-info"],
    difficulty: 2,
    lines: "~150 lines"
  },
  {
    title: "Regex Tester",
    category: "tools",
    description: "Test regular expressions with real-time matching and explanation.",
    tags: ["re", "tkinter", "regex"],
    difficulty: 3,
    lines: "~200 lines"
  },
  {
    title: "JSON Formatter",
    category: "tools",
    description: "Format, validate, and prettify JSON data with syntax highlighting.",
    tags: ["json", "tkinter", "formatting"],
    difficulty: 2,
    lines: "~150 lines"
  },
  {
    title: "Base64 Encoder/Decoder",
    category: "tools",
    description: "Encode and decode text or files to/from Base64 format.",
    tags: ["base64", "encoding", "tkinter"],
    difficulty: 1,
    lines: "~80 lines"
  },
  {
    title: "Port Scanner",
    category: "tools",
    description: "Scan for open ports on target hosts with threading support.",
    tags: ["socket", "threading", "networking"],
    difficulty: 3,
    lines: "~180 lines"
  },
  {
    title: "Markdown to HTML Converter",
    category: "tools",
    description: "Convert Markdown files to HTML with custom styling options.",
    tags: ["markdown", "html", "conversion"],
    difficulty: 2,
    lines: "~120 lines"
  },

  // Educational Category
  {
    title: "Typing Speed Test",
    category: "educational",
    description: "Test and improve typing speed with accuracy tracking and statistics.",
    tags: ["tkinter", "typing", "statistics"],
    difficulty: 3,
    lines: "~250 lines"
  },
  {
    title: "Math Quiz Game",
    category: "educational",
    description: "Interactive math quiz with different difficulty levels and progress tracking.",
    tags: ["tkinter", "math", "quiz"],
    difficulty: 2,
    lines: "~200 lines"
  },
  {
    title: "Flashcard App",
    category: "educational",
    description: "Digital flashcards for studying with spaced repetition algorithm.",
    tags: ["tkinter", "sqlite", "spaced-repetition"],
    difficulty: 3,
    lines: "~300 lines"
  },
  {
    title: "Periodic Table Explorer",
    category: "educational",
    description: "Interactive periodic table with element information and properties.",
    tags: ["tkinter", "chemistry", "data-visualization"],
    difficulty: 3,
    lines: "~400 lines"
  },
  {
    title: "Language Learning Tool",
    category: "educational",
    description: "Learn vocabulary and phrases in different languages with audio support.",
    tags: ["tkinter", "pyttsx3", "language-learning"],
    difficulty: 4,
    lines: "~350 lines"
  },
  {
    title: "Code Syntax Highlighter",
    category: "educational",
    description: "Highlight syntax for various programming languages with themes.",
    tags: ["pygments", "tkinter", "syntax-highlighting"],
    difficulty: 3,
    lines: "~200 lines"
  },
  {
    title: "Algorithm Visualizer",
    category: "educational",
    description: "Visualize sorting and searching algorithms with step-by-step animation.",
    tags: ["pygame", "algorithms", "visualization"],
    difficulty: 4,
    lines: "~400 lines"
  },
  {
    title: "Binary/Decimal Converter",
    category: "educational",
    description: "Convert between different number systems with educational explanations.",
    tags: ["tkinter", "number-systems", "education"],
    difficulty: 2,
    lines: "~150 lines"
  },
  {
    title: "Physics Simulator",
    category: "educational",
    description: "Simulate basic physics concepts like projectile motion and collisions.",
    tags: ["pygame", "physics", "simulation"],
    difficulty: 4,
    lines: "~350 lines"
  },
  {
    title: "Music Theory Trainer",
    category: "educational",
    description: "Learn music theory with interactive exercises and ear training.",
    tags: ["pygame", "music-theory", "audio"],
    difficulty: 4,
    lines: "~400 lines"
  },
  {
    title: "Geography Quiz",
    category: "educational",
    description: "Test geography knowledge with maps, capitals, and country information.",
    tags: ["tkinter", "geography", "quiz"],
    difficulty: 3,
    lines: "~300 lines"
  },
  {
    title: "Morse Code Translator",
    category: "educational",
    description: "Translate text to Morse code and vice versa with audio playback.",
    tags: ["pygame", "morse-code", "audio"],
    difficulty: 2,
    lines: "~150 lines"
  },
  {
    title: "Astronomy Viewer",
    category: "educational",
    description: "View constellations, planets, and astronomical data with interactive sky map.",
    tags: ["matplotlib", "astronomy", "data-visualization"],
    difficulty: 4,
    lines: "~350 lines"
  },
  {
    title: "Chemical Equation Balancer",
    category: "educational",
    description: "Balance chemical equations automatically with step-by-step solutions.",
    tags: ["sympy", "chemistry", "equation-solving"],
    difficulty: 4,
    lines: "~250 lines"
  },
  {
    title: "Statistics Calculator",
    category: "educational",
    description: "Calculate various statistical measures with data visualization.",
    tags: ["numpy", "matplotlib", "statistics"],
    difficulty: 3,
    lines: "~200 lines"
  },
  {
    title: "Coordinate Geometry Plotter",
    category: "educational",
    description: "Plot geometric shapes and analyze their properties interactively.",
    tags: ["matplotlib", "geometry", "plotting"],
    difficulty: 3,
    lines: "~250 lines"
  },
  {
    title: "DNA Sequence Analyzer",
    category: "educational",
    description: "Analyze DNA sequences for patterns, GC content, and mutations.",
    tags: ["biopython", "bioinformatics", "sequence-analysis"],
    difficulty: 4,
    lines: "~300 lines"
  },
  {
    title: "Logic Gate Simulator",
    category: "educational",
    description: "Simulate digital logic gates and circuits with truth tables.",
    tags: ["tkinter", "logic-gates", "digital-circuits"],
    difficulty: 3,
    lines: "~300 lines"
  },
  {
    title: "Fraction Calculator",
    category: "educational",
    description: "Perform operations on fractions with step-by-step explanations.",
    tags: ["tkinter", "fractions", "math"],
    difficulty: 2,
    lines: "~180 lines"
  },
  {
    title: "Drawing Tutor",
    category: "educational",
    description: "Learn to draw with guided tutorials and practice exercises.",
    tags: ["pygame", "drawing", "tutorial"],
    difficulty: 3,
    lines: "~320 lines"
  }
];

// Scroll function
function scrollToProjects() {
  document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
}

// Render projects
function renderProjects(projectsToRender) {
  const grid = document.getElementById('projectsGrid');
  grid.innerHTML = '';
  
  projectsToRender.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-category', project.category);
    
    const difficultyDots = Array(5).fill(0).map((_, i) => 
      `<span class="difficulty-dot ${i < project.difficulty ? 'active' : ''}"></span>`
    ).join('');
    
    const tagsHTML = project.tags.map(tag => 
      `<span class="project-tag">${tag}</span>`
    ).join('');
    
    // Add click event to show code
    const hasCode = project.code && project.code.trim().length > 0;
    const codeIndicator = hasCode ? '<span class="code-available">📝 Code Available</span>' : '';
    
    card.innerHTML = `
      <div class="project-header">
        <h3 class="project-title">${project.title}</h3>
        <span class="project-category">${project.category}</span>
      </div>
      <p class="project-description">${project.description}</p>
      ${codeIndicator}
      <div class="project-tags">${tagsHTML}</div>
      <div class="project-footer">
        <div class="project-difficulty">
          <div class="difficulty-dots">${difficultyDots}</div>
        </div>
        <span class="project-lines">${project.lines}</span>
      </div>
    `;
    
    // Add click event to open modal
    if (hasCode) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => openModal(project));
    }
    
    grid.appendChild(card);
  });
}

// Modal functionality
const modal = document.getElementById('codeModal');
const closeBtn = document.querySelector('.close');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');

function openModal(project) {
  const modalTitle = document.getElementById('modalTitle');
  const codeContent = document.getElementById('codeContent');
  
  modalTitle.textContent = project.title;
  codeContent.textContent = project.code || '# Code coming soon!';
  
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
  
  // Store current project for download
  modal.currentProject = project;
}

function closeModal() {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Close modal when clicking X
closeBtn.onclick = closeModal;

// Close modal when clicking outside
window.onclick = function(event) {
  if (event.target == modal) {
    closeModal();
  }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape' && modal.style.display === 'block') {
    closeModal();
  }
});

// Copy code functionality
copyBtn.onclick = function() {
  const codeContent = document.getElementById('codeContent');
  const text = codeContent.textContent;
  
  navigator.clipboard.writeText(text).then(() => {
    // Show success message
    const successMsg = document.createElement('div');
    successMsg.className = 'copy-success';
    successMsg.textContent = '✓ Code copied to clipboard!';
    document.body.appendChild(successMsg);
    
    setTimeout(() => {
      successMsg.remove();
    }, 2000);
    
    // Animate button
    copyBtn.innerHTML = '<span class="btn-icon">✓</span> Copied!';
    setTimeout(() => {
      copyBtn.innerHTML = '<span class="btn-icon">📋</span> Copy Code';
    }, 2000);
  });
}

// Download code functionality
downloadBtn.onclick = function() {
  const project = modal.currentProject;
  const code = project.code;
  const filename = project.title.toLowerCase().replace(/\s+/g, '_') + '.py';
  
  const blob = new Blob([code], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
  
  // Animate button
  downloadBtn.innerHTML = '<span class="btn-icon">✓</span> Downloaded!';
  setTimeout(() => {
    downloadBtn.innerHTML = '<span class="btn-icon">⬇️</span> Download';
  }, 2000);
}

// Filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const category = btn.getAttribute('data-category');
    const filteredProjects = category === 'all' 
      ? projects 
      : projects.filter(p => p.category === category);
    
    renderProjects(filteredProjects);
  });
});

// Search functionality
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const activeCategory = document.querySelector('.filter-btn.active').getAttribute('data-category');
  
  let filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);
  
  if (searchTerm) {
    filteredProjects = filteredProjects.filter(p => 
      p.title.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm) ||
      p.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }
  
  renderProjects(filteredProjects);
});

// Navigation
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    
    const target = link.getAttribute('href');
    document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
  });
});

// Smooth scroll spy for navigation
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.pageYOffset;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
});

// Initial render
renderProjects(projects);