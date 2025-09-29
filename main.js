// Project data with 150+ Python projects
const projects = [
  // Games Category
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
    title: "Hangman Game",
    category: "games",
    description: "Word guessing game with ASCII art and word categories.",
    tags: ["console", "word-game", "ascii-art"],
    difficulty: 2,
    lines: "~150 lines"
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
    title: "Fraction
