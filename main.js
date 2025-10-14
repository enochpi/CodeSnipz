// Project data with 150+ Python projects
const projects = [
  // ASCII Art & Terminal Games Category
  {
    title: "ASCII Snake Game",
    category: "ascii",
    description: "Classic snake game with keyboard controls, score tracking, speed progression, and game over screen.",
    tags: ["console", "ascii-art", "terminal"],
    difficulty: 2,
    lines: "~180 lines",
    code: `import random
  import time
  import os
  import sys
  from collections import deque

  # Game Constants
  WIDTH = 40
  HEIGHT = 20
  INITIAL_SPEED = 0.15
  SPEED_INCREMENT = 0.01
  MAX_SPEED = 0.05

  # Try to import keyboard input (works on Windows)
  try:
      import msvcrt
      HAS_MSVCRT = True
  except ImportError:
      HAS_MSVCRT = False
      print("Note: Arrow key controls not available on this system")
      print("Using automatic demo mode...")
      time.sleep(2)

  def clear_screen():
      """Clear the terminal screen"""
      os.system('cls' if os.name == 'nt' else 'clear')

  class SnakeGame:
      def __init__(self):
          self.width = WIDTH
          self.height = HEIGHT
          self.snake = deque([[20, 10], [19, 10], [18, 10]])
          self.direction = [1, 0]
          self.next_direction = [1, 0]
          self.food = self.place_food()
          self.score = 0
          self.speed = INITIAL_SPEED
          self.game_over = False
          self.high_score = 0
      
      def place_food(self):
          """Place food at random position not on snake"""
          while True:
              food = [random.randint(0, self.width-1), 
                    random.randint(0, self.height-1)]
              if food not in list(self.snake):
                  return food
      
      def change_direction(self, new_direction):
          """Change snake direction, preventing 180 degree turns"""
          opposite = [-self.direction[0], -self.direction[1]]
          if new_direction != opposite:
              self.next_direction = new_direction
      
      def move_snake(self):
          """Move snake in current direction"""
          self.direction = self.next_direction
          
          head = list(self.snake[0])
          new_head = [head[0] + self.direction[0], 
                    head[1] + self.direction[1]]
          
          # Check wall collision
          if (new_head[0] < 0 or new_head[0] >= self.width or 
              new_head[1] < 0 or new_head[1] >= self.height):
              self.game_over = True
              return False
          
          # Check self collision
          if new_head in list(self.snake):
              self.game_over = True
              return False
          
          self.snake.appendleft(new_head)
          
          # Check if food eaten
          if new_head == self.food:
              self.score += 10
              if self.score > self.high_score:
                  self.high_score = self.score
              # Increase speed
              self.speed = max(MAX_SPEED, self.speed - SPEED_INCREMENT)
              self.food = self.place_food()
          else:
              self.snake.pop()
          
          return True
      
      def draw_board(self):
          """Draw the game board"""
          clear_screen()
          board = [[' ' for _ in range(self.width)] 
                  for _ in range(self.height)]
          
          # Place food
          board[self.food[1]][self.food[0]] = '●'
          
          # Place snake
          for i, segment in enumerate(self.snake):
              if i == 0:
                  board[segment[1]][segment[0]] = '◉'  # Head
              else:
                  board[segment[1]][segment[0]] = '○'  # Body
          
          # Print top border
          print('╔' + '═' * self.width + '╗')
          
          # Print board
          for row in board:
              print('║' + ''.join(row) + '║')
          
          # Print bottom border
          print('╚' + '═' * self.width + '╝')
          
          # Print game info
          print(f'Score: {self.score:04d} | Length: {len(self.snake):02d} | High Score: {self.high_score:04d}')
          print(f'Speed Level: {int((INITIAL_SPEED - self.speed) / SPEED_INCREMENT) + 1}')
          
          if HAS_MSVCRT:
              print('Controls: Arrow Keys to move | Q to quit')
          else:
              print('Demo Mode - Watch the snake!')
      
      def show_game_over(self):
          """Display game over screen"""
          clear_screen()
          print('\\n' * 3)
          print('╔' + '═' * 42 + '╗')
          print('║' + ' ' * 15 + 'GAME OVER!' + ' ' * 16 + '║')
          print('║' + ' ' * 42 + '║')
          print(f'║     Final Score: {self.score:<25} ║')
          print(f'║     Snake Length: {len(self.snake):<25} ║')
          print(f'║     High Score:   {self.high_score:<25} ║')
          print('║' + ' ' * 42 + '║')
          print('╚' + '═' * 42 + '╝')
          print('\\nThanks for playing!')
      
      def get_input(self):
          """Get keyboard input if available"""
          if not HAS_MSVCRT:
              # Auto-play demo mode
              head = list(self.snake[0])
              food = self.food
              
              # Simple AI: move towards food
              if head[0] < food[0] and self.direction != [-1, 0]:
                  self.change_direction([1, 0])
              elif head[0] > food[0] and self.direction != [1, 0]:
                  self.change_direction([-1, 0])
              elif head[1] < food[1] and self.direction != [0, -1]:
                  self.change_direction([0, 1])
              elif head[1] > food[1] and self.direction != [0, 1]:
                  self.change_direction([0, -1])
              return True
          
          # Check for keyboard input
          if msvcrt.kbhit():
              key = msvcrt.getch()
              
              if key == b'q' or key == b'Q':
                  return False
              elif key == b'\\xe0':  # Arrow key prefix
                  key = msvcrt.getch()
                  if key == b'H':  # Up
                      self.change_direction([0, -1])
                  elif key == b'P':  # Down
                      self.change_direction([0, 1])
                  elif key == b'K':  # Left
                      self.change_direction([-1, 0])
                  elif key == b'M':  # Right
                      self.change_direction([1, 0])
          
          return True

  def main():
      """Main game loop"""
      game = SnakeGame()
      
      print("\\nSnake Game Starting...")
      print("=" * 40)
      if HAS_MSVCRT:
          print("Use Arrow Keys to control the snake")
          print("Press Q to quit")
      else:
          print("Running in demo mode - watch the AI play!")
      print("=" * 40)
      time.sleep(2)
      
      try:
          while not game.game_over:
              game.draw_board()
              
              # Get input
              if not game.get_input():
                  print("\\nGame quit by user")
                  sys.exit(0)
              
              # Move snake
              if not game.move_snake():
                  break
              
              time.sleep(game.speed)
          
          game.show_game_over()
          
      except KeyboardInterrupt:
          print("\\n\\nGame interrupted by user")
          sys.exit(0)

  if __name__ == '__main__':
      main()`
  },

  {
    title: "ASCII Dungeon Crawler",
    category: "ascii",
    description: "Explore procedurally generated dungeons, fight monsters, collect loot, and level up your character.",
    tags: ["console", "ascii-art", "roguelike"],
    difficulty: 4,
    lines: "~320 lines",
    code: `import curses
  import random
  import time
  from dataclasses import dataclass
  from typing import List, Tuple, Optional

  # Game Constants
  MAP_WIDTH = 80
  MAP_HEIGHT = 24
  ROOMS = 12
  ROOM_MIN_SIZE = 4
  ROOM_MAX_SIZE = 10
  VISION_RADIUS = 8

  @dataclass
  class Actor:
      """Base class for all game entities"""
      x: int
      y: int
      char: str
      hp: int
      max_hp: int
      attack: int
      name: str
      gold: int = 0
      xp: int = 0
      level: int = 1
      
      def is_alive(self) -> bool:
          return self.hp > 0
      
      def take_damage(self, damage: int) -> int:
          """Apply damage and return actual damage dealt"""
          actual_damage = max(0, damage)
          self.hp -= actual_damage
          return actual_damage
      
      def heal(self, amount: int):
          """Heal the actor"""
          self.hp = min(self.max_hp, self.hp + amount)

  class DungeonGenerator:
      """Handles dungeon generation"""
      
      def __init__(self, width: int, height: int):
          self.width = width
          self.height = height
          self.map = [['#' for _ in range(width)] for _ in range(height)]
          self.rooms = []
      
      def generate(self, num_rooms: int, min_size: int, max_size: int):
          """Generate a dungeon with rooms and corridors"""
          for _ in range(num_rooms):
              room_width = random.randint(min_size, max_size)
              room_height = random.randint(min_size, max_size)
              room_x = random.randint(1, self.width - room_width - 2)
              room_y = random.randint(1, self.height - room_height - 2)
              
              new_room = (room_x, room_y, room_width, room_height)
              
              # Check for overlaps
              if not self._rooms_overlap(new_room):
                  self._carve_room(new_room)
                  
                  # Connect to previous room
                  if len(self.rooms) > 0:
                      self._create_corridor(self.rooms[-1], new_room)
                  
                  self.rooms.append(new_room)
          
          return self.map, self.rooms
      
      def _rooms_overlap(self, new_room: Tuple[int, int, int, int]) -> bool:
          """Check if new room overlaps with existing rooms"""
          x1, y1, w1, h1 = new_room
          
          for x2, y2, w2, h2 in self.rooms:
              if (x1 < x2 + w2 + 2 and x2 < x1 + w1 + 2 and
                  y1 < y2 + h2 + 2 and y2 < y1 + h1 + 2):
                  return True
          return False
      
      def _carve_room(self, room: Tuple[int, int, int, int]):
          """Carve out a room in the map"""
          x, y, width, height = room
          for row in range(y, y + height):
              for col in range(x, x + width):
                  self.map[row][col] = '.'
      
      def _create_corridor(self, room1: Tuple[int, int, int, int], 
                          room2: Tuple[int, int, int, int]):
          """Create a corridor between two rooms"""
          x1, y1, w1, h1 = room1
          x2, y2, w2, h2 = room2
          
          # Get center points
          center1_x = x1 + w1 // 2
          center1_y = y1 + h1 // 2
          center2_x = x2 + w2 // 2
          center2_y = y2 + h2 // 2
          
          # Randomly choose L-shaped corridor direction
          if random.random() < 0.5:
              # Horizontal then vertical
              for x in range(min(center1_x, center2_x), max(center1_x, center2_x) + 1):
                  self.map[center1_y][x] = '.'
              for y in range(min(center1_y, center2_y), max(center1_y, center2_y) + 1):
                  self.map[y][center2_x] = '.'
          else:
              # Vertical then horizontal
              for y in range(min(center1_y, center2_y), max(center1_y, center2_y) + 1):
                  self.map[y][center1_x] = '.'
              for x in range(min(center1_x, center2_x), max(center1_x, center2_x) + 1):
                  self.map[center2_y][x] = '.'

  class GameWorld:
      """Manages the game world and entities"""
      
      def __init__(self):
          self.dungeon_gen = DungeonGenerator(MAP_WIDTH, MAP_HEIGHT)
          self.dungeon_map, self.rooms = self.dungeon_gen.generate(
              ROOMS, ROOM_MIN_SIZE, ROOM_MAX_SIZE)
          
          # Create player in first room
          start_room = self.rooms[0]
          px = start_room[0] + 1
          py = start_room[1] + 1
          self.player = Actor(px, py, '@', 20, 20, 3, 'Hero')
          
          # Place exit in last room
          last_room = self.rooms[-1]
          self.exit_pos = (last_room[0] + last_room[2] // 2,
                          last_room[1] + last_room[3] // 2)
          
          self.monsters = []
          self.items = []
          self._populate_dungeon()
          
          self.message = "Welcome to the dungeon! Find the exit to win."
          self.game_over = False
          self.victory = False
      
      def _populate_dungeon(self):
          """Populate dungeon with monsters and items"""
          monster_types = [
              ('g', 6, 2, 'Goblin'),
              ('o', 10, 3, 'Orc'),
              ('b', 4, 1, 'Bat'),
              ('t', 15, 4, 'Troll')
          ]
          
          item_types = ['potion', 'gold', 'sword', 'armor']
          
          # Skip first room (player spawn)
          for room in self.rooms[1:]:
              rx, ry, rw, rh = room
              
              # Place monsters
              num_monsters = random.randint(1, 3)
              for _ in range(num_monsters):
                  mx = random.randint(rx, rx + rw - 1)
                  my = random.randint(ry, ry + rh - 1)
                  
                  if self.dungeon_map[my][mx] == '.':
                      char, hp, atk, name = random.choice(monster_types)
                      monster = Actor(mx, my, char, hp, hp, atk, name)
                      self.monsters.append(monster)
              
              # Place items
              if random.random() < 0.6:
                  ix = random.randint(rx, rx + rw - 1)
                  iy = random.randint(ry, ry + rh - 1)
                  
                  if self.dungeon_map[iy][ix] == '.':
                      item = random.choice(item_types)
                      self.items.append(((ix, iy), item))
      
      def is_visible(self, x: int, y: int) -> bool:
          """Check if position is visible to player"""
          dx = x - self.player.x
          dy = y - self.player.y
          distance_squared = dx * dx + dy * dy
          return distance_squared <= VISION_RADIUS * VISION_RADIUS
      
      def find_monster_at(self, x: int, y: int) -> Optional[Actor]:
          """Find living monster at position"""
          for monster in self.monsters:
              if monster.x == x and monster.y == y and monster.is_alive():
                  return monster
          return None
      
      def pickup_item(self):
          """Try to pick up item at player position"""
          for i, ((ix, iy), item_type) in enumerate(self.items):
              if ix == self.player.x and iy == self.player.y:
                  if item_type == 'potion':
                      self.player.heal(8)
                      self.message = "You drank a healing potion! (+8 HP)"
                  elif item_type == 'gold':
                      gold = random.randint(5, 25)
                      self.player.gold += gold
                      self.message = f"You collected {gold} gold!"
                  elif item_type == 'sword':
                      self.player.attack += 2
                      self.message = "You found a sharp sword! (ATK +2)"
                  elif item_type == 'armor':
                      self.player.max_hp += 5
                      self.player.hp += 5
                      self.message = "You found sturdy armor! (Max HP +5)"
                  
                  self.items.pop(i)
                  return
          
          self.message = "Nothing here to pick up."
      
      def move_player(self, dx: int, dy: int):
          """Attempt to move player"""
          new_x = self.player.x + dx
          new_y = self.player.y + dy
          
          # Check bounds
          if (new_x < 0 or new_x >= MAP_WIDTH or
              new_y < 0 or new_y >= MAP_HEIGHT):
              self.message = "You can't go that way!"
              return
          
          # Check walls
          if self.dungeon_map[new_y][new_x] == '#':
              self.message = "Bump! There's a wall there."
              return
          
          # Check for monsters
          monster = self.find_monster_at(new_x, new_y)
          if monster:
              damage = self.player.attack + random.randint(-1, 2)
              actual_damage = monster.take_damage(damage)
              
              if monster.is_alive():
                  self.message = f"You hit {monster.name} for {actual_damage} damage!"
              else:
                  gold_drop = random.randint(3, 12)
                  self.player.gold += gold_drop
                  self.player.xp += 1
                  self.message = f"{monster.name} defeated! +{gold_drop} gold"
                  
                  # Level up check
                  if self.player.xp >= self.player.level * 5:
                      self.level_up()
              
              # Monsters attack back
              self.monsters_turn()
              return
          
          # Move player
          self.player.x = new_x
          self.player.y = new_y
          
          # Check for exit
          if (self.player.x, self.player.y) == self.exit_pos:
              self.victory = True
              self.game_over = True
              self.message = "You found the exit! Victory!"
              return
          
          # Monsters take their turn
          self.monsters_turn()
          
          # Auto-pickup
          for (ix, iy), _ in self.items:
              if ix == self.player.x and iy == self.player.y:
                  self.pickup_item()
                  break
          else:
              self.message = ""
      
      def level_up(self):
          """Level up the player"""
          self.player.level += 1
          self.player.xp = 0
          self.player.max_hp += 5
          self.player.hp = self.player.max_hp
          self.player.attack += 1
          self.message += " LEVEL UP! HP and ATK increased!"
      
      def monsters_turn(self):
          """All monsters take their turn"""
          for monster in self.monsters:
              if not monster.is_alive():
                  continue
              
              # Calculate distance to player
              dx = self.player.x - monster.x
              dy = self.player.y - monster.y
              distance = abs(dx) + abs(dy)
              
              # Attack if adjacent
              if distance == 1:
                  damage = monster.attack + random.randint(-1, 1)
                  actual_damage = self.player.take_damage(damage)
                  self.message = f"{monster.name} hits you for {actual_damage} damage!"
                  
                  if not self.player.is_alive():
                      self.game_over = True
                      self.message = "You have been slain! Game Over."
              
              # Move towards player if visible
              elif distance <= VISION_RADIUS:
                  # Simple pathfinding
                  possible_moves = [(1, 0), (-1, 0), (0, 1), (0, -1)]
                  possible_moves.sort(key=lambda d: abs(dx - d[0]) + abs(dy - d[1]))
                  
                  for move_dx, move_dy in possible_moves:
                      new_x = monster.x + move_dx
                      new_y = monster.y + move_dy
                      
                      if (0 <= new_x < MAP_WIDTH and 0 <= new_y < MAP_HEIGHT and
                          self.dungeon_map[new_y][new_x] == '.' and
                          not self.find_monster_at(new_x, new_y) and
                          (new_x, new_y) != (self.player.x, self.player.y)):
                          monster.x = new_x
                          monster.y = new_y
                          break

  def draw_game(stdscr, world: GameWorld):
      """Draw the game state"""
      try:
          stdscr.clear()
          
          # Draw map
          for y in range(MAP_HEIGHT):
              for x in range(MAP_WIDTH):
                  if world.is_visible(x, y):
                      char = world.dungeon_map[y][x]
                      stdscr.addch(y, x, ord(char))
          
          # Draw exit
          ex, ey = world.exit_pos
          if world.is_visible(ex, ey):
              stdscr.addch(ey, ex, ord('>'), curses.A_BOLD)
          
          # Draw items
          for (ix, iy), item_type in world.items:
              if world.is_visible(ix, iy):
                  stdscr.addch(iy, ix, ord('!'), curses.A_STANDOUT)
          
          # Draw monsters
          for monster in world.monsters:
              if monster.is_alive() and world.is_visible(monster.x, monster.y):
                  stdscr.addch(monster.y, monster.x, ord(monster.char))
          
          # Draw player
          stdscr.addch(world.player.y, world.player.x, ord('@'), curses.A_BOLD)
          
          # Draw HUD
          hud_y = MAP_HEIGHT
          stats = f"HP:{world.player.hp}/{world.player.max_hp} ATK:{world.player.attack} GOLD:{world.player.gold} LVL:{world.player.level} XP:{world.player.xp}/{world.player.level*5}"
          stdscr.addstr(hud_y, 0, stats[:MAP_WIDTH])
          
          # Draw message
          if world.message:
              stdscr.addstr(hud_y + 1, 0, world.message[:MAP_WIDTH])
          
          # Draw controls
          stdscr.addstr(hud_y + 2, 0, "Arrow keys/HJKL:Move | G:Pickup | I:Inventory | Q:Quit")
          
          stdscr.refresh()
      except curses.error:
          pass

  def game_loop(stdscr):
      """Main game loop"""
      curses.curs_set(0)
      stdscr.nodelay(True)
      stdscr.keypad(True)
      
      world = GameWorld()
      
      last_update = time.time()
      
      while not world.game_over:
          now = time.time()
          if now - last_update < 0.05:
              time.sleep(0.01)
              continue
          last_update = now
          
          draw_game(stdscr, world)
          
          # Get input
          try:
              key = stdscr.getch()
          except:
              key = -1
          
          if key == -1:
              continue
          
          # Handle input
          if key in (ord('q'), ord('Q'), 27):  # Q or ESC
              break
          elif key in (curses.KEY_UP, ord('k')):
              world.move_player(0, -1)
          elif key in (curses.KEY_DOWN, ord('j')):
              world.move_player(0, 1)
          elif key in (curses.KEY_LEFT, ord('h')):
              world.move_player(-1, 0)
          elif key in (curses.KEY_RIGHT, ord('l')):
              world.move_player(1, 0)
          elif key in (ord('g'), ord('G')):
              world.pickup_item()
          elif key in (ord('i'), ord('I')):
              stdscr.nodelay(False)
              stdscr.addstr(0, 0, f"INVENTORY - HP:{world.player.hp}/{world.player.max_hp} ATK:{world.player.attack} GOLD:{world.player.gold} - Press any key")
              stdscr.getch()
              stdscr.nodelay(True)
      
      # Game over screen
      stdscr.nodelay(False)
      stdscr.clear()
      
      if world.victory:
          message = "VICTORY! You escaped the dungeon!"
      else:
          message = "GAME OVER! You have been defeated."
      
      stdscr.addstr(MAP_HEIGHT // 2 - 2, MAP_WIDTH // 2 - len(message) // 2, message)
      stdscr.addstr(MAP_HEIGHT // 2, MAP_WIDTH // 2 - 15, f"Final Score: {world.player.gold}")
      stdscr.addstr(MAP_HEIGHT // 2 + 1, MAP_WIDTH // 2 - 15, f"Level Reached: {world.player.level}")
      stdscr.addstr(MAP_HEIGHT // 2 + 3, MAP_WIDTH // 2 - 15, "Press any key to exit...")
      stdscr.refresh()
      stdscr.getch()

  def main():
      """Entry point"""
      try:
          curses.wrapper(game_loop)
      except KeyboardInterrupt:
          print("\\nGame interrupted by user")

  if __name__ == '__main__':
      main()`
  },

  {
    title: "ASCII Chess",
    category: "ascii",
    description: "Full chess game with move validation, check detection, castling, en passant, and game state tracking.",
    tags: ["console", "ascii-art", "board-game"],
    difficulty: 4,
    lines: "~380 lines",
    code: `import os
  import sys
  from typing import Optional, Tuple, List

  # Chess piece Unicode symbols
  PIECES = {
      "r": "♜", "n": "♞", "b": "♝", "q": "♛", "k": "♚", "p": "♟",
      "R": "♖", "N": "♘", "B": "♗", "Q": "♕", "K": "♔", "P": "♙",
      " ": " "
  }

  def clear_screen():
      """Clear the terminal screen"""
      os.system("cls" if os.name == "nt" else "clear")

  class ChessGame:
      def __init__(self):
          """Initialize the chess board"""
          self.board = [
              ["r", "n", "b", "q", "k", "b", "n", "r"],
              ["p"] * 8,
              [" "] * 8,
              [" "] * 8,
              [" "] * 8,
              [" "] * 8,
              ["P"] * 8,
              ["R", "N", "B", "Q", "K", "B", "N", "R"]
          ]
          self.turn = "white"
          self.move_history = []
          self.captured_white = []
          self.captured_black = []
          self.white_king_moved = False
          self.black_king_moved = False
          self.white_rook_a_moved = False
          self.white_rook_h_moved = False
          self.black_rook_a_moved = False
          self.black_rook_h_moved = False
          self.en_passant_target = None
          self.halfmove_clock = 0
          self.fullmove_number = 1
      
      def print_board(self):
          """Display the chess board"""
          clear_screen()
          print("\\n" + "=" * 50)
          print("           ASCII CHESS GAME")
          print("=" * 50 + "\\n")
          
          # Column labels (top)
          print("    a   b   c   d   e   f   g   h")
          print("  ┌───┬───┬───┬───┬───┬───┬───┬───┐")
          
          # Board rows
          for i, row in enumerate(self.board):
              print(f"{8-i} │", end="")
              for piece in row:
                  print(f" {PIECES[piece]} │", end="")
              print(f" {8-i}")
              
              if i < 7:
                  print("  ├───┼───┼───┼───┼───┼───┼───┼───┤")
          
          print("  └───┴───┴───┴───┴───┴───┴───┴───┘")
          print("    a   b   c   d   e   f   g   h\\n")
          
          # Display captured pieces
          if self.captured_black:
              print(f"White captured: {' '.join([PIECES[p] for p in self.captured_black])}")
          if self.captured_white:
              print(f"Black captured: {' '.join([PIECES[p] for p in self.captured_white])}")
          
          print(f"\\nTurn: {self.turn.capitalize()}")
          print(f"Move: {self.fullmove_number}")
          
          # Check status
          if self.is_in_check(self.turn):
              print("\\n⚠️  CHECK! ⚠️")
      
      def parse_move(self, move_str: str) -> Optional[Tuple[int, int, int, int]]:
          """Parse algebraic notation (e.g., 'e2e4')"""
          try:
              if len(move_str) != 4:
                  return None
              
              from_col = ord(move_str[0].lower()) - 97
              from_row = 8 - int(move_str[1])
              to_col = ord(move_str[2].lower()) - 97
              to_row = 8 - int(move_str[3])
              
              if not (0 <= from_col < 8 and 0 <= from_row < 8 and
                    0 <= to_col < 8 and 0 <= to_row < 8):
                  return None
              
              return (from_row, from_col, to_row, to_col)
          except:
              return None
      
      def get_piece_at(self, row: int, col: int) -> str:
          """Get piece at position"""
          return self.board[row][col]
      
      def is_white_piece(self, piece: str) -> bool:
          """Check if piece is white"""
          return piece.isupper()
      
      def is_black_piece(self, piece: str) -> bool:
          """Check if piece is black"""
          return piece.islower()
      
      def is_valid_pawn_move(self, from_row: int, from_col: int, 
                            to_row: int, to_col: int, piece: str) -> bool:
          """Validate pawn movement"""
          direction = -1 if self.is_white_piece(piece) else 1
          start_row = 6 if self.is_white_piece(piece) else 1
          
          target = self.board[to_row][to_col]
          
          # Forward move
          if from_col == to_col and target == " ":
              # Single step
              if to_row == from_row + direction:
                  return True
              # Double step from start
              if from_row == start_row and to_row == from_row + 2 * direction:
                  if self.board[from_row + direction][from_col] == " ":
                      return True
          
          # Diagonal capture
          if abs(from_col - to_col) == 1 and to_row == from_row + direction:
              if target != " " and self.is_opponent_piece(target, piece):
                  return True
              # En passant
              if self.en_passant_target == (to_row, to_col):
                  return True
          
          return False
      
      def is_valid_rook_move(self, from_row: int, from_col: int,
                            to_row: int, to_col: int) -> bool:
          """Validate rook movement"""
          if from_row != to_row and from_col != to_col:
              return False
          return self.is_path_clear(from_row, from_col, to_row, to_col)
      
      def is_valid_knight_move(self, from_row: int, from_col: int,
                              to_row: int, to_col: int) -> bool:
          """Validate knight movement"""
          row_diff = abs(from_row - to_row)
          col_diff = abs(from_col - to_col)
          return (row_diff == 2 and col_diff == 1) or (row_diff == 1 and col_diff == 2)
      
      def is_valid_bishop_move(self, from_row: int, from_col: int,
                              to_row: int, to_col: int) -> bool:
          """Validate bishop movement"""
          if abs(from_row - to_row) != abs(from_col - to_col):
              return False
          return self.is_path_clear(from_row, from_col, to_row, to_col)
      
      def is_valid_queen_move(self, from_row: int, from_col: int,
                            to_row: int, to_col: int) -> bool:
          """Validate queen movement"""
          # Queen moves like rook or bishop
          if from_row == to_row or from_col == to_col:
              return self.is_path_clear(from_row, from_col, to_row, to_col)
          if abs(from_row - to_row) == abs(from_col - to_col):
              return self.is_path_clear(from_row, from_col, to_row, to_col)
          return False
      
      def is_valid_king_move(self, from_row: int, from_col: int,
                            to_row: int, to_col: int) -> bool:
          """Validate king movement"""
          row_diff = abs(from_row - to_row)
          col_diff = abs(from_col - to_col)
          
          # Normal king move
          if row_diff <= 1 and col_diff <= 1:
              return True
          
          # Castling
          if row_diff == 0 and col_diff == 2:
              return self.can_castle(from_row, from_col, to_row, to_col)
          
          return False
      
      def is_path_clear(self, from_row: int, from_col: int,
                        to_row: int, to_col: int) -> bool:
          """Check if path is clear between two positions"""
          row_dir = 0 if from_row == to_row else (1 if to_row > from_row else -1)
          col_dir = 0 if from_col == to_col else (1 if to_col > from_col else -1)
          
          current_row = from_row + row_dir
          current_col = from_col + col_dir
          
          while (current_row, current_col) != (to_row, to_col):
              if self.board[current_row][current_col] != " ":
                  return False
              current_row += row_dir
              current_col += col_dir
          
          return True
      
      def is_opponent_piece(self, target: str, piece: str) -> bool:
          """Check if target is opponent's piece"""
          if target == " ":
              return False
          return (self.is_white_piece(piece) and self.is_black_piece(target)) or \\
                (self.is_black_piece(piece) and self.is_white_piece(target))
      
      def can_castle(self, from_row: int, from_col: int,
                    to_row: int, to_col: int) -> bool:
          """Check if castling is valid"""
          piece = self.board[from_row][from_col]
          
          # King must not have moved
          if self.is_white_piece(piece) and self.white_king_moved:
              return False
          if self.is_black_piece(piece) and self.black_king_moved:
              return False
          
          # Kingside castling
          if to_col == 6:
              rook_col = 7
              if self.is_white_piece(piece) and self.white_rook_h_moved:
                  return False
              if self.is_black_piece(piece) and self.black_rook_h_moved:
                  return False
              
              # Path must be clear
              if not self.is_path_clear(from_row, from_col, from_row, rook_col):
                  return False
          
          # Queenside castling
          elif to_col == 2:
              rook_col = 0
              if self.is_white_piece(piece) and self.white_rook_a_moved:
                  return False
              if self.is_black_piece(piece) and self.black_rook_a_moved:
                  return False
              
              # Path must be clear
              if not self.is_path_clear(from_row, from_col, from_row, rook_col):
                  return False
          
          # King must not be in check
          if self.is_in_check(self.turn):
              return False
          
          return True
      
      def is_valid_move(self, from_row: int, from_col: int,
                      to_row: int, to_col: int) -> bool:
          """Check if move is valid"""
          piece = self.board[from_row][from_col]
          target = self.board[to_row][to_col]
          piece_type = piece.lower()
          
          # Can't capture own piece
          if target != " " and not self.is_opponent_piece(target, piece):
              return False
          
          # Validate based on piece type
          if piece_type == 'p':
              return self.is_valid_pawn_move(from_row, from_col, to_row, to_col, piece)
          elif piece_type == 'r':
              return self.is_valid_rook_move(from_row, from_col, to_row, to_col)
          elif piece_type == 'n':
              return self.is_valid_knight_move(from_row, from_col, to_row, to_col)
          elif piece_type == 'b':
              return self.is_valid_bishop_move(from_row, from_col, to_row, to_col)
          elif piece_type == 'q':
              return self.is_valid_queen_move(from_row, from_col, to_row, to_col)
          elif piece_type == 'k':
              return self.is_valid_king_move(from_row, from_col, to_row, to_col)
          
          return False
      
      def find_king(self, color: str) -> Tuple[int, int]:
          """Find the king's position"""
          king = 'K' if color == "white" else 'k'
          for row in range(8):
              for col in range(8):
                  if self.board[row][col] == king:
                      return (row, col)
          return (-1, -1)
      
      def is_in_check(self, color: str) -> bool:
          """Check if the king is in check"""
          king_pos = self.find_king(color)
          if king_pos == (-1, -1):
              return False
          
          # Check if any opponent piece can attack the king
          opponent = "black" if color == "white" else "white"
          for row in range(8):
              for col in range(8):
                  piece = self.board[row][col]
                  if piece != " ":
                      if (opponent == "white" and self.is_white_piece(piece)) or \\
                        (opponent == "black" and self.is_black_piece(piece)):
                          if self.is_valid_move(row, col, king_pos[0], king_pos[1]):
                              return True
          return False
      
      def make_move(self, from_row: int, from_col: int,
                    to_row: int, to_col: int) -> Tuple[bool, str]:
          """Execute a move"""
          piece = self.board[from_row][from_col]
          target = self.board[to_row][to_col]
          
          # Check if it's the right player's piece
          if (self.turn == "white" and not self.is_white_piece(piece)) or \\
            (self.turn == "black" and not self.is_black_piece(piece)):
              return False, "Not your piece!"
          
          # Validate move
          if not self.is_valid_move(from_row, from_col, to_row, to_col):
              return False, "Invalid move!"
          
          # Simulate move to check for check
          old_target = target
          self.board[to_row][to_col] = piece
          self.board[from_row][from_col] = " "
          
          if self.is_in_check(self.turn):
              # Undo move
              self.board[from_row][from_col] = piece
              self.board[to_row][to_col] = old_target
              return False, "Move would put you in check!"
          
          # Capture piece
          if target != " ":
              if self.is_white_piece(target):
                  self.captured_white.append(target)
              else:
                  self.captured_black.append(target)
          
          # Handle castling
          if piece.lower() == 'k' and abs(to_col - from_col) == 2:
              if to_col == 6:  # Kingside
                  self.board[from_row][5] = self.board[from_row][7]
                  self.board[from_row][7] = " "
              elif to_col == 2:  # Queenside
                  self.board[from_row][3] = self.board[from_row][0]
                  self.board[from_row][0] = " "
          
          # Update castling rights
          if piece == 'K':
              self.white_king_moved = True
          elif piece == 'k':
              self.black_king_moved = True
          elif piece == 'R':
              if from_col == 0:
                  self.white_rook_a_moved = True
              elif from_col == 7:
                  self.white_rook_h_moved = True
          elif piece == 'r':
              if from_col == 0:
                  self.black_rook_a_moved = True
              elif from_col == 7:
                  self.black_rook_h_moved = True
          
          # Record move
          move_notation = f"{chr(from_col + 97)}{8-from_row}{chr(to_col + 97)}{8-to_row}"
          self.move_history.append(move_notation)
          
          # Switch turn
          if self.turn == "black":
              self.fullmove_number += 1
          self.turn = "black" if self.turn == "white" else "white"
          
          return True, "Move successful!"

  def main():
      """Main game loop"""
      game = ChessGame()
      
      print("\\nChess Game Starting...")
      print("=" * 50)
      print("Enter moves in format: e2e4 (from square to square)")
      print("Commands: 'quit' to exit, 'help' for help, 'history' for moves")
      print("=" * 50)
      input("\\nPress Enter to begin...")
      
      while True:
          game.print_board()
          
          move_input = input("\\nEnter move: ").strip().lower()
          
          if move_input == "quit":
              print("\\nThanks for playing!")
              break
          
          if move_input == "help":
              print("\\n" + "=" * 50)
              print("HELP - How to Play")
              print("=" * 50)
              print("• Enter moves like 'e2e4' (from position to position)")
              print("• Pieces move according to standard chess rules")
              print("• The game prevents illegal moves")
              print("• 'quit' - Exit the game")
              print("• 'history' - View move history")
              print("=" * 50)
              input("\\nPress Enter to continue...")
              continue
          
          if move_input == "history":
              print("\\n" + "=" * 50)
              print("MOVE HISTORY")
              print("=" * 50)
              if game.move_history:
                  for i, move in enumerate(game.move_history, 1):
                      print(f"{i}. {move}")
              else:
                  print("No moves yet")
              print("=" * 50)
              input("\\nPress Enter to continue...")
              continue
          
          parsed_move = game.parse_move(move_input)
          
          if not parsed_move:
              print("\\nInvalid format! Use format like 'e2e4'")
              input("Press Enter to continue...")
              continue
          
          success, message = game.make_move(*parsed_move)
          
          if not success:
              print(f"\\nError: {message}")
              input("Press Enter to continue...")

  if __name__ == '__main__':
      try:
          main()
      except KeyboardInterrupt:
          print("\\n\\nGame interrupted by user. Goodbye!")
          sys.exit(0)`
  },
  {
    title: "ASCII Tetris",
    category: "ascii",
    description: "Classic Tetris with scoring, levels, line clearing effects, and next piece preview.",
    tags: ["console", "ascii-art", "puzzle"],
    difficulty: 3,
    lines: "~280 lines",
    code: `import os
  import time
  import random
  import sys

  # Try to import keyboard input module
  try:
      import msvcrt
      HAS_MSVCRT = True
  except ImportError:
      HAS_MSVCRT = False
      import select

  # Game Constants
  BOARD_WIDTH = 10
  BOARD_HEIGHT = 20
  INITIAL_FALL_SPEED = 0.5
  SPEED_INCREASE_PER_LEVEL = 0.05

  # Tetromino shapes
  SHAPES = [
      [[1, 1, 1, 1]],              # I
      [[1, 1], [1, 1]],            # O
      [[0, 1, 0], [1, 1, 1]],      # T
      [[1, 1, 0], [0, 1, 1]],      # S
      [[0, 1, 1], [1, 1, 0]],      # Z
      [[1, 0, 0], [1, 1, 1]],      # L
      [[0, 0, 1], [1, 1, 1]]       # J
  ]

  SHAPE_COLORS = ['I', 'O', 'T', 'S', 'Z', 'L', 'J']

  def clear_screen():
      """Clear the terminal screen"""
      os.system("cls" if os.name == "nt" else "clear")

  class TetrisGame:
      def __init__(self):
          self.width = BOARD_WIDTH
          self.height = BOARD_HEIGHT
          self.board = [[" " for _ in range(self.width)] 
                      for _ in range(self.height)]
          self.score = 0
          self.level = 1
          self.lines_cleared = 0
          self.fall_speed = INITIAL_FALL_SPEED
          
          self.current_shape = None
          self.current_x = 0
          self.current_y = 0
          self.current_color = None
          
          self.next_shape = None
          self.next_color = None
          
          self.game_over = False
          self.last_fall_time = time.time()
          
          self.spawn_new_piece()
          self.generate_next_piece()
      
      def generate_next_piece(self):
          """Generate the next piece"""
          index = random.randint(0, len(SHAPES) - 1)
          self.next_shape = [row[:] for row in SHAPES[index]]
          self.next_color = SHAPE_COLORS[index]
      
      def spawn_new_piece(self):
          """Spawn a new piece at the top"""
          if self.next_shape:
              self.current_shape = self.next_shape
              self.current_color = self.next_color
          else:
              index = random.randint(0, len(SHAPES) - 1)
              self.current_shape = [row[:] for row in SHAPES[index]]
              self.current_color = SHAPE_COLORS[index]
          
          self.current_x = self.width // 2 - len(self.current_shape[0]) // 2
          self.current_y = 0
          
          self.generate_next_piece()
          
          # Check if spawn position is blocked
          if not self.can_place(self.current_shape, self.current_x, self.current_y):
              self.game_over = True
      
      def can_place(self, shape, x, y):
          """Check if shape can be placed at position"""
          for i, row in enumerate(shape):
              for j, cell in enumerate(row):
                  if cell:
                      new_x = x + j
                      new_y = y + i
                      
                      # Check boundaries
                      if new_x < 0 or new_x >= self.width or new_y >= self.height:
                          return False
                      
                      # Check if position is occupied
                      if new_y >= 0 and self.board[new_y][new_x] != " ":
                          return False
          return True
      
      def place_piece(self):
          """Place current piece on the board"""
          for i, row in enumerate(self.current_shape):
              for j, cell in enumerate(row):
                  if cell:
                      board_y = self.current_y + i
                      board_x = self.current_x + j
                      if 0 <= board_y < self.height:
                          self.board[board_y][board_x] = self.current_color
      
      def rotate_piece(self):
          """Rotate the current piece clockwise"""
          rotated = [list(row) for row in zip(*self.current_shape[::-1])]
          
          # Try to place rotated piece
          if self.can_place(rotated, self.current_x, self.current_y):
              self.current_shape = rotated
          # Try wall kicks
          elif self.can_place(rotated, self.current_x - 1, self.current_y):
              self.current_shape = rotated
              self.current_x -= 1
          elif self.can_place(rotated, self.current_x + 1, self.current_y):
              self.current_shape = rotated
              self.current_x += 1
      
      def move_left(self):
          """Move piece left"""
          if self.can_place(self.current_shape, self.current_x - 1, self.current_y):
              self.current_x -= 1
      
      def move_right(self):
          """Move piece right"""
          if self.can_place(self.current_shape, self.current_x + 1, self.current_y):
              self.current_x += 1
      
      def move_down(self):
          """Move piece down"""
          if self.can_place(self.current_shape, self.current_x, self.current_y + 1):
              self.current_y += 1
              return True
          return False
      
      def hard_drop(self):
          """Drop piece to bottom instantly"""
          while self.move_down():
              self.score += 2  # Bonus points for hard drop
      
      def clear_lines(self):
          """Clear completed lines and update score"""
          lines_to_clear = []
          
          for i, row in enumerate(self.board):
              if all(cell != " " for cell in row):
                  lines_to_clear.append(i)
          
          if lines_to_clear:
              # Remove cleared lines
              for line_index in sorted(lines_to_clear, reverse=True):
                  del self.board[line_index]
              
              # Add new empty lines at top
              for _ in range(len(lines_to_clear)):
                  self.board.insert(0, [" " for _ in range(self.width)])
              
              # Update score and level
              num_lines = len(lines_to_clear)
              self.lines_cleared += num_lines
              
              # Score based on number of lines cleared at once
              line_scores = {1: 100, 2: 300, 3: 500, 4: 800}
              self.score += line_scores.get(num_lines, 100) * self.level
              
              # Level up every 10 lines
              new_level = self.lines_cleared // 10 + 1
              if new_level > self.level:
                  self.level = new_level
                  self.fall_speed = max(0.1, INITIAL_FALL_SPEED - 
                                      (self.level - 1) * SPEED_INCREASE_PER_LEVEL)
      
      def draw_board(self):
          """Draw the game board"""
          clear_screen()
          
          print("\\n" + "=" * 50)
          print("              TETRIS GAME")
          print("=" * 50 + "\\n")
          
          # Create display board with current piece
          display_board = [row[:] for row in self.board]
          
          # Draw current piece on display board
          for i, row in enumerate(self.current_shape):
              for j, cell in enumerate(row):
                  if cell:
                      display_y = self.current_y + i
                      display_x = self.current_x + j
                      if 0 <= display_y < self.height:
                          display_board[display_y][display_x] = self.current_color
          
          # Draw the board
          print("  ┌" + "─" * (self.width * 2) + "┐")
          for row in display_board:
              print("  │" + "".join([f"{cell} " for cell in row]) + "│")
          print("  └" + "─" * (self.width * 2) + "┘")
          
          # Draw stats
          print(f"\\n  Score: {self.score}")
          print(f"  Level: {self.level}")
          print(f"  Lines: {self.lines_cleared}")
          
          # Draw next piece
          print("\\n  Next Piece:")
          print("  ┌────────┐")
          for i in range(3):
              print("  │", end="")
              if i < len(self.next_shape):
                  row = self.next_shape[i]
                  for cell in row:
                      print(self.next_color if cell else " ", end=" ")
                  # Pad the rest
                  for _ in range(4 - len(row)):
                      print(" ", end=" ")
              else:
                  print("        ", end="")
              print("│")
          print("  └────────┘")
          
          # Draw controls
          print("\\n  Controls:")
          if HAS_MSVCRT:
              print("  A/D - Move Left/Right")
              print("  S - Soft Drop")
              print("  W - Rotate")
              print("  Space - Hard Drop")
              print("  Q - Quit")
          else:
              print("  Auto-play demo mode")
              print("  Press Ctrl+C to quit")
      
      def get_input(self):
          """Get keyboard input"""
          if not HAS_MSVCRT:
              # Simple AI for demo mode
              if self.current_x > self.width // 2:
                  self.move_left()
              elif self.current_x < self.width // 2:
                  self.move_right()
              return True
          
          if msvcrt.kbhit():
              key = msvcrt.getch()
              
              if key == b'q' or key == b'Q':
                  return False
              elif key == b'a' or key == b'A':
                  self.move_left()
              elif key == b'd' or key == b'D':
                  self.move_right()
              elif key == b's' or key == b'S':
                  self.move_down()
                  self.score += 1  # Bonus for soft drop
              elif key == b'w' or key == b'W':
                  self.rotate_piece()
              elif key == b' ':
                  self.hard_drop()
                  self.place_piece()
                  self.clear_lines()
                  self.spawn_new_piece()
          
          return True
      
      def update(self):
          """Update game state"""
          current_time = time.time()
          
          # Auto-fall based on fall speed
          if current_time - self.last_fall_time >= self.fall_speed:
              if not self.move_down():
                  # Piece has landed
                  self.place_piece()
                  self.clear_lines()
                  self.spawn_new_piece()
              
              self.last_fall_time = current_time
      
      def show_game_over(self):
          """Display game over screen"""
          clear_screen()
          print("\\n" * 5)
          print("  ╔" + "═" * 46 + "╗")
          print("  ║" + " " * 17 + "GAME OVER!" + " " * 18 + "║")
          print("  ║" + " " * 46 + "║")
          print(f"  ║     Final Score: {self.score:<28} ║")
          print(f"  ║     Level Reached: {self.level:<27} ║")
          print(f"  ║     Lines Cleared: {self.lines_cleared:<27} ║")
          print("  ║" + " " * 46 + "║")
          print("  ╚" + "═" * 46 + "╝")
          print("\\n  Thanks for playing!\\n")

  def main():
      """Main game loop"""
      game = TetrisGame()
      
      print("\\nTetris Game Starting...")
      print("=" * 50)
      if HAS_MSVCRT:
          print("Controls: A/D=Left/Right, W=Rotate, S=Soft Drop")
          print("          Space=Hard Drop, Q=Quit")
      else:
          print("Demo mode - watch the AI play!")
          print("Press Ctrl+C to quit")
      print("=" * 50)
      time.sleep(2)
      
      try:
          while not game.game_over:
              game.draw_board()
              
              if not game.get_input():
                  print("\\nGame quit by user")
                  sys.exit(0)
              
              game.update()
              
              time.sleep(0.05)  # Small delay for smooth gameplay
          
          game.show_game_over()
          
      except KeyboardInterrupt:
          print("\\n\\nGame interrupted by user. Goodbye!")
          sys.exit(0)

  if __name__ == '__main__':
      main()`
  },
  {
    title: "ASCII Pong",
    category: "ascii",
    description: "Two-player Pong with score tracking, ball speed increase, and game-to-X points.",
    tags: ["console", "ascii-art", "arcade"],
    difficulty: 2,
    lines: "~220 lines",
    code: `import os
  import time
  import sys

  # Try to import keyboard module
  try:
      import msvcrt
      HAS_MSVCRT = True
  except ImportError:
      HAS_MSVCRT = False
      print("Note: Real-time controls not available on this system")

  # Game Constants
  BOARD_WIDTH = 60
  BOARD_HEIGHT = 20
  PADDLE_HEIGHT = 4
  WINNING_SCORE = 5
  INITIAL_BALL_SPEED = 0.08
  SPEED_INCREASE = 0.005
  MAX_SPEED = 0.03

  def clear_screen():
      """Clear the terminal screen"""
      os.system("cls" if os.name == "nt" else "clear")

  class PongGame:
      def __init__(self):
          self.width = BOARD_WIDTH
          self.height = BOARD_HEIGHT
          self.paddle_height = PADDLE_HEIGHT
          
          # Paddle positions (y-coordinate of top of paddle)
          self.player1_y = self.height // 2 - self.paddle_height // 2
          self.player2_y = self.height // 2 - self.paddle_height // 2
          
          # Ball position and velocity
          self.ball_x = self.width // 2
          self.ball_y = self.height // 2
          self.ball_dx = 1
          self.ball_dy = 1
          self.ball_speed = INITIAL_BALL_SPEED
          
          # Scores
          self.player1_score = 0
          self.player2_score = 0
          
          # Game state
          self.game_over = False
          self.winner = None
          self.last_update = time.time()
          self.rally_count = 0
      
      def reset_ball(self, direction=None):
          """Reset ball to center with optional direction"""
          self.ball_x = self.width // 2
          self.ball_y = self.height // 2
          
          if direction == "left":
              self.ball_dx = -1
          elif direction == "right":
              self.ball_dx = 1
          else:
              self.ball_dx = 1 if self.ball_dx > 0 else -1
          
          self.ball_dy = 1 if self.ball_y % 2 == 0 else -1
          self.ball_speed = INITIAL_BALL_SPEED
          self.rally_count = 0
      
      def move_player1_up(self):
          """Move player 1 paddle up"""
          if self.player1_y > 0:
              self.player1_y -= 1
      
      def move_player1_down(self):
          """Move player 1 paddle down"""
          if self.player1_y < self.height - self.paddle_height:
              self.player1_y += 1
      
      def move_player2_up(self):
          """Move player 2 paddle up"""
          if self.player2_y > 0:
              self.player2_y -= 1
      
      def move_player2_down(self):
          """Move player 2 paddle down"""
          if self.player2_y < self.height - self.paddle_height:
              self.player2_y += 1
      
      def update_ball(self):
          """Update ball position and handle collisions"""
          # Move ball
          self.ball_x += self.ball_dx
          self.ball_y += self.ball_dy
          
          # Top and bottom wall collision
          if self.ball_y <= 0 or self.ball_y >= self.height - 1:
              self.ball_dy *= -1
              self.ball_y = max(0, min(self.ball_y, self.height - 1))
          
          # Player 1 paddle collision (left side)
          if self.ball_x == 2 and self.ball_dx < 0:
              if self.player1_y <= self.ball_y < self.player1_y + self.paddle_height:
                  self.ball_dx *= -1
                  self.rally_count += 1
                  
                  # Increase speed with each rally
                  if self.rally_count % 3 == 0:
                      self.ball_speed = max(MAX_SPEED, 
                                          self.ball_speed - SPEED_INCREASE)
                  
                  # Add spin based on where ball hits paddle
                  hit_pos = self.ball_y - self.player1_y
                  if hit_pos < self.paddle_height // 2:
                      self.ball_dy = -1
                  else:
                      self.ball_dy = 1
          
          # Player 2 paddle collision (right side)
          if self.ball_x == self.width - 3 and self.ball_dx > 0:
              if self.player2_y <= self.ball_y < self.player2_y + self.paddle_height:
                  self.ball_dx *= -1
                  self.rally_count += 1
                  
                  # Increase speed
                  if self.rally_count % 3 == 0:
                      self.ball_speed = max(MAX_SPEED, 
                                          self.ball_speed - SPEED_INCREASE)
                  
                  # Add spin
                  hit_pos = self.ball_y - self.player2_y
                  if hit_pos < self.paddle_height // 2:
                      self.ball_dy = -1
                  else:
                      self.ball_dy = 1
          
          # Scoring - Player 1 misses (left side)
          if self.ball_x <= 0:
              self.player2_score += 1
              if self.player2_score >= WINNING_SCORE:
                  self.game_over = True
                  self.winner = "Player 2"
              else:
                  self.reset_ball("right")
          
          # Scoring - Player 2 misses (right side)
          if self.ball_x >= self.width - 1:
              self.player1_score += 1
              if self.player1_score >= WINNING_SCORE:
                  self.game_over = True
                  self.winner = "Player 1"
              else:
                  self.reset_ball("left")
      
      def draw(self):
          """Draw the game board"""
          clear_screen()
          
          print("\\n" + "=" * 70)
          print("                        ASCII PONG")
          print("=" * 70 + "\\n")
          
          # Draw top border
          print("  ┌" + "─" * (self.width) + "┐")
          
          # Draw game board
          for y in range(self.height):
              row = "  │"
              
              for x in range(self.width):
                  # Draw player 1 paddle (left side)
                  if x == 1 and self.player1_y <= y < self.player1_y + self.paddle_height:
                      row += "█"
                  # Draw player 2 paddle (right side)
                  elif x == self.width - 2 and self.player2_y <= y < self.player2_y + self.paddle_height:
                      row += "█"
                  # Draw ball
                  elif x == self.ball_x and y == self.ball_y:
                      row += "●"
                  # Draw center line
                  elif x == self.width // 2 and y % 2 == 0:
                      row += "┊"
                  else:
                      row += " "
              
              row += "│"
              print(row)
          
          # Draw bottom border
          print("  └" + "─" * (self.width) + "┘\\n")
          
          # Draw scores
          score_padding = self.width // 2 - 10
          print(f"  Player 1: {self.player1_score}" + " " * score_padding + 
                f"Player 2: {self.player2_score}")
          print(f"  First to {WINNING_SCORE} wins!\\n")
          
          # Draw controls
          if HAS_MSVCRT:
              print("  Player 1: W/S    |    Player 2: I/K    |    Q: Quit")
          else:
              print("  Demo Mode - Press Ctrl+C to quit")
          
          # Show rally counter
          if self.rally_count > 0:
              print(f"\\n  Rally: {self.rally_count}")
      
      def get_input(self):
          """Get keyboard input"""
          if not HAS_MSVCRT:
              # Simple AI for demo mode
              # Player 1 AI
              if self.ball_y < self.player1_y + self.paddle_height // 2:
                  self.move_player1_up()
              elif self.ball_y > self.player1_y + self.paddle_height // 2:
                  self.move_player1_down()
              
              # Player 2 AI
              if self.ball_y < self.player2_y + self.paddle_height // 2:
                  self.move_player2_up()
              elif self.ball_y > self.player2_y + self.paddle_height // 2:
                  self.move_player2_down()
              
              return True
          
          # Check for keyboard input
          if msvcrt.kbhit():
              key = msvcrt.getch()
              
              # Quit
              if key == b'q' or key == b'Q':
                  return False
              
              # Player 1 controls
              if key == b'w' or key == b'W':
                  self.move_player1_up()
              elif key == b's' or key == b'S':
                  self.move_player1_down()
              
              # Player 2 controls
              if key == b'i' or key == b'I':
                  self.move_player2_up()
              elif key == b'k' or key == b'K':
                  self.move_player2_down()
          
          return True
      
      def show_game_over(self):
          """Display game over screen"""
          clear_screen()
          print("\\n" * 5)
          print("  ╔" + "═" * 50 + "╗")
          print("  ║" + " " * 50 + "║")
          print(f"  ║{self.winner.center(50)}║")
          print("  ║" + " " * 50 + "║")
          print(f"  ║{'WINS!'.center(50)}║")
          print("  ║" + " " * 50 + "║")
          print(f"  ║{f'Final Score: {self.player1_score} - {self.player2_score}'.center(50)}║")
          print("  ║" + " " * 50 + "║")
          print("  ╚" + "═" * 50 + "╝")
          print("\\n  Thanks for playing!\\n")

  def main():
      """Main game loop"""
      game = PongGame()
      
      print("\\nPong Game Starting...")
      print("=" * 70)
      if HAS_MSVCRT:
          print("Player 1 (Left): W=Up, S=Down")
          print("Player 2 (Right): I=Up, K=Down")
          print("Press Q to quit")
      else:
          print("Demo mode - Watch the AI play!")
          print("Press Ctrl+C to quit")
      print(f"First to {WINNING_SCORE} points wins!")
      print("=" * 70)
      time.sleep(2)
      
      try:
          while not game.game_over:
              current_time = time.time()
              
              # Update ball based on speed
              if current_time - game.last_update >= game.ball_speed:
                  game.update_ball()
                  game.last_update = current_time
              
              game.draw()
              
              # Get input
              if not game.get_input():
                  print("\\nGame quit by user. Goodbye!")
                  sys.exit(0)
              
              time.sleep(0.02)  # Small delay for smooth gameplay
          
          # Show game over screen
          game.show_game_over()
          
      except KeyboardInterrupt:
          print("\\n\\nGame interrupted by user. Goodbye!")
          sys.exit(0)

  if __name__ == '__main__':
      main()`
  },
  {
    title: "ASCII Art Portrait Generator",
    category: "ascii",
    description: "Convert photos into detailed ASCII art with multiple character sets, color options, and export functionality.",
    tags: ["PIL", "ascii-art", "image-processing"],
    difficulty: 3,
    lines: "~180 lines",
    code: `from PIL import Image
  import os
  import sys

  # Different ASCII character sets for different effects
  ASCII_CHARS = {
      'standard': "@%#*+=-:. ",
      'detailed': "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\\"^'. ",
      'simple': "█▓▒░ ",
      'blocks': "█▓▒░ ",
      'minimal': "@#:. "
  }

  def clear_screen():
      """Clear the terminal screen"""
      os.system('cls' if os.name == 'nt' else 'clear')

  class ASCIIArtGenerator:
      def __init__(self):
          self.char_set = ASCII_CHARS['standard']
          self.width = 100
          self.aspect_ratio = 1.65
      
      def resize_image(self, image, new_width=None):
          """Resize image maintaining aspect ratio"""
          if new_width is None:
              new_width = self.width
          
          width, height = image.size
          ratio = height / width / self.aspect_ratio
          new_height = int(new_width * ratio)
          
          return image.resize((new_width, new_height))
      
      def grayscale_image(self, image):
          """Convert image to grayscale"""
          return image.convert("L")
      
      def pixels_to_ascii(self, image):
          """Convert pixel values to ASCII characters"""
          pixels = image.getdata()
          ascii_str = ""
          
          for pixel in pixels:
              # Map pixel value (0-255) to character index
              ascii_str += self.char_set[pixel * len(self.char_set) // 256]
          
          return ascii_str
      
      def image_to_ascii(self, image_path):
          """Convert image file to ASCII art"""
          try:
              # Open image
              image = Image.open(image_path)
          except Exception as e:
              return None, f"Error opening image: {e}"
          
          # Resize image
          image = self.resize_image(image)
          
          # Convert to grayscale
          image = self.grayscale_image(image)
          
          # Convert to ASCII
          ascii_str = self.pixels_to_ascii(image)
          
          # Get image dimensions
          img_width = image.width
          
          # Split into lines
          ascii_lines = []
          for i in range(0, len(ascii_str), img_width):
              ascii_lines.append(ascii_str[i:i + img_width])
          
          return "\\n".join(ascii_lines), None
      
      def save_to_file(self, ascii_art, output_path):
          """Save ASCII art to text file"""
          try:
              with open(output_path, 'w', encoding='utf-8') as f:
                  f.write(ascii_art)
              return True, f"Saved to {output_path}"
          except Exception as e:
              return False, f"Error saving file: {e}"
      
      def set_character_set(self, set_name):
          """Change the character set"""
          if set_name in ASCII_CHARS:
              self.char_set = ASCII_CHARS[set_name]
              return True
          return False
      
      def set_width(self, width):
          """Set output width"""
          if 20 <= width <= 300:
              self.width = width
              return True
          return False

  def display_menu():
      """Display the main menu"""
      clear_screen()
      print("\\n" + "=" * 60)
      print("           ASCII ART PORTRAIT GENERATOR")
      print("=" * 60)
      print("\\nConvert your images into ASCII art!")
      print("\\nOptions:")
      print("  1. Convert image")
      print("  2. Change character set")
      print("  3. Change width")
      print("  4. Exit")
      print("=" * 60)

  def display_character_sets():
      """Display available character sets"""
      print("\\nAvailable character sets:")
      for i, name in enumerate(ASCII_CHARS.keys(), 1):
          print(f"  {i}. {name.capitalize()}: {ASCII_CHARS[name][:20]}...")

  def main():
      """Main application loop"""
      generator = ASCIIArtGenerator()
      
      print("\\nASCII Art Generator Starting...")
      print("Loading...")
      
      while True:
          display_menu()
          
          choice = input("\\nEnter your choice (1-4): ").strip()
          
          if choice == '1':
              # Convert image
              clear_screen()
              print("\\n" + "=" * 60)
              print("                    CONVERT IMAGE")
              print("=" * 60)
              
              image_path = input("\\nEnter image path: ").strip()
              
              if not os.path.exists(image_path):
                  print(f"\\nError: File '{image_path}' not found!")
                  input("\\nPress Enter to continue...")
                  continue
              
              print("\\nConverting image to ASCII art...")
              ascii_art, error = generator.image_to_ascii(image_path)
              
              if error:
                  print(f"\\n{error}")
                  input("\\nPress Enter to continue...")
                  continue
              
              # Display result
              clear_screen()
              print("\\n" + "=" * 60)
              print("                    RESULT")
              print("=" * 60 + "\\n")
              print(ascii_art)
              print("\\n" + "=" * 60)
              
              # Ask to save
              save_choice = input("\\nSave to file? (y/n): ").strip().lower()
              
              if save_choice == 'y':
                  output_path = input("Enter output filename (e.g., output.txt): ").strip()
                  
                  if not output_path:
                      output_path = "ascii_art.txt"
                  
                  success, message = generator.save_to_file(ascii_art, output_path)
                  print(f"\\n{message}")
              
              input("\\nPress Enter to continue...")
          
          elif choice == '2':
              # Change character set
              clear_screen()
              print("\\n" + "=" * 60)
              print("                 CHARACTER SETS")
              print("=" * 60)
              
              display_character_sets()
              
              set_choice = input("\\nSelect character set (1-5): ").strip()
              
              try:
                  set_index = int(set_choice) - 1
                  set_names = list(ASCII_CHARS.keys())
                  
                  if 0 <= set_index < len(set_names):
                      generator.set_character_set(set_names[set_index])
                      print(f"\\nCharacter set changed to: {set_names[set_index]}")
                  else:
                      print("\\nInvalid selection!")
              except ValueError:
                  print("\\nInvalid input!")
              
              input("\\nPress Enter to continue...")
          
          elif choice == '3':
              # Change width
              clear_screen()
              print("\\n" + "=" * 60)
              print("                   OUTPUT WIDTH")
              print("=" * 60)
              
              print(f"\\nCurrent width: {generator.width}")
              print("Valid range: 20-300 characters")
              
              width_input = input("\\nEnter new width: ").strip()
              
              try:
                  new_width = int(width_input)
                  
                  if generator.set_width(new_width):
                      print(f"\\nWidth changed to: {new_width}")
                  else:
                      print("\\nWidth must be between 20 and 300!")
              except ValueError:
                  print("\\nInvalid input!")
              
              input("\\nPress Enter to continue...")
          
          elif choice == '4':
              # Exit
              clear_screen()
              print("\\nThank you for using ASCII Art Generator!")
              print("Goodbye!\\n")
              sys.exit(0)
          
          else:
              print("\\nInvalid choice! Please enter 1-4.")
              input("\\nPress Enter to continue...")

  if __name__ == '__main__':
      try:
          main()
      except KeyboardInterrupt:
          print("\\n\\nProgram interrupted by user. Goodbye!")
          sys.exit(0)
      except Exception as e:
          print(f"\\n\\nAn error occurred: {e}")
          sys.exit(1)`
  },
  {
    title: "ASCII Animation Player",
    category: "ascii",
    description: "Play ASCII art animations with playback controls, frame rate adjustment, and creation tools.",
    tags: ["console", "ascii-art", "animation"],
    difficulty: 2,
    lines: "~240 lines",
    code: `import time
  import os
  import sys

  def clear_screen():
      """Clear the terminal screen"""
      os.system('cls' if os.name == 'nt' else 'clear')

  class ASCIIAnimationPlayer:
      def __init__(self):
          self.frames = []
          self.current_frame = 0
          self.fps = 10
          self.delay = 1.0 / self.fps
          self.loop = True
          self.playing = False
          self.animation_name = "Untitled"
      
      def load_animation(self, filepath):
          """Load animation from file"""
          try:
              with open(filepath, 'r', encoding='utf-8') as f:
                  content = f.read()
              
              # Split by frame separator
              frame_separator = "===FRAME==="
              raw_frames = content.split(frame_separator)
              
              # Clean and store frames
              self.frames = []
              for frame in raw_frames:
                  if frame.strip():  # Skip empty frames
                      self.frames.append(frame)
              
              if not self.frames:
                  return False, "No frames found in file!"
              
              self.animation_name = os.path.basename(filepath)
              return True, f"Loaded {len(self.frames)} frames"
              
          except FileNotFoundError:
              return False, f"File not found: {filepath}"
          except Exception as e:
              return False, f"Error loading file: {e}"
      
      def save_animation(self, filepath):
          """Save animation to file"""
          try:
              with open(filepath, 'w', encoding='utf-8') as f:
                  for i, frame in enumerate(self.frames):
                      if i > 0:
                          f.write("\\n===FRAME===\\n")
                      f.write(frame)
              
              return True, f"Animation saved to {filepath}"
          except Exception as e:
              return False, f"Error saving file: {e}"
      
      def play(self):
          """Play the animation"""
          if not self.frames:
              return False, "No frames loaded!"
          
          self.playing = True
          self.current_frame = 0
          
          try:
              while self.playing:
                  clear_screen()
                  
                  # Display frame
                  print(self.frames[self.current_frame])
                  
                  # Display controls
                  print("\\n" + "─" * 50)
                  print(f"Frame: {self.current_frame + 1}/{len(self.frames)} | "
                        f"FPS: {self.fps} | Loop: {self.loop}")
                  print("Controls: [Space]=Pause [Q]=Quit [+/-]=Speed [L]=Loop")
                  print("─" * 50)
                  
                  # Wait for frame delay
                  time.sleep(self.delay)
                  
                  # Next frame
                  self.current_frame += 1
                  
                  if self.current_frame >= len(self.frames):
                      if self.loop:
                          self.current_frame = 0
                      else:
                          self.playing = False
                          return True, "Animation finished"
              
              return True, "Playback stopped"
              
          except KeyboardInterrupt:
              self.playing = False
              return True, "Playback interrupted"
      
      def set_fps(self, fps):
          """Set frames per second"""
          if 1 <= fps <= 60:
              self.fps = fps
              self.delay = 1.0 / self.fps
              return True
          return False
      
      def toggle_loop(self):
          """Toggle loop mode"""
          self.loop = not self.loop
      
      def create_simple_animation(self):
          """Create a simple test animation"""
          self.frames = [
              """
      ╔════════════════════╗
      ║                    ║
      ║        (●)         ║
      ║                    ║
      ╚════════════════════╝
              """,
              """
      ╔════════════════════╗
      ║                    ║
      ║       (●)          ║
      ║                    ║
      ╚════════════════════╝
              """,
              """
      ╔════════════════════╗
      ║                    ║
      ║      (●)           ║
      ║                    ║
      ╚════════════════════╝
              """,
              """
      ╔════════════════════╗
      ║                    ║
      ║     (●)            ║
      ║                    ║
      ╚════════════════════╝
              """,
              """
      ╔════════════════════╗
      ║                    ║
      ║    (●)             ║
      ║                    ║
      ╚════════════════════╝
              """
          ]
          self.animation_name = "Bouncing Ball Demo"

  def display_menu():
      """Display main menu"""
      clear_screen()
      print("\\n" + "═" * 60)
      print("            ASCII ANIMATION PLAYER")
      print("═" * 60)
      print("\\nOptions:")
      print("  1. Load animation from file")
      print("  2. Play animation")
      print("  3. Set FPS (frames per second)")
      print("  4. Toggle loop mode")
      print("  5. View animation info")
      print("  6. Create demo animation")
      print("  7. Save animation")
      print("  8. Exit")
      print("═" * 60)

  def main():
      """Main application loop"""
      player = ASCIIAnimationPlayer()
      
      print("\\nASCII Animation Player Starting...")
      time.sleep(1)
      
      while True:
          display_menu()
          
          choice = input("\\nEnter your choice (1-8): ").strip()
          
          if choice == '1':
              # Load animation
              clear_screen()
              print("\\n" + "═" * 60)
              print("                  LOAD ANIMATION")
              print("═" * 60)
              print("\\nAnimation file format:")
              print("  - Text file with frames separated by '===FRAME==='")
              print("  - Example: frame1.txt\\n")
              
              filepath = input("Enter animation file path: ").strip()
              
              success, message = player.load_animation(filepath)
              print(f"\\n{message}")
              
              input("\\nPress Enter to continue...")
          
          elif choice == '2':
              # Play animation
              if not player.frames:
                  print("\\nNo animation loaded! Load a file first.")
                  input("\\nPress Enter to continue...")
                  continue
              
              clear_screen()
              print("\\nStarting playback...")
              print("Press Ctrl+C to stop\\n")
              time.sleep(1)
              
              success, message = player.play()
              
              clear_screen()
              print(f"\\n{message}")
              input("\\nPress Enter to continue...")
          
          elif choice == '3':
              # Set FPS
              clear_screen()
              print("\\n" + "═" * 60)
              print("                    SET FPS")
              print("═" * 60)
              print(f"\\nCurrent FPS: {player.fps}")
              print("Valid range: 1-60")
              
              fps_input = input("\\nEnter new FPS: ").strip()
              
              try:
                  new_fps = int(fps_input)
                  
                  if player.set_fps(new_fps):
                      print(f"\\nFPS set to: {new_fps}")
                  else:
                      print("\\nFPS must be between 1 and 60!")
              except ValueError:
                  print("\\nInvalid input!")
              
              input("\\nPress Enter to continue...")
          
          elif choice == '4':
              # Toggle loop
              player.toggle_loop()
              clear_screen()
              print(f"\\nLoop mode: {'ON' if player.loop else 'OFF'}")
              input("\\nPress Enter to continue...")
          
          elif choice == '5':
              # View info
              clear_screen()
              print("\\n" + "═" * 60)
              print("               ANIMATION INFO")
              print("═" * 60)
              print(f"\\nName: {player.animation_name}")
              print(f"Total Frames: {len(player.frames)}")
              print(f"FPS: {player.fps}")
              print(f"Duration: {len(player.frames) / player.fps:.2f} seconds")
              print(f"Loop Mode: {'ON' if player.loop else 'OFF'}")
              
              if player.frames:
                  print("\\n" + "─" * 60)
                  print("First Frame Preview:")
                  print("─" * 60)
                  print(player.frames[0][:500])  # Show first 500 chars
                  if len(player.frames[0]) > 500:
                      print("\\n... (truncated)")
              
              input("\\nPress Enter to continue...")
          
          elif choice == '6':
              # Create demo
              clear_screen()
              print("\\nCreating demo animation...")
              player.create_simple_animation()
              print(f"\\nDemo animation created with {len(player.frames)} frames!")
              input("\\nPress Enter to continue...")
          
          elif choice == '7':
              # Save animation
              if not player.frames:
                  print("\\nNo animation to save!")
                  input("\\nPress Enter to continue...")
                  continue
              
              clear_screen()
              print("\\n" + "═" * 60)
              print("                 SAVE ANIMATION")
              print("═" * 60)
              
              filepath = input("\\nEnter output filename: ").strip()
              
              if not filepath:
                  filepath = "animation.txt"
              
              success, message = player.save_animation(filepath)
              print(f"\\n{message}")
              
              input("\\nPress Enter to continue...")
          
          elif choice == '8':
              # Exit
              clear_screen()
              print("\\nThank you for using ASCII Animation Player!")
              print("Goodbye!\\n")
              sys.exit(0)
          
          else:
              print("\\nInvalid choice! Please enter 1-8.")
              input("\\nPress Enter to continue...")

  if __name__ == '__main__':
      try:
          main()
      except KeyboardInterrupt:
          print("\\n\\nProgram interrupted by user. Goodbye!")
          sys.exit(0)
      except Exception as e:
          print(f"\\n\\nAn error occurred: {e}")
          sys.exit(1)`
  },

  {
    title: "ASCII Maze Game",
    category: "ascii",
    description: "Navigate procedurally generated mazes with enemies, power-ups, and multiple levels.",
    tags: ["console", "ascii-art", "maze"],
    difficulty: 3,
    lines: "~270 lines",
    code: `import os
  import random
  import time
  import sys

  # Try to import keyboard module
  try:
      import msvcrt
      HAS_MSVCRT = True
  except ImportError:
      HAS_MSVCRT = False

  # Game Constants
  MAZE_WIDTH = 25
  MAZE_HEIGHT = 15

  def clear_screen():
      """Clear the terminal screen"""
      os.system('cls' if os.name == 'nt' else 'clear')

  class MazeGame:
      def __init__(self, width=MAZE_WIDTH, height=MAZE_HEIGHT):
          self.width = width
          self.height = height
          self.maze = []
          self.player_pos = [1, 1]
          self.goal_pos = [height - 2, width - 2]
          self.enemies = []
          self.powerups = []
          self.score = 0
          self.level = 1
          self.lives = 3
          self.invincible = False
          self.invincible_timer = 0
          self.game_over = False
          self.won = False
          
          self.generate_maze()
          self.place_enemies()
          self.place_powerups()
      
      def generate_maze(self):
          """Generate a simple maze"""
          # Create bordered maze
          self.maze = [['#' if x == 0 or y == 0 or x == self.width - 1 or y == self.height - 1 
                      else ' ' for x in range(self.width)] 
                      for y in range(self.height)]
          
          # Add some internal walls
          for _ in range(self.width * self.height // 20):
              wall_y = random.randint(2, self.height - 3)
              wall_x = random.randint(2, self.width - 3)
              wall_length = random.randint(2, 5)
              
              if random.choice([True, False]):
                  # Horizontal wall
                  for i in range(wall_length):
                      if wall_x + i < self.width - 1:
                          self.maze[wall_y][wall_x + i] = '#'
              else:
                  # Vertical wall
                  for i in range(wall_length):
                      if wall_y + i < self.height - 1:
                          self.maze[wall_y + i][wall_x] = '#'
          
          # Ensure start and goal are clear
          self.maze[1][1] = ' '
          self.maze[self.height - 2][self.width - 2] = ' '
      
      def place_enemies(self):
          """Place enemies in the maze"""
          num_enemies = 2 + self.level
          self.enemies = []
          
          for _ in range(num_enemies):
              while True:
                  y = random.randint(1, self.height - 2)
                  x = random.randint(1, self.width - 2)
                  
                  if (self.maze[y][x] == ' ' and 
                      [y, x] != self.player_pos and 
                      [y, x] != self.goal_pos):
                      self.enemies.append([y, x])
                      break
      
      def place_powerups(self):
          """Place power-ups in the maze"""
          num_powerups = random.randint(1, 3)
          self.powerups = []
          
          for _ in range(num_powerups):
              while True:
                  y = random.randint(1, self.height - 2)
                  x = random.randint(1, self.width - 2)
                  
                  if (self.maze[y][x] == ' ' and 
                      [y, x] != self.player_pos and 
                      [y, x] != self.goal_pos and
                      [y, x] not in self.enemies):
                      powerup_type = random.choice(['invincibility', 'points'])
                      self.powerups.append(([y, x], powerup_type))
                      break
      
      def move_player(self, dy, dx):
          """Move player in direction"""
          new_y = self.player_pos[0] + dy
          new_x = self.player_pos[1] + dx
          
          # Check if move is valid
          if (0 <= new_y < self.height and 
              0 <= new_x < self.width and 
              self.maze[new_y][new_x] != '#'):
              
              self.player_pos = [new_y, new_x]
              
              # Check for power-up collection
              for i, (pos, powerup_type) in enumerate(self.powerups):
                  if pos == self.player_pos:
                      if powerup_type == 'invincibility':
                          self.invincible = True
                          self.invincible_timer = 50  # 50 moves
                      elif powerup_type == 'points':
                          self.score += 50
                      
                      self.powerups.pop(i)
                      break
              
              # Check for goal
              if self.player_pos == self.goal_pos:
                  self.won = True
      
      def move_enemies(self):
          """Move all enemies"""
          for enemy in self.enemies:
              # Simple AI: move randomly, but prefer moving toward player
              directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]
              
              # Calculate direction to player
              dy = self.player_pos[0] - enemy[0]
              dx = self.player_pos[1] - enemy[1]
              
              # 50% chance to move toward player
              if random.random() < 0.5 and (abs(dy) + abs(dx) <= 5):
                  if abs(dy) > abs(dx):
                      preferred = [1 if dy > 0 else -1, 0]
                  else:
                      preferred = [0, 1 if dx > 0 else -1]
                  directions.insert(0, preferred)
              
              random.shuffle(directions)
              
              for dy, dx in directions:
                  new_y = enemy[0] + dy
                  new_x = enemy[1] + dx
                  
                  if (0 <= new_y < self.height and 
                      0 <= new_x < self.width and 
                      self.maze[new_y][new_x] == ' '):
                      enemy[0] = new_y
                      enemy[1] = new_x
                      break
          
          # Check collision with player
          if not self.invincible and self.player_pos in self.enemies:
              self.lives -= 1
              if self.lives <= 0:
                  self.game_over = True
              else:
                  # Reset player position
                  self.player_pos = [1, 1]
      
      def update_invincibility(self):
          """Update invincibility timer"""
          if self.invincible:
              self.invincible_timer -= 1
              if self.invincible_timer <= 0:
                  self.invincible = False
      
      def draw(self):
          """Draw the game state"""
          clear_screen()
          
          print("\\n" + "═" * 60)
          print(f"         MAZE GAME - Level {self.level}")
          print("═" * 60 + "\\n")
          
          # Draw maze
          for y, row in enumerate(self.maze):
              line = "  "
              for x, cell in enumerate(row):
                  pos = [y, x]
                  
                  if pos == self.player_pos:
                      if self.invincible:
                          line += "★"  # Invincible player
                      else:
                          line += "P"
                  elif pos == self.goal_pos:
                      line += "G"
                  elif pos in self.enemies:
                      line += "E"
                  elif any(pos == p[0] for p in self.powerups):
                      powerup_type = next(p[1] for p in self.powerups if p[0] == pos)
                      if powerup_type == 'invincibility':
                          line += "!"
                      else:
                          line += "$"
                  else:
                      line += cell
                  
                  line += " "
              
              print(line)
          
          # Draw stats
          print("\\n" + "─" * 60)
          status = f"  Lives: {'♥' * self.lives}"
          status += f" | Score: {self.score}"
          if self.invincible:
              status += f" | INVINCIBLE: {self.invincible_timer}"
          print(status)
          print("─" * 60)
          
          # Draw legend and controls
          print("\\n  Legend: P=Player E=Enemy G=Goal !=Invincibility $=Points")
          
          if HAS_MSVCRT:
              print("  Controls: W/A/S/D=Move | Q=Quit")
          else:
              print("  Demo mode - Press Ctrl+C to quit")
      
      def get_input(self):
          """Get keyboard input"""
          if not HAS_MSVCRT:
              # Simple AI for demo
              dy = 1 if self.player_pos[0] < self.goal_pos[0] else -1
              dx = 1 if self.player_pos[1] < self.goal_pos[1] else -1
              
              if random.random() < 0.5:
                  self.move_player(dy, 0)
              else:
                  self.move_player(0, dx)
              
              time.sleep(0.2)
              return True
          
          if msvcrt.kbhit():
              key = msvcrt.getch()
              
              if key == b'q' or key == b'Q':
                  return False
              elif key == b'w' or key == b'W':
                  self.move_player(-1, 0)
              elif key == b's' or key == b'S':
                  self.move_player(1, 0)
              elif key == b'a' or key == b'A':
                  self.move_player(0, -1)
              elif key == b'd' or key == b'D':
                  self.move_player(0, 1)
          
          return True
      
      def next_level(self):
          """Progress to next level"""
          self.level += 1
          self.score += 100 * self.level
          self.player_pos = [1, 1]
          self.invincible = False
          self.invincible_timer = 0
          
          # Increase difficulty
          self.width = min(40, MAZE_WIDTH + self.level)
          self.height = min(20, MAZE_HEIGHT + self.level)
          self.goal_pos = [self.height - 2, self.width - 2]
          
          self.generate_maze()
          self.place_enemies()
          self.place_powerups()
          
          self.won = False
      
      def show_game_over(self):
          """Display game over screen"""
          clear_screen()
          print("\\n" * 3)
          print("  ╔" + "═" * 48 + "╗")
          print("  ║" + " " * 48 + "║")
          print("  ║" + "GAME OVER!".center(48) + "║")
          print("  ║" + " " * 48 + "║")
          print(f"  ║{'Final Score: ' + str(self.score).center(34)}║")
          print(f"  ║{'Level Reached: ' + str(self.level).center(32)}║")
          print("  ║" + " " * 48 + "║")
          print("  ╚" + "═" * 48 + "╝")
          print("\\n  Thanks for playing!\\n")
      
      def show_victory(self):
          """Display level complete screen"""
          clear_screen()
          print("\\n" * 3)
          print("  ╔" + "═" * 48 + "╗")
          print("  ║" + " " * 48 + "║")
          print("  ║" + f"LEVEL {self.level} COMPLETE!".center(48) + "║")
          print("  ║" + " " * 48 + "║")
          print(f"  ║{'Score: ' + str(self.score).center(40)}║")
          print("  ║" + " " * 48 + "║")
          print("  ╚" + "═" * 48 + "╝")
          print("\\n  Proceeding to next level...")
          time.sleep(2)

  def main():
      """Main game loop"""
      game = MazeGame()
      
      print("\\nMaze Game Starting...")
      print("Navigate to the goal (G) while avoiding enemies (E)!")
      print("Collect power-ups for bonuses!")
      time.sleep(2)
      
      try:
          while not game.game_over:
              game.draw()
              
              if game.won:
                  game.show_victory()
                  game.next_level()
                  continue
              
              if not game.get_input():
                  print("\\nGame quit by user. Goodbye!")
                  sys.exit(0)
              
              game.move_enemies()
              game.update_invincibility()
              
              if not HAS_MSVCRT:
                  time.sleep(0.1)
          
          game.show_game_over()
          
      except KeyboardInterrupt:
          print("\\n\\nGame interrupted by user. Goodbye!")
          sys.exit(0)

  if __name__ == '__main__':
      main()`
  },
  {
    title: "ASCII Space Invaders",
    category: "ascii",
    description: "Classic space shooter with waves of aliens, scoring, lives, and progressive difficulty.",
    tags: ["console", "ascii-art", "shooter"],
    difficulty: 3,
    lines: "~290 lines",
    code: `import os
  import time
  import random
  import sys

  # Try to import keyboard module
  try:
      import msvcrt
      HAS_MSVCRT = True
  except ImportError:
      HAS_MSVCRT = False

  # Game Constants
  SCREEN_WIDTH = 40
  SCREEN_HEIGHT = 20
  SHIP_Y = SCREEN_HEIGHT - 2

  def clear_screen():
      """Clear the terminal screen"""
      os.system('cls' if os.name == 'nt' else 'clear')

  class SpaceInvaders:
      def __init__(self):
          self.width = SCREEN_WIDTH
          self.height = SCREEN_HEIGHT
          self.ship_x = self.width // 2
          self.ship_y = SHIP_Y
          
          self.aliens = []
          self.alien_direction = 1
          self.alien_speed = 0
          self.alien_move_counter = 0
          
          self.bullets = []
          self.alien_bullets = []
          
          self.score = 0
          self.lives = 3
          self.level = 1
          self.game_over = False
          self.won = False
          
          self.spawn_aliens()
      
      def spawn_aliens(self):
          """Spawn a wave of aliens"""
          self.aliens = []
          rows = 3 + (self.level - 1) // 2
          cols = 8
          
          start_y = 2
          start_x = 5
          
          for row in range(min(rows, 5)):
              for col in range(cols):
                  x = start_x + col * 4
                  y = start_y + row * 2
                  if x < self.width - 5:
                      alien_type = 'A' if row < 2 else 'B' if row < 4 else 'C'
                      self.aliens.append({'x': x, 'y': y, 'type': alien_type})
          
          self.alien_direction = 1
          self.alien_speed = max(5, 15 - self.level)
      
      def move_ship(self, direction):
          """Move player ship"""
          self.ship_x += direction
          self.ship_x = max(1, min(self.ship_x, self.width - 2))
      
      def shoot_bullet(self):
          """Fire a bullet from ship"""
          self.bullets.append({'x': self.ship_x, 'y': self.ship_y - 1})
      
      def update_bullets(self):
          """Update bullet positions"""
          # Player bullets
          new_bullets = []
          for bullet in self.bullets:
              bullet['y'] -= 1
              if bullet['y'] >= 0:
                  # Check collision with aliens
                  hit = False
                  for alien in self.aliens[:]:
                      if bullet['x'] == alien['x'] and bullet['y'] == alien['y']:
                          self.aliens.remove(alien)
                          self.score += 10 if alien['type'] == 'A' else 20 if alien['type'] == 'B' else 30
                          hit = True
                          break
                  
                  if not hit:
                      new_bullets.append(bullet)
          
          self.bullets = new_bullets
          
          # Alien bullets
          new_alien_bullets = []
          for bullet in self.alien_bullets:
              bullet['y'] += 1
              if bullet['y'] < self.height:
                  # Check collision with ship
                  if bullet['x'] == self.ship_x and bullet['y'] == self.ship_y:
                      self.lives -= 1
                      if self.lives <= 0:
                          self.game_over = True
                  else:
                      new_alien_bullets.append(bullet)
          
          self.alien_bullets = new_alien_bullets
      
      def update_aliens(self):
          """Update alien positions and fire bullets"""
          self.alien_move_counter += 1
          
          if self.alien_move_counter >= self.alien_speed:
              self.alien_move_counter = 0
              
              # Check if aliens hit edge
              should_descend = False
              for alien in self.aliens:
                  if (alien['x'] <= 1 and self.alien_direction < 0) or \
                    (alien['x'] >= self.width - 2 and self.alien_direction > 0):
                      should_descend = True
                      break
              
              if should_descend:
                  # Move down and reverse direction
                  for alien in self.aliens:
                      alien['y'] += 1
                      
                      # Check if aliens reached bottom
                      if alien['y'] >= self.ship_y:
                          self.game_over = True
                  
                  self.alien_direction *= -1
              else:
                  # Move horizontally
                  for alien in self.aliens:
                      alien['x'] += self.alien_direction
              
              # Random alien shooting
              if self.aliens and random.random() < 0.1:
                  shooter = random.choice(self.aliens)
                  self.alien_bullets.append({'x': shooter['x'], 'y': shooter['y'] + 1})
          
          # Check if all aliens destroyed
          if not self.aliens:
              self.won = True
      
      def draw(self):
          """Draw the game state"""
          clear_screen()
          
          print("\\n" + "═" * 50)
          print(f"      SPACE INVADERS - Level {self.level}")
          print("═" * 50 + "\\n")
          
          # Create screen buffer
          screen = [[' ' for _ in range(self.width)] for _ in range(self.height)]
          
          # Draw aliens
          for alien in self.aliens:
              if 0 <= alien['y'] < self.height and 0 <= alien['x'] < self.width:
                  screen[alien['y']][alien['x']] = alien['type']
          
          # Draw bullets
          for bullet in self.bullets:
              if 0 <= bullet['y'] < self.height and 0 <= bullet['x'] < self.width:
                  screen[bullet['y']][bullet['x']] = '|'
          
          # Draw alien bullets
          for bullet in self.alien_bullets:
              if 0 <= bullet['y'] < self.height and 0 <= bullet['x'] < self.width:
                  screen[bullet['y']][bullet['x']] = '!'
          
          # Draw ship
          if 0 <= self.ship_y < self.height and 0 <= self.ship_x < self.width:
              screen[self.ship_y][self.ship_x] = '^'
          
          # Draw borders and screen
          print("  ┌" + "─" * self.width + "┐")
          for row in screen:
              print("  │" + "".join(row) + "│")
          print("  └" + "─" * self.width + "┘\\n")
          
          # Draw HUD
          lives_str = "♥" * self.lives
          print(f"  Lives: {lives_str}  |  Score: {self.score}  |  Level: {self.level}")
          
          # Draw controls
          if HAS_MSVCRT:
              print("\\n  Controls: A/D=Move | Space=Shoot | Q=Quit")
          else:
              print("\\n  Demo Mode - Press Ctrl+C to quit")
          
          # Draw legend
          print("\\n  Legend: ^=You A/B/C=Aliens |=Your Bullet !=Enemy Bullet")
      
      def get_input(self):
          """Get keyboard input"""
          if not HAS_MSVCRT:
              # Simple AI for demo
              if self.aliens:
                  closest_alien = min(self.aliens, key=lambda a: abs(a['x'] - self.ship_x))
                  if self.ship_x < closest_alien['x']:
                      self.move_ship(1)
                  elif self.ship_x > closest_alien['x']:
                      self.move_ship(-1)
                  
                  if random.random() < 0.1:
                      self.shoot_bullet()
              
              return True
          
          if msvcrt.kbhit():
              key = msvcrt.getch()
              
              if key == b'q' or key == b'Q':
                  return False
              elif key == b'a' or key == b'A':
                  self.move_ship(-1)
              elif key == b'd' or key == b'D':
                  self.move_ship(1)
              elif key == b' ':
                  self.shoot_bullet()
          
          return True
      
      def next_level(self):
          """Progress to next level"""
          self.level += 1
          self.score += 100 * self.level
          self.spawn_aliens()
          self.bullets = []
          self.alien_bullets = []
          self.won = False
      
      def show_game_over(self):
          """Display game over screen"""
          clear_screen()
          print("\\n" * 3)
          print("  ╔" + "═" * 46 + "╗")
          print("  ║" + " " * 46 + "║")
          print("  ║" + "GAME OVER!".center(46) + "║")
          print("  ║" + " " * 46 + "║")
          print(f"  ║{'Final Score: ' + str(self.score).center(32)}║")
          print(f"  ║{'Level Reached: ' + str(self.level).center(31)}║")
          print("  ║" + " " * 46 + "║")
          print("  ╚" + "═" * 46 + "╝")
          print("\\n  The aliens have invaded Earth!\\n")
      
      def show_victory(self):
          """Display level complete screen"""
          clear_screen()
          print("\\n" * 3)
          print("  ╔" + "═" * 46 + "╗")
          print("  ║" + " " * 46 + "║")
          print("  ║" + f"LEVEL {self.level} COMPLETE!".center(46) + "║")
          print("  ║" + " " * 46 + "║")
          print(f"  ║{'Score: ' + str(self.score).center(38)}║")
          print("  ║" + " " * 46 + "║")
          print("  ╚" + "═" * 46 + "╝")
          print("\\n  Preparing next wave...\\n")
          time.sleep(2)

  def main():
      """Main game loop"""
      game = SpaceInvaders()
      
      print("\\nSpace Invaders Starting...")
      print("Defend Earth from the alien invasion!")
      time.sleep(2)
      
      try:
          while not game.game_over:
              game.draw()
              
              if game.won:
                  game.show_victory()
                  game.next_level()
                  continue
              
              if not game.get_input():
                  print("\\nGame quit by user. Goodbye!")
                  sys.exit(0)
              
              game.update_bullets()
              game.update_aliens()
              
              time.sleep(0.05)
          
          game.show_game_over()
          
      except KeyboardInterrupt:
          print("\\n\\nGame interrupted by user. Goodbye!")
          sys.exit(0)

  if __name__ == '__main__':
      main()`
  },
  {
    title: "ASCII Flappy Bird",
    category: "ascii",
    description: "Flappy Bird with gravity physics, score tracking, difficulty progression, and high score saving.",
    tags: ["console", "ascii-art", "arcade"],
    difficulty: 2,
    lines: "~240 lines",
    code: `import os
  import time
  import random
  import sys
  import json

  # Try to import keyboard module
  try:
      import msvcrt
      HAS_MSVCRT = True
  except ImportError:
      HAS_MSVCRT = False

  # Game Constants
  SCREEN_WIDTH = 50
  SCREEN_HEIGHT = 20
  BIRD_X = 8
  PIPE_WIDTH = 2
  PIPE_GAP = 5
  GRAVITY = 1
  JUMP_STRENGTH = -3
  PIPE_SPEED = 1

  def clear_screen():
      """Clear the terminal screen"""
      os.system('cls' if os.name == 'nt' else 'clear')

  class HighScoreManager:
      def __init__(self, filename='flappy_highscore.json'):
          self.filename = filename
          self.high_score = self.load_high_score()
      
      def load_high_score(self):
          try:
              if os.path.exists(self.filename):
                  with open(self.filename, 'r') as f:
                      data = json.load(f)
                      return data.get('high_score', 0)
          except:
              pass
          return 0
      
      def save_high_score(self, score):
          if score > self.high_score:
              self.high_score = score
              try:
                  with open(self.filename, 'w') as f:
                      json.dump({'high_score': score}, f)
                  return True
              except:
                  pass
          return False

  class FlappyBird:
      def __init__(self):
          self.width = SCREEN_WIDTH
          self.height = SCREEN_HEIGHT
          self.bird_x = BIRD_X
          self.bird_y = self.height // 2
          self.bird_velocity = 0
          
          self.pipes = []
          self.pipe_spawn_timer = 0
          self.pipe_spawn_interval = 25
          
          self.score = 0
          self.game_over = False
          self.frame_count = 0
          
          self.high_score_manager = HighScoreManager()
      
      def flap(self):
          """Make the bird jump"""
          self.bird_velocity = JUMP_STRENGTH
      
      def update(self):
          """Update game state"""
          self.frame_count += 1
          
          # Update bird physics
          self.bird_velocity += GRAVITY
          self.bird_y += self.bird_velocity
          
          # Check ceiling and floor collision
          if self.bird_y <= 0 or self.bird_y >= self.height - 1:
              self.game_over = True
          
          # Spawn new pipes
          self.pipe_spawn_timer += 1
          if self.pipe_spawn_timer >= self.pipe_spawn_interval:
              self.pipe_spawn_timer = 0
              gap_y = random.randint(3, self.height - PIPE_GAP - 3)
              self.pipes.append({
                  'x': self.width - 1,
                  'gap_y': gap_y,
                  'scored': False
              })
          
          # Update pipes
          for pipe in self.pipes:
              pipe['x'] -= PIPE_SPEED
              
              # Check collision
              if pipe['x'] <= self.bird_x <= pipe['x'] + PIPE_WIDTH:
                  if self.bird_y < pipe['gap_y'] or self.bird_y > pipe['gap_y'] + PIPE_GAP:
                      self.game_over = True
              
              # Score point when passing pipe
              if pipe['x'] + PIPE_WIDTH < self.bird_x and not pipe['scored']:
                  pipe['scored'] = True
                  self.score += 1
                  
                  # Increase difficulty
                  if self.score % 5 == 0 and self.pipe_spawn_interval > 15:
                      self.pipe_spawn_interval -= 1
          
          # Remove off-screen pipes
          self.pipes = [p for p in self.pipes if p['x'] > -PIPE_WIDTH]
      
      def draw(self):
          """Draw the game state"""
          clear_screen()
          
          print("\\n" + "═" * 60)
          print("              ASCII FLAPPY BIRD")
          print("═" * 60 + "\\n")
          
          # Create screen buffer
          screen = [[' ' for _ in range(self.width)] for _ in range(self.height)]
          
          # Draw bird
          if 0 <= self.bird_y < self.height:
              screen[int(self.bird_y)][self.bird_x] = 'O'
          
          # Draw pipes
          for pipe in self.pipes:
              for x in range(pipe['x'], min(pipe['x'] + PIPE_WIDTH, self.width)):
                  if 0 <= x < self.width:
                      # Top pipe
                      for y in range(pipe['gap_y']):
                          if 0 <= y < self.height:
                              screen[y][x] = '█'
                      
                      # Bottom pipe
                      for y in range(pipe['gap_y'] + PIPE_GAP, self.height):
                          if 0 <= y < self.height:
                              screen[y][x] = '█'
          
          # Draw borders and screen
          print("  ┌" + "─" * self.width + "┐")
          for row in screen:
              print("  │" + "".join(row) + "│")
          print("  └" + "─" * self.width + "┘\\n")
          
          # Draw HUD
          print(f"  Score: {self.score}  |  High Score: {self.high_score_manager.high_score}")
          
          # Draw controls
          if HAS_MSVCRT:
              print("\\n  Controls: Space=Flap | Q=Quit")
          else:
              print("\\n  Demo Mode - Press Ctrl+C to quit")
      
      def get_input(self):
          """Get keyboard input"""
          if not HAS_MSVCRT:
              # Simple AI for demo
              if self.pipes:
                  nearest_pipe = min(self.pipes, key=lambda p: abs(p['x'] - self.bird_x))
                  gap_center = nearest_pipe['gap_y'] + PIPE_GAP // 2
                  
                  if self.bird_y > gap_center + 1:
                      self.flap()
              
              return True
          
          if msvcrt.kbhit():
              key = msvcrt.getch()
              
              if key == b'q' or key == b'Q':
                  return False
              elif key == b' ':
                  self.flap()
          
          return True
      
      def show_game_over(self):
          """Display game over screen"""
          clear_screen()
          
          is_new_high_score = self.high_score_manager.save_high_score(self.score)
          
          print("\\n" * 3)
          print("  ╔" + "═" * 48 + "╗")
          print("  ║" + " " * 48 + "║")
          print("  ║" + "GAME OVER!".center(48) + "║")
          print("  ║" + " " * 48 + "║")
          print(f"  ║{'Final Score: ' + str(self.score).center(34)}║")
          
          if is_new_high_score:
              print("  ║" + " " * 48 + "║")
              print("  ║" + "★ NEW HIGH SCORE! ★".center(48) + "║")
          else:
              print(f"  ║{'High Score: ' + str(self.high_score_manager.high_score).center(34)}║")
          
          print("  ║" + " " * 48 + "║")
          print("  ╚" + "═" * 48 + "╝")
          print("\\n  Thanks for playing!\\n")

  def show_start_screen():
      """Show start screen with instructions"""
      clear_screen()
      print("\\n" * 2)
      print("  ╔" + "═" * 48 + "╗")
      print("  ║" + " " * 48 + "║")
      print("  ║" + "ASCII FLAPPY BIRD".center(48) + "║")
      print("  ║" + " " * 48 + "║")
      print("  ╚" + "═" * 48 + "╝")
      print("\\n  How to Play:")
      print("  • Press SPACE to flap and stay airborne")
      print("  • Avoid hitting the pipes or ground")
      print("  • Each pipe you pass scores 1 point")
      print("  • Difficulty increases every 5 points")
      
      if HAS_MSVCRT:
          print("\\n  Press SPACE to start or Q to quit...")
          while True:
              if msvcrt.kbhit():
                  key = msvcrt.getch()
                  if key == b' ':
                      return True
                  elif key == b'q' or key == b'Q':
                      return False
      else:
          print("\\n  Demo Mode - Starting in 3 seconds...")
          time.sleep(3)
          return True

  def main():
      """Main game loop"""
      if not show_start_screen():
          print("\\nGoodbye!\\n")
          sys.exit(0)
      
      game = FlappyBird()
      
      try:
          while not game.game_over:
              game.draw()
              
              if not game.get_input():
                  print("\\nGame quit by user. Goodbye!")
                  sys.exit(0)
              
              game.update()
              
              time.sleep(0.05)
          
          game.show_game_over()
          
      except KeyboardInterrupt:
          print("\\n\\nGame interrupted by user. Goodbye!")
          sys.exit(0)

  if __name__ == '__main__':
      main()`
  },
  {
    title: "ASCII Text Banner Creator",
    category: "ascii",
    description: "Create stylized ASCII text banners with multiple fonts, colors, and export options.",
    tags: ["pyfiglet", "ascii-art", "text"],
    difficulty: 1,
    lines: "~200 lines",
    code: `import sys
  import os

  # Try to import pyfiglet
  try:
      import pyfiglet
      HAS_PYFIGLET = True
  except ImportError:
      HAS_PYFIGLET = False
      print("Error: pyfiglet not installed!")
      print("Install with: pip install pyfiglet")
      sys.exit(1)

  def clear_screen():
      """Clear the terminal screen"""
      os.system('cls' if os.name == 'nt' else 'clear')

  class BannerCreator:
      def __init__(self):
          self.available_fonts = pyfiglet.FigletFont.getFonts()[:50]  # Limit to 50 popular fonts
          self.current_font = 'slant'
          self.last_banner = None
          self.last_text = None
      
      def list_fonts(self, category=None):
          """List available fonts"""
          print("\\nPopular Fonts (showing 50 of " + str(len(pyfiglet.FigletFont.getFonts())) + "):")
          print("=" * 60)
          
          fonts_to_show = [
              'standard', 'slant', 'banner', 'big', 'block', 'bubble',
              'digital', 'ivrit', 'lean', 'mini', 'script', 'shadow',
              'small', 'smscript', 'smshadow', 'smslant', 'speed',
              'starwars', 'stop', 'thin', '3-d', '3x5', '5lineoblique',
              'alphabet', 'banner3-D', 'banner3', 'banner4', 'barbwire',
              'basic', 'bell', 'bigchief', 'binary', 'broadway',
              'bulbhead', 'calgphy2', 'caligraphy', 'colossal', 'computer',
              'cosmic', 'crawford', 'cricket', 'cursive', 'cyberlarge',
              'cybermedium', 'cybersmall', 'diamond', 'doh', 'doom',
              'dotmatrix', 'drpepper', 'eftichess'
          ]
          
          for i, font in enumerate(fonts_to_show, 1):
              print(f"{i:2}. {font:20}", end="")
              if i % 3 == 0:
                  print()
          print("\\n" + "=" * 60)
      
      def show_font_preview(self, font_name):
          """Show a preview of a font"""
          try:
              preview = pyfiglet.figlet_format("Preview", font=font_name)
              print(f"\\nFont: {font_name}")
              print("─" * 60)
              print(preview)
              print("─" * 60)
              return True
          except Exception as e:
              print(f"\\nError with font '{font_name}': {e}")
              return False
      
      def create_banner(self, text, font=None):
          """Create ASCII banner"""
          if font is None:
              font = self.current_font
          
          try:
              banner = pyfiglet.figlet_format(text, font=font)
              self.last_banner = banner
              self.last_text = text
              self.current_font = font
              return banner, None
          except Exception as e:
              return None, f"Error creating banner: {e}"
      
      def save_banner(self, filename):
          """Save banner to file"""
          if not self.last_banner:
              return False, "No banner to save!"
          
          try:
              with open(filename, 'w', encoding='utf-8') as f:
                  f.write(self.last_banner)
              return True, f"Banner saved to {filename}"
          except Exception as e:
              return False, f"Error saving file: {e}"

  def display_menu():
      """Display main menu"""
      clear_screen()
      print("\\n" + "═" * 60)
      print("           ASCII TEXT BANNER CREATOR")
      print("═" * 60)
      print("\\nCreate stylized text banners with ASCII art fonts!")
      print("\\nOptions:")
      print("  1. Create banner")
      print("  2. List available fonts")
      print("  3. Preview a font")
      print("  4. Change default font")
      print("  5. Save last banner to file")
      print("  6. Exit")
      print("═" * 60)

  def main():
      """Main application loop"""
      creator = BannerCreator()
      
      print("\\nASCII Banner Creator Starting...")
      print(f"Using pyfiglet v{pyfiglet.__version__ if hasattr(pyfiglet, '__version__') else 'unknown'}")
      print(f"Default font: {creator.current_font}")
      
      input("\\nPress Enter to continue...")
      
      while True:
          display_menu()
          
          choice = input(f"\\nCurrent font: {creator.current_font} | Enter choice (1-6): ").strip()
          
          if choice == '1':
              # Create banner
              clear_screen()
              print("\\n" + "═" * 60)
              print("                  CREATE BANNER")
              print("═" * 60)
              
              text = input("\\nEnter text for banner: ").strip()
              
              if not text:
                  print("\\nError: Text cannot be empty!")
                  input("\\nPress Enter to continue...")
                  continue
              
              use_custom_font = input("Use custom font? (y/N): ").strip().lower()
              
              font = None
              if use_custom_font == 'y':
                  font_name = input("Enter font name: ").strip()
                  if font_name:
                      font = font_name
              
              print("\\nGenerating banner...")
              banner, error = creator.create_banner(text, font)
              
              if error:
                  print(f"\\n{error}")
              else:
                  clear_screen()
                  print("\\n" + "═" * 60)
                  print("                    RESULT")
                  print("═" * 60 + "\\n")
                  print(banner)
                  print("═" * 60)
              
              input("\\nPress Enter to continue...")
          
          elif choice == '2':
              # List fonts
              clear_screen()
              print("\\n" + "═" * 60)
              print("               AVAILABLE FONTS")
              print("═" * 60)
              
              creator.list_fonts()
              
              input("\\nPress Enter to continue...")
          
          elif choice == '3':
              # Preview font
              clear_screen()
              print("\\n" + "═" * 60)
              print("                 FONT PREVIEW")
              print("═" * 60)
              
              font_name = input("\\nEnter font name to preview: ").strip()
              
              if font_name:
                  creator.show_font_preview(font_name)
              else:
                  print("\\nNo font name entered!")
              
              input("\\nPress Enter to continue...")
          
          elif choice == '4':
              # Change default font
              clear_screen()
              print("\\n" + "═" * 60)
              print("              CHANGE DEFAULT FONT")
              print("═" * 60)
              
              print(f"\\nCurrent default font: {creator.current_font}")
              new_font = input("Enter new default font: ").strip()
              
              if new_font:
                  # Test if font works
                  try:
                      pyfiglet.figlet_format("Test", font=new_font)
                      creator.current_font = new_font
                      print(f"\\nDefault font changed to: {new_font}")
                  except:
                      print(f"\\nError: Font '{new_font}' not found or invalid!")
              else:
                  print("\\nNo font name entered!")
              
              input("\\nPress Enter to continue...")
          
          elif choice == '5':
              # Save banner
              if not creator.last_banner:
                  clear_screen()
                  print("\\nNo banner to save! Create a banner first.")
                  input("\\nPress Enter to continue...")
                  continue
              
              clear_screen()
              print("\\n" + "═" * 60)
              print("                  SAVE BANNER")
              print("═" * 60)
              
              print(f"\\nLast banner text: '{creator.last_text}'")
              print(f"Font used: {creator.current_font}")
              
              filename = input("\\nEnter filename (e.g., banner.txt): ").strip()
              
              if not filename:
                  filename = "banner.txt"
              
              success, message = creator.save_banner(filename)
              print(f"\\n{message}")
              
              input("\\nPress Enter to continue...")
          
          elif choice == '6':
              # Exit
              clear_screen()
              print("\\nThank you for using ASCII Banner Creator!")
              print("Goodbye!\\n")
              sys.exit(0)
          
          else:
              print("\\nInvalid choice! Please enter 1-6.")
              input("\\nPress Enter to continue...")

  if __name__ == '__main__':
      try:
          main()
      except KeyboardInterrupt:
          print("\\n\\nProgram interrupted by user. Goodbye!")
          sys.exit(0)
      except Exception as e:
          print(f"\\n\\nAn unexpected error occurred: {e}")
          sys.exit(1)`
  },
  {
    title: "ASCII Breakout",
    category: "ascii",
    description: "Classic brick breaker with multiple levels, power-ups, and score tracking.",
    tags: ["console", "ascii-art", "arcade"],
    difficulty: 3,
    lines: "~280 lines",
    code: `import os
  import time
  import random
  import sys

  # Try to import keyboard module
  try:
      import msvcrt
      HAS_MSVCRT = True
  except ImportError:
      HAS_MSVCRT = False

  # Game Constants
  SCREEN_WIDTH = 40
  SCREEN_HEIGHT = 25
  PADDLE_WIDTH = 6

  def clear_screen():
      """Clear the terminal screen"""
      os.system('cls' if os.name == 'nt' else 'clear')

  class Breakout:
      def __init__(self):
          self.width = SCREEN_WIDTH
          self.height = SCREEN_HEIGHT
          self.paddle_width = PADDLE_WIDTH
          self.paddle_x = self.width // 2 - self.paddle_width // 2
          self.paddle_y = self.height - 2
          
          self.ball_x = self.width // 2
          self.ball_y = self.paddle_y - 1
          self.ball_dx = random.choice([-1, 1])
          self.ball_dy = -1
          self.ball_speed = 0.08
          
          self.bricks = []
          self.powerups = []
          
          self.score = 0
          self.lives = 3
          self.level = 1
          self.game_over = False
          self.level_complete = False
          
          self.last_update = time.time()
          
          self.generate_bricks()
      
      def generate_bricks(self):
          """Generate brick layout for current level"""
          self.bricks = []
          rows = min(5 + self.level, 8)
          cols = 8
          
          start_y = 3
          start_x = 3
          brick_width = 4
          
          for row in range(rows):
              for col in range(cols):
                  x = start_x + col * (brick_width + 1)
                  y = start_y + row * 2
                  
                  if x + brick_width < self.width - 2:
                      # Assign brick types based on row
                      if row < 2:
                          brick_type = 3  # 30 points
                      elif row < 4:
                          brick_type = 2  # 20 points
                      else:
                          brick_type = 1  # 10 points
                      
                      self.bricks.append({
                          'x': x,
                          'y': y,
                          'width': brick_width,
                          'type': brick_type,
                          'char': '█' if brick_type == 3 else '▓' if brick_type == 2 else '▒'
                      })
      
      def move_paddle(self, direction):
          """Move paddle left or right"""
          self.paddle_x += direction
          self.paddle_x = max(1, min(self.paddle_x, self.width - self.paddle_width - 1))
      
      def update_ball(self):
          """Update ball position and handle collisions"""
          self.ball_x += self.ball_dx
          self.ball_y += self.ball_dy
          
          # Wall collisions (left and right)
          if self.ball_x <= 0 or self.ball_x >= self.width - 1:
              self.ball_dx *= -1
              self.ball_x = max(0, min(self.ball_x, self.width - 1))
          
          # Ceiling collision
          if self.ball_y <= 0:
              self.ball_dy *= -1
              self.ball_y = 0
          
          # Paddle collision
          if (self.ball_y == self.paddle_y and 
              self.paddle_x <= self.ball_x < self.paddle_x + self.paddle_width):
              
              self.ball_dy = -1
              
              # Add spin based on where ball hits paddle
              hit_pos = self.ball_x - self.paddle_x
              if hit_pos < self.paddle_width // 3:
                  self.ball_dx = -1
              elif hit_pos > 2 * self.paddle_width // 3:
                  self.ball_dx = 1
          
          # Bottom - lose life
          if self.ball_y >= self.height - 1:
              self.lives -= 1
              if self.lives <= 0:
                  self.game_over = True
              else:
                  self.reset_ball()
          
          # Brick collisions
          for brick in self.bricks[:]:
              if (brick['y'] == self.ball_y and 
                  brick['x'] <= self.ball_x < brick['x'] + brick['width']):
                  
                  self.bricks.remove(brick)
                  self.score += brick['type'] * 10
                  self.ball_dy *= -1
                  
                  # Chance to spawn power-up
                  if random.random() < 0.1:
                      self.powerups.append({
                          'x': brick['x'] + brick['width'] // 2,
                          'y': brick['y'],
                          'type': random.choice(['expand', 'slow', 'multi'])
                      })
                  
                  break
          
          # Update power-ups
          for powerup in self.powerups[:]:
              powerup['y'] += 1
              
              # Collect power-up
              if (powerup['y'] == self.paddle_y and 
                  self.paddle_x <= powerup['x'] < self.paddle_x + self.paddle_width):
                  
                  self.apply_powerup(powerup['type'])
                  self.powerups.remove(powerup)
              
              # Remove if off screen
              elif powerup['y'] >= self.height:
                  self.powerups.remove(powerup)
          
          # Check level complete
          if not self.bricks:
              self.level_complete = True
      
      def apply_powerup(self, powerup_type):
          """Apply power-up effect"""
          if powerup_type == 'expand':
              self.paddle_width = min(10, self.paddle_width + 2)
          elif powerup_type == 'slow':
              self.ball_speed = min(0.15, self.ball_speed + 0.02)
          elif powerup_type == 'multi':
              self.score += 50
      
      def reset_ball(self):
          """Reset ball to starting position"""
          self.ball_x = self.width // 2
          self.ball_y = self.paddle_y - 1
          self.ball_dx = random.choice([-1, 1])
          self.ball_dy = -1
      
      def next_level(self):
          """Progress to next level"""
          self.level += 1
          self.score += 100 * self.level
          self.paddle_width = PADDLE_WIDTH
          self.ball_speed = max(0.05, 0.08 - (self.level - 1) * 0.005)
          self.generate_bricks()
          self.reset_ball()
          self.powerups = []
          self.level_complete = False
      
      def draw(self):
          """Draw the game state"""
          clear_screen()
          
          print("\\n" + "═" * 50)
          print(f"         BREAKOUT - Level {self.level}")
          print("═" * 50 + "\\n")
          
          # Create screen buffer
          screen = [[' ' for _ in range(self.width)] for _ in range(self.height)]
          
          # Draw bricks
          for brick in self.bricks:
              for i in range(brick['width']):
                  x = brick['x'] + i
                  if 0 <= x < self.width and 0 <= brick['y'] < self.height:
                      screen[brick['y']][x] = brick['char']
          
          # Draw power-ups
          for powerup in self.powerups:
              if 0 <= powerup['y'] < self.height and 0 <= powerup['x'] < self.width:
                  screen[powerup['y']][powerup['x']] = '●'
          
          # Draw ball
          if 0 <= self.ball_y < self.height and 0 <= self.ball_x < self.width:
              screen[int(self.ball_y)][int(self.ball_x)] = 'O'
          
          # Draw paddle
          for i in range(self.paddle_width):
              x = self.paddle_x + i
              if 0 <= x < self.width and 0 <= self.paddle_y < self.height:
                  screen[self.paddle_y][x] = '='
          
          # Draw borders and screen
          print("  ┌" + "─" * self.width + "┐")
          for row in screen:
              print("  │" + "".join(row) + "│")
          print("  └" + "─" * self.width + "┘\\n")
          
          # Draw HUD
          lives_str = "♥" * self.lives
          print(f"  Lives: {lives_str}  |  Score: {self.score}  |  Level: {self.level}")
          
          # Draw controls
          if HAS_MSVCRT:
              print("\\n  Controls: A/D=Move | Q=Quit")
          else:
              print("\\n  Demo Mode - Press Ctrl+C to quit")
      
      def get_input(self):
          """Get keyboard input"""
          if not HAS_MSVCRT:
              # Simple AI for demo
              if self.ball_x < self.paddle_x + self.paddle_width // 2:
                  self.move_paddle(-1)
              elif self.ball_x > self.paddle_x + self.paddle_width // 2:
                  self.move_paddle(1)
              return True
          
          if msvcrt.kbhit():
              key = msvcrt.getch()
              
              if key == b'q' or key == b'Q':
                  return False
              elif key == b'a' or key == b'A':
                  self.move_paddle(-1)
              elif key == b'd' or key == b'D':
                  self.move_paddle(1)
          
          return True
      
      def show_game_over(self):
          """Display game over screen"""
          clear_screen()
          print("\\n" * 3)
          print("  ╔" + "═" * 46 + "╗")
          print("  ║" + " " * 46 + "║")
          print("  ║" + "GAME OVER!".center(46) + "║")
          print("  ║" + " " * 46 + "║")
          print(f"  ║{'Final Score: ' + str(self.score).center(32)}║")
          print(f"  ║{'Level Reached: ' + str(self.level).center(31)}║")
          print("  ║" + " " * 46 + "║")
          print("  ╚" + "═" * 46 + "╝")
          print("\\n  Thanks for playing!\\n")
      
      def show_level_complete(self):
          """Display level complete screen"""
          clear_screen()
          print("\\n" * 3)
          print("  ╔" + "═" * 46 + "╗")
          print("  ║" + " " * 46 + "║")
          print("  ║" + f"LEVEL {self.level} COMPLETE!".center(46) + "║")
          print("  ║" + " " * 46 + "║")
          print(f"  ║{'Score: ' + str(self.score).center(38)}║")
          print("  ║" + " " * 46 + "║")
          print("  ╚" + "═" * 46 + "╝")
          print("\\n  Loading next level...\\n")
          time.sleep(2)

  def main():
      """Main game loop"""
      game = Breakout()
      
      print("\\nBreakout Starting...")
      print("Break all the bricks to advance!")
      time.sleep(2)
      
      try:
          while not game.game_over:
              game.draw()
              
              if game.level_complete:
                  game.show_level_complete()
                  game.next_level()
                  continue
              
              if not game.get_input():
                  print("\\nGame quit by user. Goodbye!")
                  sys.exit(0)
              
              current_time = time.time()
              if current_time - game.last_update >= game.ball_speed:
                  game.update_ball()
                  game.last_update = current_time
              
              time.sleep(0.02)
          
          game.show_game_over()
          
      except KeyboardInterrupt:
          print("\\n\\nGame interrupted by user. Goodbye!")
          sys.exit(0)

  if __name__ == '__main__':
      main()`
  },
    {
      title: "ASCII Tic Tac Toe",
      category: "ascii",
      description: "Simple tic tac toe with ASCII board and AI opponent.",
      tags: ["console", "ascii-art", "board-game"],
      difficulty: 2,
      lines: "~100 lines",
      code: `# ASCII Tic Tac Toe with AI Opponent
import random

def print_board(board):
    """Display the current game board in ASCII format"""
    print("\n")
    print(f" {board[0]} | {board[1]} | {board[2]} ")
    print("---|---|---")
    print(f" {board[3]} | {board[4]} | {board[5]} ")
    print("---|---|---")
    print(f" {board[6]} | {board[7]} | {board[8]} ")
    print("\n")


def check_winner(board, player):
    """Check if the specified player has won the game"""
    # All possible winning combinations
    winning_combinations = [
        [0, 1, 2],  # Top row
        [3, 4, 5],  # Middle row
        [6, 7, 8],  # Bottom row
        [0, 3, 6],  # Left column
        [1, 4, 7],  # Middle column
        [2, 5, 8],  # Right column
        [0, 4, 8],  # Diagonal top-left to bottom-right
        [2, 4, 6]   # Diagonal top-right to bottom-left
    ]
    
    # Check each winning combination
    for combo in winning_combinations:
        if all(board[i] == player for i in combo):
            return True
    return False


def is_board_full(board):
    """Check if the board is completely filled"""
    return all(cell in ['X', 'O'] for cell in board)


def get_available_moves(board):
    """Return a list of available positions on the board"""
    available = []
    for i in range(9):
        if board[i] not in ['X', 'O']:
            available.append(i)
    return available


def ai_move(board):
    """AI makes a move using simple strategy"""
    # Strategy 1: Try to win
    for move in get_available_moves(board):
        board_copy = board.copy()
        board_copy[move] = 'O'
        if check_winner(board_copy, 'O'):
            return move
    
    # Strategy 2: Block player from winning
    for move in get_available_moves(board):
        board_copy = board.copy()
        board_copy[move] = 'X'
        if check_winner(board_copy, 'X'):
            return move
    
    # Strategy 3: Take center if available
    if 4 in get_available_moves(board):
        return 4
    
    # Strategy 4: Take a corner
    corners = [0, 2, 6, 8]
    available_corners = [c for c in corners if c in get_available_moves(board)]
    if available_corners:
        return random.choice(available_corners)
    
    # Strategy 5: Take any available space
    return random.choice(get_available_moves(board))


def get_player_move(board):
    """Get a valid move from the human player"""
    while True:
        try:
            move = int(input("Enter position (1-9): ")) - 1
            
            if move < 0 or move > 8:
                print("Please enter a number between 1 and 9!")
                continue
            
            if board[move] in ['X', 'O']:
                print("That position is already taken! Choose another.")
                continue
            
            return move
            
        except ValueError:
            print("Invalid input! Please enter a number.")
        except (KeyboardInterrupt, EOFError):
            print("\nGame cancelled.")
            exit()


def main():
    """Main game loop"""
    print("=" * 40)
    print("  Welcome to ASCII Tic Tac Toe!")
    print("=" * 40)
    print("\nYou are X, AI is O")
    print("Positions are numbered 1-9:")
    print("\n 1 | 2 | 3 ")
    print("---|---|---")
    print(" 4 | 5 | 6 ")
    print("---|---|---")
    print(" 7 | 8 | 9 ")
    print("\n")
    
    # Initialize the board with position numbers
    board = [str(i + 1) for i in range(9)]
    
    # Game loop
    while True:
        # Player's turn (X)
        print_board(board)
        print("Your turn (X):")
        player_move = get_player_move(board)
        board[player_move] = 'X'
        
        # Check if player won
        if check_winner(board, 'X'):
            print_board(board)
            print("🎉 Congratulations! You win! 🎉")
            break
        
        # Check for tie
        if is_board_full(board):
            print_board(board)
            print("It's a tie! Well played!")
            break
        
        # AI's turn (O)
        print("AI is thinking...")
        ai_position = ai_move(board)
        board[ai_position] = 'O'
        print(f"AI chose position {ai_position + 1}")
        
        # Check if AI won
        if check_winner(board, 'O'):
            print_board(board)
            print("AI wins! Better luck next time!")
            break
        
        # Check for tie
        if is_board_full(board):
            print_board(board)
            print("It's a tie! Well played!")
            break


if __name__ == '__main__':
    main()`
    },
  {
    title: "ASCII Connect Four",
    category: "ascii",
    description: "Drop pieces in ASCII columns to connect four.",
    tags: ["console", "ascii-art", "strategy"],
    difficulty: 2,
    lines: "~80 lines",
    code: `# ASCII Connect Four Game
import os

# Board dimensions
WIDTH = 7
HEIGHT = 6

# Initialize empty board
board = [[" " for _ in range(WIDTH)] for _ in range(HEIGHT)]


def clear_screen():
    """Clear the console screen"""
    os.system("cls" if os.name == "nt" else "clear")


def draw_board():
    """Display the current game board"""
    clear_screen()
    print("\n" + "=" * 30)
    print("    ASCII Connect Four")
    print("=" * 30 + "\n")
    
    # Draw the board
    for row in board:
        print("|" + "|".join(row) + "|")
    
    # Draw column numbers
    print(" " + " ".join(str(i) for i in range(WIDTH)))
    print()


def drop_piece(column, player):
    """Drop a piece in the specified column"""
    # Start from bottom row and work up
    for row in reversed(range(HEIGHT)):
        if board[row][column] == " ":
            board[row][column] = player
            return True
    # Column is full
    return False


def check_horizontal_win():
    """Check for four in a row horizontally"""
    for y in range(HEIGHT):
        for x in range(WIDTH - 3):
            piece = board[y][x]
            if piece != " ":
                if all(board[y][x + i] == piece for i in range(4)):
                    return piece
    return None


def check_vertical_win():
    """Check for four in a row vertically"""
    for x in range(WIDTH):
        for y in range(HEIGHT - 3):
            piece = board[y][x]
            if piece != " ":
                if all(board[y + i][x] == piece for i in range(4)):
                    return piece
    return None


def check_diagonal_win():
    """Check for four in a row diagonally"""
    # Check down-right diagonals
    for y in range(HEIGHT - 3):
        for x in range(WIDTH - 3):
            piece = board[y][x]
            if piece != " ":
                if all(board[y + i][x + i] == piece for i in range(4)):
                    return piece
    
    # Check down-left diagonals
    for y in range(HEIGHT - 3):
        for x in range(3, WIDTH):
            piece = board[y][x]
            if piece != " ":
                if all(board[y + i][x - i] == piece for i in range(4)):
                    return piece
    
    return None


def check_winner():
    """Check all win conditions"""
    # Check horizontal
    winner = check_horizontal_win()
    if winner:
        return winner
    
    # Check vertical
    winner = check_vertical_win()
    if winner:
        return winner
    
    # Check diagonal
    winner = check_diagonal_win()
    if winner:
        return winner
    
    return None


def is_board_full():
    """Check if the board is completely filled"""
    return all(board[0][col] != " " for col in range(WIDTH))


def main():
    """Main game loop"""
    current_player = "X"
    
    print("\nWelcome to ASCII Connect Four!")
    print("Players alternate dropping pieces (X and O)")
    print("First to connect 4 wins!\n")
    input("Press Enter to start...")
    
    while True:
        draw_board()
        
        # Get player input
        print(f"Player {current_player}'s turn")
        column_input = input(f"Choose column (0-{WIDTH - 1}): ")
        
        # Validate input
        if not column_input.isdigit():
            print("Please enter a number!")
            input("Press Enter to continue...")
            continue
        
        column = int(column_input)
        
        if not (0 <= column < WIDTH):
            print(f"Column must be between 0 and {WIDTH - 1}!")
            input("Press Enter to continue...")
            continue
        
        # Try to drop piece
        if not drop_piece(column, current_player):
            print("That column is full! Choose another.")
            input("Press Enter to continue...")
            continue
        
        # Check for winner
        winner = check_winner()
        if winner:
            draw_board()
            print(f"🎉 Player {winner} wins! 🎉")
            break
        
        # Check for tie
        if is_board_full():
            draw_board()
            print("It's a tie! The board is full.")
            break
        
        # Switch players
        current_player = "O" if current_player == "X" else "X"


if __name__ == "__main__":
    main()`
  },
  {
    title: "ASCII Battleship",
    category: "ascii",
    description: "Naval combat game with ASCII grid and ships.",
    tags: ["console", "ascii-art", "strategy"],
    difficulty: 3,
    lines: "~150 lines",
    code: `# ASCII Battleship Game
import os
import random

# Game settings
GRID_SIZE = 8
EMPTY = "~"
HIT = "X"
MISS = "O"

# Ship definitions (name, size)
SHIP_TYPES = [
    ("Carrier", 4),
    ("Battleship", 3),
    ("Destroyer", 2),
    ("Submarine", 2)
]


def clear_screen():
    """Clear the console screen"""
    os.system("cls" if os.name == "nt" else "clear")


def create_empty_grid():
    """Create an empty game grid"""
    return [[EMPTY for _ in range(GRID_SIZE)] for _ in range(GRID_SIZE)]


def draw_grid(grid, show_ships=False):
    """Display the game grid"""
    print("\n  " + " ".join(str(i) for i in range(GRID_SIZE)))
    for y in range(GRID_SIZE):
        row = ""
        for x in range(GRID_SIZE):
            cell = grid[y][x]
            if cell == "S" and not show_ships:
                row += EMPTY + " "
            else:
                row += cell + " "
        print(str(y) + " " + row)
    print()


def can_place_ship(grid, row, col, size, horizontal):
    """Check if a ship can be placed at the given position"""
    if horizontal:
        if col + size > GRID_SIZE:
            return False
        for x in range(col, col + size):
            if grid[row][x] != EMPTY:
                return False
    else:
        if row + size > GRID_SIZE:
            return False
        for y in range(row, row + size):
            if grid[y][col] != EMPTY:
                return False
    return True


def place_ship(grid, row, col, size, horizontal):
    """Place a ship on the grid"""
    positions = []
    if horizontal:
        for x in range(col, col + size):
            grid[row][x] = "S"
            positions.append((row, x))
    else:
        for y in range(row, row + size):
            grid[y][col] = "S"
            positions.append((y, col))
    return positions


def place_ships_randomly(grid):
    """Randomly place all ships on the grid"""
    all_ship_positions = []
    
    for ship_name, ship_size in SHIP_TYPES:
        placed = False
        attempts = 0
        
        while not placed and attempts < 100:
            row = random.randint(0, GRID_SIZE - 1)
            col = random.randint(0, GRID_SIZE - 1)
            horizontal = random.choice([True, False])
            
            if can_place_ship(grid, row, col, ship_size, horizontal):
                positions = place_ship(grid, row, col, ship_size, horizontal)
                all_ship_positions.append({
                    "name": ship_name,
                    "positions": positions,
                    "hits": []
                })
                placed = True
            
            attempts += 1
    
    return all_ship_positions


def is_valid_coordinate(row, col):
    """Check if coordinates are within the grid"""
    return 0 <= row < GRID_SIZE and 0 <= col < GRID_SIZE


def check_ship_sunk(ship):
    """Check if a ship has been completely destroyed"""
    return len(ship["hits"]) == len(ship["positions"])


def main():
    """Main game loop"""
    clear_screen()
    print("=" * 40)
    print("      ASCII BATTLESHIP")
    print("=" * 40)
    print("\nWelcome to Battleship!")
    print("Sink all enemy ships to win!")
    print(f"\nShips to find:")
    for name, size in SHIP_TYPES:
        print(f"  - {name} (size {size})")
    print(f"\nGrid: {GRID_SIZE}x{GRID_SIZE}")
    print("Enter coordinates as row then column (e.g., 23 for row 2, col 3)")
    input("\nPress Enter to start...")
    
    # Setup game
    player_grid = create_empty_grid()
    ships = place_ships_randomly(player_grid)
    shots_fired = 0
    hits = 0
    
    # Game loop
    while ships:
        clear_screen()
        print("=" * 40)
        print(f"Shots fired: {shots_fired} | Hits: {hits}")
        print("=" * 40)
        draw_grid(player_grid, show_ships=False)
        
        # Show remaining ships
        active_ships = [s for s in ships if not check_ship_sunk(s)]
        print(f"Ships remaining: {len(active_ships)}")
        for ship in active_ships:
            hits_count = len(ship["hits"])
            size = len(ship["positions"])
            print(f"  - {ship['name']}: {hits_count}/{size} hits")
        
        # Get player input
        move = input("\nEnter coordinates (e.g., 23): ")
        
        # Validate input
        if len(move) != 2 or not move.isdigit():
            print("Invalid input! Use two digits (e.g., 23)")
            input("Press Enter to continue...")
            continue
        
        row, col = int(move[0]), int(move[1])
        
        if not is_valid_coordinate(row, col):
            print(f"Coordinates must be between 0-{GRID_SIZE-1}!")
            input("Press Enter to continue...")
            continue
        
        if player_grid[row][col] in [HIT, MISS]:
            print("You already shot there!")
            input("Press Enter to continue...")
            continue
        
        shots_fired += 1
        
        # Check if hit or miss
        if player_grid[row][col] == "S":
            player_grid[row][col] = HIT
            hits += 1
            print("\n💥 HIT! 💥")
            
            # Find which ship was hit
            for ship in ships:
                if (row, col) in ship["positions"]:
                    ship["hits"].append((row, col))
                    
                    if check_ship_sunk(ship):
                        print(f"You sunk the {ship['name']}!")
                        ships.remove(ship)
                    break
        else:
            player_grid[row][col] = MISS
            print("\n💧 Miss! 💧")
        
        input("Press Enter to continue...")
    
    # Game over - victory!
    clear_screen()
    print("=" * 40)
    print("      🎉 VICTORY! 🎉")
    print("=" * 40)
    print(f"\nYou sunk all the ships!")
    print(f"Shots fired: {shots_fired}")
    print(f"Accuracy: {hits}/{shots_fired} ({int(hits/shots_fired*100)}%)")
    print("\nFinal board:")
    draw_grid(player_grid, show_ships=True)


if __name__ == "__main__":
    main()`
  },
  {
    title: "ASCII Minesweeper",
    category: "ascii",
    description: "Classic minesweeper in the terminal with ASCII graphics.",
    tags: ["console", "ascii-art", "puzzle"],
    difficulty: 3,
    lines: "~250 lines",
    code: `import os,random
w,h,m=10,10,15
g=[[0]*w for _ in range(h)]
v=[[0]*w for _ in range(h)]
f=[[0]*w for _ in range(h)]
first=1
def place():
    global first
    placed=0
    while placed<m:
        r,c=random.randint(0,h-1),random.randint(0,w-1)
        if g[r][c]!=-1:
            g[r][c]=-1
            placed+=1
    for r in range(h):
        for c in range(w):
            if g[r][c]!=-1:
                cnt=0
                for dr in[-1,0,1]:
                    for dc in[-1,0,1]:
                        nr,nc=r+dr,c+dc
                        if 0<=nr<h and 0<=nc<w and g[nr][nc]==-1:
                            cnt+=1
                g[r][c]=cnt
def reveal(r,c):
    if not(0<=r<h and 0<=c<w)or v[r][c]or f[r][c]:return
    v[r][c]=1
    if g[r][c]==0:
        for dr in[-1,0,1]:
            for dc in[-1,0,1]:
                reveal(r+dr,c+dc)
def draw():
    os.system("cls"if os.name=="nt"else"clear")
    print("  "+" ".join(str(i)for i in range(w)))
    for r in range(h):
        row=str(r)+" "
        for c in range(w):
            if f[r][c]:row+="F "
            elif not v[r][c]:row+="■ "
            elif g[r][c]==-1:row+="* "
            elif g[r][c]==0:row+="  "
            else:row+=str(g[r][c])+" "
        print(row)
def check():
    for r in range(h):
        for c in range(w):
            if g[r][c]!=-1 and not v[r][c]:return 0
    return 1
place()
lost=0
while not lost and not check():
    draw()
    cmd=input("Enter command (rc or frc): ").strip()
    if cmd[0]=='f':
        action,coords='flag',cmd[1:]
    else:
        action,coords='reveal',cmd
    if len(coords)<2 or not coords.isdigit():continue
    r,c=int(coords[0]),int(coords[1:])if len(coords)>2 else int(coords[1])
    if not(0<=r<h and 0<=c<w):continue
    if action=='flag':
        f[r][c]=not f[r][c]
    else:
        reveal(r,c)
        if g[r][c]==-1:
            lost=1
            for r in range(h):
                for c in range(w):
                    if g[r][c]==-1:v[r][c]=1
draw()
print("You win!"if not lost else"Game over!")`
  },
  {
    title: "ASCII Racing Game",
    category: "ascii",
    description: "Top-down racing game with ASCII track and cars.",
    tags: ["console", "ascii-art", "racing"],
    difficulty: 3,
    lines: "~120 lines",
    code: `# ASCII Racing Game
import os
import time
import random
import sys
import select
import termios
import tty

# Game settings
TRACK_WIDTH = 20
TRACK_HEIGHT = 12
PLAYER_ROW = TRACK_HEIGHT - 2
OBSTACLE = "#"
PLAYER = "A"
ROAD = "."
EMPTY = " "

# Game state
score = 0
speed = 0.15
game_over = False


def clear_screen():
    """Clear the console screen"""
    os.system("cls" if os.name == "nt" else "clear")


def get_key_nonblocking():
    """Get keyboard input without blocking (Unix/Mac)"""
    if sys.platform == "win32":
        import msvcrt
        if msvcrt.kbhit():
            return msvcrt.getch().decode('utf-8').lower()
        return None
    else:
        # Unix/Mac
        dr, dw, de = select.select([sys.stdin], [], [], 0)
        if dr:
            return sys.stdin.read(1).lower()
        return None


def setup_terminal():
    """Setup terminal for non-blocking input (Unix/Mac)"""
    if sys.platform != "win32":
        # Save terminal settings
        old_settings = termios.tcgetattr(sys.stdin)
        try:
            # Set terminal to raw mode
            tty.setcbreak(sys.stdin.fileno())
            return old_settings
        except:
            return None
    return None


def restore_terminal(old_settings):
    """Restore terminal settings (Unix/Mac)"""
    if sys.platform != "win32" and old_settings:
        termios.tcsetattr(sys.stdin, termios.TCSADRAIN, old_settings)


def create_empty_track():
    """Create initial empty track"""
    track = []
    for _ in range(TRACK_HEIGHT):
        row = [EMPTY] * TRACK_WIDTH
        # Add road markers on edges
        row[0] = "|"
        row[TRACK_WIDTH - 1] = "|"
        track.append(row)
    return track


def generate_obstacles(difficulty):
    """Generate a new row with obstacles"""
    row = [EMPTY] * TRACK_WIDTH
    row[0] = "|"
    row[TRACK_WIDTH - 1] = "|"
    
    # Random number of obstacles based on difficulty
    num_obstacles = random.randint(1, min(3, difficulty))
    
    for _ in range(num_obstacles):
        pos = random.randint(2, TRACK_WIDTH - 3)
        row[pos] = OBSTACLE
    
    return row


def draw_game(track, car_x, score, speed):
    """Display the game screen"""
    clear_screen()
    print("=" * (TRACK_WIDTH + 10))
    print("    ASCII RACING GAME")
    print("=" * (TRACK_WIDTH + 10))
    print(f"Score: {score} | Speed: {speed:.2f}")
    print()
    
    for y in range(TRACK_HEIGHT):
        row_display = ""
        for x in range(TRACK_WIDTH):
            # Draw player car
            if y == PLAYER_ROW and x == car_x:
                row_display += PLAYER
            else:
                row_display += track[y][x]
        print(row_display)
    
    print()
    print("Controls: A/D or ←/→ to move | Q to quit")


def check_collision(track, car_x):
    """Check if player hit an obstacle"""
    return track[PLAYER_ROW][car_x] == OBSTACLE


def main():
    """Main game loop"""
    global score, speed, game_over
    
    # Setup
    clear_screen()
    print("=" * 40)
    print("      ASCII RACING GAME")
    print("=" * 40)
    print("\n🏎️  Welcome to ASCII Racing!")
    print("\nHow to play:")
    print("  - Use A/D or arrow keys to move left/right")
    print("  - Avoid obstacles (#)")
    print("  - Stay between the road barriers (|)")
    print("  - Speed increases as you survive!")
    print("  - Press Q to quit anytime")
    
    input("\nPress Enter to start your engines...")
    
    # Initialize game
    track = create_empty_track()
    car_x = TRACK_WIDTH // 2
    difficulty = 1
    frame_count = 0
    
    # Setup terminal for input
    old_settings = setup_terminal()
    
    try:
        # Main game loop
        while not game_over:
            # Scroll track upward
            track.pop(0)
            
            # Add new row with obstacles
            if frame_count % 2 == 0:  # Add obstacles every other frame
                new_row = generate_obstacles(difficulty)
            else:
                new_row = [EMPTY] * TRACK_WIDTH
                new_row[0] = "|"
                new_row[TRACK_WIDTH - 1] = "|"
            
            track.append(new_row)
            
            # Draw game
            draw_game(track, car_x, score, speed)
            
            # Get input
            key = get_key_nonblocking()
            
            if key:
                if key in ['a', '\x1b']:  # 'a' or arrow key sequence
                    if key == '\x1b':
                        # Read arrow key sequence
                        next_key = get_key_nonblocking()
                        if next_key == '[':
                            arrow = get_key_nonblocking()
                            if arrow == 'D':  # Left arrow
                                key = 'a'
                            elif arrow == 'C':  # Right arrow
                                key = 'd'
                    
                    if key == 'a' and car_x > 1:
                        car_x -= 1
                
                elif key == 'd' and car_x < TRACK_WIDTH - 2:
                    car_x += 1
                
                elif key == 'q':
                    print("\n\nThanks for playing!")
                    break
            
            # Check collision
            if check_collision(track, car_x):
                game_over = True
                draw_game(track, car_x, score, speed)
                print("\n💥" * 10)
                print("      CRASH! GAME OVER!")
                print("💥" * 10)
                print(f"\nFinal Score: {score}")
                break
            
            # Check boundary collision
            if car_x == 0 or car_x == TRACK_WIDTH - 1:
                game_over = True
                draw_game(track, car_x, score, speed)
                print("\n🚧" * 10)
                print("   HIT THE BARRIER! GAME OVER!")
                print("🚧" * 10)
                print(f"\nFinal Score: {score}")
                break
            
            # Update game state
            score += 1
            frame_count += 1
            
            # Increase difficulty over time
            if score % 50 == 0 and speed > 0.05:
                speed -= 0.01
                difficulty = min(difficulty + 1, 5)
            
            # Control game speed
            time.sleep(speed)
    
    finally:
        # Restore terminal settings
        restore_terminal(old_settings)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\nGame interrupted. Thanks for playing!")
    except Exception as e:
        print(f"\nAn error occurred: {e}")
        print("Thanks for playing!")`
  },
 {
    title: "Turtle Race Simulator",
    category: "turtle",
    description: "Watch colorful turtles race across the screen with betting and replay features.",
    tags: ["turtle", "animation", "game"],
    difficulty: 2,
    lines: "~280 lines",
    code: `"""
Turtle Race Simulator
Watch colorful turtles race across the screen with betting and replay features!
"""

import turtle
import random
import time

# Game Configuration
SCREEN_WIDTH = 600
SCREEN_HEIGHT = 500
NUM_TURTLES = 5
COLORS = ["red", "blue", "green", "orange", "purple"]
TURTLE_NAMES = ["Flash", "Speedy", "Turbo", "Zoom", "Rocket"]

class TurtleRacer:
    """Represents a racing turtle"""
    
    def __init__(self, color, name, y_position):
        self.turtle = turtle.Turtle()
        self.turtle.shape("turtle")
        self.turtle.color(color)
        self.turtle.penup()
        self.turtle.goto(-SCREEN_WIDTH // 2 + 50, y_position)
        self.turtle.setheading(0)
        self.name = name
        self.color = color
        self.speed_factor = random.uniform(0.8, 1.2)
        self.total_distance = 0
    
    def move(self):
        """Move the turtle forward by a random amount"""
        distance = random.randint(1, 10) * self.speed_factor
        self.turtle.forward(distance)
        self.total_distance += distance
    
    def get_x_position(self):
        """Get current x position"""
        return self.turtle.xcor()
    
    def reset_position(self, y_position):
        """Reset turtle to starting position"""
        self.turtle.goto(-SCREEN_WIDTH // 2 + 50, y_position)
        self.total_distance = 0
        self.speed_factor = random.uniform(0.8, 1.2)


class TurtleRace:
    """Main race manager"""
    
    def __init__(self):
        self.screen = turtle.Screen()
        self.screen.title("🐢 Turtle Race Simulator 🏁")
        self.screen.setup(SCREEN_WIDTH, SCREEN_HEIGHT)
        self.screen.bgcolor("#2a2a2a")
        self.screen.tracer(0)
        
        self.racers = []
        self.winner = None
        self.race_active = False
        self.race_count = 0
        
        self.setup_track()
        self.create_racers()
        self.create_ui()
    
    def setup_track(self):
        """Draw the race track"""
        track = turtle.Turtle()
        track.hideturtle()
        track.speed(0)
        track.penup()
        
        # Draw start line
        track.goto(-SCREEN_WIDTH // 2 + 40, SCREEN_HEIGHT // 2 - 50)
        track.pendown()
        track.pensize(3)
        track.color("white")
        track.setheading(270)
        track.forward(SCREEN_HEIGHT - 100)
        
        # Draw finish line
        track.penup()
        track.goto(SCREEN_WIDTH // 2 - 60, SCREEN_HEIGHT // 2 - 50)
        track.pendown()
        track.color("yellow")
        
        # Checkered pattern
        for i in range(20):
            if i % 2 == 0:
                track.color("yellow")
            else:
                track.color("black")
            track.forward(20)
        
        # Draw lane dividers
        track.color("#404040")
        track.pensize(1)
        y_pos = SCREEN_HEIGHT // 2 - 100
        spacing = (SCREEN_HEIGHT - 150) / (NUM_TURTLES - 1)
        
        for i in range(NUM_TURTLES - 1):
            y_pos -= spacing
            track.penup()
            track.goto(-SCREEN_WIDTH // 2 + 50, y_pos)
            track.pendown()
            track.setheading(0)
            
            # Dashed line
            for _ in range(25):
                track.forward(10)
                track.penup()
                track.forward(10)
                track.pendown()
    
    def create_racers(self):
        """Create racing turtles"""
        y_start = SCREEN_HEIGHT // 2 - 100
        spacing = (SCREEN_HEIGHT - 150) / (NUM_TURTLES - 1)
        
        for i in range(NUM_TURTLES):
            y_pos = y_start - (i * spacing)
            racer = TurtleRacer(COLORS[i], TURTLE_NAMES[i], y_pos)
            self.racers.append(racer)
    
    def create_ui(self):
        """Create UI elements"""
        self.title_text = turtle.Turtle()
        self.title_text.hideturtle()
        self.title_text.penup()
        self.title_text.color("white")
        self.title_text.goto(0, SCREEN_HEIGHT // 2 - 30)
        
        self.info_text = turtle.Turtle()
        self.info_text.hideturtle()
        self.info_text.penup()
        self.info_text.color("#a0a0a0")
        self.info_text.goto(0, -SCREEN_HEIGHT // 2 + 20)
        
        self.update_title("🏁 TURTLE RACE SIMULATOR 🏁")
        self.update_info("Press SPACE to start race | Q to quit")
    
    def update_title(self, text):
        """Update title text"""
        self.title_text.clear()
        self.title_text.write(text, align="center", 
                             font=("Arial", 16, "bold"))
    
    def update_info(self, text):
        """Update info text"""
        self.info_text.clear()
        self.info_text.write(text, align="center", 
                            font=("Arial", 12, "normal"))
    
    def show_racer_names(self):
        """Display racer names and colors"""
        name_writer = turtle.Turtle()
        name_writer.hideturtle()
        name_writer.penup()
        name_writer.speed(0)
        
        y_start = SCREEN_HEIGHT // 2 - 100
        spacing = (SCREEN_HEIGHT - 150) / (NUM_TURTLES - 1)
        
        for i, racer in enumerate(self.racers):
            y_pos = y_start - (i * spacing)
            name_writer.goto(-SCREEN_WIDTH // 2 + 10, y_pos - 10)
            name_writer.color(racer.color)
            name_writer.write(f"{i+1}. {racer.name}", 
                            font=("Arial", 10, "bold"))
    
    def run_race(self):
        """Execute the race"""
        if self.race_active:
            return
        
        self.race_active = True
        self.winner = None
        self.race_count += 1
        
        # Reset positions
        y_start = SCREEN_HEIGHT // 2 - 100
        spacing = (SCREEN_HEIGHT - 150) / (NUM_TURTLES - 1)
        
        for i, racer in enumerate(self.racers):
            y_pos = y_start - (i * spacing)
            racer.reset_position(y_pos)
        
        self.update_title(f"🏁 RACE #{self.race_count} - GO! 🏁")
        self.update_info("Racing in progress...")
        
        # Countdown
        for count in [3, 2, 1]:
            self.update_info(f"Starting in {count}...")
            self.screen.update()
            time.sleep(0.5)
        
        self.update_info("GO! 🚀")
        self.screen.update()
        time.sleep(0.3)
        
        finish_line = SCREEN_WIDTH // 2 - 80
        
        # Race loop
        while not self.winner:
            for racer in self.racers:
                racer.move()
                
                # Check if crossed finish line
                if racer.get_x_position() >= finish_line:
                    self.winner = racer
                    break
            
            self.screen.update()
            time.sleep(0.05)
        
        # Announce winner
        self.announce_winner()
        self.race_active = False
    
    def announce_winner(self):
        """Display winner announcement"""
        self.update_title(f"🏆 {self.winner.name.upper()} WINS! 🏆")
        
        # Create winner badge
        badge = turtle.Turtle()
        badge.hideturtle()
        badge.penup()
        badge.goto(self.winner.turtle.xcor() + 30, 
                  self.winner.turtle.ycor() + 20)
        badge.color("gold")
        badge.write("★ WINNER ★", font=("Arial", 12, "bold"))
        
        # Show race stats
        stats = f"Distance: {int(self.winner.total_distance)} units"
        self.update_info(f"{stats} | Press SPACE for new race | Q to quit")
        
        self.screen.update()
    
    def setup_controls(self):
        """Setup keyboard controls"""
        self.screen.listen()
        self.screen.onkey(self.run_race, "space")
        self.screen.onkey(self.quit_game, "q")
    
    def quit_game(self):
        """Close the game"""
        self.screen.bye()
    
    def start(self):
        """Start the game"""
        self.show_racer_names()
        self.setup_controls()
        self.screen.update()
        
        print("\\n" + "="*50)
        print("🐢 TURTLE RACE SIMULATOR 🏁")
        print("="*50)
        print("\\nControls:")
        print("  SPACE - Start race")
        print("  Q     - Quit game")
        print("\\nRacers:")
        for i, racer in enumerate(self.racers, 1):
            print(f"  {i}. {racer.name} ({racer.color})")
        print("\\n" + "="*50)
        
        # Keep window open
        self.screen.mainloop()


def main():
    """Main entry point"""
    try:
        race = TurtleRace()
        race.start()
    except turtle.Terminator:
        print("\\nGame closed. Thanks for racing! 🐢")
    except Exception as e:
        print(f"\\nAn error occurred: {e}")


if __name__ == "__main__":
    main()`
  },
{
    title: "Turtle Spirograph",
    category: "turtle",
    description: "Create mesmerizing spirograph patterns with 7 different styles and color palettes.",
    tags: ["turtle", "mathematics", "patterns"],
    difficulty: 2,
    lines: "~380 lines",
    code: `"""
Turtle Spirograph Generator
Create mesmerizing spirograph patterns with customizable parameters!
"""

import turtle
import random
import math

# Configuration
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 800
BACKGROUND_COLOR = "#0a0a0a"

# Color palettes
COLOR_PALETTES = {
    "rainbow": ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#9400D3"],
    "ocean": ["#006994", "#0099cc", "#66cccc", "#99ffff", "#00ccff", "#3399ff"],
    "sunset": ["#FF6B6B", "#FFA07A", "#FFD700", "#FF8C00", "#FF4500", "#DC143C"],
    "neon": ["#FF00FF", "#00FFFF", "#FF00AA", "#00FF00", "#FFFF00", "#FF0066"],
    "pastel": ["#FFB3BA", "#FFDFBA", "#FFFFBA", "#BAFFC9", "#BAE1FF", "#E0BBE4"],
    "fire": ["#FF0000", "#FF4500", "#FF6347", "#FF7F50", "#FFA500", "#FFD700"],
    "cool": ["#0066CC", "#3399FF", "#66B2FF", "#99CCFF", "#CCE5FF", "#E6F2FF"]
}

class Spirograph:
    """Spirograph pattern generator"""
    
    def __init__(self):
        self.screen = turtle.Screen()
        self.screen.setup(SCREEN_WIDTH, SCREEN_HEIGHT)
        self.screen.bgcolor(BACKGROUND_COLOR)
        self.screen.title("🎨 Spirograph Generator")
        self.screen.tracer(0)
        
        self.drawer = turtle.Turtle()
        self.drawer.speed(0)
        self.drawer.hideturtle()
        
        self.current_palette = "rainbow"
        self.pattern_type = "circle"
        
        self.setup_ui()
        self.setup_controls()
    
    def setup_ui(self):
        """Create UI elements"""
        self.title_text = turtle.Turtle()
        self.title_text.hideturtle()
        self.title_text.penup()
        self.title_text.color("white")
        self.title_text.goto(0, SCREEN_HEIGHT // 2 - 50)
        self.title_text.write("🎨 SPIROGRAPH GENERATOR", 
                             align="center", 
                             font=("Arial", 20, "bold"))
        
        self.info_text = turtle.Turtle()
        self.info_text.hideturtle()
        self.info_text.penup()
        self.info_text.color("#888888")
        self.info_text.goto(0, -SCREEN_HEIGHT // 2 + 30)
        self.update_info()
    
    def update_info(self):
        """Update info text"""
        self.info_text.clear()
        info = f"Palette: {self.current_palette.upper()} | Pattern: {self.pattern_type.upper()}"
        self.info_text.write(info, align="center", font=("Arial", 12, "normal"))
        
        controls_text = turtle.Turtle()
        controls_text.hideturtle()
        controls_text.penup()
        controls_text.color("#666666")
        controls_text.goto(0, -SCREEN_HEIGHT // 2 + 10)
        controls_text.write("1-7=Patterns | P=Palette | C=Clear | S=Save | Q=Quit", 
                           align="center", font=("Arial", 10, "normal"))
    
    def draw_circle_pattern(self, radius=100, rotations=36, angle=10):
        """Draw circular spirograph pattern"""
        self.drawer.penup()
        self.drawer.goto(0, 0)
        self.drawer.pendown()
        
        colors = COLOR_PALETTES[self.current_palette]
        
        for i in range(rotations):
            self.drawer.color(random.choice(colors))
            self.drawer.circle(radius)
            self.drawer.right(angle)
            
            if i % 6 == 0:
                self.screen.update()
    
    def draw_petal_pattern(self, petals=12, size=150):
        """Draw flower petal pattern"""
        self.drawer.penup()
        self.drawer.goto(0, 0)
        self.drawer.pendown()
        
        colors = COLOR_PALETTES[self.current_palette]
        angle = 360 / petals
        
        for i in range(petals):
            self.drawer.color(random.choice(colors))
            self.drawer.circle(size, 60)
            self.drawer.left(120)
            self.drawer.circle(size, 60)
            self.drawer.setheading(angle * (i + 1))
            
            if i % 3 == 0:
                self.screen.update()
    
    def draw_spiral_pattern(self, size=5, angle=90, iterations=100):
        """Draw spiral pattern"""
        self.drawer.penup()
        self.drawer.goto(0, 0)
        self.drawer.pendown()
        
        colors = COLOR_PALETTES[self.current_palette]
        
        for i in range(iterations):
            self.drawer.color(colors[i % len(colors)])
            self.drawer.forward(size)
            self.drawer.right(angle)
            size += 2
            
            if i % 10 == 0:
                self.screen.update()
    
    def draw_star_pattern(self, points=36, radius=200):
        """Draw star pattern"""
        self.drawer.penup()
        self.drawer.goto(0, 0)
        self.drawer.pendown()
        
        colors = COLOR_PALETTES[self.current_palette]
        angle = 360 / points
        
        for i in range(points):
            self.drawer.color(random.choice(colors))
            
            # Draw line to point
            x = radius * math.cos(math.radians(angle * i))
            y = radius * math.sin(math.radians(angle * i))
            self.drawer.goto(x, y)
            self.drawer.goto(0, 0)
            
            if i % 6 == 0:
                self.screen.update()
    
    def draw_hexagon_pattern(self, layers=8, size=50):
        """Draw hexagonal pattern"""
        self.drawer.penup()
        self.drawer.goto(0, 0)
        self.drawer.pendown()
        
        colors = COLOR_PALETTES[self.current_palette]
        
        for layer in range(layers):
            self.drawer.color(colors[layer % len(colors)])
            
            for _ in range(6):
                self.drawer.forward(size * layer)
                self.drawer.right(60)
            
            self.drawer.right(10)
            self.screen.update()
    
    def draw_wave_pattern(self, waves=36, amplitude=100):
        """Draw wave pattern"""
        self.drawer.penup()
        self.drawer.goto(-300, 0)
        self.drawer.pendown()
        
        colors = COLOR_PALETTES[self.current_palette]
        
        for i in range(waves):
            self.drawer.color(colors[i % len(colors)])
            
            # Draw sine wave
            for x in range(0, 600, 5):
                y = amplitude * math.sin(math.radians(x + i * 10))
                self.drawer.goto(-300 + x, y)
            
            self.drawer.penup()
            self.drawer.goto(-300, 0)
            self.drawer.pendown()
            
            if i % 6 == 0:
                self.screen.update()
    
    def draw_mandala_pattern(self, segments=12, radius=150):
        """Draw mandala pattern"""
        self.drawer.penup()
        self.drawer.goto(0, 0)
        self.drawer.pendown()
        
        colors = COLOR_PALETTES[self.current_palette]
        angle = 360 / segments
        
        for i in range(segments):
            self.drawer.color(colors[i % len(colors)])
            
            # Draw petal
            for _ in range(2):
                self.drawer.circle(radius, 60)
                self.drawer.left(120)
            
            self.drawer.setheading(angle * (i + 1))
            
            # Draw inner circle
            self.drawer.penup()
            self.drawer.goto(0, -50)
            self.drawer.pendown()
            self.drawer.circle(50)
            self.drawer.penup()
            self.drawer.goto(0, 0)
            self.drawer.pendown()
            
            if i % 3 == 0:
                self.screen.update()
    
    def pattern_1(self):
        """Pattern 1: Classic Spirograph"""
        self.clear_canvas()
        self.pattern_type = "circle"
        self.draw_circle_pattern(radius=100, rotations=36, angle=10)
        self.screen.update()
    
    def pattern_2(self):
        """Pattern 2: Flower Petals"""
        self.clear_canvas()
        self.pattern_type = "petal"
        self.draw_petal_pattern(petals=12, size=150)
        self.screen.update()
    
    def pattern_3(self):
        """Pattern 3: Golden Spiral"""
        self.clear_canvas()
        self.pattern_type = "spiral"
        self.draw_spiral_pattern(size=5, angle=89, iterations=120)
        self.screen.update()
    
    def pattern_4(self):
        """Pattern 4: Star Burst"""
        self.clear_canvas()
        self.pattern_type = "star"
        self.draw_star_pattern(points=36, radius=250)
        self.screen.update()
    
    def pattern_5(self):
        """Pattern 5: Hexagonal"""
        self.clear_canvas()
        self.pattern_type = "hexagon"
        self.draw_hexagon_pattern(layers=12, size=30)
        self.screen.update()
    
    def pattern_6(self):
        """Pattern 6: Wave"""
        self.clear_canvas()
        self.pattern_type = "wave"
        self.draw_wave_pattern(waves=24, amplitude=80)
        self.screen.update()
    
    def pattern_7(self):
        """Pattern 7: Mandala"""
        self.clear_canvas()
        self.pattern_type = "mandala"
        self.draw_mandala_pattern(segments=16, radius=120)
        self.screen.update()
    
    def cycle_palette(self):
        """Cycle through color palettes"""
        palettes = list(COLOR_PALETTES.keys())
        current_index = palettes.index(self.current_palette)
        next_index = (current_index + 1) % len(palettes)
        self.current_palette = palettes[next_index]
        self.update_info()
        print(f"Palette changed to: {self.current_palette}")
    
    def clear_canvas(self):
        """Clear the drawing canvas"""
        self.drawer.clear()
        # Redraw UI
        self.title_text.clear()
        self.title_text.write("🎨 SPIROGRAPH GENERATOR", 
                             align="center", 
                             font=("Arial", 20, "bold"))
    
    def save_pattern(self):
        """Save the current pattern"""
        filename = f"spirograph_{self.pattern_type}_{self.current_palette}.eps"
        self.screen.getcanvas().postscript(file=filename)
        print(f"Pattern saved as {filename}")
    
    def setup_controls(self):
        """Setup keyboard controls"""
        self.screen.listen()
        self.screen.onkey(self.pattern_1, "1")
        self.screen.onkey(self.pattern_2, "2")
        self.screen.onkey(self.pattern_3, "3")
        self.screen.onkey(self.pattern_4, "4")
        self.screen.onkey(self.pattern_5, "5")
        self.screen.onkey(self.pattern_6, "6")
        self.screen.onkey(self.pattern_7, "7")
        self.screen.onkey(self.cycle_palette, "p")
        self.screen.onkey(self.clear_canvas, "c")
        self.screen.onkey(self.save_pattern, "s")
        self.screen.onkey(self.quit_app, "q")
    
    def quit_app(self):
        """Close the application"""
        self.screen.bye()
    
    def start(self):
        """Start the application"""
        print("\\n" + "="*60)
        print("🎨 SPIROGRAPH GENERATOR")
        print("="*60)
        print("\\nControls:")
        print("  1 - Classic Spirograph")
        print("  2 - Flower Petals")
        print("  3 - Golden Spiral")
        print("  4 - Star Burst")
        print("  5 - Hexagonal Pattern")
        print("  6 - Wave Pattern")
        print("  7 - Mandala Pattern")
        print("  P - Cycle Color Palette")
        print("  C - Clear Canvas")
        print("  S - Save Pattern")
        print("  Q - Quit")
        print("\\nAvailable Palettes:")
        for palette in COLOR_PALETTES.keys():
            print(f"  • {palette.capitalize()}")
        print("\\n" + "="*60)
        
        # Draw initial pattern
        self.pattern_1()
        
        self.screen.mainloop()


def main():
    """Main entry point"""
    try:
        app = Spirograph()
        app.start()
    except turtle.Terminator:
        print("\\nSpirograph closed. Thanks for creating! 🎨")
    except Exception as e:
        print(f"\\nAn error occurred: {e}")


if __name__ == "__main__":
    main()`
  },
  {
    title: "Turtle Fractal Tree",
    category: "turtle",
    description: "Generate beautiful fractal trees with 5 styles, seasonal themes, and recursive growth patterns.",
    tags: ["turtle", "fractals", "recursion"],
    difficulty: 3,
    lines: "~420 lines",
    code: `"""
Turtle Fractal Tree Generator
Generate beautiful fractal trees with customizable parameters and seasons!
"""

import turtle
import random
import math

# Configuration
SCREEN_WIDTH = 1000
SCREEN_HEIGHT = 800
BACKGROUND_COLOR = "#1a1a2e"

# Tree presets
TREE_STYLES = {
    "classic": {
        "angle": 25,
        "branch_ratio": 0.67,
        "min_length": 5,
        "thickness_ratio": 0.7
    },
    "wide": {
        "angle": 35,
        "branch_ratio": 0.7,
        "min_length": 8,
        "thickness_ratio": 0.6
    },
    "narrow": {
        "angle": 15,
        "branch_ratio": 0.75,
        "min_length": 3,
        "thickness_ratio": 0.8
    },
    "bushy": {
        "angle": 30,
        "branch_ratio": 0.65,
        "min_length": 4,
        "thickness_ratio": 0.65
    },
    "asymmetric": {
        "angle": 20,
        "branch_ratio": 0.7,
        "min_length": 5,
        "thickness_ratio": 0.7
    }
}

# Season color schemes
SEASONS = {
    "spring": {
        "trunk": "#8B4513",
        "leaves": ["#90EE90", "#98FB98", "#ADFF2F", "#7CFC00"],
        "sky": "#87CEEB"
    },
    "summer": {
        "trunk": "#654321",
        "leaves": ["#228B22", "#32CD32", "#006400", "#2E8B57"],
        "sky": "#4A90E2"
    },
    "autumn": {
        "trunk": "#5C4033",
        "leaves": ["#FF6347", "#FF8C00", "#FFD700", "#FF4500"],
        "sky": "#FFA07A"
    },
    "winter": {
        "trunk": "#3E2723",
        "leaves": ["#E0F2F1", "#B2DFDB", "#FFFFFF", "#80CBC4"],
        "sky": "#B0C4DE"
    },
    "sunset": {
        "trunk": "#4A2C2A",
        "leaves": ["#FF1493", "#FF69B4", "#FFB6C1", "#FFA07A"],
        "sky": "#FF6B6B"
    }
}


class FractalTree:
    """Fractal tree generator with multiple styles and seasons"""
    
    def __init__(self):
        self.screen = turtle.Screen()
        self.screen.setup(SCREEN_WIDTH, SCREEN_HEIGHT)
        self.screen.bgcolor(BACKGROUND_COLOR)
        self.screen.title("🌳 Fractal Tree Generator")
        self.screen.tracer(0)
        
        self.drawer = turtle.Turtle()
        self.drawer.speed(0)
        self.drawer.hideturtle()
        
        self.current_style = "classic"
        self.current_season = "summer"
        self.recursion_depth = 0
        
        self.setup_ui()
        self.setup_controls()
    
    def setup_ui(self):
        """Create UI elements"""
        self.title_text = turtle.Turtle()
        self.title_text.hideturtle()
        self.title_text.penup()
        self.title_text.color("white")
        self.title_text.goto(0, SCREEN_HEIGHT // 2 - 50)
        self.title_text.write("🌳 FRACTAL TREE GENERATOR", 
                             align="center", 
                             font=("Arial", 24, "bold"))
        
        self.info_text = turtle.Turtle()
        self.info_text.hideturtle()
        self.info_text.penup()
        self.info_text.color("#cccccc")
        self.info_text.goto(0, -SCREEN_HEIGHT // 2 + 50)
        self.update_info()
        
        self.controls_text = turtle.Turtle()
        self.controls_text.hideturtle()
        self.controls_text.penup()
        self.controls_text.color("#888888")
        self.controls_text.goto(0, -SCREEN_HEIGHT // 2 + 25)
        self.controls_text.write("1-5=Style | S=Season | +/-=Size | C=Clear | Q=Quit", 
                                align="center", 
                                font=("Arial", 12, "normal"))
    
    def update_info(self):
        """Update info display"""
        self.info_text.clear()
        info = f"Style: {self.current_style.upper()} | Season: {self.current_season.upper()}"
        self.info_text.write(info, align="center", font=("Arial", 14, "bold"))
    
    def draw_tree(self, branch_length, depth=0, style=None):
        """Draw fractal tree recursively"""
        if style is None:
            style = TREE_STYLES[self.current_style]
        
        season = SEASONS[self.current_season]
        
        # Calculate branch thickness
        thickness = max(1, int(branch_length / 10))
        self.drawer.pensize(thickness)
        
        # Set branch color
        if branch_length < style["min_length"] * 3:
            # Leaves/small branches
            self.drawer.color(random.choice(season["leaves"]))
        else:
            # Trunk/large branches
            self.drawer.color(season["trunk"])
        
        # Draw branch
        if branch_length > style["min_length"]:
            self.drawer.forward(branch_length)
            
            # Save position and heading
            pos = self.drawer.position()
            heading = self.drawer.heading()
            
            # Left branch
            angle_variation = random.uniform(-5, 5)
            self.drawer.left(style["angle"] + angle_variation)
            self.draw_tree(
                branch_length * style["branch_ratio"],
                depth + 1,
                style
            )
            
            # Return to position
            self.drawer.penup()
            self.drawer.goto(pos)
            self.drawer.setheading(heading)
            self.drawer.pendown()
            
            # Right branch
            angle_variation = random.uniform(-5, 5)
            if self.current_style == "asymmetric":
                # Asymmetric trees have different right angles
                self.drawer.right(style["angle"] * 1.5 + angle_variation)
            else:
                self.drawer.right(style["angle"] + angle_variation)
            
            self.draw_tree(
                branch_length * style["branch_ratio"],
                depth + 1,
                style
            )
            
            # Return to original position
            self.drawer.penup()
            self.drawer.goto(pos)
            self.drawer.setheading(heading)
            self.drawer.pendown()
            
            # Draw back to starting point
            self.drawer.backward(branch_length)
        
        # Add leaves at branch tips
        elif branch_length <= style["min_length"] * 2:
            self.draw_leaf()
    
    def draw_leaf(self):
        """Draw a small leaf at branch tip"""
        season = SEASONS[self.current_season]
        
        if self.current_season == "winter":
            # Snowflakes in winter
            self.drawer.dot(random.randint(5, 10), "white")
        else:
            # Colored leaves in other seasons
            self.drawer.dot(random.randint(8, 15), random.choice(season["leaves"]))
    
    def draw_ground(self):
        """Draw ground/grass"""
        ground = turtle.Turtle()
        ground.hideturtle()
        ground.speed(0)
        ground.penup()
        
        # Draw grass
        ground.goto(-SCREEN_WIDTH // 2, -SCREEN_HEIGHT // 2 + 150)
        ground.pendown()
        ground.pensize(3)
        ground.color("#2d5016")
        ground.begin_fill()
        ground.goto(SCREEN_WIDTH // 2, -SCREEN_HEIGHT // 2 + 150)
        ground.goto(SCREEN_WIDTH // 2, -SCREEN_HEIGHT // 2)
        ground.goto(-SCREEN_WIDTH // 2, -SCREEN_HEIGHT // 2)
        ground.goto(-SCREEN_WIDTH // 2, -SCREEN_HEIGHT // 2 + 150)
        ground.end_fill()
        
        # Add grass texture
        ground.pensize(1)
        for _ in range(50):
            x = random.randint(-SCREEN_WIDTH // 2, SCREEN_WIDTH // 2)
            y = random.randint(-SCREEN_HEIGHT // 2, -SCREEN_HEIGHT // 2 + 150)
            ground.penup()
            ground.goto(x, y)
            ground.pendown()
            ground.setheading(90)
            ground.color("#3d6b1a")
            ground.forward(random.randint(5, 15))
    
    def set_background(self):
        """Set season-appropriate background"""
        season = SEASONS[self.current_season]
        self.screen.bgcolor(season["sky"])
    
    def generate_tree(self, size=100):
        """Generate complete tree with background"""
        self.clear_canvas()
        self.set_background()
        self.draw_ground()
        
        # Position drawer at base of tree
        self.drawer.penup()
        self.drawer.goto(0, -SCREEN_HEIGHT // 2 + 150)
        self.drawer.setheading(90)
        self.drawer.pendown()
        
        # Draw tree
        self.draw_tree(size)
        
        self.screen.update()
    
    def tree_style_1(self):
        """Classic style tree"""
        self.current_style = "classic"
        self.update_info()
        self.generate_tree(120)
    
    def tree_style_2(self):
        """Wide style tree"""
        self.current_style = "wide"
        self.update_info()
        self.generate_tree(110)
    
    def tree_style_3(self):
        """Narrow style tree"""
        self.current_style = "narrow"
        self.update_info()
        self.generate_tree(130)
    
    def tree_style_4(self):
        """Bushy style tree"""
        self.current_style = "bushy"
        self.update_info()
        self.generate_tree(100)
    
    def tree_style_5(self):
        """Asymmetric style tree"""
        self.current_style = "asymmetric"
        self.update_info()
        self.generate_tree(120)
    
    def cycle_season(self):
        """Cycle through seasons"""
        seasons = list(SEASONS.keys())
        current_index = seasons.index(self.current_season)
        next_index = (current_index + 1) % len(seasons)
        self.current_season = seasons[next_index]
        self.update_info()
        self.generate_tree(120)
    
    def increase_size(self):
        """Increase tree size"""
        self.generate_tree(150)
    
    def decrease_size(self):
        """Decrease tree size"""
        self.generate_tree(80)
    
    def clear_canvas(self):
        """Clear the drawing canvas"""
        self.drawer.clear()
        self.screen.bgcolor(BACKGROUND_COLOR)
        
        # Redraw UI
        self.title_text.clear()
        self.title_text.write("🌳 FRACTAL TREE GENERATOR", 
                             align="center", 
                             font=("Arial", 24, "bold"))
    
    def setup_controls(self):
        """Setup keyboard controls"""
        self.screen.listen()
        self.screen.onkey(self.tree_style_1, "1")
        self.screen.onkey(self.tree_style_2, "2")
        self.screen.onkey(self.tree_style_3, "3")
        self.screen.onkey(self.tree_style_4, "4")
        self.screen.onkey(self.tree_style_5, "5")
        self.screen.onkey(self.cycle_season, "s")
        self.screen.onkey(self.increase_size, "plus")
        self.screen.onkey(self.increase_size, "equal")
        self.screen.onkey(self.decrease_size, "minus")
        self.screen.onkey(self.clear_canvas, "c")
        self.screen.onkey(self.quit_app, "q")
    
    def quit_app(self):
        """Close the application"""
        self.screen.bye()
    
    def start(self):
        """Start the application"""
        print("\\n" + "="*60)
        print("🌳 FRACTAL TREE GENERATOR")
        print("="*60)
        print("\\nControls:")
        print("  1 - Classic Tree")
        print("  2 - Wide Tree")
        print("  3 - Narrow Tree")
        print("  4 - Bushy Tree")
        print("  5 - Asymmetric Tree")
        print("  S - Cycle Season")
        print("  + - Increase Size")
        print("  - - Decrease Size")
        print("  C - Clear Canvas")
        print("  Q - Quit")
        print("\\nSeasons:")
        for season in SEASONS.keys():
            print(f"  • {season.capitalize()}")
        print("\\n" + "="*60)
        
        # Generate initial tree
        self.tree_style_1()
        
        self.screen.mainloop()


def main():
    """Main entry point"""
    try:
        app = FractalTree()
        app.start()
    except turtle.Terminator:
        print("\\nFractal Tree closed. Thanks for growing! 🌳")
    except Exception as e:
        print(f"\\nAn error occurred: {e}")


if __name__ == "__main__":
    main()`
  },
  {
  title: "Turtle Rainbow Spiral Galaxy",
  category: "turtle",
  description: "Create a mesmerizing spiral galaxy effect with rainbow colors and varying sizes.",
  tags: ["turtle", "spiral", "rainbow"],
  difficulty: 2,
  lines: "~40 lines",
  code: `import turtle
import math

screen = turtle.Screen()
screen.bgcolor("black")
screen.setup(800, 800)

t = turtle.Turtle()
t.speed(0)
t.hideturtle()

# Rainbow spiral galaxy
for i in range(500):
    # Rainbow color using HSV
    hue = i / 500
    r = int(255 * (0.5 + 0.5 * math.sin(2 * math.pi * hue)))
    g = int(255 * (0.5 + 0.5 * math.sin(2 * math.pi * (hue + 0.33))))
    b = int(255 * (0.5 + 0.5 * math.sin(2 * math.pi * (hue + 0.66))))
    
    t.pencolor((r/255, g/255, b/255))
    t.width(2)
    
    # Spiral with varying radius
    angle = i * 137.5  # Golden angle
    radius = i * 0.3
    
    x = radius * math.cos(math.radians(angle))
    y = radius * math.sin(math.radians(angle))
    
    t.penup()
    t.goto(x, y)
    t.pendown()
    t.dot(8)

turtle.done()`
},

{
  title: "Turtle Kaleidoscope",
  category: "turtle",
  description: "Interactive kaleidoscope pattern generator with symmetrical designs.",
  tags: ["turtle", "patterns", "symmetry"],
  difficulty: 3,
  lines: "~50 lines",
  code: `import turtle
import random

screen = turtle.Screen()
screen.bgcolor("black")
screen.setup(800, 800)

t = turtle.Turtle()
t.speed(0)
t.hideturtle()

def draw_kaleidoscope_segment(size, color):
    t.color(color)
    t.begin_fill()
    for _ in range(3):
        t.forward(size)
        t.left(120)
    t.end_fill()

# Create kaleidoscope with 12-fold symmetry
segments = 12
colors = ["red", "orange", "yellow", "green", "cyan", "blue", "purple", "magenta"]

for segment in range(segments):
    angle = 360 / segments
    
    # Save position
    t.penup()
    t.home()
    t.setheading(segment * angle)
    t.pendown()
    
    # Draw pattern along radius
    for i in range(5):
        t.forward(30 * i)
        color = random.choice(colors)
        draw_kaleidoscope_segment(20 + i * 5, color)
        t.backward(30 * i)
        t.right(15)

turtle.done()`
},

{
  title: "Turtle Snowflake Generator",
  category: "turtle",
  description: "Generate unique snowflakes using recursive Koch curve patterns.",
  tags: ["turtle", "fractal", "recursion"],
  difficulty: 3,
  lines: "~45 lines",
  code: `import turtle

screen = turtle.Screen()
screen.bgcolor("navy")
screen.setup(800, 800)

t = turtle.Turtle()
t.speed(0)
t.hideturtle()
t.color("white")

def koch_curve(length, depth):
    if depth == 0:
        t.forward(length)
    else:
        length = length / 3
        koch_curve(length, depth - 1)
        t.left(60)
        koch_curve(length, depth - 1)
        t.right(120)
        koch_curve(length, depth - 1)
        t.left(60)
        koch_curve(length, depth - 1)

def snowflake(size, depth):
    for _ in range(6):
        koch_curve(size, depth)
        t.right(60)

# Draw snowflake
t.penup()
t.goto(-150, 100)
t.pendown()
t.pensize(2)

snowflake(300, 3)

# Add decorative center
t.penup()
t.goto(0, 0)
t.pendown()
for _ in range(12):
    t.forward(20)
    t.dot(8)
    t.backward(20)
    t.right(30)

turtle.done()`
},

{
  title: "Turtle Neon Circles",
  category: "turtle",
  description: "Create glowing neon circle effects with overlapping gradients.",
  tags: ["turtle", "circles", "neon"],
  difficulty: 2,
  lines: "~35 lines",
  code: `import turtle
import random

screen = turtle.Screen()
screen.bgcolor("black")
screen.setup(800, 800)
screen.tracer(0)

t = turtle.Turtle()
t.speed(0)
t.hideturtle()

# Neon colors
neon_colors = ["#FF1493", "#00FF00", "#00FFFF", "#FF00FF", "#FFFF00", "#FF6600"]

# Draw multiple neon circles
for _ in range(30):
    x = random.randint(-300, 300)
    y = random.randint(-300, 300)
    size = random.randint(30, 120)
    color = random.choice(neon_colors)
    
    # Draw glow effect
    for i in range(3, 0, -1):
        t.penup()
        t.goto(x, y - size - i * 5)
        t.pendown()
        t.pensize(i * 2)
        t.color(color)
        t.circle(size + i * 5)
    
    # Draw solid circle
    t.penup()
    t.goto(x, y - size)
    t.pendown()
    t.fillcolor(color)
    t.begin_fill()
    t.circle(size)
    t.end_fill()

screen.update()
turtle.done()`
},

{
  title: "Turtle Wave Pattern",
  category: "turtle",
  description: "Generate smooth sine wave patterns with multiple frequencies and colors.",
  tags: ["turtle", "waves", "mathematics"],
  difficulty: 2,
  lines: "~40 lines",
  code: `import turtle
import math

screen = turtle.Screen()
screen.bgcolor("black")
screen.setup(900, 600)

t = turtle.Turtle()
t.speed(0)
t.hideturtle()

# Draw multiple wave patterns
colors = ["#FF0080", "#0080FF", "#00FF80", "#FF8000", "#8000FF"]
amplitudes = [50, 40, 60, 45, 55]
frequencies = [1, 1.5, 2, 2.5, 3]

for wave_num in range(5):
    t.penup()
    t.goto(-400, 0)
    t.pendown()
    
    t.color(colors[wave_num])
    t.pensize(3)
    
    amplitude = amplitudes[wave_num]
    frequency = frequencies[wave_num]
    
    # Draw wave
    for x in range(-400, 400, 2):
        angle = (x + 400) * frequency * 0.02
        y = amplitude * math.sin(angle) + wave_num * 20 - 50
        t.goto(x, y)

# Add decorative dots at peaks
t.penup()
for wave_num in range(5):
    for peak in range(8):
        x = -300 + peak * 100
        angle = (x + 400) * frequencies[wave_num] * 0.02
        y = amplitudes[wave_num] * math.sin(angle) + wave_num * 20 - 50
        t.goto(x, y)
        t.dot(8, colors[wave_num])

turtle.done()`
  },
  {
  title: "Turtle Hypnotic Spiral",
  category: "turtle",
  description: "Create a mesmerizing hypnotic spiral with alternating colors and expanding radius.",
  tags: ["turtle", "spiral", "hypnotic"],
  difficulty: 2,
  lines: "~35 lines",
  code: `import turtle
import math

screen = turtle.Screen()
screen.bgcolor("black")
screen.setup(800, 800)

t = turtle.Turtle()
t.speed(0)
t.hideturtle()

# Hypnotic spiral
colors = ["#FF0066", "#00FF66", "#6600FF", "#FFFF00", "#00FFFF"]
angle = 0

for i in range(200):
    color_index = i % len(colors)
    t.color(colors[color_index])
    t.width(3)
    
    # Calculate spiral position
    radius = i * 1.5
    angle += 15
    
    x = radius * math.cos(math.radians(angle))
    y = radius * math.sin(math.radians(angle))
    
    if i == 0:
        t.penup()
        t.goto(x, y)
        t.pendown()
    else:
        t.goto(x, y)
    
    # Draw small circle at each point
    t.dot(10)

turtle.done()`
},

{
  title: "Turtle Star Field",
  category: "turtle",
  description: "Generate a beautiful star field with twinkling stars of various sizes.",
  tags: ["turtle", "stars", "space"],
  difficulty: 2,
  lines: "~40 lines",
  code: `import turtle
import random

screen = turtle.Screen()
screen.bgcolor("black")
screen.setup(900, 700)
screen.tracer(0)

t = turtle.Turtle()
t.speed(0)
t.hideturtle()
t.color("white")

# Draw stars
for _ in range(150):
    x = random.randint(-400, 400)
    y = random.randint(-300, 300)
    size = random.randint(1, 4)
    
    t.penup()
    t.goto(x, y)
    t.pendown()
    
    # Random brightness
    brightness = random.randint(100, 255)
    t.color((brightness/255, brightness/255, brightness/255))
    
    if size > 2:
        # Draw star shape for bigger stars
        for _ in range(5):
            t.forward(size * 3)
            t.right(144)
    else:
        # Just a dot for small stars
        t.dot(size * 2)

# Add some colorful nebula stars
nebula_colors = ["#FF69B4", "#87CEEB", "#9370DB", "#FFD700"]
for _ in range(20):
    x = random.randint(-400, 400)
    y = random.randint(-300, 300)
    t.penup()
    t.goto(x, y)
    t.dot(random.randint(8, 15), random.choice(nebula_colors))

screen.update()
turtle.done()`
},

{
  title: "Turtle Geometric Rose",
  category: "turtle",
  description: "Draw a mathematical rose curve with customizable petals and colors.",
  tags: ["turtle", "mathematics", "flowers"],
  difficulty: 3,
  lines: "~45 lines",
  code: `import turtle
import math

screen = turtle.Screen()
screen.bgcolor("black")
screen.setup(800, 800)

t = turtle.Turtle()
t.speed(0)
t.hideturtle()

def draw_rose(n, d, size, colors):
    """Draw a rose curve with n/d petals"""
    t.penup()
    t.goto(0, 0)
    t.pendown()
    
    for i in range(360 * d):
        angle = math.radians(i)
        k = n / d
        r = size * math.cos(k * angle)
        
        x = r * math.cos(angle)
        y = r * math.sin(angle)
        
        # Change color gradually
        color_idx = int((i / (360 * d)) * len(colors))
        t.color(colors[color_idx % len(colors)])
        t.goto(x, y)

# Draw rose with 7 petals
colors = ["#FF1493", "#FF69B4", "#FFB6C1", "#FFC0CB", "#FF69B4", "#FF1493"]
t.pensize(2)
draw_rose(7, 1, 200, colors)

# Add center decoration
t.penup()
t.goto(0, -20)
t.pendown()
t.fillcolor("#FFD700")
t.begin_fill()
t.circle(20)
t.end_fill()

turtle.done()`
},

{
  title: "Turtle Pixel Art",
  category: "turtle",
  description: "Create retro pixel art patterns with colored squares in a grid.",
  tags: ["turtle", "pixel", "retro"],
  difficulty: 2,
  lines: "~45 lines",
  code: `import turtle
import random

screen = turtle.Screen()
screen.bgcolor("black")
screen.setup(800, 800)
screen.tracer(0)

t = turtle.Turtle()
t.speed(0)
t.hideturtle()

# Pixel size
pixel_size = 20
grid_size = 20

# Retro color palette
colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", 
          "#FF00FF", "#00FFFF", "#FFA500", "#800080"]

# Draw pixel grid
start_x = -(grid_size * pixel_size) / 2
start_y = (grid_size * pixel_size) / 2

for row in range(grid_size):
    for col in range(grid_size):
        # Random chance to draw a pixel
        if random.random() < 0.4:
            x = start_x + col * pixel_size
            y = start_y - row * pixel_size
            
            t.penup()
            t.goto(x, y)
            t.pendown()
            
            # Draw pixel
            color = random.choice(colors)
            t.fillcolor(color)
            t.begin_fill()
            for _ in range(4):
                t.forward(pixel_size)
                t.right(90)
            t.end_fill()

# Add border
t.penup()
t.goto(start_x - 5, start_y + 5)
t.pendown()
t.color("white")
t.pensize(3)
for _ in range(4):
    t.forward(grid_size * pixel_size + 10)
    t.right(90)

screen.update()
turtle.done()`
},

{
  title: "Turtle Lightning Bolt",
  category: "turtle",
  description: "Generate random lightning bolt effects with branching patterns.",
  tags: ["turtle", "effects", "random"],
  difficulty: 3,
  lines: "~50 lines",
  code: `import turtle
import random

screen = turtle.Screen()
screen.bgcolor("midnightblue")
screen.setup(800, 800)
screen.tracer(0)

t = turtle.Turtle()
t.speed(0)
t.hideturtle()

def draw_lightning(x, y, length, angle, branches=2):
    """Recursively draw lightning bolt"""
    if length < 10:
        return
    
    t.penup()
    t.goto(x, y)
    t.setheading(angle)
    t.pendown()
    
    # Draw main bolt segment
    segments = random.randint(3, 6)
    for _ in range(segments):
        t.color("yellow" if random.random() > 0.3 else "white")
        t.pensize(max(1, int(length / 20)))
        
        segment_length = length / segments
        jitter = random.randint(-20, 20)
        t.setheading(angle + jitter)
        t.forward(segment_length)
        
        # Chance to create branch
        if random.random() < 0.3 and branches > 0:
            current_x, current_y = t.pos()
            branch_angle = angle + random.randint(-45, 45)
            draw_lightning(current_x, current_y, 
                         length * 0.6, branch_angle, branches - 1)

# Draw multiple lightning bolts
for _ in range(5):
    start_x = random.randint(-300, 300)
    start_y = 350
    draw_lightning(start_x, start_y, random.randint(150, 250), 
                  270 + random.randint(-30, 30), branches=3)

# Add glow effect around bolts
t.penup()
for _ in range(30):
    x = random.randint(-400, 400)
    y = random.randint(-300, 350)
    t.goto(x, y)
    t.dot(random.randint(3, 8), "lightyellow")

screen.update()
turtle.done()`
},

{
  title: "Turtle Hexagon Tessellation",
  category: "turtle",
  description: "Create a honeycomb pattern with colored hexagons in a tessellation.",
  tags: ["turtle", "tessellation", "geometry"],
  difficulty: 3,
  lines: "~55 lines",
  code: `import turtle
import math

screen = turtle.Screen()
screen.bgcolor("black")
screen.setup(900, 700)
screen.tracer(0)

t = turtle.Turtle()
t.speed(0)
t.hideturtle()

def draw_hexagon(size, color):
    """Draw a filled hexagon"""
    t.fillcolor(color)
    t.begin_fill()
    for _ in range(6):
        t.forward(size)
        t.left(60)
    t.end_fill()

# Hexagon size
hex_size = 30

# Color palette
colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", 
          "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E2"]

# Calculate hexagon spacing
h_spacing = hex_size * 1.5
v_spacing = hex_size * math.sqrt(3)

# Draw hexagon grid
rows = 10
cols = 12

for row in range(rows):
    for col in range(cols):
        # Offset every other row
        x = col * h_spacing - 300
        if row % 2 == 1:
            x += h_spacing / 2
        
        y = row * v_spacing - 250
        
        t.penup()
        t.goto(x, y)
        t.setheading(0)
        t.pendown()
        
        # Pick color based on position pattern
        color_idx = (row + col) % len(colors)
        color = colors[color_idx]
        
        t.pensize(2)
        t.pencolor("white")
        draw_hexagon(hex_size, color)

screen.update()
turtle.done()`
},

{
  title: "Turtle Vortex",
  category: "turtle",
  description: "Create a spinning vortex effect with rotating lines and gradients.",
  tags: ["turtle", "vortex", "rotation"],
  difficulty: 2,
  lines: "~40 lines",
  code: `import turtle
import math

screen = turtle.Screen()
screen.bgcolor("black")
screen.setup(800, 800)

t = turtle.Turtle()
t.speed(0)
t.hideturtle()

# Create vortex
num_lines = 100
max_length = 300

for i in range(num_lines):
    # Calculate position on spiral
    angle = i * 13  # Golden-ish angle
    distance = (i / num_lines) * max_length
    
    # Start position
    start_angle = angle
    start_dist = distance * 0.3
    
    start_x = start_dist * math.cos(math.radians(start_angle))
    start_y = start_dist * math.sin(math.radians(start_angle))
    
    # End position
    end_x = distance * math.cos(math.radians(angle))
    end_y = distance * math.sin(math.radians(angle))
    
    # Color gradient
    hue = i / num_lines
    r = int(255 * (1 - hue))
    g = int(255 * hue)
    b = 200
    
    t.penup()
    t.goto(start_x, start_y)
    t.pendown()
    
    t.color((r/255, g/255, b/255))
    t.pensize(2)
    t.goto(end_x, end_y)

# Add center glow
t.penup()
t.goto(0, 0)
for size in range(20, 0, -2):
    t.dot(size, (1, 1, 1, 0.5))

turtle.done()`
},

{
  title: "Turtle DNA Helix",
  category: "turtle",
  description: "Draw a double helix DNA structure with connecting base pairs.",
  tags: ["turtle", "biology", "helix"],
  difficulty: 3,
  lines: "~50 lines",
  code: `import turtle
import math

screen = turtle.Screen()
screen.bgcolor("black")
screen.setup(800, 800)

t = turtle.Turtle()
t.speed(0)
t.hideturtle()

# DNA parameters
amplitude = 100
wavelength = 50
num_turns = 4
height = 600

# Draw DNA helix
base_pair_colors = ["#FF6B9D", "#C44569", "#FFA502", "#F79F1F"]

for i in range(0, height, 5):
    # Calculate position on helix
    angle = (i / wavelength) * 2 * math.pi
    
    # First strand
    x1 = amplitude * math.cos(angle)
    y1 = i - height / 2
    
    # Second strand (180 degrees out of phase)
    x2 = amplitude * math.cos(angle + math.pi)
    y2 = y1
    
    # Draw strands
    t.penup()
    t.goto(x1, y1)
    t.pendown()
    t.dot(8, "#4ECDC4")
    
    t.penup()
    t.goto(x2, y2)
    t.pendown()
    t.dot(8, "#4ECDC4")
    
    # Draw connecting base pairs every 10 units
    if i % 10 == 0:
        color = base_pair_colors[int(i / 10) % len(base_pair_colors)]
        t.penup()
        t.goto(x1, y1)
        t.pendown()
        t.color(color)
        t.pensize(3)
        t.goto(x2, y2)
        
        # Draw base pair markers
        t.penup()
        t.goto((x1 + x2) / 2, y1)
        t.dot(6, color)

turtle.done()`
},

{
  title: "Turtle Concentric Polygons",
  category: "turtle",
  description: "Create mesmerizing patterns with nested polygons of varying sides.",
  tags: ["turtle", "polygons", "patterns"],
  difficulty: 2,
  lines: "~40 lines",
  code: `import turtle

screen = turtle.Screen()
screen.bgcolor("black")
screen.setup(800, 800)

t = turtle.Turtle()
t.speed(0)
t.hideturtle()

def draw_polygon(sides, size, color):
    """Draw a polygon with n sides"""
    angle = 360 / sides
    t.color(color)
    t.pensize(2)
    
    for _ in range(sides):
        t.forward(size)
        t.right(angle)

# Color gradient
colors = ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", 
          "#0000FF", "#4B0082", "#9400D3"]

# Draw multiple nested polygons
for layer in range(15, 0, -1):
    # Vary sides from 3 to 8
    sides = 3 + (layer % 6)
    size = layer * 15
    
    # Position at center
    t.penup()
    start_x = -size / 2
    start_y = -size / 2
    t.goto(start_x, start_y)
    t.pendown()
    
    color = colors[layer % len(colors)]
    draw_polygon(sides, size, color)
    
    # Rotate slightly for next layer
    t.right(10)

turtle.done()`
},

{
  title: "Turtle Aurora Borealis",
  category: "turtle",
  description: "Simulate the Northern Lights with flowing wavy patterns and colors.",
  tags: ["turtle", "waves", "nature"],
  difficulty: 3,
  lines: "~55 lines",
  code: `import turtle
import math
import random

screen = turtle.Screen()
screen.bgcolor("#0a0a2e")
screen.setup(900, 700)
screen.tracer(0)

t = turtle.Turtle()
t.speed(0)
t.hideturtle()

def draw_aurora_wave(y_offset, color, amplitude, frequency):
    """Draw one wave of aurora"""
    t.penup()
    t.goto(-400, y_offset)
    t.pendown()
    
    t.color(color)
    t.pensize(random.randint(3, 6))
    
    for x in range(-400, 400, 3):
        angle = x * frequency * 0.01
        y = y_offset + amplitude * math.sin(angle)
        
        # Add randomness for flickering effect
        y += random.randint(-5, 5)
        
        t.goto(x, y)

# Aurora colors (green, blue, purple, pink)
aurora_colors = [
    "#00ff88", "#00ffaa", "#00ff66",
    "#6666ff", "#8888ff", "#aaaaff",
    "#ff00ff", "#ff66ff", "#ff88ff",
    "#00ffff", "#66ffff"
]

# Draw multiple overlapping waves
for wave in range(15):
    y_base = random.randint(-100, 200)
    amplitude = random.randint(30, 80)
    frequency = random.uniform(0.8, 2.0)
    color = random.choice(aurora_colors)
    
    draw_aurora_wave(y_base, color, amplitude, frequency)

# Add stars in background
t.penup()
for _ in range(100):
    x = random.randint(-400, 400)
    y = random.randint(-300, 300)
    t.goto(x, y)
    size = random.randint(1, 3)
    brightness = random.randint(150, 255)
    t.dot(size, (brightness/255, brightness/255, brightness/255))

screen.update()
turtle.done()`
  },
  {
  title: "Turtle Circular Grid",
  category: "turtle",
  description: "Create a radial grid pattern with circles expanding from center.",
  tags: ["turtle", "circles", "grid"],
  difficulty: 2,
  lines: "~30 lines",
  code: `import turtle

screen = turtle.Screen()
screen.bgcolor("black")
screen.setup(800, 800)

t = turtle.Turtle()
t.speed(0)
t.hideturtle()
t.color("cyan")

# Draw concentric circles
for radius in range(20, 300, 20):
    t.penup()
    t.goto(0, -radius)
    t.pendown()
    t.circle(radius)

# Draw radial lines
for angle in range(0, 360, 15):
    t.penup()
    t.goto(0, 0)
    t.setheading(angle)
    t.pendown()
    t.forward(300)

turtle.done()`
},

{
  title: "Turtle Square Spiral",
  category: "turtle",
  description: "Draw an expanding square spiral with rainbow colors.",
  tags: ["turtle", "spiral", "squares"],
  difficulty: 1,
  lines: "~25 lines",
  code: `import turtle

screen = turtle.Screen()
screen.bgcolor("black")
screen.setup(800, 800)

t = turtle.Turtle()
t.speed(0)
t.hideturtle()

colors = ["red", "orange", "yellow", "green", "cyan", "blue", "purple"]

distance = 0
for i in range(200):
    t.color(colors[i % len(colors)])
    t.forward(distance)
    t.right(90)
    distance += 2

turtle.done()`
},

{
  title: "Turtle Dotted Spiral",
  category: "turtle",
  description: "Create a spiral pattern using dots instead of lines.",
  tags: ["turtle", "dots", "spiral"],
  difficulty: 2,
  lines: "~30 lines",
  code: `import turtle
import math

screen = turtle.Screen()
screen.bgcolor("black")
screen.setup(800, 800)

t = turtle.Turtle()
t.speed(0)
t.hideturtle()

colors = ["#FF1493", "#00CED1", "#FFD700", "#32CD32", "#FF6347"]

for i in range(300):
    angle = i * 10
    radius = i * 0.5
    
    x = radius * math.cos(math.radians(angle))
    y = radius * math.sin(math.radians(angle))
    
    t.penup()
    t.goto(x, y)
    
    color = colors[i % len(colors)]
    size = 8 + (i % 10)
    t.dot(size, color)

turtle.done()`
},

{
  title: "Turtle Pentagon Pattern",
  category: "turtle",
  description: "Draw rotating pentagons creating a flower-like pattern.",
  tags: ["turtle", "pentagons", "patterns"],
  difficulty: 2,
  lines: "~25 lines",
  code: `import turtle

screen = turtle.Screen()
screen.bgcolor("black")
screen.setup(800, 800)

t = turtle.Turtle()
t.speed(0)
t.hideturtle()

colors = ["red", "orange", "yellow", "green", "blue", "purple"]

for i in range(36):
    t.color(colors[i % len(colors)])
    t.pensize(2)
    
    for _ in range(5):
        t.forward(100)
        t.right(72)
    
    t.right(10)

turtle.done()`
},

{
  title: "Turtle Checkerboard",
  category: "turtle",
  description: "Create a colorful checkerboard pattern with alternating squares.",
  tags: ["turtle", "grid", "pattern"],
  difficulty: 2,
  lines: "~40 lines",
  code: `import turtle

screen = turtle.Screen()
screen.bgcolor("white")
screen.setup(800, 800)
screen.tracer(0)

t = turtle.Turtle()
t.speed(0)
t.hideturtle()

square_size = 50
rows = 10
cols = 10

colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8"]

start_x = -250
start_y = 250

for row in range(rows):
    for col in range(cols):
        x = start_x + col * square_size
        y = start_y - row * square_size
        
        t.penup()
        t.goto(x, y)
        t.pendown()
        
        # Checkerboard pattern
        if (row + col) % 2 == 0:
            t.fillcolor(colors[(row + col) % len(colors)])
        else:
            t.fillcolor("white")
        
        t.begin_fill()
        for _ in range(4):
            t.forward(square_size)
            t.right(90)
        t.end_fill()

screen.update()
turtle.done()`
},

{
  title: "Turtle Triangle Spiral",
  category: "turtle",
  description: "Create a spiral made of expanding triangles.",
  tags: ["turtle", "triangles", "spiral"],
  difficulty: 2,
  lines: "~25 lines",
  code: `import turtle

screen = turtle.Screen()
screen.bgcolor("black")
screen.setup(800, 800)

t = turtle.Turtle()
t.speed(0)
t.hideturtle()

colors = ["red", "blue", "green", "yellow", "orange", "purple", "pink"]

size = 10
for i in range(100):
    t.color(colors[i % len(colors)])
    t.pensize(2)
    
    for _ in range(3):
        t.forward(size)
        t.left(120)
    
    t.right(5)
    size += 2

turtle.done()`
},

{
  title: "Turtle Color Wheel",
  category: "turtle",
  description: "Draw a color wheel showing gradual color transitions.",
  tags: ["turtle", "colors", "circle"],
  difficulty: 2,
  lines: "~35 lines",
  code: `import turtle

screen = turtle.Screen()
screen.bgcolor("black")
screen.setup(800, 800)
screen.tracer(0)

t = turtle.Turtle()
t.speed(0)
t.hideturtle()

# Draw color wheel segments
num_segments = 36

for i in range(num_segments):
    angle = i * 10
    
    # Calculate RGB values for rainbow effect
    hue = i / num_segments
    
    if hue < 1/6:
        r, g, b = 1, hue * 6, 0
    elif hue < 2/6:
        r, g, b = 2 - hue * 6, 1, 0
    elif hue < 3/6:
        r, g, b = 0, 1, hue * 6 - 2
    elif hue < 4/6:
        r, g, b = 0, 4 - hue * 6, 1
    elif hue < 5/6:
        r, g, b = hue * 6 - 4, 0, 1
    else:
        r, g, b = 1, 0, 6 - hue * 6
    
    t.color((r, g, b))
    t.fillcolor((r, g, b))
    
    t.penup()
    t.goto(0, 0)
    t.setheading(angle)
    t.pendown()
    
    t.begin_fill()
    t.forward(200)
    t.right(90)
    t.circle(200, 10)
    t.goto(0, 0)
    t.end_fill()

screen.update()
turtle.done()`
},

{
  title: "Turtle Starburst",
  category: "turtle",
  description: "Create a starburst effect with radiating lines.",
  tags: ["turtle", "lines", "radial"],
  difficulty: 1,
  lines: "~25 lines",
  code: `import turtle

screen = turtle.Screen()
screen.bgcolor("black")
screen.setup(800, 800)

t = turtle.Turtle()
t.speed(0)
t.hideturtle()

colors = ["#FF1493", "#00FFFF", "#FFD700", "#00FF00", "#FF6347"]

for i in range(72):
    t.color(colors[i % len(colors)])
    t.pensize(2)
    
    t.penup()
    t.goto(0, 0)
    t.setheading(i * 5)
    t.pendown()
    
    t.forward(250)
    t.dot(10)

turtle.done()`
},

{
  title: "Turtle Crosshatch",
  category: "turtle",
  description: "Create a crosshatch shading pattern with intersecting lines.",
  tags: ["turtle", "lines", "pattern"],
  difficulty: 2,
  lines: "~35 lines",
  code: `import turtle

screen = turtle.Screen()
screen.bgcolor("black")
screen.setup(800, 800)
screen.tracer(0)

t = turtle.Turtle()
t.speed(0)
t.hideturtle()
t.color("cyan")

# Draw horizontal lines
spacing = 20
for y in range(-300, 301, spacing):
    t.penup()
    t.goto(-300, y)
    t.pendown()
    t.goto(300, y)

# Draw vertical lines
for x in range(-300, 301, spacing):
    t.penup()
    t.goto(x, -300)
    t.pendown()
    t.goto(x, 300)

# Draw diagonal lines (right)
t.color("magenta")
for start in range(-600, 601, spacing):
    t.penup()
    t.goto(start, -300)
    t.setheading(45)
    t.pendown()
    t.forward(850)

# Draw diagonal lines (left)
t.color("yellow")
for start in range(-600, 601, spacing):
    t.penup()
    t.goto(start, -300)
    t.setheading(135)
    t.pendown()
    t.forward(850)

screen.update()
turtle.done()`
},

{
  title: "Turtle Circular Flowers",
  category: "turtle",
  description: "Draw multiple flowers made from circles arranged in patterns.",
  tags: ["turtle", "circles", "flowers"],
  difficulty: 2,
  lines: "~35 lines",
  code: `import turtle

screen = turtle.Screen()
screen.bgcolor("black")
screen.setup(800, 800)
screen.tracer(0)

t = turtle.Turtle()
t.speed(0)
t.hideturtle()

def draw_flower(x, y, petal_color, center_color):
    # Draw petals
    for angle in range(0, 360, 45):
        t.penup()
        t.goto(x, y)
        t.setheading(angle)
        t.forward(30)
        t.pendown()
        
        t.fillcolor(petal_color)
        t.begin_fill()
        t.circle(20)
        t.end_fill()
    
    # Draw center
    t.penup()
    t.goto(x, y - 15)
    t.pendown()
    t.fillcolor(center_color)
    t.begin_fill()
    t.circle(15)
    t.end_fill()

# Draw multiple flowers
positions = [(-150, 150), (150, 150), (0, 0), (-150, -150), (150, -150)]
petal_colors = ["#FF69B4", "#87CEEB", "#FFD700", "#98FB98", "#DDA0DD"]
center_colors = ["#FFD700", "#FF1493", "#FF6347", "#FFD700", "#FF1493"]

for i, (x, y) in enumerate(positions):
    draw_flower(x, y, petal_colors[i], center_colors[i])

screen.update()
turtle.done()`
},

{
  title: "Turtle Zigzag Pattern",
  category: "turtle",
  description: "Create a zigzag lightning bolt pattern with multiple colors.",
  tags: ["turtle", "zigzag", "pattern"],
  difficulty: 2,
  lines: "~30 lines",
  code: `import turtle

screen = turtle.Screen()
screen.bgcolor("black")
screen.setup(800, 800)

t = turtle.Turtle()
t.speed(0)
t.hideturtle()

colors = ["red", "orange", "yellow", "green", "cyan", "blue", "purple"]

t.pensize(3)
t.penup()
t.goto(-300, 200)
t.pendown()

segment_length = 50
direction = 1

for i in range(30):
    t.color(colors[i % len(colors)])
    
    t.forward(segment_length)
    
    if direction == 1:
        t.right(120)
    else:
        t.left(120)
    
    direction *= -1
    
    t.forward(segment_length)

turtle.done()`
},

{
  title: "Turtle Nested Squares",
  category: "turtle",
  description: "Draw rotating nested squares creating a tunnel effect.",
  tags: ["turtle", "squares", "rotation"],
  difficulty: 2,
  lines: "~25 lines",
  code: `import turtle

screen = turtle.Screen()
screen.bgcolor("black")
screen.setup(800, 800)

t = turtle.Turtle()
t.speed(0)
t.hideturtle()

colors = ["red", "orange", "yellow", "green", "cyan", "blue", "purple"]

size = 300
for i in range(30):
    t.color(colors[i % len(colors)])
    t.pensize(2)
    
    for _ in range(4):
        t.forward(size)
        t.right(90)
    
    t.right(6)
    size -= 10

turtle.done()`
},

{
  title: "Turtle Bubble Pattern",
  category: "turtle",
  description: "Create a pattern of overlapping colorful bubbles.",
  tags: ["turtle", "circles", "bubbles"],
  difficulty: 2,
  lines: "~35 lines",
  code: `import turtle
import random

screen = turtle.Screen()
screen.bgcolor("black")
screen.setup(800, 800)
screen.tracer(0)

t = turtle.Turtle()
t.speed(0)
t.hideturtle()

colors = ["#FF6B9D", "#C44569", "#4ECDC4", "#95E1D3", 
          "#F8B500", "#6C5CE7", "#A29BFE", "#FD79A8"]

# Draw bubbles
for _ in range(50):
    x = random.randint(-350, 350)
    y = random.randint(-350, 350)
    size = random.randint(20, 80)
    
    t.penup()
    t.goto(x, y - size)
    t.pendown()
    
    color = random.choice(colors)
    t.color(color)
    t.pensize(3)
    t.circle(size)
    
    # Add highlight
    t.penup()
    t.goto(x - size//3, y + size//3)
    t.pendown()
    t.color("white")
    t.dot(size//4)

screen.update()
turtle.done()`
},

{
  title: "Turtle Diamond Grid",
  category: "turtle",
  description: "Create a grid of diamond shapes with alternating colors.",
  tags: ["turtle", "diamonds", "grid"],
  difficulty: 2,
  lines: "~40 lines",
  code: `import turtle

screen = turtle.Screen()
screen.bgcolor("black")
screen.setup(800, 800)
screen.tracer(0)

t = turtle.Turtle()
t.speed(0)
t.hideturtle()

def draw_diamond(x, y, size, color):
    t.penup()
    t.goto(x, y)
    t.setheading(0)
    t.pendown()
    
    t.fillcolor(color)
    t.begin_fill()
    for _ in range(4):
        t.forward(size)
        t.left(90)
        t.forward(size)
        t.left(90)
        t.forward(size)
        t.right(90)
        t.forward(size)
        t.right(90)
    t.end_fill()

colors = ["#FF1493", "#00CED1", "#FFD700", "#32CD32"]

size = 40
rows = 6
cols = 6

for row in range(rows):
    for col in range(cols):
        x = -150 + col * size * 1.5
        y = 150 - row * size * 1.5
        
        color = colors[(row + col) % len(colors)]
        
        t.penup()
        t.goto(x, y)
        t.setheading(45)
        t.pendown()
        
        t.fillcolor(color)
        t.begin_fill()
        for _ in range(4):
            t.forward(size)
            t.right(90)
        t.end_fill()

screen.update()
turtle.done()`
},

{
  title: "Turtle Sunburst",
  category: "turtle",
  description: "Create a sunburst pattern with triangular rays.",
  tags: ["turtle", "rays", "sun"],
  difficulty: 2,
  lines: "~35 lines",
  code: `import turtle

screen = turtle.Screen()
screen.bgcolor("black")
screen.setup(800, 800)
screen.tracer(0)

t = turtle.Turtle()
t.speed(0)
t.hideturtle()

# Draw rays
num_rays = 24
colors = ["#FFD700", "#FFA500", "#FF8C00"]

for i in range(num_rays):
    angle = i * (360 / num_rays)
    
    t.penup()
    t.goto(0, 0)
    t.setheading(angle)
    t.pendown()
    
    color = colors[i % len(colors)]
    t.fillcolor(color)
    t.begin_fill()
    
    t.forward(200)
    t.right(150)
    t.forward(80)
    t.goto(0, 0)
    
    t.end_fill()

# Draw center circle
t.penup()
t.goto(0, -50)
t.pendown()
t.fillcolor("#FFD700")
t.begin_fill()
t.circle(50)
t.end_fill()

screen.update()
turtle.done()`
  
  },
  {
    title: "Turtle Mandala Creator",
    category: "turtle",
    description: "Draw intricate mandala patterns with perfect symmetry, 5 styles, and 8 color schemes.",
    tags: ["turtle", "geometry", "patterns"],
    difficulty: 3,
    lines: "~450 lines",
    code: `"""
Turtle Mandala Creator
Draw intricate mandala patterns with perfect symmetry and beautiful colors!
"""

import turtle
import random
import math

# Configuration
SCREEN_WIDTH = 1000
SCREEN_HEIGHT = 1000
BACKGROUND_COLOR = "#0a0a1a"

# Color palettes
COLOR_SCHEMES = {
    "rainbow": ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#9400D3"],
    "ocean": ["#006994", "#0099cc", "#66cccc", "#99ffff", "#00ccff", "#3399ff"],
    "fire": ["#FF0000", "#FF4500", "#FF6347", "#FF7F50", "#FFA500", "#FFD700"],
    "purple": ["#9400D3", "#8B008B", "#BA55D3", "#DA70D6", "#EE82EE", "#DDA0DD"],
    "mint": ["#00FF7F", "#00FA9A", "#7FFFD4", "#40E0D0", "#48D1CC", "#00CED1"],
    "sunset": ["#FF6B6B", "#FFA07A", "#FFD700", "#FF8C00", "#FF4500", "#DC143C"],
    "cool": ["#4169E1", "#1E90FF", "#00BFFF", "#87CEEB", "#B0C4DE", "#ADD8E6"],
    "warm": ["#FF69B4", "#FF1493", "#FF00FF", "#BA55D3", "#9370DB", "#8A2BE2"]
}

# Mandala patterns
MANDALA_PATTERNS = {
    "flower": {
        "petals": 12,
        "layers": 3,
        "shapes": ["circle", "petal"]
    },
    "star": {
        "points": 8,
        "layers": 4,
        "shapes": ["triangle", "star"]
    },
    "geometric": {
        "sides": 6,
        "layers": 5,
        "shapes": ["hexagon", "circle"]
    },
    "lotus": {
        "petals": 16,
        "layers": 4,
        "shapes": ["petal", "circle"]
    },
    "spiral": {
        "segments": 36,
        "layers": 3,
        "shapes": ["spiral", "circle"]
    }
}


class MandalaCreator:
    """Interactive mandala pattern generator"""
    
    def __init__(self):
        self.screen = turtle.Screen()
        self.screen.setup(SCREEN_WIDTH, SCREEN_HEIGHT)
        self.screen.bgcolor(BACKGROUND_COLOR)
        self.screen.title("🌸 Mandala Creator")
        self.screen.tracer(0)
        
        self.drawer = turtle.Turtle()
        self.drawer.speed(0)
        self.drawer.hideturtle()
        
        self.current_scheme = "rainbow"
        self.current_pattern = "flower"
        self.symmetry = 12
        
        self.setup_ui()
        self.setup_controls()
    
    def setup_ui(self):
        """Create UI elements"""
        self.title_text = turtle.Turtle()
        self.title_text.hideturtle()
        self.title_text.penup()
        self.title_text.color("white")
        self.title_text.goto(0, SCREEN_HEIGHT // 2 - 60)
        self.title_text.write("🌸 MANDALA CREATOR", 
                             align="center", 
                             font=("Arial", 28, "bold"))
        
        self.info_text = turtle.Turtle()
        self.info_text.hideturtle()
        self.info_text.penup()
        self.info_text.color("#aaaaaa")
        self.info_text.goto(0, -SCREEN_HEIGHT // 2 + 50)
        self.update_info()
        
        controls = turtle.Turtle()
        controls.hideturtle()
        controls.penup()
        controls.color("#888888")
        controls.goto(0, -SCREEN_HEIGHT // 2 + 25)
        controls.write("1-5=Pattern | C=Color | +/-=Symmetry | S=Save | Q=Quit", 
                      align="center", font=("Arial", 12, "normal"))
    
    def update_info(self):
        """Update info display"""
        self.info_text.clear()
        info = f"Pattern: {self.current_pattern.upper()} | Colors: {self.current_scheme.upper()} | Symmetry: {self.symmetry}"
        self.info_text.write(info, align="center", font=("Arial", 14, "bold"))
    
    def draw_petal(self, size):
        """Draw a single petal shape"""
        self.drawer.circle(size, 60)
        self.drawer.left(120)
        self.drawer.circle(size, 60)
        self.drawer.left(120)
    
    def draw_star_point(self, size):
        """Draw a star point"""
        for _ in range(2):
            self.drawer.forward(size)
            self.drawer.right(144)
    
    def draw_circle_layer(self, radius):
        """Draw a circular layer"""
        self.drawer.penup()
        self.drawer.goto(0, -radius)
        self.drawer.pendown()
        self.drawer.circle(radius)
        self.drawer.penup()
        self.drawer.goto(0, 0)
        self.drawer.pendown()
    
    def draw_polygon(self, sides, size):
        """Draw a regular polygon"""
        angle = 360 / sides
        for _ in range(sides):
            self.drawer.forward(size)
            self.drawer.right(angle)
    
    def draw_mandala_layer(self, pattern_type, layer_num, total_layers):
        """Draw a single layer of the mandala"""
        colors = COLOR_SCHEMES[self.current_scheme]
        angle_step = 360 / self.symmetry
        
        # Size decreases for inner layers
        size_factor = 1 - (layer_num * 0.2)
        base_size = 80 * size_factor
        
        for i in range(self.symmetry):
            # Set color
            color_index = (i + layer_num) % len(colors)
            self.drawer.color(colors[color_index])
            
            # Position for this segment
            self.drawer.penup()
            self.drawer.home()
            self.drawer.setheading(angle_step * i)
            self.drawer.pendown()
            
            if pattern_type == "flower":
                self.draw_petal(base_size)
            elif pattern_type == "star":
                self.draw_star_point(base_size)
            elif pattern_type == "geometric":
                self.drawer.forward(base_size * 0.5)
                self.draw_polygon(6, base_size * 0.5)
            elif pattern_type == "lotus":
                self.draw_petal(base_size * 1.2)
            elif pattern_type == "spiral":
                for j in range(10):
                    self.drawer.forward(j * 3)
                    self.drawer.right(30)
    
    def draw_decorative_circles(self, num_circles):
        """Draw decorative concentric circles"""
        colors = COLOR_SCHEMES[self.current_scheme]
        
        for i in range(num_circles):
            self.drawer.color(colors[i % len(colors)])
            radius = 50 + (i * 40)
            self.drawer.pensize(2)
            self.draw_circle_layer(radius)
    
    def draw_center_ornament(self):
        """Draw ornamental center piece"""
        colors = COLOR_SCHEMES[self.current_scheme]
        
        # Draw center circle
        self.drawer.color(colors[0])
        self.drawer.pensize(3)
        self.drawer.penup()
        self.drawer.goto(0, -20)
        self.drawer.pendown()
        self.drawer.fillcolor(colors[0])
        self.drawer.begin_fill()
        self.drawer.circle(20)
        self.drawer.end_fill()
        
        # Draw radiating dots
        self.drawer.penup()
        for i in range(12):
            angle = (360 / 12) * i
            x = 35 * math.cos(math.radians(angle))
            y = 35 * math.sin(math.radians(angle))
            self.drawer.goto(x, y)
            self.drawer.dot(8, colors[(i + 1) % len(colors)])
        
        self.drawer.goto(0, 0)
    
    def generate_mandala(self, pattern_type):
        """Generate complete mandala pattern"""
        self.clear_canvas()
        
        pattern_info = MANDALA_PATTERNS[pattern_type]
        layers = pattern_info["layers"]
        
        # Draw decorative circles
        self.draw_decorative_circles(4)
        
        # Draw mandala layers from outside to inside
        for layer in range(layers):
            self.draw_mandala_layer(pattern_type, layer, layers)
            self.screen.update()
        
        # Draw center ornament
        self.draw_center_ornament()
        
        self.screen.update()
    
    def pattern_1(self):
        """Flower mandala"""
        self.current_pattern = "flower"
        self.symmetry = 12
        self.update_info()
        self.generate_mandala("flower")
    
    def pattern_2(self):
        """Star mandala"""
        self.current_pattern = "star"
        self.symmetry = 8
        self.update_info()
        self.generate_mandala("star")
    
    def pattern_3(self):
        """Geometric mandala"""
        self.current_pattern = "geometric"
        self.symmetry = 6
        self.update_info()
        self.generate_mandala("geometric")
    
    def pattern_4(self):
        """Lotus mandala"""
        self.current_pattern = "lotus"
        self.symmetry = 16
        self.update_info()
        self.generate_mandala("lotus")
    
    def pattern_5(self):
        """Spiral mandala"""
        self.current_pattern = "spiral"
        self.symmetry = 36
        self.update_info()
        self.generate_mandala("spiral")
    
    def cycle_colors(self):
        """Cycle through color schemes"""
        schemes = list(COLOR_SCHEMES.keys())
        current_index = schemes.index(self.current_scheme)
        next_index = (current_index + 1) % len(schemes)
        self.current_scheme = schemes[next_index]
        self.update_info()
        self.generate_mandala(self.current_pattern)
    
    def increase_symmetry(self):
        """Increase symmetry level"""
        self.symmetry = min(72, self.symmetry + 4)
        self.update_info()
        self.generate_mandala(self.current_pattern)
    
    def decrease_symmetry(self):
        """Decrease symmetry level"""
        self.symmetry = max(4, self.symmetry - 4)
        self.update_info()
        self.generate_mandala(self.current_pattern)
    
    def save_mandala(self):
        """Save the mandala as an image"""
        filename = f"mandala_{self.current_pattern}_{self.current_scheme}.eps"
        self.screen.getcanvas().postscript(file=filename)
        print(f"Mandala saved as {filename}")
    
    def clear_canvas(self):
        """Clear the drawing"""
        self.drawer.clear()
        self.title_text.clear()
        self.title_text.write("🌸 MANDALA CREATOR", 
                             align="center", 
                             font=("Arial", 28, "bold"))
    
    def setup_controls(self):
        """Setup keyboard controls"""
        self.screen.listen()
        self.screen.onkey(self.pattern_1, "1")
        self.screen.onkey(self.pattern_2, "2")
        self.screen.onkey(self.pattern_3, "3")
        self.screen.onkey(self.pattern_4, "4")
        self.screen.onkey(self.pattern_5, "5")
        self.screen.onkey(self.cycle_colors, "c")
        self.screen.onkey(self.increase_symmetry, "plus")
        self.screen.onkey(self.increase_symmetry, "equal")
        self.screen.onkey(self.decrease_symmetry, "minus")
        self.screen.onkey(self.save_mandala, "s")
        self.screen.onkey(self.clear_canvas, "x")
        self.screen.onkey(self.quit_app, "q")
    
    def quit_app(self):
        """Close the application"""
        self.screen.bye()
    
    def start(self):
        """Start the application"""
        print("\\n" + "="*60)
        print("🌸 MANDALA CREATOR")
        print("="*60)
        print("\\nControls:")
        print("  1 - Flower Mandala")
        print("  2 - Star Mandala")
        print("  3 - Geometric Mandala")
        print("  4 - Lotus Mandala")
        print("  5 - Spiral Mandala")
        print("  C - Cycle Color Scheme")
        print("  + - Increase Symmetry")
        print("  - - Decrease Symmetry")
        print("  S - Save Mandala")
        print("  X - Clear Canvas")
        print("  Q - Quit")
        print("\\nColor Schemes:")
        for scheme in COLOR_SCHEMES.keys():
            print(f"  • {scheme.capitalize()}")
        print("\\n" + "="*60)
        
        # Generate initial mandala
        self.pattern_1()
        
        self.screen.mainloop()


def main():
    """Main entry point"""
    try:
        app = MandalaCreator()
        app.start()
    except turtle.Terminator:
        print("\\nMandala Creator closed. Namaste! 🌸")
    except Exception as e:
        print(f"\\nAn error occurred: {e}")


if __name__ == "__main__":
    main()`
  },
  {
    title: "Turtle Snake Game",
    category: "turtle",
    description: "Classic snake game with levels, power-ups, and smooth controls.",
    tags: ["turtle", "game", "arcade"],
    difficulty: 3,
    lines: "~450 lines",
    code: `"""
Turtle Snake Game
Classic snake game with score tracking, levels, and power-ups!
"""

import turtle
import random
import time

# Game Configuration
SCREEN_WIDTH = 700
SCREEN_HEIGHT = 700
GRID_SIZE = 20
INITIAL_SPEED = 0.15
SPEED_INCREMENT = 0.01
MIN_SPEED = 0.05

# Colors
BG_COLOR = "#1a1a2e"
SNAKE_HEAD_COLOR = "#00ff41"
SNAKE_BODY_COLOR = "#00cc33"
FOOD_COLOR = "#ff3838"
WALL_COLOR = "#ffffff"
POWER_UP_COLOR = "#ffd700"


class SnakeGame:
    """Main snake game class"""
    
    def __init__(self):
        # Setup screen
        self.screen = turtle.Screen()
        self.screen.setup(SCREEN_WIDTH, SCREEN_HEIGHT)
        self.screen.bgcolor(BG_COLOR)
        self.screen.title("🐍 Snake Game")
        self.screen.tracer(0)
        
        # Game state
        self.snake = [(0, 0)]
        self.direction = "stop"
        self.next_direction = "stop"
        self.food = None
        self.power_up = None
        self.score = 0
        self.high_score = 0
        self.level = 1
        self.speed = INITIAL_SPEED
        self.running = True
        self.paused = False
        
        # Create turtles
        self.drawer = turtle.Turtle()
        self.drawer.hideturtle()
        self.drawer.speed(0)
        self.drawer.penup()
        
        self.score_display = turtle.Turtle()
        self.score_display.hideturtle()
        self.score_display.penup()
        self.score_display.color("white")
        self.score_display.goto(0, SCREEN_HEIGHT // 2 - 50)
        
        # Setup
        self.draw_border()
        self.spawn_food()
        self.setup_controls()
        self.update_score()
    
    def draw_border(self):
        """Draw game border"""
        border = turtle.Turtle()
        border.hideturtle()
        border.speed(0)
        border.color(WALL_COLOR)
        border.penup()
        border.goto(-SCREEN_WIDTH // 2 + 30, -SCREEN_HEIGHT // 2 + 30)
        border.pendown()
        border.pensize(3)
        
        for _ in range(4):
            border.forward(SCREEN_WIDTH - 60)
            border.left(90)
    
    def spawn_food(self):
        """Spawn food at random position"""
        max_x = (SCREEN_WIDTH // 2 - 50) // GRID_SIZE * GRID_SIZE
        max_y = (SCREEN_HEIGHT // 2 - 50) // GRID_SIZE * GRID_SIZE
        
        while True:
            x = random.randrange(-max_x, max_x + GRID_SIZE, GRID_SIZE)
            y = random.randrange(-max_y, max_y + GRID_SIZE, GRID_SIZE)
            if (x, y) not in self.snake:
                self.food = (x, y)
                break
    
    def spawn_power_up(self):
        """Spawn power-up at random position"""
        if random.random() < 0.3:  # 30% chance
            max_x = (SCREEN_WIDTH // 2 - 50) // GRID_SIZE * GRID_SIZE
            max_y = (SCREEN_HEIGHT // 2 - 50) // GRID_SIZE * GRID_SIZE
            
            while True:
                x = random.randrange(-max_x, max_x + GRID_SIZE, GRID_SIZE)
                y = random.randrange(-max_y, max_y + GRID_SIZE, GRID_SIZE)
                if (x, y) not in self.snake and (x, y) != self.food:
                    self.power_up = (x, y)
                    break
    
    def move_snake(self):
        """Move snake in current direction"""
        if self.direction == "stop":
            return True
        
        # Update direction (prevents 180-degree turns)
        if self.next_direction == "up" and self.direction != "down":
            self.direction = "up"
        elif self.next_direction == "down" and self.direction != "up":
            self.direction = "down"
        elif self.next_direction == "left" and self.direction != "right":
            self.direction = "left"
        elif self.next_direction == "right" and self.direction != "left":
            self.direction = "right"
        
        # Calculate new head position
        head_x, head_y = self.snake[0]
        
        if self.direction == "up":
            head_y += GRID_SIZE
        elif self.direction == "down":
            head_y -= GRID_SIZE
        elif self.direction == "left":
            head_x -= GRID_SIZE
        elif self.direction == "right":
            head_x += GRID_SIZE
        
        new_head = (head_x, head_y)
        
        # Check wall collision
        max_x = SCREEN_WIDTH // 2 - 50
        max_y = SCREEN_HEIGHT // 2 - 50
        
        if abs(head_x) > max_x or abs(head_y) > max_y:
            return False
        
        # Check self collision
        if new_head in self.snake:
            return False
        
        # Add new head
        self.snake.insert(0, new_head)
        
        # Check food collision
        if new_head == self.food:
            self.score += 10
            self.spawn_food()
            
            # Level up every 50 points
            if self.score % 50 == 0:
                self.level += 1
                self.speed = max(MIN_SPEED, self.speed - SPEED_INCREMENT)
            
            # Chance to spawn power-up
            self.spawn_power_up()
            
            self.update_score()
        # Check power-up collision
        elif self.power_up and new_head == self.power_up:
            self.score += 25
            self.power_up = None
            self.update_score()
        else:
            # Remove tail if no food eaten
            self.snake.pop()
        
        return True
    
    def draw_game(self):
        """Draw all game elements"""
        self.drawer.clear()
        
        # Draw snake body
        for i, (x, y) in enumerate(self.snake):
            self.drawer.goto(x, y)
            
            if i == 0:
                # Head
                self.drawer.color(SNAKE_HEAD_COLOR)
                self.drawer.dot(GRID_SIZE, SNAKE_HEAD_COLOR)
                
                # Draw eyes
                self.drawer.color("black")
                eye_offset = 5
                if self.direction == "up":
                    self.drawer.goto(x - eye_offset, y + eye_offset)
                    self.drawer.dot(4)
                    self.drawer.goto(x + eye_offset, y + eye_offset)
                    self.drawer.dot(4)
                elif self.direction == "down":
                    self.drawer.goto(x - eye_offset, y - eye_offset)
                    self.drawer.dot(4)
                    self.drawer.goto(x + eye_offset, y - eye_offset)
                    self.drawer.dot(4)
                elif self.direction == "left":
                    self.drawer.goto(x - eye_offset, y + eye_offset)
                    self.drawer.dot(4)
                    self.drawer.goto(x - eye_offset, y - eye_offset)
                    self.drawer.dot(4)
                elif self.direction == "right":
                    self.drawer.goto(x + eye_offset, y + eye_offset)
                    self.drawer.dot(4)
                    self.drawer.goto(x + eye_offset, y - eye_offset)
                    self.drawer.dot(4)
            else:
                # Body
                self.drawer.color(SNAKE_BODY_COLOR)
                self.drawer.dot(GRID_SIZE - 2, SNAKE_BODY_COLOR)
        
        # Draw food
        if self.food:
            self.drawer.goto(self.food)
            self.drawer.color(FOOD_COLOR)
            self.drawer.dot(GRID_SIZE - 2, FOOD_COLOR)
        
        # Draw power-up
        if self.power_up:
            self.drawer.goto(self.power_up)
            self.drawer.color(POWER_UP_COLOR)
            self.drawer.dot(GRID_SIZE - 2, POWER_UP_COLOR)
    
    def update_score(self):
        """Update score display"""
        self.score_display.clear()
        
        # Update high score
        if self.score > self.high_score:
            self.high_score = self.score
        
        text = f"Score: {self.score}  |  High Score: {self.high_score}  |  Level: {self.level}  |  Length: {len(self.snake)}"
        self.score_display.write(text, align="center", font=("Arial", 14, "bold"))
    
    def show_game_over(self):
        """Display game over screen"""
        overlay = turtle.Turtle()
        overlay.hideturtle()
        overlay.penup()
        overlay.color("white")
        
        # Game over text
        overlay.goto(0, 50)
        overlay.write("GAME OVER!", align="center", font=("Arial", 36, "bold"))
        
        overlay.goto(0, 0)
        overlay.write(f"Final Score: {self.score}", align="center", font=("Arial", 20, "normal"))
        
        overlay.goto(0, -40)
        overlay.write(f"Level Reached: {self.level}", align="center", font=("Arial", 20, "normal"))
        
        overlay.goto(0, -100)
        overlay.write("Press SPACE to play again or Q to quit", 
                     align="center", font=("Arial", 14, "normal"))
    
    def show_pause_screen(self):
        """Display pause screen"""
        overlay = turtle.Turtle()
        overlay.hideturtle()
        overlay.penup()
        overlay.color("white")
        overlay.goto(0, 0)
        overlay.write("PAUSED", align="center", font=("Arial", 36, "bold"))
        overlay.goto(0, -50)
        overlay.write("Press P to resume", align="center", font=("Arial", 16, "normal"))
    
    def reset_game(self):
        """Reset game to initial state"""
        self.snake = [(0, 0)]
        self.direction = "stop"
        self.next_direction = "stop"
        self.score = 0
        self.level = 1
        self.speed = INITIAL_SPEED
        self.power_up = None
        self.running = True
        self.paused = False
        self.spawn_food()
        self.update_score()
    
    def toggle_pause(self):
        """Toggle pause state"""
        if self.running:
            self.paused = not self.paused
    
    def setup_controls(self):
        """Setup keyboard controls"""
        self.screen.listen()
        self.screen.onkey(lambda: self.set_direction("up"), "w")
        self.screen.onkey(lambda: self.set_direction("up"), "Up")
        self.screen.onkey(lambda: self.set_direction("down"), "s")
        self.screen.onkey(lambda: self.set_direction("down"), "Down")
        self.screen.onkey(lambda: self.set_direction("left"), "a")
        self.screen.onkey(lambda: self.set_direction("left"), "Left")
        self.screen.onkey(lambda: self.set_direction("right"), "d")
        self.screen.onkey(lambda: self.set_direction("right"), "Right")
        self.screen.onkey(self.toggle_pause, "p")
        self.screen.onkey(self.restart, "space")
        self.screen.onkey(self.quit_game, "q")
    
    def set_direction(self, new_direction):
        """Set next direction"""
        if self.direction == "stop":
            self.direction = new_direction
        self.next_direction = new_direction
    
    def restart(self):
        """Restart the game"""
        if not self.running:
            self.reset_game()
            self.run()
    
    def quit_game(self):
        """Quit the game"""
        self.screen.bye()
    
    def run(self):
        """Main game loop"""
        print("\\n" + "="*60)
        print("🐍 SNAKE GAME")
        print("="*60)
        print("\\nControls:")
        print("  W/↑ - Move Up")
        print("  S/↓ - Move Down")
        print("  A/← - Move Left")
        print("  D/→ - Move Right")
        print("  P - Pause")
        print("  Q - Quit")
        print("\\nEat food (red) to grow!")
        print("Collect power-ups (gold) for bonus points!")
        print("Don't hit walls or yourself!")
        print("\\n" + "="*60)
        
        while self.running:
            if not self.paused:
                self.running = self.move_snake()
                self.draw_game()
                self.screen.update()
                time.sleep(self.speed)
            else:
                self.show_pause_screen()
                self.screen.update()
                time.sleep(0.1)
        
        # Game over
        self.show_game_over()
        self.screen.update()
        
        # Wait for restart or quit
        while True:
            self.screen.update()
            time.sleep(0.1)


def main():
    """Main entry point"""
    try:
        game = SnakeGame()
        game.run()
    except turtle.Terminator:
        print("\\nGame closed. Thanks for playing! 🐍")
    except Exception as e:
        print(f"\\nAn error occurred: {e}")


if __name__ == "__main__":
    main()`
  },
  {
    title: "Turtle Pong Game",
    category: "turtle",
    description: "Classic two-player pong with score tracking, rally counter, and paddle spin mechanics.",
    tags: ["turtle", "game", "arcade"],
    difficulty: 3,
    lines: "~420 lines",
    code: `"""
Turtle Pong Game
Classic two-player pong with score tracking and power-ups!
"""

import turtle
import random
import time

# Game Configuration
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600
PADDLE_SPEED = 20
BALL_SPEED = 2
WINNING_SCORE = 5

# Colors
BG_COLOR = "#0a0a1a"
PADDLE_COLOR = "#00ff41"
BALL_COLOR = "#ffffff"
SCORE_COLOR = "#ffffff"
NET_COLOR = "#444444"


class PongGame:
    """Two-player Pong game"""
    
    def __init__(self):
        # Setup screen
        self.screen = turtle.Screen()
        self.screen.setup(SCREEN_WIDTH, SCREEN_HEIGHT)
        self.screen.bgcolor(BG_COLOR)
        self.screen.title("🏓 Turtle Pong")
        self.screen.tracer(0)
        
        # Game state
        self.score_a = 0
        self.score_b = 0
        self.ball_speed_x = BALL_SPEED
        self.ball_speed_y = BALL_SPEED
        self.rally_count = 0
        self.running = True
        self.paused = False
        
        # Create game objects
        self.create_net()
        self.create_paddles()
        self.create_ball()
        self.create_score_display()
        self.setup_controls()
    
    def create_net(self):
        """Draw center net"""
        net = turtle.Turtle()
        net.hideturtle()
        net.speed(0)
        net.color(NET_COLOR)
        net.penup()
        net.goto(0, SCREEN_HEIGHT // 2)
        net.pendown()
        net.pensize(3)
        net.setheading(270)
        
        # Draw dashed line
        for _ in range(30):
            net.forward(10)
            net.penup()
            net.forward(10)
            net.pendown()
    
    def create_paddles(self):
        """Create both paddles"""
        # Left paddle (Player A)
        self.paddle_a = turtle.Turtle()
        self.paddle_a.speed(0)
        self.paddle_a.shape("square")
        self.paddle_a.color(PADDLE_COLOR)
        self.paddle_a.shapesize(stretch_wid=5, stretch_len=1)
        self.paddle_a.penup()
        self.paddle_a.goto(-SCREEN_WIDTH // 2 + 50, 0)
        
        # Right paddle (Player B)
        self.paddle_b = turtle.Turtle()
        self.paddle_b.speed(0)
        self.paddle_b.shape("square")
        self.paddle_b.color(PADDLE_COLOR)
        self.paddle_b.shapesize(stretch_wid=5, stretch_len=1)
        self.paddle_b.penup()
        self.paddle_b.goto(SCREEN_WIDTH // 2 - 50, 0)
    
    def create_ball(self):
        """Create ball"""
        self.ball = turtle.Turtle()
        self.ball.speed(0)
        self.ball.shape("circle")
        self.ball.color(BALL_COLOR)
        self.ball.penup()
        self.ball.goto(0, 0)
        
        # Random initial direction
        self.ball_speed_x = BALL_SPEED * random.choice([-1, 1])
        self.ball_speed_y = BALL_SPEED * random.choice([-1, 1])
    
    def create_score_display(self):
        """Create score display"""
        self.score_display = turtle.Turtle()
        self.score_display.speed(0)
        self.score_display.color(SCORE_COLOR)
        self.score_display.penup()
        self.score_display.hideturtle()
        self.score_display.goto(0, SCREEN_HEIGHT // 2 - 60)
        self.update_score_display()
        
        # Info display
        self.info_display = turtle.Turtle()
        self.info_display.speed(0)
        self.info_display.color("#888888")
        self.info_display.penup()
        self.info_display.hideturtle()
        self.info_display.goto(0, -SCREEN_HEIGHT // 2 + 30)
        self.info_display.write("W/S: Player 1 | ↑/↓: Player 2 | P: Pause | Q: Quit", 
                               align="center", font=("Arial", 12, "normal"))
    
    def update_score_display(self):
        """Update score text"""
        self.score_display.clear()
        score_text = f"Player 1: {self.score_a}    |    Player 2: {self.score_b}"
        self.score_display.write(score_text, align="center", 
                                font=("Arial", 24, "bold"))
        
        # Show rally count if active
        if self.rally_count > 0:
            rally_text = turtle.Turtle()
            rally_text.speed(0)
            rally_text.color("#ffaa00")
            rally_text.penup()
            rally_text.hideturtle()
            rally_text.goto(0, SCREEN_HEIGHT // 2 - 90)
            rally_text.write(f"Rally: {self.rally_count}", 
                           align="center", font=("Arial", 14, "bold"))
    
    def move_paddle_a_up(self):
        """Move left paddle up"""
        y = self.paddle_a.ycor() + PADDLE_SPEED
        if y < SCREEN_HEIGHT // 2 - 50:
            self.paddle_a.sety(y)
    
    def move_paddle_a_down(self):
        """Move left paddle down"""
        y = self.paddle_a.ycor() - PADDLE_SPEED
        if y > -SCREEN_HEIGHT // 2 + 50:
            self.paddle_a.sety(y)
    
    def move_paddle_b_up(self):
        """Move right paddle up"""
        y = self.paddle_b.ycor() + PADDLE_SPEED
        if y < SCREEN_HEIGHT // 2 - 50:
            self.paddle_b.sety(y)
    
    def move_paddle_b_down(self):
        """Move right paddle down"""
        y = self.paddle_b.ycor() - PADDLE_SPEED
        if y > -SCREEN_HEIGHT // 2 + 50:
            self.paddle_b.sety(y)
    
    def move_ball(self):
        """Move ball and handle collisions"""
        # Move ball
        self.ball.setx(self.ball.xcor() + self.ball_speed_x)
        self.ball.sety(self.ball.ycor() + self.ball_speed_y)
        
        # Top and bottom wall collision
        if self.ball.ycor() > SCREEN_HEIGHT // 2 - 20:
            self.ball.sety(SCREEN_HEIGHT // 2 - 20)
            self.ball_speed_y *= -1
        
        if self.ball.ycor() < -SCREEN_HEIGHT // 2 + 20:
            self.ball.sety(-SCREEN_HEIGHT // 2 + 20)
            self.ball_speed_y *= -1
        
        # Paddle collision - Left paddle
        if (self.ball.xcor() < -SCREEN_WIDTH // 2 + 60 and
            self.ball.xcor() > -SCREEN_WIDTH // 2 + 40 and
            abs(self.ball.ycor() - self.paddle_a.ycor()) < 50):
            
            self.ball.setx(-SCREEN_WIDTH // 2 + 60)
            self.ball_speed_x *= -1
            self.rally_count += 1
            
            # Add spin based on where ball hits paddle
            hit_pos = (self.ball.ycor() - self.paddle_a.ycor()) / 50
            self.ball_speed_y += hit_pos * 2
            
            # Increase speed slightly
            self.ball_speed_x *= 1.05
            self.ball_speed_y *= 1.05
            
            self.update_score_display()
        
        # Paddle collision - Right paddle
        if (self.ball.xcor() > SCREEN_WIDTH // 2 - 60 and
            self.ball.xcor() < SCREEN_WIDTH // 2 - 40 and
            abs(self.ball.ycor() - self.paddle_b.ycor()) < 50):
            
            self.ball.setx(SCREEN_WIDTH // 2 - 60)
            self.ball_speed_x *= -1
            self.rally_count += 1
            
            # Add spin
            hit_pos = (self.ball.ycor() - self.paddle_b.ycor()) / 50
            self.ball_speed_y += hit_pos * 2
            
            # Increase speed
            self.ball_speed_x *= 1.05
            self.ball_speed_y *= 1.05
            
            self.update_score_display()
        
        # Score points
        # Player B scores (ball goes off left side)
        if self.ball.xcor() < -SCREEN_WIDTH // 2:
            self.score_b += 1
            self.reset_ball()
            self.update_score_display()
            
            if self.score_b >= WINNING_SCORE:
                self.show_winner("Player 2")
                return False
        
        # Player A scores (ball goes off right side)
        if self.ball.xcor() > SCREEN_WIDTH // 2:
            self.score_a += 1
            self.reset_ball()
            self.update_score_display()
            
            if self.score_a >= WINNING_SCORE:
                self.show_winner("Player 1")
                return False
        
        return True
    
    def reset_ball(self):
        """Reset ball to center"""
        self.ball.goto(0, 0)
        self.rally_count = 0
        
        # Random direction
        time.sleep(0.5)
        self.ball_speed_x = BALL_SPEED * random.choice([-1, 1])
        self.ball_speed_y = BALL_SPEED * random.choice([-1, 1])
    
    def show_winner(self, winner):
        """Display winner screen"""
        overlay = turtle.Turtle()
        overlay.speed(0)
        overlay.color("white")
        overlay.penup()
        overlay.hideturtle()
        
        overlay.goto(0, 50)
        overlay.write(f"🏆 {winner} WINS! 🏆", 
                     align="center", font=("Arial", 36, "bold"))
        
        overlay.goto(0, -20)
        overlay.write(f"Final Score: {self.score_a} - {self.score_b}", 
                     align="center", font=("Arial", 20, "normal"))
        
        overlay.goto(0, -80)
        overlay.write("Press SPACE to play again or Q to quit", 
                     align="center", font=("Arial", 14, "normal"))
        
        self.screen.update()
    
    def show_pause_screen(self):
        """Display pause screen"""
        overlay = turtle.Turtle()
        overlay.speed(0)
        overlay.color("white")
        overlay.penup()
        overlay.hideturtle()
        overlay.goto(0, 0)
        overlay.write("⏸ PAUSED", align="center", font=("Arial", 36, "bold"))
        overlay.goto(0, -50)
        overlay.write("Press P to resume", align="center", font=("Arial", 16, "normal"))
        self.screen.update()
    
    def toggle_pause(self):
        """Toggle pause state"""
        if self.running:
            self.paused = not self.paused
    
    def reset_game(self):
        """Reset game state"""
        self.score_a = 0
        self.score_b = 0
        self.rally_count = 0
        self.running = True
        self.paused = False
        
        # Reset paddles
        self.paddle_a.goto(-SCREEN_WIDTH // 2 + 50, 0)
        self.paddle_b.goto(SCREEN_WIDTH // 2 - 50, 0)
        
        # Reset ball
        self.reset_ball()
        self.update_score_display()
    
    def restart(self):
        """Restart the game"""
        if not self.running:
            self.reset_game()
            self.run()
    
    def quit_game(self):
        """Quit the game"""
        self.screen.bye()
    
    def setup_controls(self):
        """Setup keyboard controls"""
        self.screen.listen()
        
        # Player A (left) controls
        self.screen.onkey(self.move_paddle_a_up, "w")
        self.screen.onkey(self.move_paddle_a_down, "s")
        
        # Player B (right) controls
        self.screen.onkey(self.move_paddle_b_up, "Up")
        self.screen.onkey(self.move_paddle_b_down, "Down")
        
        # Game controls
        self.screen.onkey(self.toggle_pause, "p")
        self.screen.onkey(self.restart, "space")
        self.screen.onkey(self.quit_game, "q")
    
    def run(self):
        """Main game loop"""
        print("\\n" + "="*60)
        print("🏓 TURTLE PONG")
        print("="*60)
        print("\\nControls:")
        print("  Player 1 (Left):")
        print("    W - Move Up")
        print("    S - Move Down")
        print("\\n  Player 2 (Right):")
        print("    ↑ - Move Up")
        print("    ↓ - Move Down")
        print("\\n  Game:")
        print("    P - Pause")
        print("    Q - Quit")
        print(f"\\nFirst to {WINNING_SCORE} points wins!")
        print("\\n" + "="*60)
        
        while self.running:
            if not self.paused:
                self.running = self.move_ball()
                self.screen.update()
                time.sleep(0.016)  # ~60 FPS
            else:
                self.show_pause_screen()
                time.sleep(0.1)
        
        # Wait for restart or quit
        while True:
            self.screen.update()
            time.sleep(0.1)


def main():
    """Main entry point"""
    try:
        game = PongGame()
        game.run()
    except turtle.Terminator:
        print("\\nGame closed. Thanks for playing! 🏓")
    except Exception as e:
        print(f"\\nAn error occurred: {e}")


if __name__ == "__main__":
    main()`
  },
 
  {
    title: "Turtle Polygon Designer",
    category: "turtle",
    description: "Draw and animate various polygon shapes.",
    tags: ["turtle", "geometry", "shapes"],
    difficulty: 2,
    lines: "~90 lines",
    code: `import turtle
  t=turtle.Turtle()
  t.speed(0)
  colors=["red","blue","green","purple","orange"]
  def draw_polygon(sides,length):
      angle=360/sides
      for _ in range(sides):
          t.forward(length)
          t.right(angle)
  for sides in range(3,9):
      t.color(colors[sides%5])
      draw_polygon(sides,100)
      t.right(20)
  turtle.done()`
  },
  {
    title: "Turtle Tic Tac Toe",
    category: "turtle",
    description: "Play tic tac toe with turtle graphics interface.",
    tags: ["turtle", "game", "board-game"],
    difficulty: 3,
    lines: "~120 lines",
    code: `import turtle
  t=turtle.Turtle()
  t.speed(0)
  screen=turtle.Screen()
  screen.setup(400,400)
  board=[["","",""],["","",""],["","",""]]
  def draw_board():
      t.clear()
      t.penup()
      for i in range(1,3):
          t.goto(-150,i*100-150); t.pendown(); t.forward(300); t.penup()
      t.left(90)
      for i in range(1,3):
          t.goto(i*100-150,-150); t.pendown(); t.forward(300); t.penup()
      t.right(90)
  def mark(x,y,player):
      col=int((x+150)//100); row=int((150-y)//100)
      if board[row][col]=="": board[row][col]=player; draw_board(); draw_marks()
  def draw_marks():
      for r in range(3):
          for c in range(3):
              if board[r][c]!="":
                  t.goto(c*100-100,100-r*100)
                  t.write(board[r][c],align="center",font=("Arial",36,"normal"))
  def click(x,y):
      global turn
      mark(x,y,turn)
      turn="O" if turn=="X" else "X"
  turn="X"
  draw_board()
  screen.onclick(click)
  turtle.done()`
 },
    {
    title: "Turtle Circle Art",
    category: "turtle",
    description: "Create art with overlapping circles and arcs.",
    tags: ["turtle", "art", "circles"],
    difficulty: 2,
    lines: "~100 lines",
    code: `import turtle
    import random
    import math

    # Set up the screen
    screen = turtle.Screen()
    screen.setup(900, 900)
    screen.bgcolor("black")
    screen.title("Turtle Circle Art Generator")
    screen.tracer(0)

    # Create the turtle
    t = turtle.Turtle()
    t.speed(0)
    t.hideturtle()
    t.width(2)

    # Color palettes
    colors = ["red", "blue", "green", "purple", "orange", "yellow", "cyan", "magenta", "pink"]
    pastel_colors = ["#FFB6C1", "#FFD700", "#98FB98", "#87CEEB", "#DDA0DD", "#FFDAB9", "#F0E68C"]
    neon_colors = ["#FF1493", "#00FF00", "#00FFFF", "#FF00FF", "#FFFF00", "#FF6600"]

    # Basic rotating circles
    def pattern_rotating_circles(radius=50, count=36):
        """Create basic rotating circle pattern"""
        t.clear()
        t.penup()
        t.goto(0, 0)
        t.pendown()
        
        rotation = 360 / count
        
        for i in range(count):
            t.color(random.choice(colors))
            t.circle(radius)
            t.right(rotation)
        
        screen.update()

    # Concentric circles
    def pattern_concentric_circles(max_radius=200, circles=10):
        """Create concentric circles with different colors"""
        t.clear()
        
        radius = max_radius
        step = max_radius / circles
        
        for i in range(circles):
            t.penup()
            t.goto(0, -radius)
            t.pendown()
            t.color(colors[i % len(colors)])
            t.circle(radius)
            radius -= step
        
        screen.update()

    # Overlapping circle flower
    def pattern_circle_flower(radius=80, petals=12):
        """Create flower pattern with overlapping circles"""
        t.clear()
        t.penup()
        t.goto(0, 0)
        t.pendown()
        
        angle = 360 / petals
        
        for i in range(petals):
            t.color(colors[i % len(colors)])
            t.circle(radius)
            t.left(angle)
        
        screen.update()

    # Spiral of circles
    def pattern_spiral_circles(start_radius=20, circles=30):
        """Create spiral pattern made of circles"""
        t.clear()
        t.penup()
        t.goto(0, 0)
        t.pendown()
        
        radius = start_radius
        
        for i in range(circles):
            t.color(colors[i % len(colors)])
            t.circle(radius)
            t.right(15)
            radius += 5
        
        screen.update()

    # Olympic rings style
    def pattern_olympic_rings():
        """Create interlocking rings pattern"""
        t.clear()
        t.width(5)
        
        ring_positions = [(-110, 0), (0, 0), (110, 0), (-55, -50), (55, -50)]
        ring_colors = ["blue", "black", "red", "yellow", "green"]
        
        for i, (x, y) in enumerate(ring_positions):
            t.penup()
            t.goto(x, y)
            t.pendown()
            t.color(ring_colors[i])
            t.circle(50)
        
        t.width(2)
        screen.update()

    # Arc art pattern
    def pattern_arc_art(arcs=36):
        """Create art using arcs"""
        t.clear()
        t.penup()
        t.goto(0, 0)
        t.pendown()
        
        for i in range(arcs):
            t.color(random.choice(colors))
            t.circle(100, 180)  # Draw semicircle
            t.right(10)
        
        screen.update()

    # Yin-yang pattern
    def pattern_yin_yang():
        """Create yin-yang symbol with circles"""
        t.clear()
        t.width(3)
        
        # Outer circle
        t.penup()
        t.goto(0, -150)
        t.pendown()
        t.color("black")
        t.circle(150)
        
        # White half
        t.penup()
        t.goto(0, 0)
        t.pendown()
        t.color("white")
        t.begin_fill()
        t.circle(75, 180)
        t.circle(150, 180)
        t.circle(75, 180)
        t.end_fill()
        
        # Small white circle
        t.penup()
        t.goto(0, 50)
        t.pendown()
        t.color("white", "white")
        t.begin_fill()
        t.circle(25)
        t.end_fill()
        
        # Small black circle
        t.penup()
        t.goto(0, -100)
        t.pendown()
        t.color("black", "black")
        t.begin_fill()
        t.circle(25)
        t.end_fill()
        
        t.width(2)
        screen.update()

    # Random circles constellation
    def pattern_random_circles(count=30):
        """Create random circles like bubbles"""
        t.clear()
        
        for i in range(count):
            x = random.randint(-400, 400)
            y = random.randint(-400, 400)
            radius = random.randint(10, 60)
            color = random.choice(colors)
            
            t.penup()
            t.goto(x, y)
            t.pendown()
            t.color(color)
            t.circle(radius)
        
        screen.update()

    # Mandala circles
    def pattern_mandala(layers=5, circles_per_layer=8):
        """Create mandala pattern with circles"""
        t.clear()
        
        base_distance = 50
        
        for layer in range(1, layers + 1):
            angle = 360 / circles_per_layer
            distance = base_distance * layer
            
            for i in range(circles_per_layer):
                # Calculate position
                rad = math.radians(i * angle)
                x = distance * math.cos(rad)
                y = distance * math.sin(rad)
                
                t.penup()
                t.goto(x, y - 20)
                t.pendown()
                t.color(colors[(layer + i) % len(colors)])
                t.circle(20)
        
        screen.update()

    # Target circles
    def pattern_target(rings=8):
        """Create target/bullseye pattern"""
        t.clear()
        
        max_radius = 200
        step = max_radius / rings
        
        for i in range(rings, 0, -1):
            radius = i * step
            t.penup()
            t.goto(0, -radius)
            t.pendown()
            
            if i % 2 == 0:
                t.color("red")
                t.begin_fill()
                t.circle(radius)
                t.end_fill()
            else:
                t.color("white")
                t.begin_fill()
                t.circle(radius)
                t.end_fill()
        
        screen.update()

    # Venn diagram
    def pattern_venn_diagram():
        """Create overlapping circles (Venn diagram style)"""
        t.clear()
        t.width(3)
        
        positions = [(-60, 0), (60, 0), (0, 80)]
        circle_colors = ["red", "blue", "green"]
        
        for i, (x, y) in enumerate(positions):
            t.penup()
            t.goto(x, y)
            t.pendown()
            t.color(circle_colors[i])
            t.circle(100)
        
        t.width(2)
        screen.update()

    # Chain of circles
    def pattern_circle_chain(circles=20):
        """Create chain of interconnected circles"""
        t.clear()
        
        x = -300
        y = 0
        
        for i in range(circles):
            t.penup()
            t.goto(x, y)
            t.pendown()
            t.color(colors[i % len(colors)])
            t.circle(30)
            x += 35
        
        screen.update()

    # Interactive controls
    def main():
        print("=== TURTLE CIRCLE ART GENERATOR ===")
        print("\nKeyboard Controls:")
        print("1 - Rotating Circles")
        print("2 - Concentric Circles")
        print("3 - Circle Flower")
        print("4 - Spiral Circles")
        print("5 - Olympic Rings")
        print("6 - Arc Art")
        print("7 - Yin-Yang")
        print("8 - Random Circles")
        print("9 - Mandala")
        print("0 - Target/Bullseye")
        print("V - Venn Diagram")
        print("C - Circle Chain")
        print("Space - Clear Screen")
        
        # Draw initial pattern
        pattern_rotating_circles()
        
        # Set up keyboard bindings
        screen.listen()
        screen.onkey(lambda: pattern_rotating_circles(), "1")
        screen.onkey(lambda: pattern_concentric_circles(), "2")
        screen.onkey(lambda: pattern_circle_flower(), "3")
        screen.onkey(lambda: pattern_spiral_circles(), "4")
        screen.onkey(lambda: pattern_olympic_rings(), "5")
        screen.onkey(lambda: pattern_arc_art(), "6")
        screen.onkey(lambda: pattern_yin_yang(), "7")
        screen.onkey(lambda: pattern_random_circles(), "8")
        screen.onkey(lambda: pattern_mandala(), "9")
        screen.onkey(lambda: pattern_target(), "0")
        screen.onkey(lambda: pattern_venn_diagram(), "v")
        screen.onkey(lambda: pattern_circle_chain(), "c")
        screen.onkey(lambda: (t.clear(), screen.update()), "space")
        
        screen.update()

    # Run the program
    if __name__ == '__main__':
        main()
        turtle.done()`
    },
    {
    title: "Turtle Bouncing Ball",
    category: "turtle",
    description: "Simulate physics with bouncing ball animation.",
    tags: ["turtle", "physics", "animation"],
    difficulty: 2,
    lines: "~80 lines",
    code: `import turtle
    import time
    import random
    import math

    # Set up the screen
    screen = turtle.Screen()
    screen.setup(600, 600)
    screen.bgcolor("black")
    screen.title("Bouncing Ball Physics Simulation")
    screen.tracer(0)

    # Create the ball
    ball = turtle.Turtle()
    ball.shape("circle")
    ball.color("red")
    ball.penup()
    ball.shapesize(1.5, 1.5)

    # Create trail turtle
    trail = turtle.Turtle()
    trail.hideturtle()
    trail.penup()
    trail.speed(0)

    # Create info display
    info = turtle.Turtle()
    info.hideturtle()
    info.penup()
    info.goto(0, 260)
    info.color("white")

    # Ball physics properties
    x, y = 0, 0
    dx, dy = 5, 3
    gravity = 0.3
    bounce_damping = 0.9
    speed_limit = 15

    # Simulation mode
    gravity_enabled = True
    trail_enabled = False
    ball_color_mode = "single"

    # Draw boundaries
    def draw_boundaries():
        """Draw the boundary box"""
        boundary = turtle.Turtle()
        boundary.hideturtle()
        boundary.speed(0)
        boundary.color("white")
        boundary.penup()
        boundary.goto(-290, -290)
        boundary.pendown()
        boundary.pensize(3)
        
        for _ in range(4):
            boundary.forward(580)
            boundary.left(90)
        
        boundary.penup()

    # Update info display
    def update_info():
        """Display current simulation info"""
        info.clear()
        speed = math.sqrt(dx**2 + dy**2)
        info.write(f"Speed: {speed:.1f} | Gravity: {'ON' if gravity_enabled else 'OFF'} | Trail: {'ON' if trail_enabled else 'OFF'}", 
                align="center", font=("Courier", 12, "bold"))

    # Change ball color based on speed
    def update_ball_color():
        """Change ball color based on speed"""
        if ball_color_mode == "speed":
            speed = math.sqrt(dx**2 + dy**2)
            if speed < 5:
                ball.color("blue")
            elif speed < 10:
                ball.color("green")
            elif speed < 15:
                ball.color("yellow")
            else:
                ball.color("red")
        elif ball_color_mode == "rainbow":
            colors = ["red", "orange", "yellow", "green", "cyan", "blue", "purple", "magenta"]
            ball.color(random.choice(colors))

    # Toggle gravity
    def toggle_gravity():
        """Toggle gravity on/off"""
        global gravity_enabled
        gravity_enabled = not gravity_enabled
        print(f"Gravity: {'ON' if gravity_enabled else 'OFF'}")

    # Toggle trail
    def toggle_trail():
        """Toggle ball trail on/off"""
        global trail_enabled
        trail_enabled = not trail_enabled
        if not trail_enabled:
            trail.clear()
        print(f"Trail: {'ON' if trail_enabled else 'OFF'}")

    # Change color mode
    def cycle_color_mode():
        """Cycle through color modes"""
        global ball_color_mode
        modes = ["single", "speed", "rainbow"]
        current_index = modes.index(ball_color_mode)
        ball_color_mode = modes[(current_index + 1) % len(modes)]
        print(f"Color mode: {ball_color_mode}")
        if ball_color_mode == "single":
            ball.color("red")

    # Reset simulation
    def reset_simulation():
        """Reset ball to center"""
        global x, y, dx, dy
        x, y = 0, 0
        dx = random.uniform(-8, 8)
        dy = random.uniform(-8, 8)
        trail.clear()
        ball.goto(x, y)
        print("Simulation reset!")

    # Add random ball
    balls = []

    def create_multi_ball():
        """Create multiple balls"""
        global balls
        if len(balls) < 10:
            new_ball = turtle.Turtle()
            new_ball.shape("circle")
            new_ball.color(random.choice(["red", "blue", "green", "yellow", "purple", "orange"]))
            new_ball.penup()
            new_ball.shapesize(1, 1)
            new_ball.goto(random.randint(-200, 200), random.randint(-200, 200))
            
            # Random velocity
            new_ball.dx = random.uniform(-6, 6)
            new_ball.dy = random.uniform(-6, 6)
            
            balls.append(new_ball)
            print(f"Balls: {len(balls)}")

    def clear_all_balls():
        """Clear all extra balls"""
        global balls
        for b in balls:
            b.hideturtle()
        balls = []
        print("All extra balls cleared!")

    # Increase speed
    def speed_up():
        """Increase ball speed"""
        global dx, dy
        dx *= 1.2
        dy *= 1.2
        print("Speed increased!")

    # Decrease speed
    def slow_down():
        """Decrease ball speed"""
        global dx, dy
        dx *= 0.8
        dy *= 0.8
        print("Speed decreased!")

    # Main animation loop
    def animate():
        """Main animation loop"""
        global x, y, dx, dy
        
        # Apply gravity
        if gravity_enabled:
            dy -= gravity
        
        # Update position
        x += dx
        y += dy
        
        # Bounce off walls
        if x > 280 or x < -280:
            dx *= -1
            x = 280 if x > 280 else -280
            if gravity_enabled:
                dx *= bounce_damping
        
        if y > 280 or y < -280:
            dy *= -1
            y = 280 if y > 280 else -280
            if gravity_enabled:
                dy *= bounce_damping
        
        # Limit speed
        speed = math.sqrt(dx**2 + dy**2)
        if speed > speed_limit:
            scale = speed_limit / speed
            dx *= scale
            dy *= scale
        
        # Update ball position
        ball.goto(x, y)
        
        # Draw trail
        if trail_enabled:
            trail.goto(x, y)
            trail.dot(5, ball.pencolor())
        
        # Update color
        update_ball_color()
        
        # Update extra balls
        for b in balls:
            b.dx += 0 if not gravity_enabled else -gravity
            b.setx(b.xcor() + b.dx)
            b.sety(b.ycor() + b.dy)
            
            # Bounce
            if b.xcor() > 280 or b.xcor() < -280:
                b.dx *= -1
                b.setx(280 if b.xcor() > 280 else -280)
            
            if b.ycor() > 280 or b.ycor() < -280:
                b.dy *= -1
                b.sety(280 if b.ycor() > 280 else -280)
        
        # Update info
        update_info()
        
        # Update screen
        screen.update()
        
        # Continue animation
        screen.ontimer(animate, 30)

    # Set up keyboard controls
    def setup_controls():
        """Set up keyboard bindings"""
        screen.listen()
        screen.onkey(toggle_gravity, "g")
        screen.onkey(toggle_trail, "t")
        screen.onkey(cycle_color_mode, "c")
        screen.onkey(reset_simulation, "r")
        screen.onkey(create_multi_ball, "m")
        screen.onkey(clear_all_balls, "x")
        screen.onkey(speed_up, "Up")
        screen.onkey(slow_down, "Down")

    # Initialize simulation
    def main():
        """Initialize and start the simulation"""
        print("=== BOUNCING BALL PHYSICS ===")
        print("\nKeyboard Controls:")
        print("G - Toggle Gravity")
        print("T - Toggle Trail")
        print("C - Change Color Mode")
        print("R - Reset Ball")
        print("M - Add Ball")
        print("X - Clear Extra Balls")
        print("Up/Down - Speed Up/Slow Down")
        print("\nPress any key to start!")
        
        draw_boundaries()
        update_info()
        setup_controls()
        
        # Start animation
        animate()
        
        screen.update()

    # Run the simulation
    if __name__ == '__main__':
        main()
        turtle.done()`
    },
    {
    title: "Turtle Colorful Spirals",
    category: "turtle",
    description: "Draw colorful spiral patterns with turtle graphics.",
    tags: ["turtle", "colors", "spirals"],
    difficulty: 2,
    lines: "~60 lines",
    code: `import turtle
    import random
    import colorsys
    import math

    # Set up the screen
    screen = turtle.Screen()
    screen.setup(900, 900)
    screen.bgcolor("black")
    screen.title("Colorful Spiral Art Generator")
    screen.tracer(0)

    # Create the turtle
    t = turtle.Turtle()
    t.speed(0)
    t.hideturtle()
    t.width(2)

    # Color palettes
    colors = ["red", "blue", "green", "yellow", "purple", "orange", "cyan", "magenta", "pink"]
    neon_colors = ["#FF1493", "#00FF00", "#00FFFF", "#FF00FF", "#FFFF00", "#FF6600", "#8B00FF"]
    pastel_colors = ["#FFB6C1", "#FFD700", "#98FB98", "#87CEEB", "#DDA0DD", "#FFDAB9", "#F0E68C"]

    # Basic colorful spiral
    def spiral_basic(iterations=72, step_multiplier=5, angle=45):
        """Draw basic colorful spiral"""
        t.clear()
        t.penup()
        t.goto(0, 0)
        t.pendown()
        
        for i in range(iterations):
            t.color(random.choice(colors))
            t.forward(i * step_multiplier)
            t.right(angle)
        
        screen.update()

    # Square spiral
    def spiral_square(iterations=100, step_increment=5):
        """Draw square spiral with colors"""
        t.clear()
        t.penup()
        t.goto(0, 0)
        t.pendown()
        
        distance = 0
        for i in range(iterations):
            t.color(colors[i % len(colors)])
            t.forward(distance)
            t.right(90)
            distance += step_increment
        
        screen.update()

    # HSV rainbow spiral
    def spiral_rainbow(iterations=200, step_multiplier=2, angle=61):
        """Draw spiral with smooth rainbow gradient"""
        t.clear()
        t.penup()
        t.goto(0, 0)
        t.pendown()
        
        for i in range(iterations):
            # Smooth color transition using HSV
            hue = i / iterations
            rgb = colorsys.hsv_to_rgb(hue, 1.0, 1.0)
            t.color(rgb)
            t.forward(i * step_multiplier)
            t.right(angle)
        
        screen.update()

    # Double helix spiral
    def spiral_double_helix(iterations=150):
        """Draw double helix spiral pattern"""
        t.clear()
        
        # First spiral
        t.penup()
        t.goto(0, 0)
        t.pendown()
        
        for i in range(iterations):
            hue = i / iterations
            rgb = colorsys.hsv_to_rgb(hue, 1.0, 1.0)
            t.color(rgb)
            t.forward(i * 2)
            t.right(59)
        
        # Second spiral (mirrored)
        t.penup()
        t.goto(0, 0)
        t.setheading(180)
        t.pendown()
        
        for i in range(iterations):
            hue = (i / iterations + 0.5) % 1.0
            rgb = colorsys.hsv_to_rgb(hue, 1.0, 1.0)
            t.color(rgb)
            t.forward(i * 2)
            t.right(59)
        
        screen.update()

    # Flower spiral
    def spiral_flower(petals=12, iterations=36):
        """Create flower-like spiral pattern"""
        t.clear()
        
        angle_step = 360 / petals
        
        for petal in range(petals):
            t.penup()
            t.goto(0, 0)
            t.setheading(petal * angle_step)
            t.pendown()
            
            color = colors[petal % len(colors)]
            
            for i in range(iterations):
                t.color(color)
                t.forward(i * 3)
                t.right(10)
        
        screen.update()

    # Star spiral
    def spiral_star(points=5, iterations=72):
        """Create star-shaped spiral"""
        t.clear()
        t.penup()
        t.goto(0, 0)
        t.pendown()
        
        angle = 180 - (180 / points)
        
        for i in range(iterations):
            hue = i / iterations
            rgb = colorsys.hsv_to_rgb(hue, 1.0, 1.0)
            t.color(rgb)
            t.forward(i * 3)
            t.right(angle)
        
        screen.update()

    # Circular spiral
    def spiral_circles(circles=50):
        """Draw spiral made of circles"""
        t.clear()
        t.penup()
        t.goto(0, 0)
        t.pendown()
        
        radius = 5
        for i in range(circles):
            hue = i / circles
            rgb = colorsys.hsv_to_rgb(hue, 1.0, 1.0)
            t.color(rgb)
            t.circle(radius)
            t.right(15)
            radius += 4
        
        screen.update()

    # Triangular spiral
    def spiral_triangular(iterations=120):
        """Draw triangular spiral pattern"""
        t.clear()
        t.penup()
        t.goto(0, 0)
        t.pendown()
        
        distance = 5
        for i in range(iterations):
            t.color(colors[i % len(colors)])
            t.forward(distance)
            t.right(120)
            distance += 3
        
        screen.update()

    # Fibonacci spiral approximation
    def spiral_fibonacci(iterations=15):
        """Draw Fibonacci-inspired spiral"""
        t.clear()
        t.penup()
        t.goto(0, 0)
        t.pendown()
        
        # Fibonacci sequence
        fib = [1, 1]
        for i in range(2, iterations):
            fib.append(fib[-1] + fib[-2])
        
        for i in range(iterations):
            hue = i / iterations
            rgb = colorsys.hsv_to_rgb(hue, 1.0, 1.0)
            t.color(rgb)
            
            # Draw quarter circle
            t.circle(fib[i] * 5, 90)
        
        screen.update()

    # Hexagonal spiral
    def spiral_hexagonal(iterations=60):
        """Draw hexagonal spiral pattern"""
        t.clear()
        t.penup()
        t.goto(0, 0)
        t.pendown()
        
        distance = 5
        for i in range(iterations):
            hue = i / iterations
            rgb = colorsys.hsv_to_rgb(hue, 1.0, 1.0)
            t.color(rgb)
            t.forward(distance)
            t.right(60)
            distance += 4
        
        screen.update()

    # Pulsing spiral
    def spiral_pulsing(iterations=100):
        """Draw spiral with pulsing size"""
        t.clear()
        t.penup()
        t.goto(0, 0)
        t.pendown()
        
        for i in range(iterations):
            hue = i / iterations
            rgb = colorsys.hsv_to_rgb(hue, 1.0, 1.0)
            t.color(rgb)
            
            # Pulsing effect using sine wave
            pulse = abs(math.sin(i / 10)) * 3 + 1
            t.forward(i * pulse)
            t.right(61)
        
        screen.update()

    # Dotted spiral
    def spiral_dotted(iterations=200):
        """Draw spiral with dots instead of lines"""
        t.clear()
        t.penup()
        t.goto(0, 0)
        
        for i in range(iterations):
            hue = i / iterations
            rgb = colorsys.hsv_to_rgb(hue, 1.0, 1.0)
            t.color(rgb)
            t.forward(i * 2)
            t.dot(10)
            t.right(61)
        
        screen.update()

    # Interactive controls
    def main():
        """Initialize and start the program"""
        print("=== COLORFUL SPIRAL ART ===")
        print("\nKeyboard Controls:")
        print("1 - Basic Colorful Spiral")
        print("2 - Square Spiral")
        print("3 - Rainbow Gradient Spiral")
        print("4 - Double Helix Spiral")
        print("5 - Flower Spiral")
        print("6 - Star Spiral")
        print("7 - Circular Spiral")
        print("8 - Triangular Spiral")
        print("9 - Fibonacci Spiral")
        print("0 - Hexagonal Spiral")
        print("P - Pulsing Spiral")
        print("D - Dotted Spiral")
        print("Space - Clear Screen")
        
        # Draw initial pattern
        spiral_basic()
        
        # Set up keyboard bindings
        screen.listen()
        screen.onkey(lambda: spiral_basic(), "1")
        screen.onkey(lambda: spiral_square(), "2")
        screen.onkey(lambda: spiral_rainbow(), "3")
        screen.onkey(lambda: spiral_double_helix(), "4")
        screen.onkey(lambda: spiral_flower(), "5")
        screen.onkey(lambda: spiral_star(), "6")
        screen.onkey(lambda: spiral_circles(), "7")
        screen.onkey(lambda: spiral_triangular(), "8")
        screen.onkey(lambda: spiral_fibonacci(), "9")
        screen.onkey(lambda: spiral_hexagonal(), "0")
        screen.onkey(lambda: spiral_pulsing(), "p")
        screen.onkey(lambda: spiral_dotted(), "d")
        screen.onkey(lambda: (t.clear(), screen.update()), "space")
        
        screen.update()

    # Run the program
    if __name__ == '__main__':
        main()
        turtle.done()`
    },
    {
    title: "Turtle Brick Breaker",
    category: "turtle",
    description: "Classic brick breaker game with turtle graphics.",
    tags: ["turtle", "game", "arcade"],
    difficulty: 4,
    lines: "~200 lines",
    code: `import turtle
    import time
    import random

    # Set up the screen
    screen = turtle.Screen()
    screen.setup(700, 700)
    screen.title("Brick Breaker - Turtle Edition")
    screen.bgcolor("black")
    screen.tracer(0)

    # Game state
    score = 0
    lives = 3
    level = 1
    game_running = True
    game_started = False

    # Create paddle
    paddle = turtle.Turtle()
    paddle.shape("square")
    paddle.shapesize(stretch_wid=1, stretch_len=6)
    paddle.color("cyan")
    paddle.penup()
    paddle.goto(0, -280)

    # Create ball
    ball = turtle.Turtle()
    ball.shape("circle")
    ball.color("white")
    ball.shapesize(0.8, 0.8)
    ball.penup()
    ball.goto(0, -250)
    ball.dx = 0
    ball.dy = 0
    ball.speed_multiplier = 1

    # Create score display
    score_display = turtle.Turtle()
    score_display.hideturtle()
    score_display.penup()
    score_display.color("white")
    score_display.goto(0, 310)

    # Create message display
    message_display = turtle.Turtle()
    message_display.hideturtle()
    message_display.penup()
    message_display.color("yellow")
    message_display.goto(0, 0)

    # Brick list
    bricks = []

    # Draw boundaries
    def draw_boundaries():
        """Draw game boundaries"""
        boundary = turtle.Turtle()
        boundary.hideturtle()
        boundary.speed(0)
        boundary.color("white")
        boundary.penup()
        boundary.goto(-330, -330)
        boundary.pendown()
        boundary.pensize(3)
        
        for _ in range(4):
            boundary.forward(660)
            boundary.left(90)
        
        boundary.penup()

    # Create bricks
    def create_bricks(rows=5, cols=11):
        """Create the brick layout"""
        global bricks
        
        # Clear existing bricks
        for brick in bricks:
            brick.hideturtle()
        bricks.clear()
        
        brick_colors = ["red", "orange", "yellow", "green", "cyan", "blue", "purple"]
        brick_width = 50
        brick_height = 20
        
        start_x = -280
        start_y = 250
        
        for row in range(rows):
            for col in range(cols):
                brick = turtle.Turtle()
                brick.shape("square")
                brick.shapesize(stretch_wid=1, stretch_len=2.5)
                brick.color(brick_colors[row % len(brick_colors)])
                brick.penup()
                
                x = start_x + col * (brick_width + 5)
                y = start_y - row * (brick_height + 5)
                brick.goto(x, y)
                
                # Assign points based on row
                brick.points = (rows - row) * 10
                
                bricks.append(brick)

    # Update score display
    def update_score():
        """Update the score display"""
        score_display.clear()
        score_display.write(f"Score: {score}  Lives: {lives}  Level: {level}", 
                        align="center", font=("Courier", 16, "bold"))

    # Show message
    def show_message(text, duration=0):
        """Display a message on screen"""
        message_display.clear()
        message_display.write(text, align="center", font=("Arial", 20, "bold"))
        if duration > 0:
            screen.ontimer(lambda: message_display.clear(), duration)

    # Paddle movement
    def paddle_left():
        """Move paddle left"""
        x = paddle.xcor() - 30
        if x > -280:
            paddle.setx(x)

    def paddle_right():
        """Move paddle right"""
        x = paddle.xcor() + 30
        if x < 280:
            paddle.setx(x)

    # Mouse movement
    def move_paddle_mouse(x, y):
        """Move paddle with mouse"""
        if -280 < x < 280:
            paddle.setx(x)

    # Start game
    def start_game():
        """Start the ball moving"""
        global game_started
        if not game_started and game_running:
            game_started = True
            ball.dx = random.choice([-4, 4])
            ball.dy = 4
            message_display.clear()

    # Reset ball
    def reset_ball():
        """Reset ball to starting position"""
        global game_started
        ball.goto(0, -250)
        ball.dx = 0
        ball.dy = 0
        game_started = False
        show_message("Press SPACE to launch ball", 2000)

    # Next level
    def next_level():
        """Advance to next level"""
        global level, score
        level += 1
        score += 100  # Bonus for completing level
        ball.speed_multiplier += 0.2
        create_bricks(rows=min(5 + level, 8), cols=11)
        reset_ball()
        show_message(f"Level {level}! Bonus: 100 points", 2000)

    # Game over
    def game_over():
        """End the game"""
        global game_running
        game_running = False
        show_message(f"GAME OVER! Final Score: {score}")

    # Win game
    def win_game():
        """Player wins"""
        global game_running
        game_running = False
        show_message(f"YOU WIN! Final Score: {score}")

    # Restart game
    def restart_game():
        """Restart the game"""
        global score, lives, level, game_running, game_started
        score = 0
        lives = 3
        level = 1
        game_running = True
        game_started = False
        ball.speed_multiplier = 1
        
        create_bricks()
        reset_ball()
        update_score()
        message_display.clear()

    # Check collisions
    def check_collisions():
        """Check for all collisions"""
        global score, lives, game_running
        
        # Wall collisions
        if ball.xcor() > 320 or ball.xcor() < -320:
            ball.dx *= -1
        
        if ball.ycor() > 320:
            ball.dy *= -1
        
        # Bottom wall (lose life)
        if ball.ycor() < -320:
            lives -= 1
            update_score()
            
            if lives <= 0:
                game_over()
            else:
                reset_ball()
                show_message(f"Life lost! {lives} remaining", 2000)
            return
        
        # Paddle collision
        if (ball.ycor() < paddle.ycor() + 10 and 
            ball.ycor() > paddle.ycor() - 10 and
            abs(ball.xcor() - paddle.xcor()) < 60):
            
            ball.dy = abs(ball.dy)  # Always bounce up
            
            # Add spin based on where ball hits paddle
            hit_pos = (ball.xcor() - paddle.xcor()) / 60
            ball.dx += hit_pos * 2
            
            # Limit ball speed
            if abs(ball.dx) > 8:
                ball.dx = 8 if ball.dx > 0 else -8
        
        # Brick collisions
        for brick in bricks[:]:  # Use slice to avoid modification during iteration
            if (abs(ball.xcor() - brick.xcor()) < 30 and 
                abs(ball.ycor() - brick.ycor()) < 15):
                
                # Determine bounce direction
                if abs(ball.xcor() - brick.xcor()) > abs(ball.ycor() - brick.ycor()):
                    ball.dx *= -1
                else:
                    ball.dy *= -1
                
                # Remove brick and update score
                score += brick.points
                brick.hideturtle()
                bricks.remove(brick)
                update_score()
                
                # Check if level complete
                if len(bricks) == 0:
                    next_level()
                
                break

    # Main game loop
    def game_loop():
        """Main game loop"""
        if game_running and game_started:
            # Update ball position
            ball.setx(ball.xcor() + ball.dx * ball.speed_multiplier)
            ball.sety(ball.ycor() + ball.dy * ball.speed_multiplier)
            
            # Check collisions
            check_collisions()
        
        # Update screen
        screen.update()
        
        # Continue loop
        screen.ontimer(game_loop, 20)

    # Set up keyboard controls
    def setup_controls():
        """Set up game controls"""
        screen.listen()
        screen.onkey(paddle_left, "Left")
        screen.onkey(paddle_right, "Right")
        screen.onkey(paddle_left, "a")
        screen.onkey(paddle_right, "d")
        screen.onkey(start_game, "space")
        screen.onkey(restart_game, "r")
        screen.onscreenclick(lambda x, y: move_paddle_mouse(x, y))

    # Initialize game
    def main():
        """Initialize and start the game"""
        print("=== BRICK BREAKER ===")
        print("\nControls:")
        print("Arrow Keys / A,D - Move paddle")
        print("Mouse - Move paddle")
        print("SPACE - Launch ball")
        print("R - Restart game")
        print("\nGood luck!")
        
        draw_boundaries()
        create_bricks()
        update_score()
        show_message("Press SPACE to start!")
        
        setup_controls()
        game_loop()

    # Run the game
    if __name__ == '__main__':
        main()
        turtle.done()`
    },
    {
    title: "Turtle Fireworks",
    category: "turtle",
    description: "Animated fireworks display with particle effects.",
    tags: ["turtle", "animation", "particles"],
    difficulty: 3,
    lines: "~150 lines",
    code: `import turtle
    import random
    import time
    import math

    # Set up the screen
    screen = turtle.Screen()
    screen.setup(900, 700)
    screen.bgcolor("black")
    screen.title("Fireworks Display - Press SPACE for fireworks!")
    screen.tracer(0)

    # Create turtles for drawing
    firework_turtle = turtle.Turtle()
    firework_turtle.speed(0)
    firework_turtle.hideturtle()

    # Particle system
    class Particle:
        def __init__(self, x, y, color, angle, speed):
            self.x = x
            self.y = y
            self.color = color
            self.angle = angle
            self.speed = speed
            self.gravity = 0.15
            self.lifetime = 60
            self.age = 0
            
        def update(self):
            """Update particle position"""
            self.age += 1
            rad = math.radians(self.angle)
            self.x += math.cos(rad) * self.speed
            self.y += math.sin(rad) * self.speed
            self.speed -= self.gravity
            
        def is_dead(self):
            """Check if particle should be removed"""
            return self.age >= self.lifetime or self.y < -350

    # Active particles
    particles = []

    # Color palettes
    color_palettes = {
        "rainbow": ["red", "orange", "yellow", "green", "cyan", "blue", "purple", "magenta"],
        "fire": ["red", "orange", "yellow", "gold"],
        "ice": ["cyan", "lightblue", "blue", "white"],
        "galaxy": ["purple", "magenta", "pink", "blue", "cyan"],
        "neon": ["#FF1493", "#00FF00", "#00FFFF", "#FF00FF", "#FFFF00"],
    }

    current_palette = "rainbow"
    colors = color_palettes[current_palette]

    # Simple burst firework
    def simple_firework(x, y, size=50):
        """Draw a simple burst firework"""
        color = random.choice(colors)
        rays = 36
        
        for i in range(rays):
            angle = i * (360 / rays)
            firework_turtle.penup()
            firework_turtle.goto(x, y)
            firework_turtle.setheading(angle)
            firework_turtle.pendown()
            firework_turtle.color(color)
            firework_turtle.forward(size)
        
        screen.update()

    # Animated burst firework
    def animated_burst(x, y, particles_count=30):
        """Create animated particle burst"""
        for _ in range(particles_count):
            angle = random.randint(0, 360)
            speed = random.uniform(3, 8)
            color = random.choice(colors)
            particle = Particle(x, y, color, angle, speed)
            particles.append(particle)

    # Circle burst firework
    def circle_burst(x, y, rings=3):
        """Create concentric circle burst"""
        color = random.choice(colors)
        
        for ring in range(1, rings + 1):
            radius = ring * 30
            firework_turtle.penup()
            firework_turtle.goto(x, y - radius)
            firework_turtle.pendown()
            firework_turtle.color(color)
            firework_turtle.circle(radius)
        
        screen.update()

    # Star burst firework
    def star_burst(x, y, points=5):
        """Create star-shaped burst"""
        color = random.choice(colors)
        size = 80
        angle = 180 - (180 / points)
        
        firework_turtle.penup()
        firework_turtle.goto(x, y)
        firework_turtle.pendown()
        firework_turtle.color(color)
        
        for _ in range(points):
            firework_turtle.forward(size)
            firework_turtle.right(angle)
        
        screen.update()

    # Heart-shaped firework
    def heart_burst(x, y):
        """Create heart-shaped burst"""
        color = random.choice(["red", "pink", "magenta"])
        
        firework_turtle.penup()
        firework_turtle.goto(x, y)
        firework_turtle.pendown()
        firework_turtle.color(color)
        firework_turtle.begin_fill()
        
        # Draw heart shape
        firework_turtle.left(140)
        firework_turtle.forward(50)
        firework_turtle.circle(-25, 200)
        firework_turtle.left(120)
        firework_turtle.circle(-25, 200)
        firework_turtle.forward(50)
        
        firework_turtle.end_fill()
        firework_turtle.setheading(0)
        screen.update()

    # Spiral firework
    def spiral_burst(x, y):
        """Create spiral burst effect"""
        color = random.choice(colors)
        firework_turtle.penup()
        firework_turtle.goto(x, y)
        firework_turtle.pendown()
        firework_turtle.color(color)
        
        size = 1
        for _ in range(60):
            firework_turtle.forward(size)
            firework_turtle.right(30)
            size += 1
        
        screen.update()

    # Multi-colored burst
    def rainbow_burst(x, y):
        """Create rainbow-colored burst"""
        rays = 24
        
        for i in range(rays):
            angle = i * (360 / rays)
            color = colors[i % len(colors)]
            
            firework_turtle.penup()
            firework_turtle.goto(x, y)
            firework_turtle.setheading(angle)
            firework_turtle.pendown()
            firework_turtle.color(color)
            firework_turtle.forward(70)

    # Willow effect
    def willow_burst(x, y):
        """Create willow tree effect"""
        for _ in range(40):
            angle = random.randint(60, 120)
            speed = random.uniform(4, 7)
            color = random.choice(["yellow", "gold", "orange"])
            particle = Particle(x, y, color, angle, speed)
            particle.gravity = 0.08
            particle.lifetime = 100
            particles.append(particle)

    # Fountain effect
    def fountain_burst(x, y):
        """Create fountain effect"""
        for _ in range(50):
            angle = random.randint(70, 110)
            speed = random.uniform(5, 10)
            color = random.choice(colors)
            particle = Particle(x, y, color, angle, speed)
            particle.gravity = 0.2
            particles.append(particle)

    # Update particles
    def update_particles():
        """Update all active particles"""
        firework_turtle.clear()
        
        # Update each particle
        for particle in particles[:]:
            particle.update()
            
            if particle.is_dead():
                particles.remove(particle)
            else:
                # Draw particle
                firework_turtle.penup()
                firework_turtle.goto(particle.x, particle.y)
                firework_turtle.dot(4, particle.color)

    # Random firework
    def random_firework():
        """Launch a random firework"""
        x = random.randint(-350, 350)
        y = random.randint(-200, 250)
        
        firework_type = random.choice([
            animated_burst,
            circle_burst,
            star_burst,
            spiral_burst,
            rainbow_burst,
            willow_burst,
            fountain_burst
        ])
        
        firework_type(x, y)

    # Automatic show
    auto_show_active = False

    def toggle_auto_show():
        """Toggle automatic fireworks show"""
        global auto_show_active
        auto_show_active = not auto_show_active
        print(f"Auto show: {'ON' if auto_show_active else 'OFF'}")

    # Change color palette
    def cycle_palette():
        """Cycle through color palettes"""
        global current_palette, colors
        palettes = list(color_palettes.keys())
        current_index = palettes.index(current_palette)
        current_palette = palettes[(current_index + 1) % len(palettes)]
        colors = color_palettes[current_palette]
        print(f"Color palette: {current_palette}")

    # Clear screen
    def clear_display():
        """Clear all fireworks"""
        firework_turtle.clear()
        particles.clear()
        screen.update()

    # Main animation loop
    def animate():
        """Main animation loop"""
        # Auto show
        if auto_show_active and random.random() < 0.05:
            random_firework()
        
        # Update particles
        update_particles()
        
        # Update screen
        screen.update()
        
        # Continue loop
        screen.ontimer(animate, 30)

    # Set up controls
    def setup_controls():
        """Set up keyboard controls"""
        screen.listen()
        screen.onkey(random_firework, "space")
        screen.onkey(lambda: animated_burst(0, 0), "1")
        screen.onkey(lambda: circle_burst(0, 0), "2")
        screen.onkey(lambda: star_burst(0, 0), "3")
        screen.onkey(lambda: heart_burst(0, 0), "4")
        screen.onkey(lambda: spiral_burst(0, 0), "5")
        screen.onkey(lambda: rainbow_burst(0, 0), "6")
        screen.onkey(lambda: willow_burst(0, 0), "7")
        screen.onkey(lambda: fountain_burst(0, 0), "8")
        screen.onkey(toggle_auto_show, "a")
        screen.onkey(cycle_palette, "c")
        screen.onkey(clear_display, "x")
        
        # Mouse click for fireworks
        screen.onclick(lambda x, y: animated_burst(x, y))

    # Draw instructions
    def draw_instructions():
        """Draw control instructions"""
        instructions = turtle.Turtle()
        instructions.hideturtle()
        instructions.penup()
        instructions.color("white")
        instructions.goto(0, -330)
        text = "SPACE/Click: Random | 1-8: Types | A: Auto | C: Colors | X: Clear"
        instructions.write(text, align="center", font=("Courier", 10, "normal"))

    # Initialize
    def main():
        """Initialize and start the fireworks display"""
        print("=== FIREWORKS DISPLAY ===")
        print("\nControls:")
        print("SPACE - Random firework")
        print("Click - Firework at mouse position")
        print("1 - Animated Burst")
        print("2 - Circle Burst")
        print("3 - Star Burst")
        print("4 - Heart Burst")
        print("5 - Spiral Burst")
        print("6 - Rainbow Burst")
        print("7 - Willow Effect")
        print("8 - Fountain Effect")
        print("A - Toggle auto show")
        print("C - Change color palette")
        print("X - Clear screen")
        print("\nPress SPACE or click to launch fireworks!")
        
        draw_instructions()
        setup_controls()
        animate()

    # Run the program
    if __name__ == '__main__':
        main()
        turtle.done()`
    },
    {
    title: "Turtle Sierpinski Triangle",
    category: "turtle",
    description: "Draw the famous Sierpinski triangle fractal.",
    tags: ["turtle", "fractals", "mathematics"],
    difficulty: 3,
    lines: "~80 lines",
    code: `import turtle
    import random
    import math

    # Set up the screen
    screen = turtle.Screen()
    screen.setup(900, 900)
    screen.bgcolor("black")
    screen.title("Sierpinski Triangle Fractal")
    screen.tracer(0)

    # Create the turtle
    t = turtle.Turtle()
    t.speed(0)
    t.hideturtle()
    t.color("cyan")
    t.width(1)

    # Current depth
    current_depth = 4
    use_colors = False

    # Midpoint calculation
    def midpoint(p1, p2):
        """Calculate midpoint between two points"""
        return ((p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2)

    # Draw triangle
    def draw_triangle(points, color="cyan"):
        """Draw a single triangle"""
        t.penup()
        t.goto(points[0])
        t.pendown()
        t.color(color)
        t.goto(points[1])
        t.goto(points[2])
        t.goto(points[0])

    # Sierpinski triangle recursive function
    def sierpinski(points, depth):
        """Draw Sierpinski triangle using recursion"""
        colors = ["cyan", "magenta", "yellow", "lime", "red", "orange", "purple"]
        
        if depth == 0:
            if use_colors:
                color = colors[depth % len(colors)]
                draw_triangle(points, color)
            else:
                draw_triangle(points)
        else:
            # Calculate midpoints
            mid1 = midpoint(points[0], points[1])
            mid2 = midpoint(points[1], points[2])
            mid3 = midpoint(points[2], points[0])
            
            # Recursively draw three smaller triangles
            sierpinski([points[0], mid1, mid3], depth - 1)
            sierpinski([points[1], mid1, mid2], depth - 1)
            sierpinski([points[2], mid2, mid3], depth - 1)

    # Draw filled Sierpinski
    def sierpinski_filled(points, depth):
        """Draw filled Sierpinski triangle"""
        colors = ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#9400D3"]
        
        if depth == 0:
            t.penup()
            t.goto(points[0])
            t.pendown()
            t.color(colors[depth % len(colors)])
            t.begin_fill()
            t.goto(points[1])
            t.goto(points[2])
            t.goto(points[0])
            t.end_fill()
        else:
            mid1 = midpoint(points[0], points[1])
            mid2 = midpoint(points[1], points[2])
            mid3 = midpoint(points[2], points[0])
            
            sierpinski_filled([points[0], mid1, mid3], depth - 1)
            sierpinski_filled([points[1], mid1, mid2], depth - 1)
            sierpinski_filled([points[2], mid2, mid3], depth - 1)

    # Chaos game method
    def sierpinski_chaos_game(iterations=10000):
        """Draw Sierpinski using chaos game method"""
        t.clear()
        
        # Define triangle vertices
        vertices = [(-300, -250), (0, 300), (300, -250)]
        
        # Start at random point
        x, y = random.choice(vertices)
        
        t.penup()
        
        for _ in range(iterations):
            # Choose random vertex
            target = random.choice(vertices)
            
            # Move halfway to that vertex
            x = (x + target[0]) / 2
            y = (y + target[1]) / 2
            
            # Draw point
            t.goto(x, y)
            t.dot(2, "cyan")
        
        screen.update()

    # Draw multiple Sierpinski triangles
    def sierpinski_pattern():
        """Draw pattern of multiple Sierpinski triangles"""
        t.clear()
        
        positions = [
            (0, 200, 150),
            (-200, -100, 100),
            (200, -100, 100)
        ]
        
        colors = ["cyan", "magenta", "yellow"]
        
        for i, (cx, cy, size) in enumerate(positions):
            h = size * math.sqrt(3) / 2
            points = [
                (cx, cy + h * 2/3),
                (cx - size/2, cy - h/3),
                (cx + size/2, cy - h/3)
            ]
            
            t.color(colors[i])
            sierpinski(points, 3)
        
        screen.update()

    # Draw inverted Sierpinski
    def sierpinski_inverted(points, depth):
        """Draw inverted Sierpinski (Sierpinski carpet style)"""
        if depth == 0:
            t.penup()
            t.goto(points[0])
            t.pendown()
            t.color("white")
            t.begin_fill()
            t.goto(points[1])
            t.goto(points[2])
            t.goto(points[0])
            t.end_fill()
        else:
            mid1 = midpoint(points[0], points[1])
            mid2 = midpoint(points[1], points[2])
            mid3 = midpoint(points[2], points[0])
            
            # Draw center triangle (inverted)
            t.penup()
            t.goto(mid1)
            t.pendown()
            t.color("black")
            t.begin_fill()
            t.goto(mid2)
            t.goto(mid3)
            t.goto(mid1)
            t.end_fill()
            
            # Recurse on corner triangles
            sierpinski_inverted([points[0], mid1, mid3], depth - 1)
            sierpinski_inverted([points[1], mid1, mid2], depth - 1)
            sierpinski_inverted([points[2], mid2, mid3], depth - 1)

    # Draw standard Sierpinski
    def draw_sierpinski(depth=4):
        """Draw standard Sierpinski triangle"""
        global current_depth
        current_depth = depth
        t.clear()
        
        # Define main triangle points
        points = [(-300, -250), (0, 300), (300, -250)]
        
        sierpinski(points, depth)
        screen.update()

    # Increase depth
    def increase_depth():
        """Increase fractal depth"""
        global current_depth
        if current_depth < 7:
            current_depth += 1
            draw_sierpinski(current_depth)
            print(f"Depth: {current_depth}")

    # Decrease depth
    def decrease_depth():
        """Decrease fractal depth"""
        global current_depth
        if current_depth > 0:
            current_depth -= 1
            draw_sierpinski(current_depth)
            print(f"Depth: {current_depth}")

    # Toggle colors
    def toggle_colors():
        """Toggle colorful mode"""
        global use_colors
        use_colors = not use_colors
        draw_sierpinski(current_depth)
        print(f"Colors: {'ON' if use_colors else 'OFF'}")

    # Set up controls
    def setup_controls():
        """Set up keyboard controls"""
        screen.listen()
        screen.onkey(increase_depth, "Up")
        screen.onkey(decrease_depth, "Down")
        screen.onkey(lambda: draw_sierpinski(current_depth), "1")
        screen.onkey(lambda: (t.clear(), sierpinski_filled([(-300, -250), (0, 300), (300, -250)], current_depth), screen.update()), "2")
        screen.onkey(sierpinski_chaos_game, "3")
        screen.onkey(sierpinski_pattern, "4")
        screen.onkey(lambda: (screen.bgcolor("white"), t.clear(), sierpinski_inverted([(-300, -250), (0, 300), (300, -250)], current_depth), screen.update()), "5")
        screen.onkey(toggle_colors, "c")
        screen.onkey(lambda: (t.clear(), screen.update()), "x")
        screen.onkey(lambda: screen.bgcolor("black" if screen.bgcolor() == "white" else "white"), "b")

    # Draw instructions
    def draw_instructions():
        """Draw control instructions"""
        instructions = turtle.Turtle()
        instructions.hideturtle()
        instructions.penup()
        instructions.color("white")
        instructions.goto(0, -360)
        text = "Up/Down: Depth | 1-5: Styles | C: Colors | B: Background | X: Clear"
        instructions.write(text, align="center", font=("Courier", 11, "normal"))

    # Draw info
    def draw_info():
        """Display current info"""
        info = turtle.Turtle()
        info.hideturtle()
        info.penup()
        info.color("yellow")
        info.goto(0, 360)
        info.write(f"Sierpinski Triangle - Depth: {current_depth}", align="center", font=("Arial", 16, "bold"))

    # Initialize
    def main():
        """Initialize and start the program"""
        print("=== SIERPINSKI TRIANGLE FRACTAL ===")
        print("\nControls:")
        print("Up/Down Arrows - Increase/Decrease depth")
        print("1 - Standard Sierpinski")
        print("2 - Filled Sierpinski")
        print("3 - Chaos Game method")
        print("4 - Pattern")
        print("5 - Inverted")
        print("C - Toggle colors")
        print("B - Toggle background")
        print("X - Clear screen")
        print("\nFractal depth: 0-7")
        
        draw_instructions()
        draw_info()
        draw_sierpinski(current_depth)
        setup_controls()

    # Run the program
    if __name__ == '__main__':
        main()
        turtle.done()`
    },
    {
    title: "Turtle Olympic Rings",
    category: "turtle",
    description: "Draw the Olympic rings with precise positioning.",
    tags: ["turtle", "shapes", "art"],
    difficulty: 2,
    lines: "~60 lines",
    code: `import turtle
    import time

    # Set up the screen
    screen = turtle.Screen()
    screen.setup(800, 600)
    screen.bgcolor("white")
    screen.title("Olympic Rings - Tokyo 2020")
    screen.tracer(0)

    # Create the turtle
    t = turtle.Turtle()
    t.speed(0)
    t.hideturtle()

    # Olympic ring colors (official order)
    colors = ["blue", "black", "red", "yellow", "green"]

    # Ring positions (x, y)
    positions = [
        (-120, 0),    # Blue (top left)
        (0, 0),       # Black (top center)
        (120, 0),     # Red (top right)
        (-60, -50),   # Yellow (bottom left)
        (60, -50)     # Green (bottom right)
    ]

    # Draw a single ring
    def draw_ring(x, y, color, radius=50, thickness=5):
        """Draw a single Olympic ring"""
        t.penup()
        t.goto(x, y)
        t.pendown()
        t.pensize(thickness)
        t.color(color)
        t.circle(radius)

    # Draw all Olympic rings (simple version)
    def draw_olympic_rings_simple():
        """Draw the basic Olympic rings"""
        t.clear()
        
        for i in range(5):
            x, y = positions[i]
            draw_ring(x, y, colors[i])
        
        screen.update()

    # Draw Olympic rings with proper interlocking
    def draw_olympic_rings_interlocked():
        """Draw Olympic rings with proper overlapping effect"""
        t.clear()
        radius = 50
        thickness = 8
        
        # Draw in specific order to create interlocking effect
        # Blue ring
        draw_ring(-120, 0, "blue", radius, thickness)
        
        # Yellow ring (overlaps blue)
        t.penup()
        t.goto(-60, -50)
        t.pendown()
        t.pensize(thickness)
        t.color("yellow")
        
        # Draw yellow with sections
        t.circle(radius, 180)  # Bottom half
        t.penup()
        t.circle(radius, 180)  # Skip top half
        t.pendown()
        
        # Black ring (overlaps blue and red)
        draw_ring(0, 0, "black", radius, thickness)
        
        # Green ring (overlaps black)
        t.penup()
        t.goto(60, -50)
        t.pendown()
        t.pensize(thickness)
        t.color("green")
        t.circle(radius, 180)
        t.penup()
        t.circle(radius, 180)
        t.pendown()
        
        # Red ring (overlaps black)
        draw_ring(120, 0, "red", radius, thickness)
        
        # Complete yellow and green rings
        t.penup()
        t.goto(-60, -50)
        t.pendown()
        t.color("yellow")
        t.circle(radius, -180)
        
        t.penup()
        t.goto(60, -50)
        t.pendown()
        t.color("green")
        t.circle(radius, -180)
        
        screen.update()

    # Draw animated Olympic rings
    def draw_olympic_rings_animated():
        """Draw rings with animation"""
        t.clear()
        
        for i in range(5):
            x, y = positions[i]
            t.penup()
            t.goto(x, y)
            t.pendown()
            t.pensize(8)
            t.color(colors[i])
            
            # Draw ring in segments for animation
            segments = 36
            angle = 360 / segments
            
            for _ in range(segments):
                t.circle(50, angle)
                screen.update()
                time.sleep(0.01)
        
        screen.update()

    # Draw filled Olympic rings
    def draw_olympic_rings_filled():
        """Draw filled Olympic rings"""
        t.clear()
        
        for i in range(5):
            x, y = positions[i]
            t.penup()
            t.goto(x, y)
            t.pendown()
            t.pensize(2)
            t.color(colors[i])
            t.fillcolor(colors[i])
            t.begin_fill()
            t.circle(50)
            t.end_fill()
        
        screen.update()

    # Draw 3D-style Olympic rings
    def draw_olympic_rings_3d():
        """Draw rings with 3D effect"""
        t.clear()
        
        for i in range(5):
            x, y = positions[i]
            
            # Draw shadow
            t.penup()
            t.goto(x + 5, y - 5)
            t.pendown()
            t.pensize(8)
            t.color("gray")
            t.circle(50)
            
            # Draw main ring
            t.penup()
            t.goto(x, y)
            t.pendown()
            t.pensize(8)
            t.color(colors[i])
            t.circle(50)
        
        screen.update()

    # Draw Olympic rings with gradient effect
    def draw_olympic_rings_gradient():
        """Draw rings with gradient-like effect"""
        t.clear()
        
        for i in range(5):
            x, y = positions[i]
            
            # Draw multiple circles with decreasing thickness
            for thickness in range(12, 2, -1):
                t.penup()
                t.goto(x, y)
                t.pendown()
                t.pensize(thickness)
                t.color(colors[i])
                t.circle(50)
        
        screen.update()

    # Draw Olympic rings with title
    def draw_complete_olympic_logo():
        """Draw complete Olympic logo with text"""
        t.clear()
        
        # Draw rings
        for i in range(5):
            x, y = positions[i]
            draw_ring(x, y, colors[i], 50, 8)
        
        # Draw title
        t.penup()
        t.goto(0, 100)
        t.color("black")
        t.write("OLYMPIC GAMES", align="center", font=("Arial", 24, "bold"))
        
        # Draw subtitle
        t.goto(0, -150)
        t.write("Unity in Diversity", align="center", font=("Arial", 14, "italic"))
        
        screen.update()

    # Draw pattern with Olympic rings
    def draw_olympic_pattern():
        """Draw a pattern using Olympic rings"""
        t.clear()
        
        scale = 0.5
        radius = int(50 * scale)
        
        for row in range(3):
            for col in range(4):
                x = -150 + col * 100
                y = 150 - row * 100
                color = colors[(row + col) % 5]
                
                t.penup()
                t.goto(x, y)
                t.pendown()
                t.pensize(4)
                t.color(color)
                t.circle(radius)
        
        screen.update()

    # Draw colorful variations
    def draw_olympic_rainbow():
        """Draw Olympic rings with rainbow colors"""
        t.clear()
        
        rainbow_colors = ["red", "orange", "yellow", "green", "blue"]
        
        for i in range(5):
            x, y = positions[i]
            draw_ring(x, y, rainbow_colors[i], 50, 8)
        
        screen.update()

    # Set up keyboard controls
    def setup_controls():
        """Set up keyboard controls"""
        screen.listen()
        screen.onkey(draw_olympic_rings_simple, "1")
        screen.onkey(draw_olympic_rings_interlocked, "2")
        screen.onkey(draw_olympic_rings_animated, "3")
        screen.onkey(draw_olympic_rings_filled, "4")
        screen.onkey(draw_olympic_rings_3d, "5")
        screen.onkey(draw_olympic_rings_gradient, "6")
        screen.onkey(draw_complete_olympic_logo, "7")
        screen.onkey(draw_olympic_pattern, "8")
        screen.onkey(draw_olympic_rainbow, "9")
        screen.onkey(lambda: (t.clear(), screen.update()), "x")

    # Draw instructions
    def draw_instructions():
        """Draw control instructions"""
        instructions = turtle.Turtle()
        instructions.hideturtle()
        instructions.penup()
        instructions.color("gray")
        instructions.goto(0, -220)
        text = "1: Simple | 2: Interlocked | 3: Animated | 4: Filled | 5: 3D | 6: Gradient | 7: Logo | 8: Pattern | 9: Rainbow | X: Clear"
        instructions.write(text, align="center", font=("Courier", 8, "normal"))

    # Initialize
    def main():
        """Initialize and start the program"""
        print("=== OLYMPIC RINGS ===")
        print("\nKeyboard Controls:")
        print("1 - Simple Olympic Rings")
        print("2 - Interlocked Rings")
        print("3 - Animated Drawing")
        print("4 - Filled Rings")
        print("5 - 3D Effect")
        print("6 - Gradient Effect")
        print("7 - Complete Logo")
        print("8 - Ring Pattern")
        print("9 - Rainbow Colors")
        print("X - Clear Screen")
        print("\nPress a number key to see different styles!")
        
        draw_instructions()
        draw_olympic_rings_simple()
        setup_controls()

    # Run the program
    if __name__ == '__main__':
        main()
        turtle.done()`
    },
    {
    title: "Turtle Chess Board",
    category: "turtle",
    description: "Draw a chess board with alternating colors.",
    tags: ["turtle", "patterns", "grid"],
    difficulty: 2,
    lines: "~70 lines",
    code: `import turtle
    import random

    # Set up the screen
    screen = turtle.Screen()
    screen.setup(800, 850)
    screen.bgcolor("burlywood")
    screen.title("Chess Board Designer")
    screen.tracer(0)

    # Create the turtle
    t = turtle.Turtle()
    t.speed(0)
    t.hideturtle()

    # Board settings
    square_size = 60
    board_size = 8

    # Color schemes
    color_schemes = {
        "classic": ["white", "black"],
        "wood": ["#F0D9B5", "#B58863"],
        "green": ["#EEEED2", "#769656"],
        "blue": ["#DEE3E6", "#8CA2AD"],
        "red": ["#FFE4C4", "#CD5C5C"],
        "purple": ["#E6E6FA", "#9370DB"],
        "modern": ["#FFFFFF", "#404040"]
    }

    current_scheme = "classic"

    # Draw a single square
    def draw_square(x, y, size, color):
        """Draw a filled square"""
        t.penup()
        t.goto(x, y)
        t.pendown()
        t.color("black")
        t.fillcolor(color)
        t.begin_fill()
        
        for _ in range(4):
            t.forward(size)
            t.right(90)
        
        t.end_fill()

    # Draw basic chess board
    def draw_chess_board(size=square_size):
        """Draw standard chess board"""
        t.clear()
        colors = color_schemes[current_scheme]
        
        # Calculate starting position to center the board
        start_x = -size * board_size / 2
        start_y = -size * board_size / 2
        
        for row in range(board_size):
            for col in range(board_size):
                x = start_x + col * size
                y = start_y + row * size
                color = colors[(row + col) % 2]
                draw_square(x, y, size, color)
        
        screen.update()

    # Draw chess board with coordinates
    def draw_chess_board_with_coords():
        """Draw chess board with coordinate labels"""
        t.clear()
        colors = color_schemes[current_scheme]
        size = square_size
        
        start_x = -size * board_size / 2
        start_y = -size * board_size / 2
        
        # Draw squares
        for row in range(board_size):
            for col in range(board_size):
                x = start_x + col * size
                y = start_y + row * size
                color = colors[(row + col) % 2]
                draw_square(x, y, size, color)
        
        # Draw column labels (a-h)
        t.penup()
        for col in range(board_size):
            x = start_x + col * size + size / 2
            y = start_y - 30
            t.goto(x, y)
            t.color("black")
            t.write(chr(97 + col), align="center", font=("Arial", 14, "bold"))
        
        # Draw row labels (1-8)
        for row in range(board_size):
            x = start_x - 30
            y = start_y + row * size + size / 3
            t.goto(x, y)
            t.color("black")
            t.write(str(row + 1), align="center", font=("Arial", 14, "bold"))
        
        screen.update()

    # Draw chess board with border
    def draw_chess_board_with_border():
        """Draw chess board with decorative border"""
        t.clear()
        colors = color_schemes[current_scheme]
        size = square_size
        
        start_x = -size * board_size / 2
        start_y = -size * board_size / 2
        
        # Draw border
        border_size = size * board_size + 20
        t.penup()
        t.goto(start_x - 10, start_y - 10)
        t.pendown()
        t.pensize(8)
        t.color("saddlebrown")
        
        for _ in range(4):
            t.forward(border_size)
            t.left(90)
        
        t.pensize(1)
        
        # Draw squares
        for row in range(board_size):
            for col in range(board_size):
                x = start_x + col * size
                y = start_y + row * size
                color = colors[(row + col) % 2]
                draw_square(x, y, size, color)
        
        draw_coordinates(start_x, start_y, size)
        screen.update()

    # Draw coordinates
    def draw_coordinates(start_x, start_y, size):
        """Draw coordinate labels"""
        t.penup()
        
        # Column labels
        for col in range(board_size):
            x = start_x + col * size + size / 2
            y = start_y - 30
            t.goto(x, y)
            t.color("black")
            t.write(chr(97 + col), align="center", font=("Arial", 12, "bold"))
        
        # Row labels
        for row in range(board_size):
            x = start_x - 30
            y = start_y + row * size + size / 3
            t.goto(x, y)
            t.color("black")
            t.write(str(row + 1), align="center", font=("Arial", 12, "bold"))

    # Draw checkerboard pattern (10x10)
    def draw_checkerboard():
        """Draw 10x10 checkerboard"""
        t.clear()
        colors = color_schemes[current_scheme]
        size = 45
        board = 10
        
        start_x = -size * board / 2
        start_y = -size * board / 2
        
        for row in range(board):
            for col in range(board):
                x = start_x + col * size
                y = start_y + row * size
                color = colors[(row + col) % 2]
                draw_square(x, y, size, color)
        
        screen.update()

    # Draw mini chess boards
    def draw_mini_boards():
        """Draw multiple small chess boards"""
        t.clear()
        colors = color_schemes[current_scheme]
        size = 20
        mini_board_size = 4
        
        positions = [(-150, 150), (50, 150), (-150, -50), (50, -50)]
        
        for px, py in positions:
            for row in range(mini_board_size):
                for col in range(mini_board_size):
                    x = px + col * size
                    y = py + row * size
                    color = colors[(row + col) % 2]
                    draw_square(x, y, size, color)
        
        screen.update()

    # Draw 3D chess board effect
    def draw_3d_chess_board():
        """Draw chess board with 3D effect"""
        t.clear()
        colors = color_schemes[current_scheme]
        size = square_size
        
        start_x = -size * board_size / 2
        start_y = -size * board_size / 2
        
        # Draw shadows
        for row in range(board_size):
            for col in range(board_size):
                x = start_x + col * size + 3
                y = start_y + row * size - 3
                draw_square(x, y, size, "gray")
        
        # Draw main board
        for row in range(board_size):
            for col in range(board_size):
                x = start_x + col * size
                y = start_y + row * size
                color = colors[(row + col) % 2]
                draw_square(x, y, size, color)
        
        screen.update()

    # Draw highlighted squares
    def draw_board_with_highlights():
        """Draw board with highlighted squares"""
        t.clear()
        colors = color_schemes[current_scheme]
        size = square_size
        
        start_x = -size * board_size / 2
        start_y = -size * board_size / 2
        
        # Squares to highlight (chess notation style)
        highlights = [(4, 4), (3, 3), (4, 3), (3, 4)]  # Center squares
        
        for row in range(board_size):
            for col in range(board_size):
                x = start_x + col * size
                y = start_y + row * size
                
                if (row, col) in highlights:
                    color = "yellow"
                else:
                    color = colors[(row + col) % 2]
                
                draw_square(x, y, size, color)
        
        screen.update()

    # Draw gradient board
    def draw_gradient_board():
        """Draw board with gradient-like effect"""
        t.clear()
        size = square_size
        
        start_x = -size * board_size / 2
        start_y = -size * board_size / 2
        
        for row in range(board_size):
            for col in range(board_size):
                x = start_x + col * size
                y = start_y + row * size
                
                # Create gradient effect
                if (row + col) % 2 == 0:
                    gray_level = int(255 - (row * 30))
                    color = f"#{gray_level:02x}{gray_level:02x}{gray_level:02x}"
                else:
                    gray_level = int(50 + (row * 20))
                    color = f"#{gray_level:02x}{gray_level:02x}{gray_level:02x}"
                
                draw_square(x, y, size, color)
        
        screen.update()

    # Change color scheme
    def cycle_color_scheme():
        """Cycle through color schemes"""
        global current_scheme
        schemes = list(color_schemes.keys())
        current_index = schemes.index(current_scheme)
        current_scheme = schemes[(current_index + 1) % len(schemes)]
        print(f"Color scheme: {current_scheme}")
        draw_chess_board_with_coords()

    # Set up keyboard controls
    def setup_controls():
        """Set up keyboard controls"""
        screen.listen()
        screen.onkey(lambda: draw_chess_board(), "1")
        screen.onkey(draw_chess_board_with_coords, "2")
        screen.onkey(draw_chess_board_with_border, "3")
        screen.onkey(draw_checkerboard, "4")
        screen.onkey(draw_mini_boards, "5")
        screen.onkey(draw_3d_chess_board, "6")
        screen.onkey(draw_board_with_highlights, "7")
        screen.onkey(draw_gradient_board, "8")
        screen.onkey(cycle_color_scheme, "c")
        screen.onkey(lambda: (t.clear(), screen.update()), "x")

    # Draw instructions
    def draw_instructions():
        """Draw control instructions"""
        instructions = turtle.Turtle()
        instructions.hideturtle()
        instructions.penup()
        instructions.color("black")
        instructions.goto(0, -380)
        text = "1: Basic | 2: Coords | 3: Border | 4: 10x10 | 5: Mini | 6: 3D | 7: Highlight | 8: Gradient | C: Colors | X: Clear"
        instructions.write(text, align="center", font=("Courier", 9, "normal"))

    # Initialize
    def main():
        """Initialize and start the program"""
        print("=== CHESS BOARD DESIGNER ===")
        print("\nKeyboard Controls:")
        print("1 - Basic Chess Board")
        print("2 - Board with Coordinates")
        print("3 - Board with Border")
        print("4 - 10x10 Checkerboard")
        print("5 - Mini Boards")
        print("6 - 3D Effect Board")
        print("7 - Highlighted Squares")
        print("8 - Gradient Board")
        print("C - Change Color Scheme")
        print("X - Clear Screen")
        
        draw_instructions()
        draw_chess_board_with_coords()
        setup_controls()

    # Run the program
    if __name__ == '__main__':
        main()
        turtle.done()`
    },
    {
    title: "Turtle Random Walk",
    category: "turtle",
    description: "Visualize random walk algorithms with turtle.",
    tags: ["turtle", "random", "simulation"],
    difficulty: 2,
    lines: "~70 lines",
    code: `import turtle
    import random
    import math
    import time

    # Set up the screen
    screen = turtle.Screen()
    screen.setup(900, 700)
    screen.bgcolor("black")
    screen.title("Random Walk Visualizer")
    screen.tracer(0)

    # Create the walker turtle
    walker = turtle.Turtle()
    walker.speed(0)
    walker.shape("circle")
    walker.color("cyan")
    walker.penup()
    walker.goto(0, 0)
    walker.pendown()
    walker.pensize(2)

    # Create info display
    info = turtle.Turtle()
    info.hideturtle()
    info.penup()
    info.goto(0, 320)
    info.color("white")

    # Walk statistics
    total_steps = 0
    distance_from_origin = 0
    max_distance = 0

    # Walking parameters
    step_size = 15
    use_colors = False
    leave_trail = True
    bounded = False

    # Cardinal directions
    cardinal_directions = [0, 90, 180, 270]  # East, North, West, South

    # Update info display
    def update_info():
        """Display walk statistics"""
        info.clear()
        distance = math.sqrt(walker.xcor()**2 + walker.ycor()**2)
        info.write(f"Steps: {total_steps} | Distance from origin: {distance:.1f} | Max: {max_distance:.1f}", 
                align="center", font=("Courier", 11, "bold"))

    # Reset walker
    def reset_walker():
        """Reset walker to origin"""
        global total_steps, max_distance
        walker.clear()
        walker.penup()
        walker.goto(0, 0)
        walker.pendown()
        total_steps = 0
        max_distance = 0
        update_info()
        screen.update()

    # Simple random walk (4 directions)
    def random_walk_simple(steps=200):
        """Basic random walk in 4 cardinal directions"""
        global total_steps, max_distance
        reset_walker()
        
        for _ in range(steps):
            direction = random.choice(cardinal_directions)
            walker.setheading(direction)
            
            if use_colors:
                walker.color(random.choice(["red", "blue", "green", "yellow", "cyan", "magenta", "orange"]))
            
            walker.forward(step_size)
            total_steps += 1
            
            # Update max distance
            distance = math.sqrt(walker.xcor()**2 + walker.ycor()**2)
            max_distance = max(max_distance, distance)
            
            # Boundary check
            if bounded and (abs(walker.xcor()) > 400 or abs(walker.ycor()) > 300):
                walker.backward(step_size)
            
            if total_steps % 10 == 0:
                update_info()
                screen.update()
        
        update_info()
        screen.update()

    # Continuous random walk (any angle)
    def random_walk_continuous(steps=200):
        """Random walk in any direction"""
        global total_steps, max_distance
        reset_walker()
        
        for _ in range(steps):
            angle = random.randint(0, 359)
            walker.setheading(angle)
            
            if use_colors:
                walker.color(random.choice(["red", "blue", "green", "yellow", "cyan", "magenta", "orange"]))
            
            walker.forward(step_size)
            total_steps += 1
            
            distance = math.sqrt(walker.xcor()**2 + walker.ycor()**2)
            max_distance = max(max_distance, distance)
            
            if bounded and (abs(walker.xcor()) > 400 or abs(walker.ycor()) > 300):
                walker.backward(step_size)
            
            if total_steps % 10 == 0:
                update_info()
                screen.update()
        
        update_info()
        screen.update()

    # Biased random walk (tends upward)
    def random_walk_biased(steps=200):
        """Random walk with upward bias"""
        global total_steps, max_distance
        reset_walker()
        
        for _ in range(steps):
            # 40% chance up, 20% each for other directions
            rand = random.random()
            if rand < 0.4:
                direction = 90  # North
            elif rand < 0.6:
                direction = 0   # East
            elif rand < 0.8:
                direction = 180 # West
            else:
                direction = 270 # South
            
            walker.setheading(direction)
            
            if use_colors:
                walker.color(random.choice(["lime", "green", "cyan", "yellow"]))
            
            walker.forward(step_size)
            total_steps += 1
            
            distance = math.sqrt(walker.xcor()**2 + walker.ycor()**2)
            max_distance = max(max_distance, distance)
            
            if total_steps % 10 == 0:
                update_info()
                screen.update()
        
        update_info()
        screen.update()

    # Levy flight (varying step sizes)
    def random_walk_levy(steps=150):
        """Random walk with varying step sizes (Levy flight)"""
        global total_steps, max_distance
        reset_walker()
        
        for _ in range(steps):
            angle = random.randint(0, 359)
            walker.setheading(angle)
            
            # Levy distribution approximation: mostly small steps, occasional large jumps
            if random.random() < 0.9:
                distance = step_size
            else:
                distance = step_size * random.randint(3, 8)
            
            if use_colors:
                walker.color("red" if distance > step_size else "cyan")
            
            walker.forward(distance)
            total_steps += 1
            
            dist = math.sqrt(walker.xcor()**2 + walker.ycor()**2)
            max_distance = max(max_distance, dist)
            
            if bounded and (abs(walker.xcor()) > 400 or abs(walker.ycor()) > 300):
                walker.backward(distance)
            
            if total_steps % 5 == 0:
                update_info()
                screen.update()
        
        update_info()
        screen.update()

    # Self-avoiding walk
    def random_walk_self_avoiding(steps=100):
        """Random walk that tries to avoid crossing its own path"""
        global total_steps, max_distance
        reset_walker()
        
        visited = set()
        visited.add((0, 0))
        
        for _ in range(steps):
            # Try each direction
            possible_directions = []
            
            for direction in cardinal_directions:
                walker.setheading(direction)
                test_x = walker.xcor() + step_size * math.cos(math.radians(direction))
                test_y = walker.ycor() + step_size * math.sin(math.radians(direction))
                
                # Round to grid position
                grid_pos = (round(test_x / step_size), round(test_y / step_size))
                
                if grid_pos not in visited:
                    possible_directions.append(direction)
            
            if not possible_directions:
                break
            
            direction = random.choice(possible_directions)
            walker.setheading(direction)
            
            if use_colors:
                walker.color(random.choice(["yellow", "orange", "red", "magenta"]))
            
            walker.forward(step_size)
            grid_pos = (round(walker.xcor() / step_size), round(walker.ycor() / step_size))
            visited.add(grid_pos)
            
            total_steps += 1
            
            distance = math.sqrt(walker.xcor()**2 + walker.ycor()**2)
            max_distance = max(max_distance, distance)
            
            if total_steps % 5 == 0:
                update_info()
                screen.update()
        
        update_info()
        screen.update()

    # Multiple walkers
    def random_walk_multiple():
        """Multiple random walkers"""
        global total_steps
        walker.clear()
        
        walkers = []
        colors = ["red", "blue", "green", "yellow", "cyan", "magenta", "orange", "white"]
        
        for i in range(6):
            w = turtle.Turtle()
            w.speed(0)
            w.shape("circle")
            w.shapesize(0.5, 0.5)
            w.color(colors[i])
            w.penup()
            w.goto(0, 0)
            w.pendown()
            w.pensize(1)
            walkers.append(w)
        
        for step in range(100):
            for w in walkers:
                direction = random.choice(cardinal_directions)
                w.setheading(direction)
                w.forward(10)
            
            if step % 5 == 0:
                screen.update()
        
        screen.update()

    # Brownian motion
    def random_walk_brownian(steps=500):
        """Simulate Brownian motion with small random steps"""
        global total_steps, max_distance
        reset_walker()
        walker.pensize(1)
        
        for _ in range(steps):
            # Small random angle change
            current_heading = walker.heading()
            angle_change = random.uniform(-45, 45)
            walker.setheading(current_heading + angle_change)
            
            if use_colors:
                walker.color(random.choice(["cyan", "lightblue", "blue", "purple"]))
            
            walker.forward(5)
            total_steps += 1
            
            distance = math.sqrt(walker.xcor()**2 + walker.ycor()**2)
            max_distance = max(max_distance, distance)
            
            if bounded and (abs(walker.xcor()) > 400 or abs(walker.ycor()) > 300):
                walker.backward(5)
                walker.setheading(walker.heading() + 180)
            
            if total_steps % 20 == 0:
                update_info()
                screen.update()
        
        walker.pensize(2)
        update_info()
        screen.update()

    # Toggle features
    def toggle_colors():
        """Toggle colorful mode"""
        global use_colors
        use_colors = not use_colors
        print(f"Colors: {'ON' if use_colors else 'OFF'}")

    def toggle_boundary():
        """Toggle bounded walk"""
        global bounded
        bounded = not bounded
        print(f"Boundary: {'ON' if bounded else 'OFF'}")

    # Set up keyboard controls
    def setup_controls():
        """Set up keyboard controls"""
        screen.listen()
        screen.onkey(lambda: random_walk_simple(), "1")
        screen.onkey(lambda: random_walk_continuous(), "2")
        screen.onkey(lambda: random_walk_biased(), "3")
        screen.onkey(lambda: random_walk_levy(), "4")
        screen.onkey(lambda: random_walk_self_avoiding(), "5")
        screen.onkey(random_walk_multiple, "6")
        screen.onkey(lambda: random_walk_brownian(), "7")
        screen.onkey(reset_walker, "r")
        screen.onkey(toggle_colors, "c")
        screen.onkey(toggle_boundary, "b")

    # Draw instructions
    def draw_instructions():
        """Draw control instructions"""
        instructions = turtle.Turtle()
        instructions.hideturtle()
        instructions.penup()
        instructions.color("white")
        instructions.goto(0, -330)
        text = "1: Cardinal | 2: Continuous | 3: Biased | 4: Levy | 5: Self-avoid | 6: Multiple | 7: Brownian | R: Reset | C: Colors | B: Boundary"
        instructions.write(text, align="center", font=("Courier", 8, "normal"))

    # Initialize
    def main():
        """Initialize and start the program"""
        print("=== RANDOM WALK VISUALIZER ===")
        print("\nKeyboard Controls:")
        print("1 - Cardinal Directions Walk")
        print("2 - Continuous (Any Angle) Walk")
        print("3 - Biased Walk (Upward)")
        print("4 - Levy Flight")
        print("5 - Self-Avoiding Walk")
        print("6 - Multiple Walkers")
        print("7 - Brownian Motion")
        print("R - Reset")
        print("C - Toggle Colors")
        print("B - Toggle Boundary")
        print("\nPress a number to start a random walk!")
        
        draw_instructions()
        update_info()
        setup_controls()
        screen.update()

    # Run the program
    if __name__ == '__main__':
        main()
        turtle.done()`
    },
    {
    title: "Turtle Heart Shape",
    category: "turtle",
    description: "Draw a heart using mathematical curves.",
    tags: ["turtle", "shapes", "mathematics"],
    difficulty: 2,
    lines: "~10 lines",
    code: `import turtle
    import math
    import random

    # Set up the screen
    screen = turtle.Screen()
    screen.setup(800, 800)
    screen.bgcolor("black")
    screen.title("Heart Shape Art")
    screen.tracer(0)

    # Create the turtle
    t = turtle.Turtle()
    t.speed(0)
    t.hideturtle()
    t.color("red")
    t.pensize(2)

    # Mathematical heart using parametric equations
    def draw_heart_parametric(scale=10, color="red"):
        """Draw heart using parametric equations"""
        t.clear()
        t.color(color)
        t.penup()
        t.goto(0, -100)
        t.pendown()
        
        for i in range(361):
            angle = math.radians(i)
            x = 16 * math.sin(angle)**3
            y = 13 * math.cos(angle) - 5 * math.cos(2*angle) - 2 * math.cos(3*angle) - math.cos(4*angle)
            t.goto(x * scale, y * scale)
        
        screen.update()

    # Filled heart
    def draw_heart_filled(scale=10, color="red"):
        """Draw a filled heart"""
        t.clear()
        t.color(color)
        t.fillcolor(color)
        t.penup()
        t.goto(0, -100)
        t.pendown()
        t.begin_fill()
        
        for i in range(361):
            angle = math.radians(i)
            x = 16 * math.sin(angle)**3
            y = 13 * math.cos(angle) - 5 * math.cos(2*angle) - 2 * math.cos(3*angle) - math.cos(4*angle)
            t.goto(x * scale, y * scale)
        
        t.end_fill()
        screen.update()

    # Simple heart using curves
    def draw_heart_simple(size=100):
        """Draw heart using simple curves"""
        t.clear()
        t.color("red")
        t.fillcolor("red")
        t.penup()
        t.goto(0, 0)
        t.pendown()
        t.begin_fill()
        
        # Left side
        t.left(140)
        t.forward(size)
        t.circle(-size/2, 200)
        
        # Right side
        t.left(120)
        t.circle(-size/2, 200)
        t.forward(size)
        
        t.end_fill()
        t.setheading(0)
        screen.update()

    # Multiple hearts
    def draw_hearts_multiple():
        """Draw multiple hearts in a pattern"""
        t.clear()
        
        positions = [
            (0, 0, 8, "red"),
            (-150, 100, 5, "pink"),
            (150, 100, 5, "pink"),
            (-150, -150, 5, "hotpink"),
            (150, -150, 5, "hotpink")
        ]
        
        for x, y, scale, color in positions:
            t.color(color)
            t.fillcolor(color)
            t.penup()
            t.goto(x, y - 100)
            t.pendown()
            t.begin_fill()
            
            for i in range(361):
                angle = math.radians(i)
                px = 16 * math.sin(angle)**3
                py = 13 * math.cos(angle) - 5 * math.cos(2*angle) - 2 * math.cos(3*angle) - math.cos(4*angle)
                t.goto(x + px * scale, y + py * scale)
            
            t.end_fill()
        
        screen.update()

    # Gradient heart effect
    def draw_heart_gradient():
        """Draw heart with gradient-like effect"""
        t.clear()
        
        colors = ["#8B0000", "#A52A2A", "#CD5C5C", "#DC143C", "#FF0000", "#FF6347", "#FF69B4", "#FFB6C1"]
        
        for i, color in enumerate(colors):
            scale = 10 - i * 0.8
            t.color(color)
            t.fillcolor(color)
            t.penup()
            t.goto(0, -100)
            t.pendown()
            t.begin_fill()
            
            for j in range(361):
                angle = math.radians(j)
                x = 16 * math.sin(angle)**3
                y = 13 * math.cos(angle) - 5 * math.cos(2*angle) - 2 * math.cos(3*angle) - math.cos(4*angle)
                t.goto(x * scale, y * scale)
            
            t.end_fill()
        
        screen.update()

    # Rotating hearts animation
    def draw_hearts_rotating():
        """Draw rotating hearts animation"""
        t.clear()
        
        for rotation in range(0, 360, 30):
            t.penup()
            t.goto(0, 0)
            t.setheading(rotation)
            t.forward(150)
            
            start_x, start_y = t.xcor(), t.ycor()
            
            t.color("red")
            t.pendown()
            
            for i in range(361):
                angle = math.radians(i)
                x = 16 * math.sin(angle)**3
                y = 13 * math.cos(angle) - 5 * math.cos(2*angle) - 2 * math.cos(3*angle) - math.cos(4*angle)
                t.goto(start_x + x * 3, start_y + y * 3)
        
        screen.update()

    # Heart with message
    def draw_heart_with_message(message="LOVE"):
        """Draw heart with text inside"""
        draw_heart_filled(10, "red")
        
        t.penup()
        t.goto(0, 0)
        t.color("white")
        t.write(message, align="center", font=("Arial", 36, "bold"))
        
        screen.update()

    # Pulsing heart effect
    def draw_heart_pulsing():
        """Draw pulsing heart animation"""
        t.clear()
        
        for pulse in range(5):
            for scale in list(range(8, 13)) + list(range(13, 8, -1)):
                t.clear()
                t.color("red")
                t.fillcolor("red")
                t.penup()
                t.goto(0, -100)
                t.pendown()
                t.begin_fill()
                
                for i in range(361):
                    angle = math.radians(i)
                    x = 16 * math.sin(angle)**3
                    y = 13 * math.cos(angle) - 5 * math.cos(2*angle) - 2 * math.cos(3*angle) - math.cos(4*angle)
                    t.goto(x * scale, y * scale)
                
                t.end_fill()
                screen.update()
        
        screen.update()

    # Heart with sparkles
    def draw_heart_sparkles():
        """Draw heart with sparkle effect"""
        draw_heart_filled(10, "red")
        
        # Add sparkles
        for _ in range(30):
            x = random.randint(-100, 100)
            y = random.randint(-100, 150)
            size = random.randint(3, 8)
            
            t.penup()
            t.goto(x, y)
            t.color("yellow")
            
            # Draw star sparkle
            for _ in range(5):
                t.pendown()
                t.forward(size)
                t.backward(size)
                t.right(72)
            
            t.penup()
        
        screen.update()

    # Rainbow hearts
    def draw_hearts_rainbow():
        """Draw rainbow colored hearts"""
        t.clear()
        
        colors = ["red", "orange", "yellow", "green", "cyan", "blue", "purple"]
        
        for i, color in enumerate(colors):
            scale = 10 - i * 1.2
            t.color(color)
            t.penup()
            t.goto(0, -100)
            t.pendown()
            
            for j in range(361):
                angle = math.radians(j)
                x = 16 * math.sin(angle)**3
                y = 13 * math.cos(angle) - 5 * math.cos(2*angle) - 2 * math.cos(3*angle) - math.cos(4*angle)
                t.goto(x * scale, y * scale)
        
        screen.update()

    # Heart pattern
    def draw_heart_pattern():
        """Draw pattern of small hearts"""
        t.clear()
        
        for y in range(-200, 201, 100):
            for x in range(-300, 301, 100):
                t.color("pink")
                t.penup()
                t.goto(x, y - 50)
                t.pendown()
                
                for i in range(361):
                    angle = math.radians(i)
                    px = 16 * math.sin(angle)**3
                    py = 13 * math.cos(angle) - 5 * math.cos(2*angle) - 2 * math.cos(3*angle) - math.cos(4*angle)
                    t.goto(x + px * 2, y + py * 2)
        
        screen.update()

    # Set up keyboard controls
    def setup_controls():
        """Set up keyboard controls"""
        screen.listen()
        screen.onkey(lambda: draw_heart_parametric(), "1")
        screen.onkey(lambda: draw_heart_filled(), "2")
        screen.onkey(lambda: draw_heart_simple(), "3")
        screen.onkey(draw_hearts_multiple, "4")
        screen.onkey(draw_heart_gradient, "5")
        screen.onkey(draw_hearts_rotating, "6")
        screen.onkey(lambda: draw_heart_with_message("LOVE"), "7")
        screen.onkey(draw_heart_pulsing, "8")
        screen.onkey(draw_heart_sparkles, "9")
        screen.onkey(draw_hearts_rainbow, "0")
        screen.onkey(draw_heart_pattern, "p")
        screen.onkey(lambda: (t.clear(), screen.update()), "x")

    # Draw instructions
    def draw_instructions():
        """Draw control instructions"""
        instructions = turtle.Turtle()
        instructions.hideturtle()
        instructions.penup()
        instructions.color("white")
        instructions.goto(0, -360)
        text = "1: Outline | 2: Filled | 3: Simple | 4: Multiple | 5: Gradient | 6: Rotating | 7: Message | 8: Pulse | 9: Sparkle | 0: Rainbow | P: Pattern"
        instructions.write(text, align="center", font=("Courier", 8, "normal"))

    # Initialize
    def main():
        """Initialize and start the program"""
        print("=== HEART SHAPE ART ===")
        print("\nKeyboard Controls:")
        print("1 - Parametric Heart Outline")
        print("2 - Filled Heart")
        print("3 - Simple Heart")
        print("4 - Multiple Hearts")
        print("5 - Gradient Heart")
        print("6 - Rotating Hearts")
        print("7 - Heart with Message")
        print("8 - Pulsing Heart")
        print("9 - Heart with Sparkles")
        print("0 - Rainbow Hearts")
        print("P - Heart Pattern")
        print("X - Clear Screen")
        
        draw_instructions()
        draw_heart_filled()
        setup_controls()

    # Run the program
    if __name__ == '__main__':
        main()
        turtle.done()`
    },
    {
    title: "Turtle Grid Pattern",
    category: "turtle",
    description: "Create various grid-based patterns and designs with multiple dot layers and color variations.",
    tags: ["turtle", "patterns", "grid", "dots", "layered"],
    difficulty: 2,
    lines: "~35 lines",
    code: `import turtle
    import random

    t = turtle.Turtle()
    t.speed(0)
    t.hideturtle()
    screen = turtle.Screen()
    screen.bgcolor("black")

    size = 20
    colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'cyan', 'magenta']

    # Main grid with larger dots
    for y in range(-200, 201, size):
        for x in range(-200, 201, size):
            t.penup()
            t.goto(x, y)
            t.pendown()
            t.color(random.choice(colors))
            t.dot(8)

    # Offset pattern layer 1
    for y in range(-200, 201, size):
        for x in range(-200, 201, size):
            t.penup()
            t.goto(x + 10, y + 10)
            t.pendown()
            t.color(random.choice(colors))
            t.dot(5)

    # Offset pattern layer 2
    for y in range(-200, 201, size):
        for x in range(-200, 201, size):
            t.penup()
            t.goto(x - 10, y - 10)
            t.pendown()
            t.color(random.choice(colors))
            t.dot(5)

    # Diagonal accent dots
    for y in range(-200, 201, size * 2):
        for x in range(-200, 201, size * 2):
            t.penup()
            t.goto(x, y)
            t.pendown()
            t.color('white')
            t.dot(3)

    # Center highlight
    t.penup()
    t.goto(0, 0)
    t.pendown()
    t.color('white')
    t.dot(15)

    turtle.done()`
    },
    // GUI/Pygame Games Category
    {
    title: "Pygame Snake Game",
    category: "pygame",
    description: "Enhanced snake game with score tracking, game over screen, color effects, and speed progression.",
    tags: ["pygame", "game", "arcade", "snake", "classic"],
    difficulty: 3,
    lines: "~50 lines",
    code: `import pygame
    import random

    pygame.init()
    w, h = 600, 600
    screen = pygame.display.set_mode((w, h))
    pygame.display.set_caption("Snake Game")
    clock = pygame.time.Clock()
    font = pygame.font.Font(None, 36)
    big_font = pygame.font.Font(None, 72)

    snake = [(300, 300), (280, 300), (260, 300)]
    dx, dy = 20, 0
    food = (random.randrange(0, w, 20), random.randrange(0, h, 20))
    score = 0
    speed = 8
    running = True
    game_over = False

    while running:
        for e in pygame.event.get():
            if e.type == pygame.QUIT:
                running = False
            if e.type == pygame.KEYDOWN:
                if not game_over:
                    if e.key == pygame.K_LEFT and dx != 20:
                        dx, dy = -20, 0
                    if e.key == pygame.K_RIGHT and dx != -20:
                        dx, dy = 20, 0
                    if e.key == pygame.K_UP and dy != 20:
                        dx, dy = 0, -20
                    if e.key == pygame.K_DOWN and dy != -20:
                        dx, dy = 0, 20
                else:
                    if e.key == pygame.K_SPACE:
                        snake = [(300, 300), (280, 300), (260, 300)]
                        dx, dy = 20, 0
                        score = 0
                        speed = 8
                        game_over = False
                        food = (random.randrange(0, w, 20), random.randrange(0, h, 20))
        
        if not game_over:
            head = (snake[0][0] + dx, snake[0][1] + dy)
            
            if head in snake or head[0] < 0 or head[1] < 0 or head[0] >= w or head[1] >= h:
                game_over = True
            else:
                snake.insert(0, head)
                
                if head == food:
                    score += 10
                    speed = min(20, speed + 0.5)
                    food = (random.randrange(0, w, 20), random.randrange(0, h, 20))
                    while food in snake:
                        food = (random.randrange(0, w, 20), random.randrange(0, h, 20))
                else:
                    snake.pop()
        
        screen.fill((10, 10, 30))
        
        for x in range(0, w, 20):
            pygame.draw.line(screen, (30, 30, 50), (x, 0), (x, h))
        for y in range(0, h, 20):
            pygame.draw.line(screen, (30, 30, 50), (0, y), (w, y))
        
        for i, (x, y) in enumerate(snake):
            color = (0, 255 - i * 3, 0) if i < 85 else (0, 0, 0)
            pygame.draw.rect(screen, color, (x, y, 20, 20))
            pygame.draw.rect(screen, (0, 180, 0), (x, y, 20, 20), 2)
        
        pulse = abs(pygame.time.get_ticks() % 1000 - 500) / 500
        food_color = (255, int(100 + 155 * pulse), 0)
        pygame.draw.circle(screen, food_color, (food[0] + 10, food[1] + 10), 10)
        
        score_text = font.render(f'Score: {score}', True, (255, 255, 255))
        screen.blit(score_text, (10, 10))
        
        if game_over:
            overlay = pygame.Surface((w, h))
            overlay.set_alpha(200)
            overlay.fill((0, 0, 0))
            screen.blit(overlay, (0, 0))
            
            game_over_text = big_font.render('GAME OVER', True, (255, 50, 50))
            final_score = font.render(f'Final Score: {score}', True, (255, 255, 255))
            restart_text = font.render('Press SPACE to restart', True, (200, 200, 200))
            
            screen.blit(game_over_text, (w//2 - game_over_text.get_width()//2, h//2 - 80))
            screen.blit(final_score, (w//2 - final_score.get_width()//2, h//2))
            screen.blit(restart_text, (w//2 - restart_text.get_width()//2, h//2 + 60))
        
        pygame.display.flip()
        clock.tick(speed)

    pygame.quit()`
    },
    {
    title: "Tetris Clone",
    category: "games",
    description: "Full-featured Tetris game with piece rotation, line clearing, scoring system, level progression, next piece preview, and game over detection.",
    tags: ["pygame", "matrix-manipulation", "game-logic", "tetris", "arcade"],
    difficulty: 4,
    lines: "~120 lines",
    code: `import pygame
    import random
    import copy

    pygame.init()
    w, h = 450, 600
    screen = pygame.display.set_mode((w, h))
    pygame.display.set_caption("Tetris")
    clock = pygame.time.Clock()

    # Game grid
    grid = [[0] * 10 for _ in range(20)]

    # Tetromino shapes
    pieces = [
        [[1, 1, 1, 1]],  # I
        [[2, 2], [2, 2]],  # O
        [[0, 3, 3], [3, 3, 0]],  # S
        [[4, 4, 0], [0, 4, 4]],  # Z
        [[5, 0, 0], [5, 5, 5]],  # L
        [[0, 0, 6], [6, 6, 6]],  # J
        [[0, 7, 0], [7, 7, 7]]   # T
    ]

    colors = [
        (0, 0, 0),  # Empty
        (0, 255, 255),  # I - Cyan
        (255, 255, 0),  # O - Yellow
        (0, 255, 0),    # S - Green
        (255, 0, 0),    # Z - Red
        (255, 165, 0),  # L - Orange
        (0, 0, 255),    # J - Blue
        (128, 0, 128)   # T - Purple
    ]

    font = pygame.font.Font(None, 36)
    small_font = pygame.font.Font(None, 24)

    def collide(shape, offset):
        x, y = offset
        for j, row in enumerate(shape):
            for i, val in enumerate(row):
                if val:
                    ny, nx = y + j, x + i
                    if ny >= 20 or nx < 0 or nx >= 10 or (ny >= 0 and grid[ny][nx]):
                        return True
        return False

    def place(shape, offset, color_val):
        x, y = offset
        for j, row in enumerate(shape):
            for i, val in enumerate(row):
                if val and y + j >= 0:
                    grid[y + j][x + i] = color_val

    def clear_lines():
        lines_cleared = 0
        new_grid = []
        for row in grid:
            if 0 in row:
                new_grid.append(row)
            else:
                lines_cleared += 1
        
        while len(new_grid) < 20:
            new_grid.insert(0, [0] * 10)
        
        return new_grid, lines_cleared

    def rotate(shape):
        return [list(row) for row in zip(*shape[::-1])]

    def draw_grid():
        # Draw blocks
        for y, row in enumerate(grid):
            for x, val in enumerate(row):
                if val:
                    pygame.draw.rect(screen, colors[val], (x * 30, y * 30, 30, 30))
                    pygame.draw.rect(screen, (50, 50, 50), (x * 30, y * 30, 30, 30), 1)
        
        # Draw grid lines
        for x in range(11):
            pygame.draw.line(screen, (50, 50, 50), (x * 30, 0), (x * 30, 600))
        for y in range(21):
            pygame.draw.line(screen, (50, 50, 50), (0, y * 30), (300, y * 30))

    def draw_piece(shape, offset, color_val):
        x, y = offset
        for j, row in enumerate(shape):
            for i, val in enumerate(row):
                if val:
                    pygame.draw.rect(screen, colors[color_val], ((x + i) * 30, (y + j) * 30, 30, 30))
                    pygame.draw.rect(screen, (50, 50, 50), ((x + i) * 30, (y + j) * 30, 30, 30), 1)

    def draw_next_piece(shape, color_val):
        pygame.draw.rect(screen, (30, 30, 30), (320, 50, 120, 120))
        pygame.draw.rect(screen, (100, 100, 100), (320, 50, 120, 120), 2)
        
        next_text = small_font.render('NEXT', True, (255, 255, 255))
        screen.blit(next_text, (350, 20))
        
        offset_x = 335 + (4 - len(shape[0])) * 10
        offset_y = 75 + (4 - len(shape)) * 10
        
        for j, row in enumerate(shape):
            for i, val in enumerate(row):
                if val:
                    pygame.draw.rect(screen, colors[color_val], 
                                (offset_x + i * 20, offset_y + j * 20, 18, 18))

    def draw_ui(score, level, lines):
        score_text = font.render(f'Score: {score}', True, (255, 255, 255))
        level_text = small_font.render(f'Level: {level}', True, (255, 255, 255))
        lines_text = small_font.render(f'Lines: {lines}', True, (255, 255, 255))
        
        screen.blit(score_text, (320, 200))
        screen.blit(level_text, (320, 250))
        screen.blit(lines_text, (320, 280))

    # Initialize game variables
    current = copy.deepcopy(random.choice(pieces))
    current_color = pieces.index(current) + 1
    next_piece = copy.deepcopy(random.choice(pieces))
    next_color = pieces.index(next_piece) + 1

    cx, cy = 3, -2
    fall_time = 0
    score = 0
    lines_cleared_total = 0
    level = 1
    fall_speed = 30
    game_over = False

    move_delay = 0
    rotate_pressed = False

    running = True
    while running:
        for e in pygame.event.get():
            if e.type == pygame.QUIT:
                running = False
            if e.type == pygame.KEYDOWN and game_over:
                if e.key == pygame.K_SPACE:
                    grid = [[0] * 10 for _ in range(20)]
                    score = 0
                    lines_cleared_total = 0
                    level = 1
                    fall_speed = 30
                    game_over = False
                    current = copy.deepcopy(random.choice(pieces))
                    current_color = pieces.index(current) + 1
                    next_piece = copy.deepcopy(random.choice(pieces))
                    next_color = pieces.index(next_piece) + 1
                    cx, cy = 3, -2
        
        if not game_over:
            keys = pygame.key.get_pressed()
            
            # Horizontal movement
            if move_delay <= 0:
                if keys[pygame.K_LEFT] and not collide(current, (cx - 1, cy)):
                    cx -= 1
                    move_delay = 5
                if keys[pygame.K_RIGHT] and not collide(current, (cx + 1, cy)):
                    cx += 1
                    move_delay = 5
            else:
                move_delay -= 1
            
            # Fast drop
            if keys[pygame.K_DOWN]:
                if not collide(current, (cx, cy + 1)):
                    cy += 1
                    score += 1
            
            # Rotation
            if keys[pygame.K_UP] and not rotate_pressed:
                rotated = rotate(current)
                if not collide(rotated, (cx, cy)):
                    current = rotated
                rotate_pressed = True
            elif not keys[pygame.K_UP]:
                rotate_pressed = False
            
            # Falling
            fall_time += 1
            if fall_time > fall_speed:
                fall_time = 0
                if not collide(current, (cx, cy + 1)):
                    cy += 1
                else:
                    # Lock piece
                    place(current, (cx, cy), current_color)
                    grid, lines = clear_lines()
                    
                    if lines > 0:
                        lines_cleared_total += lines
                        score += [0, 100, 300, 500, 800][lines] * level
                        level = lines_cleared_total // 10 + 1
                        fall_speed = max(5, 30 - (level - 1) * 2)
                    
                    # Get next piece
                    current = next_piece
                    current_color = next_color
                    next_piece = copy.deepcopy(random.choice(pieces))
                    next_color = pieces.index(next_piece) + 1
                    
                    cx, cy = 3, -2
                    
                    # Check game over
                    if collide(current, (cx, cy)):
                        game_over = True
        
        # Drawing
        screen.fill((20, 20, 20))
        
        # Draw game board
        draw_grid()
        
        if not game_over:
            draw_piece(current, (cx, cy), current_color)
        
        # Draw side panel
        pygame.draw.rect(screen, (40, 40, 40), (300, 0, 150, 600))
        draw_next_piece(next_piece, next_color)
        draw_ui(score, level, lines_cleared_total)
        
        # Game over screen
        if game_over:
            overlay = pygame.Surface((300, 600))
            overlay.set_alpha(200)
            overlay.fill((0, 0, 0))
            screen.blit(overlay, (0, 0))
            
            game_over_text = font.render('GAME OVER', True, (255, 0, 0))
            restart_text = small_font.render('Press SPACE', True, (255, 255, 255))
            
            screen.blit(game_over_text, (150 - game_over_text.get_width() // 2, 250))
            screen.blit(restart_text, (150 - restart_text.get_width() // 2, 300))
        
        pygame.display.flip()
        clock.tick(60)

    pygame.quit()`
    },
    {
    title: "Pong Game",
    category: "games",
    description: "Enhanced two-player Pong game with paddle controls, ball physics, scoring system, speed progression, and visual effects.",
    tags: ["pygame", "collision-detection", "physics", "pong", "multiplayer"],
    difficulty: 2,
    lines: "~80 lines",
    code: `import pygame
    import random
    import math

    pygame.init()
    w, h = 800, 600
    screen = pygame.display.set_mode((w, h))
    pygame.display.set_caption("Pong")
    clock = pygame.time.Clock()
    font = pygame.font.Font(None, 74)
    small_font = pygame.font.Font(None, 36)

    # Paddle positions [x, y]
    p1 = [30, h // 2 - 50]
    p2 = [w - 40, h // 2 - 50]
    paddle_width, paddle_height = 15, 100
    paddle_speed = 7

    # Ball
    ball = [w // 2, h // 2]
    ball_radius = 10
    ball_speed = 5
    angle = random.choice([random.uniform(-45, 45), random.uniform(135, 225)])
    dx = ball_speed * math.cos(math.radians(angle))
    dy = ball_speed * math.sin(math.radians(angle))

    # Scores
    score1, score2 = 0, 0
    max_score = 5

    # Particles for visual effects
    particles = []

    def reset_ball(direction):
        global dx, dy, ball_speed
        ball[0] = w // 2
        ball[1] = h // 2
        ball_speed = 5
        
        if direction == 'left':
            angle = random.uniform(-30, 30)
        else:
            angle = random.uniform(150, 210)
        
        dx = ball_speed * math.cos(math.radians(angle))
        dy = ball_speed * math.sin(math.radians(angle))

    def create_particles(x, y, color):
        for _ in range(15):
            angle = random.uniform(0, 2 * math.pi)
            speed = random.uniform(2, 6)
            particles.append({
                'x': x,
                'y': y,
                'dx': math.cos(angle) * speed,
                'dy': math.sin(angle) * speed,
                'life': 30,
                'color': color
            })

    def draw_dashed_line():
        for y in range(0, h, 20):
            pygame.draw.rect(screen, (100, 100, 100), (w // 2 - 2, y, 4, 10))

    running = True
    game_over = False
    winner = ""

    while running:
        for e in pygame.event.get():
            if e.type == pygame.QUIT:
                running = False
            if e.type == pygame.KEYDOWN and game_over:
                if e.key == pygame.K_SPACE:
                    score1, score2 = 0, 0
                    game_over = False
                    reset_ball(random.choice(['left', 'right']))
        
        if not game_over:
            # Paddle controls
            keys = pygame.key.get_pressed()
            if keys[pygame.K_w] and p1[1] > 0:
                p1[1] -= paddle_speed
            if keys[pygame.K_s] and p1[1] < h - paddle_height:
                p1[1] += paddle_speed
            if keys[pygame.K_UP] and p2[1] > 0:
                p2[1] -= paddle_speed
            if keys[pygame.K_DOWN] and p2[1] < h - paddle_height:
                p2[1] += paddle_speed
            
            # Ball movement
            ball[0] += dx
            ball[1] += dy
            
            # Ball collision with top/bottom walls
            if ball[1] - ball_radius < 0 or ball[1] + ball_radius > h:
                dy *= -1
                ball[1] = max(ball_radius, min(h - ball_radius, ball[1]))
                create_particles(ball[0], ball[1], (255, 255, 255))
            
            # Paddle collision detection
            # Left paddle
            if (p1[0] < ball[0] - ball_radius < p1[0] + paddle_width and 
                p1[1] < ball[1] < p1[1] + paddle_height):
                dx = abs(dx)
                ball_speed = min(ball_speed + 0.5, 12)
                
                # Add spin based on where ball hits paddle
                hit_pos = (ball[1] - p1[1]) / paddle_height - 0.5
                dy += hit_pos * 3
                
                dx = ball_speed * math.cos(math.atan2(dy, dx))
                create_particles(ball[0], ball[1], (255, 100, 100))
            
            # Right paddle
            if (p2[0] < ball[0] + ball_radius < p2[0] + paddle_width and 
                p2[1] < ball[1] < p2[1] + paddle_height):
                dx = -abs(dx)
                ball_speed = min(ball_speed + 0.5, 12)
                
                # Add spin based on where ball hits paddle
                hit_pos = (ball[1] - p2[1]) / paddle_height - 0.5
                dy += hit_pos * 3
                
                dx = -ball_speed * math.cos(math.atan2(dy, abs(dx)))
                create_particles(ball[0], ball[1], (100, 100, 255))
            
            # Scoring
            if ball[0] < 0:
                score2 += 1
                create_particles(ball[0], ball[1], (255, 0, 0))
                if score2 >= max_score:
                    game_over = True
                    winner = "Player 2"
                else:
                    reset_ball('right')
            
            if ball[0] > w:
                score1 += 1
                create_particles(ball[0], ball[1], (255, 0, 0))
                if score1 >= max_score:
                    game_over = True
                    winner = "Player 1"
                else:
                    reset_ball('left')
        
        # Update particles
        for particle in particles[:]:
            particle['x'] += particle['dx']
            particle['y'] += particle['dy']
            particle['life'] -= 1
            if particle['life'] <= 0:
                particles.remove(particle)
        
        # Drawing
        screen.fill((20, 20, 30))
        
        # Draw center line
        draw_dashed_line()
        
        # Draw particles
        for particle in particles:
            alpha = particle['life'] / 30
            size = int(4 * alpha)
            pygame.draw.circle(screen, particle['color'], 
                            (int(particle['x']), int(particle['y'])), size)
        
        # Draw paddles with glow effect
        pygame.draw.rect(screen, (255, 50, 50), (*p1, paddle_width, paddle_height))
        pygame.draw.rect(screen, (255, 100, 100), (p1[0] - 2, p1[1] - 2, 
                        paddle_width + 4, paddle_height + 4), 2)
        
        pygame.draw.rect(screen, (50, 50, 255), (*p2, paddle_width, paddle_height))
        pygame.draw.rect(screen, (100, 100, 255), (p2[0] - 2, p2[1] - 2, 
                        paddle_width + 4, paddle_height + 4), 2)
        
        # Draw ball with trail effect
        trail_positions = 5
        for i in range(trail_positions):
            trail_x = ball[0] - dx * i * 0.3
            trail_y = ball[1] - dy * i * 0.3
            alpha = 255 - i * 50
            trail_color = (alpha, alpha, alpha)
            pygame.draw.circle(screen, trail_color, 
                            (int(trail_x), int(trail_y)), 
                            ball_radius - i)
        
        pygame.draw.circle(screen, (255, 255, 255), 
                        (int(ball[0]), int(ball[1])), ball_radius)
        
        # Draw scores
        score_text1 = font.render(str(score1), True, (255, 100, 100))
        score_text2 = font.render(str(score2), True, (100, 100, 255))
        screen.blit(score_text1, (w // 4 - score_text1.get_width() // 2, 30))
        screen.blit(score_text2, (3 * w // 4 - score_text2.get_width() // 2, 30))
        
        # Draw controls hint
        controls1 = small_font.render('W/S', True, (150, 150, 150))
        controls2 = small_font.render('UP/DOWN', True, (150, 150, 150))
        screen.blit(controls1, (20, h - 40))
        screen.blit(controls2, (w - 120, h - 40))
        
        # Game over screen
        if game_over:
            overlay = pygame.Surface((w, h))
            overlay.set_alpha(200)
            overlay.fill((0, 0, 0))
            screen.blit(overlay, (0, 0))
            
            winner_text = font.render(f'{winner} Wins!', True, (255, 255, 0))
            restart_text = small_font.render('Press SPACE to restart', True, (200, 200, 200))
            
            screen.blit(winner_text, (w // 2 - winner_text.get_width() // 2, h // 2 - 50))
            screen.blit(restart_text, (w // 2 - restart_text.get_width() // 2, h // 2 + 20))
        
        pygame.display.flip()
        clock.tick(60)

    pygame.quit()`
    },
    {
    title: "Space Invaders",
    category: "games",
    description: "Enhanced retro space shooter with enemy waves, enemy bullets, power-ups, shields, score system, and increasing difficulty levels.",
    tags: ["pygame", "sprites", "collision-detection", "shooter", "arcade"],
    difficulty: 4,
    lines: "~150 lines",
    code: `import pygame
    import random
    import math

    pygame.init()
    w, h = 800, 600
    screen = pygame.display.set_mode((w, h))
    pygame.display.set_caption("Space Invaders")
    clock = pygame.time.Clock()
    font = pygame.font.Font(None, 36)
    small_font = pygame.font.Font(None, 24)

    # Player
    player = [w // 2 - 20, h - 80]
    player_width, player_height = 40, 30
    player_speed = 6
    player_lives = 3

    # Bullets
    bullets = []
    bullet_speed = 12
    bullet_cooldown = 0

    # Enemy bullets
    enemy_bullets = []
    enemy_shoot_cooldown = 0

    # Enemies
    enemies = []
    enemy_rows = 4
    enemy_cols = 10
    enemy_width, enemy_height = 40, 30
    enemy_spacing_x = 60
    enemy_spacing_y = 50
    dx_enemy = 2
    dy_enemy = 0
    move_down = False

    # Shields
    shields = []
    for i in range(4):
        shield_x = 100 + i * 180
        shield_blocks = []
        for row in range(3):
            for col in range(8):
                if not (row == 2 and (col == 0 or col == 7)):
                    shield_blocks.append([shield_x + col * 8, 450 + row * 8])
        shields.append(shield_blocks)

    # Power-ups
    powerups = []

    # Particles
    particles = []

    # Game state
    score = 0
    level = 1
    game_over = False
    wave_cleared = False

    def create_enemies():
        global enemies, dx_enemy
        enemies = []
        start_y = 80 + (level - 1) * 10
        for row in range(enemy_rows):
            for col in range(enemy_cols):
                x = 100 + col * enemy_spacing_x
                y = start_y + row * enemy_spacing_y
                enemy_type = min(row // 2, 2)
                enemies.append({'x': x, 'y': y, 'type': enemy_type})
        dx_enemy = 2 + level * 0.5

    def create_particles(x, y, color, count=20):
        for _ in range(count):
            angle = random.uniform(0, 2 * math.pi)
            speed = random.uniform(2, 8)
            particles.append({
                'x': x,
                'y': y,
                'dx': math.cos(angle) * speed,
                'dy': math.sin(angle) * speed,
                'life': 30,
                'color': color
            })

    def spawn_powerup(x, y):
        if random.random() < 0.15:
            powerup_type = random.choice(['health', 'rapid', 'shield'])
            powerups.append({'x': x, 'y': y, 'type': powerup_type, 'dy': 2})

    create_enemies()

    running = True
    rapid_fire = 0
    shield_active = 0

    while running:
        dt = clock.tick(60) / 1000.0
        
        for e in pygame.event.get():
            if e.type == pygame.QUIT:
                running = False
            if e.type == pygame.KEYDOWN and game_over:
                if e.key == pygame.K_SPACE:
                    player = [w // 2 - 20, h - 80]
                    player_lives = 3
                    score = 0
                    level = 1
                    bullets = []
                    enemy_bullets = []
                    powerups = []
                    particles = []
                    game_over = False
                    create_enemies()
        
        if not game_over:
            # Player controls
            keys = pygame.key.get_pressed()
            if keys[pygame.K_LEFT] and player[0] > 0:
                player[0] -= player_speed
            if keys[pygame.K_RIGHT] and player[0] < w - player_width:
                player[0] += player_speed
            
            # Shooting
            if bullet_cooldown > 0:
                bullet_cooldown -= 1
            
            shoot_delay = 5 if rapid_fire > 0 else 15
            if keys[pygame.K_SPACE] and bullet_cooldown <= 0:
                bullets.append({'x': player[0] + player_width // 2 - 2, 
                            'y': player[1], 'width': 4, 'height': 15})
                bullet_cooldown = shoot_delay
            
            # Update bullets
            for b in bullets[:]:
                b['y'] -= bullet_speed
                if b['y'] < 0:
                    bullets.remove(b)
            
            # Enemy movement
            move_down = False
            for enemy in enemies:
                enemy['x'] += dx_enemy
                if enemy['x'] < 20 or enemy['x'] > w - enemy_width - 20:
                    move_down = True
            
            if move_down:
                dx_enemy *= -1
                for enemy in enemies:
                    enemy['y'] += 30
                    if enemy['y'] > h - 150:
                        game_over = True
            
            # Enemy shooting
            if enemies and random.random() < 0.02:
                shooter = random.choice(enemies)
                enemy_bullets.append({'x': shooter['x'] + enemy_width // 2, 
                                    'y': shooter['y'] + enemy_height})
            
            # Update enemy bullets
            for eb in enemy_bullets[:]:
                eb['y'] += 5
                if eb['y'] > h:
                    enemy_bullets.remove(eb)
            
            # Bullet-enemy collision
            for b in bullets[:]:
                for enemy in enemies[:]:
                    if (enemy['x'] < b['x'] < enemy['x'] + enemy_width and
                        enemy['y'] < b['y'] < enemy['y'] + enemy_height):
                        bullets.remove(b)
                        enemies.remove(enemy)
                        score += (enemy['type'] + 1) * 10
                        colors = [(255, 0, 0), (255, 165, 0), (255, 255, 0)]
                        create_particles(enemy['x'] + enemy_width // 2, 
                                    enemy['y'] + enemy_height // 2, 
                                    colors[enemy['type']])
                        spawn_powerup(enemy['x'], enemy['y'])
                        break
            
            # Bullet-shield collision
            for b in bullets[:]:
                for shield in shields:
                    for block in shield[:]:
                        if (block[0] < b['x'] < block[0] + 8 and
                            block[1] < b['y'] < block[1] + 8):
                            if b in bullets:
                                bullets.remove(b)
                            shield.remove(block)
                            break
            
            # Enemy bullet-shield collision
            for eb in enemy_bullets[:]:
                for shield in shields:
                    for block in shield[:]:
                        if (block[0] < eb['x'] < block[0] + 8 and
                            block[1] < eb['y'] < block[1] + 8):
                            if eb in enemy_bullets:
                                enemy_bullets.remove(eb)
                            shield.remove(block)
                            break
            
            # Enemy bullet-player collision
            if shield_active <= 0:
                for eb in enemy_bullets[:]:
                    if (player[0] < eb['x'] < player[0] + player_width and
                        player[1] < eb['y'] < player[1] + player_height):
                        enemy_bullets.remove(eb)
                        player_lives -= 1
                        create_particles(player[0] + player_width // 2, 
                                    player[1] + player_height // 2, 
                                    (0, 255, 0), 30)
                        if player_lives <= 0:
                            game_over = True
            
            # Update powerups
            for powerup in powerups[:]:
                powerup['y'] += powerup['dy']
                if powerup['y'] > h:
                    powerups.remove(powerup)
                elif (player[0] < powerup['x'] + 20 < player[0] + player_width and
                    player[1] < powerup['y'] + 20 < player[1] + player_height):
                    if powerup['type'] == 'health' and player_lives < 5:
                        player_lives += 1
                    elif powerup['type'] == 'rapid':
                        rapid_fire = 300
                    elif powerup['type'] == 'shield':
                        shield_active = 300
                    powerups.remove(powerup)
                    create_particles(powerup['x'], powerup['y'], (255, 255, 0), 15)
            
            # Update particles
            for particle in particles[:]:
                particle['x'] += particle['dx']
                particle['y'] += particle['dy']
                particle['dy'] += 0.3
                particle['life'] -= 1
                if particle['life'] <= 0:
                    particles.remove(particle)
            
            # Decrease powerup timers
            if rapid_fire > 0:
                rapid_fire -= 1
            if shield_active > 0:
                shield_active -= 1
            
            # Check for wave cleared
            if not enemies:
                level += 1
                create_enemies()
                shields = []
                for i in range(4):
                    shield_x = 100 + i * 180
                    shield_blocks = []
                    for row in range(3):
                        for col in range(8):
                            if not (row == 2 and (col == 0 or col == 7)):
                                shield_blocks.append([shield_x + col * 8, 450 + row * 8])
                    shields.append(shield_blocks)
        
        # Drawing
        screen.fill((10, 10, 30))
        
        # Draw stars background
        for i in range(50):
            star_x = (i * 137) % w
            star_y = (i * 211 + pygame.time.get_ticks() // 50) % h
            pygame.draw.circle(screen, (100, 100, 150), (star_x, star_y), 1)
        
        # Draw particles
        for particle in particles:
            alpha = particle['life'] / 30
            size = int(3 * alpha) + 1
            pygame.draw.circle(screen, particle['color'], 
                            (int(particle['x']), int(particle['y'])), size)
        
        # Draw shields
        for shield in shields:
            for block in shield:
                pygame.draw.rect(screen, (0, 255, 255), (*block, 8, 8))
        
        # Draw player
        player_color = (100, 255, 100)
        pygame.draw.polygon(screen, player_color, [
            (player[0] + player_width // 2, player[1]),
            (player[0], player[1] + player_height),
            (player[0] + player_width, player[1] + player_height)
        ])
        
        # Draw shield effect
        if shield_active > 0:
            shield_alpha = min(150, shield_active * 0.5)
            for i in range(3):
                pygame.draw.circle(screen, (100, 200, 255), 
                                (player[0] + player_width // 2, player[1] + player_height // 2),
                                30 + i * 5, 2)
        
        # Draw bullets
        for b in bullets:
            pygame.draw.rect(screen, (255, 255, 100), (b['x'], b['y'], b['width'], b['height']))
        
        # Draw enemy bullets
        for eb in enemy_bullets:
            pygame.draw.circle(screen, (255, 0, 255), (int(eb['x']), int(eb['y'])), 4)
        
        # Draw enemies
        for enemy in enemies:
            colors = [(255, 50, 50), (255, 150, 50), (255, 255, 50)]
            color = colors[enemy['type']]
            pygame.draw.rect(screen, color, (enemy['x'], enemy['y'], enemy_width, enemy_height))
            pygame.draw.rect(screen, (200, 200, 200), (enemy['x'], enemy['y'], enemy_width, enemy_height), 2)
        
        # Draw powerups
        powerup_colors = {'health': (0, 255, 0), 'rapid': (255, 255, 0), 'shield': (0, 200, 255)}
        for powerup in powerups:
            color = powerup_colors[powerup['type']]
            pygame.draw.circle(screen, color, (int(powerup['x'] + 10), int(powerup['y'] + 10)), 10)
            pygame.draw.circle(screen, (255, 255, 255), (int(powerup['x'] + 10), int(powerup['y'] + 10)), 10, 2)
        
        # Draw UI
        score_text = font.render(f'Score: {score}', True, (255, 255, 255))
        level_text = small_font.render(f'Level: {level}', True, (255, 255, 255))
        screen.blit(score_text, (10, 10))
        screen.blit(level_text, (10, 50))
        
        # Draw lives
        for i in range(player_lives):
            pygame.draw.polygon(screen, (0, 255, 0), [
                (w - 50 - i * 35 + 15, 20),
                (w - 50 - i * 35, 40),
                (w - 50 - i * 35 + 30, 40)
            ])
        
        # Draw powerup indicators
        if rapid_fire > 0:
            rapid_text = small_font.render(f'Rapid: {rapid_fire // 60}s', True, (255, 255, 0))
            screen.blit(rapid_text, (10, 80))
        if shield_active > 0:
            shield_text = small_font.render(f'Shield: {shield_active // 60}s', True, (0, 200, 255))
            screen.blit(shield_text, (10, 110))
        
        # Game over screen
        if game_over:
            overlay = pygame.Surface((w, h))
            overlay.set_alpha(200)
            overlay.fill((0, 0, 0))
            screen.blit(overlay, (0, 0))
            
            game_over_text = font.render('GAME OVER', True, (255, 0, 0))
            final_score = small_font.render(f'Final Score: {score}', True, (255, 255, 255))
            restart_text = small_font.render('Press SPACE to restart', True, (200, 200, 200))
            
            screen.blit(game_over_text, (w // 2 - game_over_text.get_width() // 2, h // 2 - 60))
            screen.blit(final_score, (w // 2 - final_score.get_width() // 2, h // 2))
            screen.blit(restart_text, (w // 2 - restart_text.get_width() // 2, h // 2 + 40))
        
        pygame.display.flip()

    pygame.quit()`
    },
    {
    title: "Flappy Bird Clone",
    category: "games",
    description: "Enhanced side-scrolling game where you navigate a bird through pipes with scoring, animations, particle effects, and difficulty progression.",
    tags: ["pygame", "gravity", "endless-runner", "flappy-bird", "arcade"],
    difficulty: 3,
    lines: "~120 lines",
    code: `import pygame
    import random
    import math

    pygame.init()
    w, h = 400, 700
    screen = pygame.display.set_mode((w, h))
    pygame.display.set_caption("Flappy Bird")
    clock = pygame.time.Clock()
    font = pygame.font.Font(None, 72)
    small_font = pygame.font.Font(None, 36)

    # Bird
    bird = {'x': 80, 'y': h // 2, 'vy': 0, 'angle': 0}
    bird_radius = 15
    gravity = 0.6
    jump_strength = -10
    flap_cooldown = 0

    # Pipes
    pipes = []
    pipe_width = 70
    pipe_gap = 180
    pipe_speed = 3
    pipe_spacing = 200
    next_pipe_x = 400

    # Ground
    ground_x = 0
    ground_speed = 3

    # Game state
    score = 0
    high_score = 0
    game_over = False
    game_started = False

    # Particles
    particles = []

    # Clouds
    clouds = []
    for i in range(5):
        clouds.append({
            'x': random.randint(0, w),
            'y': random.randint(50, 250),
            'size': random.randint(40, 80),
            'speed': random.uniform(0.3, 0.8)
        })

    def create_pipe():
        gap_y = random.randint(150, h - 250)
        return {
            'x': w,
            'gap_y': gap_y,
            'scored': False
        }

    def create_particles(x, y, color, count=15):
        for _ in range(count):
            angle = random.uniform(0, 2 * math.pi)
            speed = random.uniform(2, 6)
            particles.append({
                'x': x,
                'y': y,
                'dx': math.cos(angle) * speed,
                'dy': math.sin(angle) * speed,
                'life': 40,
                'color': color
            })

    def reset_game():
        global bird, pipes, score, game_over, game_started, next_pipe_x, ground_x, particles
        bird = {'x': 80, 'y': h // 2, 'vy': 0, 'angle': 0}
        pipes = []
        score = 0
        game_over = False
        game_started = False
        next_pipe_x = 400
        ground_x = 0
        particles = []

    def draw_bird():
        # Bird body
        color = (255, 255, 100) if not game_over else (150, 150, 150)
        pygame.draw.circle(screen, color, (int(bird['x']), int(bird['y'])), bird_radius)
        
        # Eye
        eye_x = int(bird['x'] + 5)
        eye_y = int(bird['y'] - 3)
        pygame.draw.circle(screen, (255, 255, 255), (eye_x, eye_y), 5)
        pygame.draw.circle(screen, (0, 0, 0), (eye_x + 2, eye_y), 3)
        
        # Beak
        beak_angle = bird['angle'] * math.pi / 180
        beak_points = [
            (bird['x'] + bird_radius, bird['y']),
            (bird['x'] + bird_radius + 12, bird['y'] - 3),
            (bird['x'] + bird_radius + 12, bird['y'] + 3)
        ]
        pygame.draw.polygon(screen, (255, 150, 0), beak_points)
        
        # Wing
        wing_offset_y = math.sin(pygame.time.get_ticks() * 0.01) * 3
        wing_x = int(bird['x'] - 8)
        wing_y = int(bird['y'] + wing_offset_y)
        pygame.draw.ellipse(screen, (255, 200, 100), (wing_x, wing_y, 12, 8))

    def draw_pipe(pipe):
        # Top pipe
        pygame.draw.rect(screen, (100, 200, 100), 
                        (pipe['x'], 0, pipe_width, pipe['gap_y']))
        pygame.draw.rect(screen, (80, 180, 80), 
                        (pipe['x'], 0, pipe_width, pipe['gap_y']), 3)
        # Top pipe cap
        pygame.draw.rect(screen, (120, 220, 120), 
                        (pipe['x'] - 5, pipe['gap_y'] - 25, pipe_width + 10, 25))
        pygame.draw.rect(screen, (80, 180, 80), 
                        (pipe['x'] - 5, pipe['gap_y'] - 25, pipe_width + 10, 25), 3)
        
        # Bottom pipe
        bottom_y = pipe['gap_y'] + pipe_gap
        pygame.draw.rect(screen, (100, 200, 100), 
                        (pipe['x'], bottom_y + 25, pipe_width, h - bottom_y))
        pygame.draw.rect(screen, (80, 180, 80), 
                        (pipe['x'], bottom_y + 25, pipe_width, h - bottom_y), 3)
        # Bottom pipe cap
        pygame.draw.rect(screen, (120, 220, 120), 
                        (pipe['x'] - 5, bottom_y, pipe_width + 10, 25))
        pygame.draw.rect(screen, (80, 180, 80), 
                        (pipe['x'] - 5, bottom_y, pipe_width + 10, 25), 3)

    def check_collision(pipe):
        # Check if bird is in pipe x range
        if pipe['x'] < bird['x'] + bird_radius and pipe['x'] + pipe_width > bird['x'] - bird_radius:
            # Check if bird hits top or bottom pipe
            if bird['y'] - bird_radius < pipe['gap_y'] or bird['y'] + bird_radius > pipe['gap_y'] + pipe_gap:
                return True
        return False

    # Initial pipes
    for i in range(3):
        pipes.append(create_pipe())
        pipes[-1]['x'] = 400 + i * pipe_spacing

    running = True
    while running:
        for e in pygame.event.get():
            if e.type == pygame.QUIT:
                running = False
            if e.type == pygame.KEYDOWN:
                if e.key == pygame.K_SPACE:
                    if game_over:
                        reset_game()
                    elif not game_started:
                        game_started = True
                        bird['vy'] = jump_strength
                        flap_cooldown = 15
                    elif flap_cooldown <= 0:
                        bird['vy'] = jump_strength
                        flap_cooldown = 15
                        create_particles(bird['x'], bird['y'], (255, 255, 200), 8)
        
        if game_started and not game_over:
            # Bird physics
            bird['vy'] += gravity
            bird['y'] += bird['vy']
            
            # Bird rotation based on velocity
            bird['angle'] = max(-30, min(30, -bird['vy'] * 3))
            
            # Update flap cooldown
            if flap_cooldown > 0:
                flap_cooldown -= 1
            
            # Check ground and ceiling collision
            if bird['y'] + bird_radius > h - 100 or bird['y'] - bird_radius < 0:
                game_over = True
                create_particles(bird['x'], bird['y'], (255, 0, 0), 30)
                if score > high_score:
                    high_score = score
            
            # Move pipes
            for pipe in pipes:
                pipe['x'] -= pipe_speed
                
                # Check collision
                if check_collision(pipe):
                    game_over = True
                    create_particles(bird['x'], bird['y'], (255, 0, 0), 30)
                    if score > high_score:
                        high_score = score
                
                # Score when passing pipe
                if not pipe['scored'] and pipe['x'] + pipe_width < bird['x']:
                    pipe['scored'] = True
                    score += 1
                    create_particles(bird['x'] + 30, bird['y'], (255, 255, 0), 10)
            
            # Remove off-screen pipes and add new ones
            if pipes and pipes[0]['x'] < -pipe_width:
                pipes.pop(0)
            
            if pipes[-1]['x'] < w - pipe_spacing:
                pipes.append(create_pipe())
            
            # Move ground
            ground_x -= ground_speed
            if ground_x <= -50:
                ground_x = 0
        
        # Update clouds
        for cloud in clouds:
            cloud['x'] -= cloud['speed']
            if cloud['x'] < -cloud['size']:
                cloud['x'] = w + cloud['size']
                cloud['y'] = random.randint(50, 250)
        
        # Update particles
        for particle in particles[:]:
            particle['x'] += particle['dx']
            particle['y'] += particle['dy']
            particle['dy'] += 0.3
            particle['life'] -= 1
            if particle['life'] <= 0:
                particles.remove(particle)
        
        # Drawing
        # Sky gradient
        for y in range(h):
            color_factor = y / h
            sky_color = (
                int(135 + (50 * color_factor)),
                int(206 + (30 * color_factor)),
                int(235 + (20 * color_factor))
            )
            pygame.draw.line(screen, sky_color, (0, y), (w, y))
        
        # Draw clouds
        for cloud in clouds:
            pygame.draw.ellipse(screen, (255, 255, 255), 
                            (cloud['x'], cloud['y'], cloud['size'], cloud['size'] * 0.6))
            pygame.draw.ellipse(screen, (255, 255, 255), 
                            (cloud['x'] + cloud['size'] * 0.3, cloud['y'] - 10, 
                            cloud['size'] * 0.7, cloud['size'] * 0.5))
        
        # Draw pipes
        for pipe in pipes:
            draw_pipe(pipe)
        
        # Draw particles
        for particle in particles:
            alpha = particle['life'] / 40
            size = int(4 * alpha) + 1
            pygame.draw.circle(screen, particle['color'], 
                            (int(particle['x']), int(particle['y'])), size)
        
        # Draw bird
        draw_bird()
        
        # Draw ground
        for x in range(-50, w + 50, 50):
            ground_pos_x = x + ground_x
            pygame.draw.rect(screen, (222, 184, 135), (ground_pos_x, h - 100, 50, 100))
            pygame.draw.rect(screen, (160, 130, 90), (ground_pos_x, h - 100, 50, 100), 2)
        
        # Draw score
        if game_started:
            score_text = font.render(str(score), True, (255, 255, 255))
            score_outline = font.render(str(score), True, (0, 0, 0))
            screen.blit(score_outline, (w // 2 - score_text.get_width() // 2 + 2, 52))
            screen.blit(score_text, (w // 2 - score_text.get_width() // 2, 50))
        
        # Start message
        if not game_started and not game_over:
            start_text = small_font.render('Press SPACE to Start', True, (255, 255, 255))
            start_outline = small_font.render('Press SPACE to Start', True, (0, 0, 0))
            screen.blit(start_outline, (w // 2 - start_text.get_width() // 2 + 2, h // 2 + 2))
            screen.blit(start_text, (w // 2 - start_text.get_width() // 2, h // 2))
        
        # Game over screen
        if game_over:
            overlay = pygame.Surface((w, h))
            overlay.set_alpha(150)
            overlay.fill((0, 0, 0))
            screen.blit(overlay, (0, 0))
            
            game_over_text = font.render('GAME OVER', True, (255, 100, 100))
            final_score = small_font.render(f'Score: {score}', True, (255, 255, 255))
            high_score_text = small_font.render(f'Best: {high_score}', True, (255, 255, 0))
            restart_text = small_font.render('Press SPACE to Restart', True, (200, 200, 200))
            
            screen.blit(game_over_text, (w // 2 - game_over_text.get_width() // 2, h // 2 - 100))
            screen.blit(final_score, (w // 2 - final_score.get_width() // 2, h // 2 - 20))
            screen.blit(high_score_text, (w // 2 - high_score_text.get_width() // 2, h // 2 + 20))
            screen.blit(restart_text, (w // 2 - restart_text.get_width() // 2, h // 2 + 70))
        
        pygame.display.flip()
        clock.tick(60)

    pygame.quit()`
    },
    {
    title: "Pac-Man Game",
    category: "games",
    description: "Enhanced classic maze game with ghosts, pellets, power-ups, ghost AI with different behaviors, score system, levels, and animations.",
    tags: ["pygame", "pathfinding", "game-ai", "pacman", "maze"],
    difficulty: 5,
    lines: "~200 lines",
    code: `import pygame
    import random
    import math

    pygame.init()
    w, h = 560, 620
    screen = pygame.display.set_mode((w, h))
    pygame.display.set_caption("Pac-Man")
    clock = pygame.time.Clock()
    font = pygame.font.Font(None, 36)
    small_font = pygame.font.Font(None, 24)

    # Colors
    BLACK = (0, 0, 0)
    YELLOW = (255, 255, 0)
    BLUE = (33, 33, 255)
    WHITE = (255, 255, 255)

    # Maze (1 = wall, 0 = path, 2 = pellet, 3 = power pellet)
    maze = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,1],
        [1,3,1,1,2,1,1,1,2,1,1,2,1,1,1,2,1,1,3,1],
        [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
        [1,2,1,1,2,1,2,1,1,1,1,1,1,2,1,2,1,1,2,1],
        [1,2,2,2,2,1,2,2,2,1,1,2,2,2,1,2,2,2,2,1],
        [1,1,1,1,2,1,1,1,0,1,1,0,1,1,1,2,1,1,1,1],
        [1,1,1,1,2,1,0,0,0,0,0,0,0,0,1,2,1,1,1,1],
        [1,1,1,1,2,1,0,1,1,0,0,1,1,0,1,2,1,1,1,1],
        [0,0,0,0,2,0,0,1,0,0,0,0,1,0,0,2,0,0,0,0],
        [1,1,1,1,2,1,0,1,1,1,1,1,1,0,1,2,1,1,1,1],
        [1,1,1,1,2,1,0,0,0,0,0,0,0,0,1,2,1,1,1,1],
        [1,1,1,1,2,1,0,1,1,1,1,1,1,0,1,2,1,1,1,1],
        [1,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,1],
        [1,2,1,1,2,1,1,1,2,1,1,2,1,1,1,2,1,1,2,1],
        [1,3,2,1,2,2,2,2,2,2,2,2,2,2,2,2,1,2,3,1],
        [1,1,2,1,2,1,2,1,1,1,1,1,1,2,1,2,1,2,1,1],
        [1,2,2,2,2,1,2,2,2,1,1,2,2,2,1,2,2,2,2,1],
        [1,2,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,2,1],
        [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ]

    cell_size = 28

    # Player
    player = {'x': 10, 'y': 15, 'direction': 0, 'next_direction': 0, 'mouth_open': 0}
    player_speed = 0.15

    # Ghosts with different behaviors
    ghosts = [
        {'x': 9, 'y': 9, 'target_x': 10, 'target_y': 15, 'color': (255, 0, 0), 'mode': 'chase', 'name': 'blinky'},
        {'x': 10, 'y': 9, 'target_x': 10, 'target_y': 15, 'color': (255, 184, 255), 'mode': 'chase', 'name': 'pinky'},
        {'x': 9, 'y': 10, 'target_x': 10, 'target_y': 15, 'color': (0, 255, 255), 'mode': 'scatter', 'name': 'inky'},
        {'x': 10, 'y': 10, 'target_x': 10, 'target_y': 15, 'color': (255, 184, 82), 'mode': 'scatter', 'name': 'clyde'}
    ]
    ghost_speed = 0.1
    frightened_timer = 0
    frightened_duration = 300

    # Game state
    score = 0
    lives = 3
    level = 1
    pellet_count = 0
    game_over = False
    win = False

    # Count pellets
    for row in maze:
        pellet_count += row.count(2) + row.count(3)

    total_pellets = pellet_count

    def reset_positions():
        global player, ghosts
        player = {'x': 10, 'y': 15, 'direction': 0, 'next_direction': 0, 'mouth_open': 0}
        ghosts = [
            {'x': 9, 'y': 9, 'target_x': 10, 'target_y': 15, 'color': (255, 0, 0), 'mode': 'chase', 'name': 'blinky'},
            {'x': 10, 'y': 9, 'target_x': 10, 'target_y': 15, 'color': (255, 184, 255), 'mode': 'chase', 'name': 'pinky'},
            {'x': 9, 'y': 10, 'target_x': 10, 'target_y': 15, 'color': (0, 255, 255), 'mode': 'scatter', 'name': 'inky'},
            {'x': 10, 'y': 10, 'target_x': 10, 'target_y': 15, 'color': (255, 184, 82), 'mode': 'scatter', 'name': 'clyde'}
        ]

    def can_move(x, y):
        grid_x = int(x)
        grid_y = int(y)
        if 0 <= grid_y < len(maze) and 0 <= grid_x < len(maze[0]):
            return maze[grid_y][grid_x] != 1
        return False

    def move_player(direction):
        dx, dy = [(0, 0), (-1, 0), (1, 0), (0, -1), (0, 1)][direction]
        new_x = player['x'] + dx * player_speed
        new_y = player['y'] + dy * player_speed
        
        if can_move(new_x, new_y):
            player['x'] = new_x
            player['y'] = new_y
            player['direction'] = direction
            return True
        return False

    def get_next_move(ghost, target_x, target_y):
        possible_moves = []
        directions = [(0, -1), (0, 1), (-1, 0), (1, 0)]
        
        for dx, dy in directions:
            new_x = ghost['x'] + dx * ghost_speed
            new_y = ghost['y'] + dy * ghost_speed
            
            if can_move(new_x, new_y):
                dist = math.sqrt((new_x - target_x)**2 + (new_y - target_y)**2)
                possible_moves.append((dist, new_x, new_y))
        
        if possible_moves:
            if frightened_timer > 0:
                return random.choice(possible_moves)[1:]
            else:
                possible_moves.sort()
                return possible_moves[0][1:]
        return ghost['x'], ghost['y']

    def move_ghosts():
        global lives, game_over, frightened_timer, score
        
        for ghost in ghosts:
            if frightened_timer > 0:
                target_x, target_y = random.randint(0, 19), random.randint(0, 20)
            elif ghost['mode'] == 'chase':
                target_x, target_y = player['x'], player['y']
            else:
                corners = {'blinky': (19, 0), 'pinky': (0, 0), 'inky': (19, 20), 'clyde': (0, 20)}
                target_x, target_y = corners.get(ghost['name'], (10, 10))
            
            new_x, new_y = get_next_move(ghost, target_x, target_y)
            ghost['x'] = new_x
            ghost['y'] = new_y
            
            # Check collision with player
            if abs(ghost['x'] - player['x']) < 0.5 and abs(ghost['y'] - player['y']) < 0.5:
                if frightened_timer > 0:
                    ghost['x'] = 10
                    ghost['y'] = 9
                    score += 200
                else:
                    lives -= 1
                    if lives <= 0:
                        game_over = True
                    else:
                        reset_positions()

    def draw_maze():
        for y, row in enumerate(maze):
            for x, cell in enumerate(row):
                screen_x = x * cell_size
                screen_y = y * cell_size
                
                if cell == 1:
                    pygame.draw.rect(screen, BLUE, (screen_x, screen_y, cell_size, cell_size))
                    pygame.draw.rect(screen, (100, 100, 255), (screen_x, screen_y, cell_size, cell_size), 2)
                elif cell == 2:
                    pygame.draw.circle(screen, WHITE, 
                                    (screen_x + cell_size // 2, screen_y + cell_size // 2), 3)
                elif cell == 3:
                    pulse = abs(pygame.time.get_ticks() % 1000 - 500) / 500
                    size = int(6 + 3 * pulse)
                    pygame.draw.circle(screen, WHITE, 
                                    (screen_x + cell_size // 2, screen_y + cell_size // 2), size)

    def draw_pacman():
        screen_x = int(player['x'] * cell_size + cell_size // 2)
        screen_y = int(player['y'] * cell_size + cell_size // 2)
        
        player['mouth_open'] = (player['mouth_open'] + 5) % 60
        mouth_angle = abs(player['mouth_open'] - 30)
        
        # Rotation based on direction
        rotation = {0: 0, 1: 180, 2: 0, 3: 90, 4: 270}[player['direction']]
        
        start_angle = rotation + mouth_angle
        end_angle = rotation + 360 - mouth_angle
        
        # Draw pac-man as a circle with mouth
        points = [(screen_x, screen_y)]
        for angle in range(int(start_angle), int(end_angle) + 1, 5):
            rad = math.radians(angle)
            x = screen_x + int(cell_size // 2 * math.cos(rad))
            y = screen_y + int(cell_size // 2 * math.sin(rad))
            points.append((x, y))
        
        if len(points) > 2:
            pygame.draw.polygon(screen, YELLOW, points)
        pygame.draw.circle(screen, (255, 200, 0), (screen_x, screen_y), cell_size // 2, 2)

    def draw_ghost(ghost):
        screen_x = int(ghost['x'] * cell_size + cell_size // 2)
        screen_y = int(ghost['y'] * cell_size + cell_size // 2)
        
        color = ghost['color']
        if frightened_timer > 0:
            if frightened_timer < 100:
                color = (255, 255, 255) if (frightened_timer // 10) % 2 else (0, 0, 255)
            else:
                color = (0, 0, 255)
        
        # Ghost body (semicircle top, wavy bottom)
        radius = cell_size // 2
        pygame.draw.circle(screen, color, (screen_x, screen_y - 2), radius)
        pygame.draw.rect(screen, color, (screen_x - radius, screen_y - 2, radius * 2, radius))
        
        # Wavy bottom
        wave_points = [(screen_x - radius, screen_y + radius)]
        for i in range(4):
            x = screen_x - radius + i * (radius // 2)
            y = screen_y + radius - 5 if i % 2 else screen_y + radius
            wave_points.append((x, y))
        wave_points.append((screen_x + radius, screen_y + radius))
        wave_points.append((screen_x + radius, screen_y - 2))
        pygame.draw.polygon(screen, color, wave_points)
        
        # Eyes
        if frightened_timer == 0:
            eye_color = WHITE
            pupil_color = BLUE
            pygame.draw.circle(screen, eye_color, (screen_x - 5, screen_y - 3), 4)
            pygame.draw.circle(screen, eye_color, (screen_x + 5, screen_y - 3), 4)
            pygame.draw.circle(screen, pupil_color, (screen_x - 5, screen_y - 3), 2)
            pygame.draw.circle(screen, pupil_color, (screen_x + 5, screen_y - 3), 2)

    running = True
    while running:
        for e in pygame.event.get():
            if e.type == pygame.QUIT:
                running = False
            if e.type == pygame.KEYDOWN:
                if e.key == pygame.K_LEFT:
                    player['next_direction'] = 1
                elif e.key == pygame.K_RIGHT:
                    player['next_direction'] = 2
                elif e.key == pygame.K_UP:
                    player['next_direction'] = 3
                elif e.key == pygame.K_DOWN:
                    player['next_direction'] = 4
                
                if (game_over or win) and e.key == pygame.K_SPACE:
                    # Reset game
                    maze = [
                        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                        [1,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,1],
                        [1,3,1,1,2,1,1,1,2,1,1,2,1,1,1,2,1,1,3,1],
                        [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
                        [1,2,1,1,2,1,2,1,1,1,1,1,1,2,1,2,1,1,2,1],
                        [1,2,2,2,2,1,2,2,2,1,1,2,2,2,1,2,2,2,2,1],
                        [1,1,1,1,2,1,1,1,0,1,1,0,1,1,1,2,1,1,1,1],
                        [1,1,1,1,2,1,0,0,0,0,0,0,0,0,1,2,1,1,1,1],
                        [1,1,1,1,2,1,0,1,1,0,0,1,1,0,1,2,1,1,1,1],
                        [0,0,0,0,2,0,0,1,0,0,0,0,1,0,0,2,0,0,0,0],
                        [1,1,1,1,2,1,0,1,1,1,1,1,1,0,1,2,1,1,1,1],
                        [1,1,1,1,2,1,0,0,0,0,0,0,0,0,1,2,1,1,1,1],
                        [1,1,1,1,2,1,0,1,1,1,1,1,1,0,1,2,1,1,1,1],
                        [1,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,1],
                        [1,2,1,1,2,1,1,1,2,1,1,2,1,1,1,2,1,1,2,1],
                        [1,3,2,1,2,2,2,2,2,2,2,2,2,2,2,2,1,2,3,1],
                        [1,1,2,1,2,1,2,1,1,1,1,1,1,2,1,2,1,2,1,1],
                        [1,2,2,2,2,1,2,2,2,1,1,2,2,2,1,2,2,2,2,1],
                        [1,2,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,2,1],
                        [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
                        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
                    ]
                    score = 0
                    lives = 3
                    level = 1
                    pellet_count = total_pellets
                    game_over = False
                    win = False
                    reset_positions()
        
        if not game_over and not win:
            # Try to move in next direction
            if player['next_direction'] != 0:
                if move_player(player['next_direction']):
                    player['next_direction'] = 0
            
            # Continue in current direction
            if player['direction'] != 0:
                move_player(player['direction'])
            
            # Wrap around
            if player['x'] < 0:
                player['x'] = 19.9
            elif player['x'] > 19.9:
                player['x'] = 0
            
            # Collect pellets
            grid_x = int(player['x'])
            grid_y = int(player['y'])
            
            if maze[grid_y][grid_x] == 2:
                maze[grid_y][grid_x] = 0
                score += 10
                pellet_count -= 1
            elif maze[grid_y][grid_x] == 3:
                maze[grid_y][grid_x] = 0
                score += 50
                pellet_count -= 1
                frightened_timer = frightened_duration
            
            # Check win
            if pellet_count == 0:
                win = True
            
            # Move ghosts
            move_ghosts()
            
            # Update frightened timer
            if frightened_timer > 0:
                frightened_timer -= 1
        
        # Drawing
        screen.fill(BLACK)
        draw_maze()
        
        for ghost in ghosts:
            draw_ghost(ghost)
        
        draw_pacman()
        
        # Draw UI
        score_text = font.render(f'Score: {score}', True, WHITE)
        level_text = small_font.render(f'Level: {level}', True, WHITE)
        screen.blit(score_text, (10, h - 50))
        screen.blit(level_text, (10, h - 25))
        
        # Draw lives
        for i in range(lives):
            life_x = w - 40 - i * 30
            points = [(life_x, h - 35)]
            for angle in range(30, 330, 5):
                rad = math.radians(angle)
                x = life_x + int(12 * math.cos(rad))
                y = h - 35 + int(12 * math.sin(rad))
                points.append((x, y))
            pygame.draw.polygon(screen, YELLOW, points)
        
        # Game over screen
        if game_over:
            overlay = pygame.Surface((w, h))
            overlay.set_alpha(200)
            overlay.fill(BLACK)
            screen.blit(overlay, (0, 0))
            
            game_over_text = font.render('GAME OVER', True, (255, 0, 0))
            final_score = small_font.render(f'Final Score: {score}', True, WHITE)
            restart_text = small_font.render('Press SPACE to Restart', True, WHITE)
            
            screen.blit(game_over_text, (w // 2 - game_over_text.get_width() // 2, h // 2 - 60))
            screen.blit(final_score, (w // 2 - final_score.get_width() // 2, h // 2))
            screen.blit(restart_text, (w // 2 - restart_text.get_width() // 2, h // 2 + 40))
        
        # Win screen
        if win:
            overlay = pygame.Surface((w, h))
            overlay.set_alpha(200)
            overlay.fill(BLACK)
            screen.blit(overlay, (0, 0))
            
            win_text = font.render('YOU WIN!', True, (0, 255, 0))
            final_score = small_font.render(f'Final Score: {score}', True, WHITE)
            restart_text = small_font.render('Press SPACE to Play Again', True, WHITE)
            
            screen.blit(win_text, (w // 2 - win_text.get_width() // 2, h // 2 - 60))
            screen.blit(final_score, (w // 2 - final_score.get_width() // 2, h // 2))
            screen.blit(restart_text, (w // 2 - restart_text.get_width() // 2, h // 2 + 40))
        
        pygame.display.flip()
        clock.tick(60)

    pygame.quit()`
    },
    {
    title: "2048 Game",
    category: "games",
    description: "Enhanced number puzzle game where you combine tiles to reach 2048 with smooth animations, scoring, and proper game mechanics.",
    tags: ["tkinter", "matrix-operations", "game-logic", "2048", "puzzle"],
    difficulty: 3,
    lines: "~180 lines",
    code: `import tkinter as tk
    import random
    import copy

    # Colors for different tile values
    COLORS = {
        0: "#cdc1b4",
        2: "#eee4da",
        4: "#ede0c8",
        8: "#f2b179",
        16: "#f59563",
        32: "#f67c5f",
        64: "#f65e3b",
        128: "#edcf72",
        256: "#edcc61",
        512: "#edc850",
        1024: "#edc53f",
        2048: "#edc22e",
        4096: "#3c3a32"
    }

    TEXT_COLORS = {
        0: "#776e65",
        2: "#776e65",
        4: "#776e65",
        8: "#f9f6f2",
        16: "#f9f6f2"
    }

    class Game2048:
        def __init__(self, root):
            self.root = root
            self.root.title("2048 Game")
            self.root.configure(bg="#faf8ef")
            
            self.grid = [[0] * 4 for _ in range(4)]
            self.score = 0
            self.best_score = 0
            self.game_over = False
            self.won = False
            
            # Header frame
            header_frame = tk.Frame(root, bg="#faf8ef")
            header_frame.pack(pady=10)
            
            # Title
            title_label = tk.Label(header_frame, text="2048", font=("Arial", 48, "bold"),
                                bg="#faf8ef", fg="#776e65")
            title_label.grid(row=0, column=0, padx=20)
            
            # Score frame
            score_frame = tk.Frame(header_frame, bg="#faf8ef")
            score_frame.grid(row=0, column=1, padx=10)
            
            self.score_label = tk.Label(score_frame, text="SCORE", font=("Arial", 12, "bold"),
                                        bg="#bbada0", fg="#eee4da", padx=15, pady=5)
            self.score_label.pack()
            
            self.score_value = tk.Label(score_frame, text="0", font=("Arial", 20, "bold"),
                                        bg="#bbada0", fg="#ffffff", padx=15, pady=5)
            self.score_value.pack()
            
            # Best score frame
            best_frame = tk.Frame(header_frame, bg="#faf8ef")
            best_frame.grid(row=0, column=2, padx=10)
            
            self.best_label = tk.Label(best_frame, text="BEST", font=("Arial", 12, "bold"),
                                    bg="#bbada0", fg="#eee4da", padx=15, pady=5)
            self.best_label.pack()
            
            self.best_value = tk.Label(best_frame, text="0", font=("Arial", 20, "bold"),
                                    bg="#bbada0", fg="#ffffff", padx=15, pady=5)
            self.best_value.pack()
            
            # Instructions
            instructions = tk.Label(root, text="Use arrow keys to move tiles. Combine tiles with the same number!",
                                font=("Arial", 10), bg="#faf8ef", fg="#776e65")
            instructions.pack(pady=5)
            
            # Game canvas
            self.canvas = tk.Canvas(root, width=440, height=440, bg="#bbada0", highlightthickness=0)
            self.canvas.pack(pady=10)
            
            # New game button
            new_game_btn = tk.Button(root, text="New Game", font=("Arial", 14, "bold"),
                                    bg="#8f7a66", fg="#f9f6f2", padx=20, pady=10,
                                    command=self.new_game, cursor="hand2")
            new_game_btn.pack(pady=10)
            
            # Bind keys
            self.root.bind("<Left>", lambda e: self.move("left"))
            self.root.bind("<Right>", lambda e: self.move("right"))
            self.root.bind("<Up>", lambda e: self.move("up"))
            self.root.bind("<Down>", lambda e: self.move("down"))
            
            # Start new game
            self.new_game()
        
        def new_game(self):
            self.grid = [[0] * 4 for _ in range(4)]
            self.score = 0
            self.game_over = False
            self.won = False
            self.add_random_tile()
            self.add_random_tile()
            self.update_display()
        
        def add_random_tile(self):
            empty_cells = [(i, j) for i in range(4) for j in range(4) if self.grid[i][j] == 0]
            if empty_cells:
                i, j = random.choice(empty_cells)
                self.grid[i][j] = 2 if random.random() < 0.9 else 4
        
        def compress(self, row):
            new_row = [i for i in row if i != 0]
            new_row += [0] * (4 - len(new_row))
            return new_row
        
        def merge(self, row):
            for i in range(3):
                if row[i] != 0 and row[i] == row[i + 1]:
                    row[i] *= 2
                    row[i + 1] = 0
                    self.score += row[i]
                    if row[i] == 2048:
                        self.won = True
            return row
        
        def move_left(self):
            new_grid = []
            moved = False
            for row in self.grid:
                compressed = self.compress(row)
                merged = self.merge(compressed)
                new_row = self.compress(merged)
                new_grid.append(new_row)
                if new_row != row:
                    moved = True
            return new_grid, moved
        
        def reverse(self, grid):
            return [row[::-1] for row in grid]
        
        def transpose(self, grid):
            return [list(row) for row in zip(*grid)]
        
        def move(self, direction):
            if self.game_over:
                return
            
            old_grid = copy.deepcopy(self.grid)
            moved = False
            
            if direction == "left":
                self.grid, moved = self.move_left()
            elif direction == "right":
                self.grid = self.reverse(self.grid)
                self.grid, moved = self.move_left()
                self.grid = self.reverse(self.grid)
            elif direction == "up":
                self.grid = self.transpose(self.grid)
                self.grid, moved = self.move_left()
                self.grid = self.transpose(self.grid)
            elif direction == "down":
                self.grid = self.transpose(self.grid)
                self.grid = self.reverse(self.grid)
                self.grid, moved = self.move_left()
                self.grid = self.reverse(self.grid)
                self.grid = self.transpose(self.grid)
            
            if moved:
                self.add_random_tile()
                self.update_display()
                
                if not self.can_move():
                    self.game_over = True
                    self.show_game_over()
                elif self.won:
                    self.show_win()
        
        def can_move(self):
            # Check for empty cells
            for i in range(4):
                for j in range(4):
                    if self.grid[i][j] == 0:
                        return True
            
            # Check for possible merges
            for i in range(4):
                for j in range(4):
                    if j < 3 and self.grid[i][j] == self.grid[i][j + 1]:
                        return True
                    if i < 3 and self.grid[i][j] == self.grid[i + 1][j]:
                        return True
            
            return False
        
        def update_display(self):
            self.canvas.delete("all")
            
            # Draw grid background
            for i in range(4):
                for j in range(4):
                    x1 = j * 110 + 5
                    y1 = i * 110 + 5
                    x2 = x1 + 100
                    y2 = y1 + 100
                    
                    value = self.grid[i][j]
                    color = COLORS.get(value, COLORS[4096])
                    text_color = TEXT_COLORS.get(value, "#f9f6f2")
                    
                    # Draw tile background
                    self.canvas.create_rectangle(x1, y1, x2, y2, fill=color, outline="")
                    
                    # Draw tile value
                    if value != 0:
                        font_size = 48 if value < 100 else (40 if value < 1000 else 32)
                        self.canvas.create_text((x1 + x2) / 2, (y1 + y2) / 2,
                                            text=str(value),
                                            font=("Arial", font_size, "bold"),
                                            fill=text_color)
            
            # Update score
            self.score_value.config(text=str(self.score))
            if self.score > self.best_score:
                self.best_score = self.score
                self.best_value.config(text=str(self.best_score))
        
        def show_game_over(self):
            # Create semi-transparent overlay
            self.canvas.create_rectangle(0, 0, 440, 440, fill="#eee4da", stipple="gray50")
            
            # Game over text
            self.canvas.create_text(220, 180, text="Game Over!",
                                font=("Arial", 48, "bold"), fill="#776e65")
            
            # Final score
            self.canvas.create_text(220, 240, text=f"Final Score: {self.score}",
                                font=("Arial", 20), fill="#776e65")
            
            # Instruction
            self.canvas.create_text(220, 280, text="Click 'New Game' to try again",
                                font=("Arial", 14), fill="#776e65")
        
        def show_win(self):
            # Create semi-transparent overlay
            overlay = self.canvas.create_rectangle(0, 0, 440, 440, fill="#edc22e", stipple="gray50")
            
            # Win text
            self.canvas.create_text(220, 180, text="You Win!",
                                font=("Arial", 48, "bold"), fill="#f9f6f2")
            
            # Score
            self.canvas.create_text(220, 240, text=f"Score: {self.score}",
                                font=("Arial", 20), fill="#f9f6f2")
            
            # Continue instruction
            self.canvas.create_text(220, 280, text="Keep playing or start a new game!",
                                font=("Arial", 14), fill="#f9f6f2")
            
            # Allow continued play
            self.won = False

    # Run the game
    root = tk.Tk()
    game = Game2048(root)
    root.mainloop()`
    },
    {
    title: "Tic Tac Toe AI",
    category: "games",
    description: "Enhanced Tic Tac Toe with intelligent AI opponent using minimax algorithm, score tracking, difficulty levels, and polished UI.",
    tags: ["tkinter", "minimax", "ai", "tic-tac-toe", "game"],
    difficulty: 3,
    lines: "~200 lines",
    code: `import tkinter as tk
    from tkinter import messagebox
    import copy

    class TicTacToeAI:
        def __init__(self, root):
            self.root = root
            self.root.title("Tic Tac Toe AI")
            self.root.configure(bg="#1e1e1e")
            self.root.resizable(False, False)
            
            self.board = [["" for _ in range(3)] for _ in range(3)]
            self.buttons = [[None for _ in range(3)] for _ in range(3)]
            self.current_player = "X"  # X is human, O is AI
            self.game_over = False
            self.difficulty = "hard"  # easy, medium, hard
            
            # Score tracking
            self.scores = {"X": 0, "O": 0, "Draw": 0}
            
            self.create_ui()
        
        def create_ui(self):
            # Header frame
            header_frame = tk.Frame(self.root, bg="#1e1e1e")
            header_frame.pack(pady=10)
            
            # Title
            title = tk.Label(header_frame, text="TIC TAC TOE", font=("Arial", 28, "bold"),
                            bg="#1e1e1e", fg="#00ff88")
            title.pack()
            
            subtitle = tk.Label(header_frame, text="You (X) vs AI (O)", font=("Arial", 12),
                            bg="#1e1e1e", fg="#888888")
            subtitle.pack()
            
            # Score frame
            score_frame = tk.Frame(self.root, bg="#2a2a2a", padx=20, pady=10)
            score_frame.pack(pady=10)
            
            self.score_label = tk.Label(score_frame, 
                                        text=f"You: {self.scores['X']}  |  AI: {self.scores['O']}  |  Draw: {self.scores['Draw']}",
                                        font=("Arial", 14, "bold"), bg="#2a2a2a", fg="#ffffff")
            self.score_label.pack()
            
            # Game board frame
            board_frame = tk.Frame(self.root, bg="#1e1e1e")
            board_frame.pack(pady=10)
            
            # Create buttons
            for i in range(3):
                for j in range(3):
                    btn = tk.Button(board_frame, text="", font=("Arial", 48, "bold"),
                                width=4, height=2, bg="#2a2a2a", fg="#ffffff",
                                activebackground="#3a3a3a", relief="flat",
                                command=lambda r=i, c=j: self.make_move(r, c))
                    btn.grid(row=i, column=j, padx=3, pady=3)
                    self.buttons[i][j] = btn
            
            # Control frame
            control_frame = tk.Frame(self.root, bg="#1e1e1e")
            control_frame.pack(pady=10)
            
            # Difficulty selection
            difficulty_label = tk.Label(control_frame, text="AI Difficulty:", 
                                        font=("Arial", 12), bg="#1e1e1e", fg="#888888")
            difficulty_label.grid(row=0, column=0, padx=5)
            
            self.difficulty_var = tk.StringVar(value="hard")
            difficulties = ["easy", "medium", "hard"]
            for idx, diff in enumerate(difficulties):
                rb = tk.Radiobutton(control_frame, text=diff.capitalize(), 
                                variable=self.difficulty_var, value=diff,
                                font=("Arial", 11), bg="#1e1e1e", fg="#ffffff",
                                selectcolor="#2a2a2a", activebackground="#1e1e1e",
                                activeforeground="#00ff88", command=self.set_difficulty)
                rb.grid(row=0, column=idx+1, padx=5)
            
            # Buttons frame
            button_frame = tk.Frame(self.root, bg="#1e1e1e")
            button_frame.pack(pady=10)
            
            # New game button
            new_game_btn = tk.Button(button_frame, text="New Game", font=("Arial", 14, "bold"),
                                    bg="#00ff88", fg="#1e1e1e", padx=20, pady=10,
                                    command=self.reset_game, cursor="hand2", relief="flat")
            new_game_btn.grid(row=0, column=0, padx=5)
            
            # Reset scores button
            reset_score_btn = tk.Button(button_frame, text="Reset Scores", font=("Arial", 14, "bold"),
                                        bg="#ff6b6b", fg="#ffffff", padx=20, pady=10,
                                        command=self.reset_scores, cursor="hand2", relief="flat")
            reset_score_btn.grid(row=0, column=1, padx=5)
        
        def set_difficulty(self):
            self.difficulty = self.difficulty_var.get()
            self.reset_game()
        
        def make_move(self, row, col):
            if self.board[row][col] == "" and not self.game_over and self.current_player == "X":
                self.board[row][col] = "X"
                self.buttons[row][col].config(text="X", fg="#00ff88")
                
                if self.check_winner("X"):
                    self.end_game("X")
                elif self.is_board_full():
                    self.end_game("Draw")
                else:
                    self.current_player = "O"
                    self.root.after(500, self.ai_move)
        
        def ai_move(self):
            if self.game_over:
                return
            
            if self.difficulty == "easy":
                move = self.random_move()
            elif self.difficulty == "medium":
                # 50% chance of optimal move, 50% random
                import random
                if random.random() < 0.5:
                    move = self.minimax_move()
                else:
                    move = self.random_move()
            else:  # hard
                move = self.minimax_move()
            
            if move:
                row, col = move
                self.board[row][col] = "O"
                self.buttons[row][col].config(text="O", fg="#ff6b6b")
                
                if self.check_winner("O"):
                    self.end_game("O")
                elif self.is_board_full():
                    self.end_game("Draw")
                else:
                    self.current_player = "X"
        
        def random_move(self):
            import random
            empty_cells = [(i, j) for i in range(3) for j in range(3) if self.board[i][j] == ""]
            return random.choice(empty_cells) if empty_cells else None
        
        def minimax_move(self):
            best_score = float('-inf')
            best_move = None
            
            for i in range(3):
                for j in range(3):
                    if self.board[i][j] == "":
                        self.board[i][j] = "O"
                        score = self.minimax(self.board, 0, False)
                        self.board[i][j] = ""
                        
                        if score > best_score:
                            best_score = score
                            best_move = (i, j)
            
            return best_move
        
        def minimax(self, board, depth, is_maximizing):
            if self.check_winner("O"):
                return 10 - depth
            if self.check_winner("X"):
                return depth - 10
            if self.is_board_full():
                return 0
            
            if is_maximizing:
                best_score = float('-inf')
                for i in range(3):
                    for j in range(3):
                        if board[i][j] == "":
                            board[i][j] = "O"
                            score = self.minimax(board, depth + 1, False)
                            board[i][j] = ""
                            best_score = max(score, best_score)
                return best_score
            else:
                best_score = float('inf')
                for i in range(3):
                    for j in range(3):
                        if board[i][j] == "":
                            board[i][j] = "X"
                            score = self.minimax(board, depth + 1, True)
                            board[i][j] = ""
                            best_score = min(score, best_score)
                return best_score
        
        def check_winner(self, player):
            # Check rows
            for i in range(3):
                if all(self.board[i][j] == player for j in range(3)):
                    return True
            
            # Check columns
            for j in range(3):
                if all(self.board[i][j] == player for i in range(3)):
                    return True
            
            # Check diagonals
            if all(self.board[i][i] == player for i in range(3)):
                return True
            if all(self.board[i][2-i] == player for i in range(3)):
                return True
            
            return False
        
        def is_board_full(self):
            return all(self.board[i][j] != "" for i in range(3) for j in range(3))
        
        def end_game(self, winner):
            self.game_over = True
            
            # Highlight winning line
            if winner != "Draw":
                self.highlight_winner(winner)
            
            # Update scores
            if winner == "Draw":
                self.scores["Draw"] += 1
                message = "It's a Draw!"
                color = "#ffaa00"
            elif winner == "X":
                self.scores["X"] += 1
                message = "You Win! 🎉"
                color = "#00ff88"
            else:
                self.scores["O"] += 1
                message = "AI Wins! 🤖"
                color = "#ff6b6b"
            
            self.update_score_display()
            
            # Show result after a delay
            self.root.after(800, lambda: self.show_result(message, color))
        
        def highlight_winner(self, player):
            color = "#00ff88" if player == "X" else "#ff6b6b"
            
            # Check rows
            for i in range(3):
                if all(self.board[i][j] == player for j in range(3)):
                    for j in range(3):
                        self.buttons[i][j].config(bg=color, fg="#1e1e1e")
                    return
            
            # Check columns
            for j in range(3):
                if all(self.board[i][j] == player for i in range(3)):
                    for i in range(3):
                        self.buttons[i][j].config(bg=color, fg="#1e1e1e")
                    return
            
            # Check diagonals
            if all(self.board[i][i] == player for i in range(3)):
                for i in range(3):
                    self.buttons[i][i].config(bg=color, fg="#1e1e1e")
                return
            
            if all(self.board[i][2-i] == player for i in range(3)):
                for i in range(3):
                    self.buttons[i][2-i].config(bg=color, fg="#1e1e1e")
                return
        
        def show_result(self, message, color):
            result = messagebox.showinfo("Game Over", message)
            self.reset_game()
        
        def update_score_display(self):
            self.score_label.config(
                text=f"You: {self.scores['X']}  |  AI: {self.scores['O']}  |  Draw: {self.scores['Draw']}"
            )
        
        def reset_game(self):
            self.board = [["" for _ in range(3)] for _ in range(3)]
            self.current_player = "X"
            self.game_over = False
            
            for i in range(3):
                for j in range(3):
                    self.buttons[i][j].config(text="", bg="#2a2a2a", fg="#ffffff")
        
        def reset_scores(self):
            self.scores = {"X": 0, "O": 0, "Draw": 0}
            self.update_score_display()
            self.reset_game()

    # Run the game
    if __name__ == "__main__":
        root = tk.Tk()
        game = TicTacToeAI(root)
        root.mainloop()`
    },
    {
    title: "Rock Paper Scissors",
    category: "games",
    description: "Enhanced GUI game to play Rock Paper Scissors against the computer with score tracking, animations, visual effects, and game history.",
    tags: ["tkinter", "random", "gui", "rock-paper-scissors", "game"],
    difficulty: 1,
    lines: "~150 lines",
    code: `import tkinter as tk
    from tkinter import font as tkfont
    import random

    class RockPaperScissors:
        def __init__(self, root):
            self.root = root
            self.root.title("Rock Paper Scissors")
            self.root.configure(bg="#2c3e50")
            self.root.resizable(False, False)
            
            self.choices = ["Rock", "Paper", "Scissors"]
            self.emojis = {"Rock": "✊", "Paper": "✋", "Scissors": "✌️"}
            
            # Score tracking
            self.scores = {"player": 0, "computer": 0, "ties": 0}
            self.round_number = 0
            self.history = []
            
            self.create_ui()
        
        def create_ui(self):
            # Title
            title_frame = tk.Frame(self.root, bg="#2c3e50")
            title_frame.pack(pady=20)
            
            title = tk.Label(title_frame, text="ROCK PAPER SCISSORS", 
                            font=("Arial", 32, "bold"),
                            bg="#2c3e50", fg="#ecf0f1")
            title.pack()
            
            subtitle = tk.Label(title_frame, text="Best of Infinite Rounds!", 
                            font=("Arial", 12),
                            bg="#2c3e50", fg="#95a5a6")
            subtitle.pack()
            
            # Score board
            score_frame = tk.Frame(self.root, bg="#34495e", padx=30, pady=15)
            score_frame.pack(pady=10)
            
            # Player score
            player_frame = tk.Frame(score_frame, bg="#34495e")
            player_frame.grid(row=0, column=0, padx=20)
            
            tk.Label(player_frame, text="YOU", font=("Arial", 14, "bold"),
                    bg="#34495e", fg="#3498db").pack()
            self.player_score_label = tk.Label(player_frame, text="0", 
                                            font=("Arial", 36, "bold"),
                                            bg="#34495e", fg="#ecf0f1")
            self.player_score_label.pack()
            
            # Separator
            tk.Label(score_frame, text=":", font=("Arial", 36, "bold"),
                    bg="#34495e", fg="#95a5a6").grid(row=0, column=1, padx=10)
            
            # Computer score
            computer_frame = tk.Frame(score_frame, bg="#34495e")
            computer_frame.grid(row=0, column=2, padx=20)
            
            tk.Label(computer_frame, text="COMPUTER", font=("Arial", 14, "bold"),
                    bg="#34495e", fg="#e74c3c").pack()
            self.computer_score_label = tk.Label(computer_frame, text="0", 
                                                font=("Arial", 36, "bold"),
                                                bg="#34495e", fg="#ecf0f1")
            self.computer_score_label.pack()
            
            # Ties
            self.ties_label = tk.Label(score_frame, text="Ties: 0", 
                                    font=("Arial", 12),
                                    bg="#34495e", fg="#95a5a6")
            self.ties_label.grid(row=1, column=0, columnspan=3, pady=(10, 0))
            
            # Display area
            display_frame = tk.Frame(self.root, bg="#2c3e50")
            display_frame.pack(pady=20)
            
            # Player choice display
            player_display = tk.Frame(display_frame, bg="#34495e", padx=20, pady=20)
            player_display.grid(row=0, column=0, padx=15)
            
            tk.Label(player_display, text="Your Choice", font=("Arial", 12, "bold"),
                    bg="#34495e", fg="#3498db").pack()
            self.player_choice_label = tk.Label(player_display, text="❓", 
                                            font=("Arial", 64),
                                            bg="#34495e", fg="#ecf0f1")
            self.player_choice_label.pack(pady=10)
            
            # VS label
            tk.Label(display_frame, text="VS", font=("Arial", 24, "bold"),
                    bg="#2c3e50", fg="#e67e22").grid(row=0, column=1, padx=10)
            
            # Computer choice display
            computer_display = tk.Frame(display_frame, bg="#34495e", padx=20, pady=20)
            computer_display.grid(row=0, column=2, padx=15)
            
            tk.Label(computer_display, text="Computer Choice", font=("Arial", 12, "bold"),
                    bg="#34495e", fg="#e74c3c").pack()
            self.computer_choice_label = tk.Label(computer_display, text="❓", 
                                                font=("Arial", 64),
                                                bg="#34495e", fg="#ecf0f1")
            self.computer_choice_label.pack(pady=10)
            
            # Result display
            self.result_label = tk.Label(self.root, text="Make your choice!", 
                                        font=("Arial", 20, "bold"),
                                        bg="#2c3e50", fg="#ecf0f1", pady=15)
            self.result_label.pack()
            
            # Choice buttons
            button_frame = tk.Frame(self.root, bg="#2c3e50")
            button_frame.pack(pady=20)
            
            button_colors = {"Rock": "#e74c3c", "Paper": "#3498db", "Scissors": "#f39c12"}
            
            for choice in self.choices:
                btn = tk.Button(button_frame, 
                            text=f"{self.emojis[choice]} {choice}", 
                            font=("Arial", 16, "bold"),
                            bg=button_colors[choice], 
                            fg="white",
                            activebackground=button_colors[choice],
                            activeforeground="white",
                            width=12, 
                            height=2,
                            cursor="hand2",
                            relief="flat",
                            command=lambda c=choice: self.play(c))
                btn.pack(side=tk.LEFT, padx=10)
            
            # Control buttons
            control_frame = tk.Frame(self.root, bg="#2c3e50")
            control_frame.pack(pady=10)
            
            reset_btn = tk.Button(control_frame, text="Reset Game", 
                                font=("Arial", 12, "bold"),
                                bg="#95a5a6", fg="white",
                                activebackground="#7f8c8d",
                                padx=20, pady=8,
                                cursor="hand2",
                                relief="flat",
                                command=self.reset_game)
            reset_btn.pack(side=tk.LEFT, padx=5)
            
            history_btn = tk.Button(control_frame, text="View History", 
                                font=("Arial", 12, "bold"),
                                bg="#9b59b6", fg="white",
                                activebackground="#8e44ad",
                                padx=20, pady=8,
                                cursor="hand2",
                                relief="flat",
                                command=self.show_history)
            history_btn.pack(side=tk.LEFT, padx=5)
            
            # Round number
            self.round_label = tk.Label(self.root, text="Round: 0", 
                                    font=("Arial", 11),
                                    bg="#2c3e50", fg="#95a5a6")
            self.round_label.pack(pady=(5, 15))
        
        def play(self, player_choice):
            # Increment round
            self.round_number += 1
            self.round_label.config(text=f"Round: {self.round_number}")
            
            # Computer makes random choice
            computer_choice = random.choice(self.choices)
            
            # Update displays
            self.player_choice_label.config(text=self.emojis[player_choice])
            
            # Animate computer choice
            self.animate_computer_choice(computer_choice)
            
            # Determine winner
            result = self.determine_winner(player_choice, computer_choice)
            
            # Update scores
            if result == "win":
                self.scores["player"] += 1
                self.player_score_label.config(text=str(self.scores["player"]))
                self.result_label.config(text="🎉 You Win!", fg="#2ecc71")
            elif result == "lose":
                self.scores["computer"] += 1
                self.computer_score_label.config(text=str(self.scores["computer"]))
                self.result_label.config(text="💔 You Lose!", fg="#e74c3c")
            else:
                self.scores["ties"] += 1
                self.ties_label.config(text=f"Ties: {self.scores['ties']}")
                self.result_label.config(text="🤝 It's a Tie!", fg="#f39c12")
            
            # Add to history
            self.history.append({
                "round": self.round_number,
                "player": player_choice,
                "computer": computer_choice,
                "result": result
            })
        
        def animate_computer_choice(self, final_choice):
            # Simple animation: cycle through choices before showing final
            animation_steps = 8
            delay = 80
            
            for i in range(animation_steps):
                random_emoji = self.emojis[random.choice(self.choices)]
                self.root.after(i * delay, 
                            lambda e=random_emoji: self.computer_choice_label.config(text=e))
            
            # Show final choice
            self.root.after(animation_steps * delay, 
                        lambda: self.computer_choice_label.config(text=self.emojis[final_choice]))
        
        def determine_winner(self, player, computer):
            if player == computer:
                return "tie"
            
            winning_combinations = {
                "Rock": "Scissors",
                "Paper": "Rock",
                "Scissors": "Paper"
            }
            
            if winning_combinations[player] == computer:
                return "win"
            else:
                return "lose"
        
        def reset_game(self):
            self.scores = {"player": 0, "computer": 0, "ties": 0}
            self.round_number = 0
            self.history = []
            
            self.player_score_label.config(text="0")
            self.computer_score_label.config(text="0")
            self.ties_label.config(text="Ties: 0")
            self.round_label.config(text="Round: 0")
            
            self.player_choice_label.config(text="❓")
            self.computer_choice_label.config(text="❓")
            self.result_label.config(text="Make your choice!", fg="#ecf0f1")
        
        def show_history(self):
            if not self.history:
                history_window = tk.Toplevel(self.root)
                history_window.title("Game History")
                history_window.configure(bg="#2c3e50")
                history_window.geometry("300x100")
                
                tk.Label(history_window, text="No games played yet!", 
                        font=("Arial", 14),
                        bg="#2c3e50", fg="#ecf0f1").pack(pady=30)
                return
            
            history_window = tk.Toplevel(self.root)
            history_window.title("Game History")
            history_window.configure(bg="#2c3e50")
            history_window.geometry("500x400")
            
            # Title
            tk.Label(history_window, text="Game History", 
                    font=("Arial", 18, "bold"),
                    bg="#2c3e50", fg="#ecf0f1").pack(pady=10)
            
            # Create scrollable frame
            canvas = tk.Canvas(history_window, bg="#34495e", highlightthickness=0)
            scrollbar = tk.Scrollbar(history_window, orient="vertical", command=canvas.yview)
            scrollable_frame = tk.Frame(canvas, bg="#34495e")
            
            scrollable_frame.bind(
                "<Configure>",
                lambda e: canvas.configure(scrollregion=canvas.bbox("all"))
            )
            
            canvas.create_window((0, 0), window=scrollable_frame, anchor="nw")
            canvas.configure(yscrollcommand=scrollbar.set)
            
            # Add history entries
            for entry in reversed(self.history):
                frame = tk.Frame(scrollable_frame, bg="#2c3e50", padx=10, pady=5)
                frame.pack(fill="x", padx=10, pady=3)
                
                result_colors = {"win": "#2ecc71", "lose": "#e74c3c", "tie": "#f39c12"}
                result_text = {"win": "WIN", "lose": "LOSS", "tie": "TIE"}
                
                text = f"Round {entry['round']}: {self.emojis[entry['player']]} vs {self.emojis[entry['computer']]} - {result_text[entry['result']]}"
                
                tk.Label(frame, text=text, font=("Arial", 11),
                        bg="#2c3e50", fg=result_colors[entry['result']]).pack()
            
            canvas.pack(side="left", fill="both", expand=True)
            scrollbar.pack(side="right", fill="y")

    # Run the game
    if __name__ == "__main__":
        root = tk.Tk()
        game = RockPaperScissors(root)
        root.mainloop()`
    },
//terminal commands
// ============ MORE TERMINAL TOOLS ============
    {
        title: "wget - File Downloader",
        category: "terminal-tools",
        description: "Download files from the web via HTTP/HTTPS/FTP. Resume downloads, mirror websites, download recursively!",
        tags: ["terminal", "download", "http", "web"],
        difficulty: 2,
        lines: "Command: wget",
        code: `# Pre-installed on most Linux systems
    # macOS: brew install wget

    # Basic download:
    wget https://example.com/file.zip

    # Save with different name:
    wget -O newname.zip https://example.com/file.zip

    # Resume download:
    wget -c https://example.com/largefile.zip

    # Download in background:
    wget -b https://example.com/file.zip

    # Multiple files:
    wget -i urls.txt

    # Limit download speed:
    wget --limit-rate=200k https://example.com/file.zip

    # Download entire website:
    wget --mirror --convert-links --page-requisites https://example.com

    # Download with user agent:
    wget --user-agent="Mozilla/5.0" https://example.com/file.zip

    # Authentication:
    wget --user=username --password=pass https://example.com/file.zip

    # FTP download:
    wget ftp://ftp.example.com/file.zip

    # Retry on failure:
    wget --tries=10 https://example.com/file.zip

    # Download to directory:
    wget -P /download/path https://example.com/file.zip

    # Quiet mode:
    wget -q https://example.com/file.zip

    # Check if file exists:
    wget --spider https://example.com/file.zip

    # Practical examples:
    # Download with progress bar:
    wget --progress=bar:force https://example.com/file.zip

    # Download all PDFs from page:
    wget -r -l1 -A.pdf https://example.com/documents/

    # Continue all downloads:
    wget -c -i download-list.txt`
    },
    {
        title: "kill - Terminate Processes",
        category: "terminal-tools",
        description: "Send signals to processes. Stop, restart, or terminate running programs. Essential for process management!",
        tags: ["terminal", "processes", "management", "system"],
        difficulty: 2,
        lines: "Command: kill",
        code: `# Pre-installed on Unix systems

    # Kill by PID:
    kill 1234

    # Force kill:
    kill -9 1234
    kill -KILL 1234

    # Graceful termination:
    kill -15 1234
    kill -TERM 1234

    # Kill by name (killall):
    killall firefox
    killall -9 chrome

    # Kill by name (pkill):
    pkill firefox
    pkill -f "python script.py"

    # List all signals:
    kill -l

    # Common signals:
    # 1  (HUP)  - Hangup
    # 2  (INT)  - Interrupt (Ctrl+C)
    # 9  (KILL) - Force kill (cannot be caught)
    # 15 (TERM) - Graceful termination (default)
    # 18 (CONT) - Continue if stopped
    # 19 (STOP) - Stop process
    # 20 (TSTP) - Terminal stop (Ctrl+Z)

    # Stop (pause) process:
    kill -STOP 1234

    # Continue stopped process:
    kill -CONT 1234

    # Reload configuration:
    kill -HUP 1234

    # Find and kill:
    ps aux | grep chrome | awk '{print $2}' | xargs kill

    # Kill all user processes:
    pkill -u username

    # Kill by port:
    kill $(lsof -t -i:8080)

    # Interactive kill (choose from list):
    ps aux | grep python | fzf | awk '{print $2}' | xargs kill

    # Practical examples:
    # Kill all Python processes:
    pkill python

    # Kill zombie processes:
    kill -9 $(ps aux | grep 'Z' | awk '{print $2}')

    # Kill process using a file:
    fuser -k file.txt`
    },
    {
        title: "top - Process Monitor",
        category: "terminal-tools",
        description: "Real-time system process monitor. See CPU, memory usage, running processes. The classic Unix monitoring tool!",
        tags: ["terminal", "monitoring", "processes", "system"],
        difficulty: 2,
        lines: "Command: top",
        code: `# Pre-installed on Unix systems

    # Basic usage:
    top

    # Exit: Press 'q'

    # Interactive commands (while running):
    # h or ?: Help
    # k: Kill process (enter PID)
    # r: Renice (change priority)
    # M: Sort by memory
    # P: Sort by CPU
    # T: Sort by time
    # u: Filter by user
    # c: Show full command
    # 1: Show individual CPUs
    # d: Change refresh interval
    # W: Save configuration

    # Sort by memory:
    top -o %MEM

    # Sort by CPU:
    top -o %CPU

    # Show specific user:
    top -u username

    # Batch mode (non-interactive):
    top -b -n 1

    # Limit to N processes:
    top -n 10

    # Custom refresh interval (seconds):
    top -d 5

    # Display summary info:
    top -s

    # Color mode:
    top -c

    # Output to file:
    top -b -n 1 > top-output.txt

    # Monitor specific process:
    top -p 1234

    # Monitor multiple processes:
    top -p 1234,5678,9012

    # Understanding the display:
    # PID: Process ID
    # USER: Process owner
    # PR: Priority
    # NI: Nice value
    # VIRT: Virtual memory
    # RES: Resident memory (actual RAM)
    # SHR: Shared memory
    # S: Status (R=running, S=sleeping, Z=zombie)
    # %CPU: CPU usage
    # %MEM: Memory usage
    # TIME+: Total CPU time
    # COMMAND: Process name

    # Tips:
    # - Press '1' to see all CPU cores
    # - Press 'M' to sort by memory
    # - Press 'c' to see full commands
    # - Use htop for better interface!`
    },
    {
        title: "alias - Create Shortcuts",
        category: "terminal-tools",
        description: "Create custom command shortcuts. Save time with aliases for long commands. Boost your productivity!",
        tags: ["terminal", "productivity", "shortcuts", "efficiency"],
        difficulty: 1,
        lines: "Command: alias",
        code: `# Pre-installed on Unix systems

    # Create alias:
    alias ll='ls -alh'
    alias c='clear'
    alias ..='cd ..'

    # View all aliases:
    alias

    # View specific alias:
    alias ll

    # Remove alias:
    unalias ll

    # Temporary alias (current session only):
    alias update='sudo apt update && sudo apt upgrade'

    # Permanent alias (add to ~/.bashrc or ~/.zshrc):
    echo "alias ll='ls -alh'" >> ~/.bashrc
    source ~/.bashrc

    # Useful aliases to add:

    # Navigation:
    alias ..='cd ..'
    alias ...='cd ../..'
    alias ....='cd ../../..'
    alias ~='cd ~'
    alias -- -='cd -'

    # Listing:
    alias ll='ls -alh'
    alias la='ls -A'
    alias l='ls -CF'
    alias lt='ls -alht'
    alias lsize='ls -alh --sort=size'

    # Safety:
    alias rm='rm -i'
    alias cp='cp -i'
    alias mv='mv -i'

    # Git shortcuts:
    alias gs='git status'
    alias ga='git add'
    alias gc='git commit'
    alias gp='git push'
    alias gl='git log --oneline'
    alias gd='git diff'

    # System:
    alias update='sudo apt update && sudo apt upgrade -y'
    alias ports='netstat -tulanp'
    alias psmem='ps auxf | sort -nr -k 4 | head -10'
    alias pscpu='ps auxf | sort -nr -k 3 | head -10'

    # Network:
    alias myip='curl ifconfig.me'
    alias pingg='ping google.com'
    alias fastping='ping -c 100 -i 0.2'

    # Docker:
    alias dps='docker ps'
    alias dimg='docker images'
    alias dexec='docker exec -it'

    # Python:
    alias py='python3'
    alias pip='pip3'
    alias venv='python3 -m venv'

    # Editors:
    alias v='vim'
    alias nv='nvim'

    # Misc:
    alias c='clear'
    alias h='history'
    alias j='jobs -l'
    alias path='echo $PATH | tr ":" "\n"'
    alias now='date +"%T"'
    alias nowdate='date +"%d-%m-%Y"'

    # Fun:
    alias matrix='cmatrix'
    alias starwars='telnet towel.blinkenlights.nl'

    # Functions as aliases:
    mkcd() { mkdir -p "$1" && cd "$1"; }
    extract() { tar -xzf "$1"; }`
    },
    {
        title: "du - Disk Usage",
        category: "terminal-tools",
        description: "Estimate file and directory disk usage. Find what's taking up space on your drive!",
        tags: ["terminal", "disk", "storage", "space"],
        difficulty: 1,
        lines: "Command: du",
        code: `# Pre-installed on Unix systems

    # Basic usage:
    du

    # Human readable:
    du -h

    # Summary (total only):
    du -sh /path/to/directory

    # All files:
    du -ah /path/to/directory

    # Depth limit:
    du -h --max-depth=1
    du -h -d 1  # macOS

    # Sort by size:
    du -h | sort -h
    du -h | sort -hr  # Reverse (largest first)

    # Exclude files:
    du -h --exclude="*.log"

    # Show only directories:
    du -h --max-depth=1 | sort -hr

    # Top 10 largest directories:
    du -h --max-depth=1 | sort -hr | head -10

    # Show total at end:
    du -ch

    # Apparent size vs disk usage:
    du -h --apparent-size

    # One filesystem only:
    du -x

    # Count files:
    du --inodes

    # Practical examples:

    # Find largest directories:
    du -h / 2>/dev/null | sort -hr | head -20

    # Check home directory:
    du -sh ~/*

    # Find large files in current directory:
    du -ah . | sort -hr | head -20

    # Disk usage of specific type:
    find . -name "*.log" -exec du -ch {} + | tail -1

    # Compare directories:
    du -sh dir1 dir2 dir3

    # Watch disk usage change:
    watch -n 5 'du -sh /var/log'

    # Exclude multiple patterns:
    du -h --exclude="node_modules" --exclude=".git" .

    # With timestamp:
    du -sh * | while read size name; do echo "$(date): $size $name"; done

    # Alternative (better): Use ncdu for interactive!
    ncdu`
    },
    {
        title: "ps - Process Status",
        category: "terminal-tools",
        description: "Display information about running processes. See PIDs, CPU usage, memory, and more!",
        tags: ["terminal", "processes", "system", "monitoring"],
        difficulty: 2,
        lines: "Command: ps",
        code: `# Pre-installed on Unix systems

    # Show all processes:
    ps aux
    ps -ef

    # Show processes for current user:
    ps u

    # Show process tree:
    ps auxf
    ps -ejH
    pstree  # Better visualization

    # Show specific user processes:
    ps -u username

    # Show processes by name:
    ps aux | grep firefox

    # Show specific columns:
    ps -eo pid,user,cmd
    ps -eo pid,ppid,%cpu,%mem,cmd

    # Sort by CPU:
    ps aux --sort=-%cpu | head -10

    # Sort by memory:
    ps aux --sort=-%mem | head -10

    # Show threads:
    ps -eLf

    # Show process by PID:
    ps -p 1234

    # Show child processes:
    ps --ppid 1234

    # Watch processes (update every 2s):
    watch -n 2 'ps aux | head -20'

    # Show full command:
    ps auxww

    # Practical examples:

    # Find memory hogs:
    ps aux | sort -nrk 4 | head -10

    # Find CPU hogs:
    ps aux | sort -nrk 3 | head -10

    # Count processes:
    ps aux | wc -l

    # Find zombie processes:
    ps aux | grep 'Z'

    # Show processes using swap:
    for file in /proc/*/status; do awk '/VmSwap|Name/{printf $2 " " $3}END{ print ""}' $file; done | sort -k 2 -n -r | head

    # Custom format:
    ps -eo pid,ppid,user,%cpu,%mem,cmd --sort=-%mem | head

    # Find process by port:
    lsof -i :8080
    netstat -tulpn | grep :8080

    # Kill all processes by name:
    ps aux | grep firefox | awk '{print $2}' | xargs kill

    # Show process start time:
    ps -eo pid,lstart,cmd

    # Group by user:
    ps aux | awk '{print $1}' | sort | uniq -c

    # Compare: ps vs top vs htop
    # ps: One-time snapshot
    # top: Real-time updates
    # htop: Interactive, colorful`
    },
    {
        title: "vim - Text Editor",
        category: "terminal-tools",
        description: "Powerful modal text editor. Edit files efficiently with keyboard shortcuts. The editor loved by developers worldwide!",
        tags: ["terminal", "editor", "vim", "productivity"],
        difficulty: 3,
        lines: "Command: vim",
        code: `# Pre-installed on most systems

    # Open file:
    vim filename.txt

    # Open at specific line:
    vim +42 filename.txt
    vim +/pattern filename.txt

    # Open multiple files:
    vim file1.txt file2.txt

    # Modes:
    # Normal mode: Default, press Esc
    # Insert mode: Press i, a, o
    # Visual mode: Press v
    # Command mode: Press :

    # Basic commands:

    # Insert mode:
    i  # Insert before cursor
    a  # Insert after cursor
    o  # New line below
    O  # New line above
    I  # Insert at line start
    A  # Insert at line end

    # Navigation:
    h/j/k/l  # Left/Down/Up/Right
    w        # Next word
    b        # Previous word
    0        # Line start
    $        # Line end
    gg       # File start
    G        # File end
    :42      # Go to line 42

    # Editing:
    x    # Delete character
    dd   # Delete line
    yy   # Copy line
    p    # Paste
    u    # Undo
    Ctrl+r  # Redo

    # Search:
    /pattern   # Search forward
    ?pattern   # Search backward
    n          # Next match
    N          # Previous match

    # Replace:
    :s/old/new/      # Replace in line
    :s/old/new/g     # Replace all in line
    :%s/old/new/g    # Replace all in file
    :%s/old/new/gc   # Replace with confirmation

    # Save and quit:
    :w       # Save
    :q       # Quit
    :wq      # Save and quit
    :q!      # Quit without saving
    ZZ       # Save and quit

    # Multiple files:
    :e file.txt      # Open file
    :bn              # Next buffer
    :bp              # Previous buffer
    :ls              # List buffers

    # Split windows:
    :split     # Horizontal split
    :vsplit    # Vertical split
    Ctrl+w w   # Switch windows
    Ctrl+w q   # Close window

    # Visual mode:
    v    # Character visual
    V    # Line visual
    Ctrl+v  # Block visual

    # Useful commands:
    :set number      # Show line numbers
    :set paste       # Paste mode
    :syntax on       # Syntax highlighting
    :!command        # Run shell command
    :r !command      # Insert command output

    # Tips:
    # vimtutor  # Interactive tutorial
    # :help     # Built-in help
    # .vimrc    # Configuration file

    # Common .vimrc settings:
    # set number
    # set autoindent
    # set tabstop=4
    # set shiftwidth=4
    # set expandtab
    # syntax on`
    },
    {
        title: "ln - Create Links",
        category: "terminal-tools",
        description: "Create symbolic and hard links. Link files and directories, create shortcuts, manage file references!",
        tags: ["terminal", "links", "filesystem", "files"],
        difficulty: 2,
        lines: "Command: ln",
        code: `# Pre-installed on Unix systems

    # Create symbolic link:
    ln -s /path/to/original /path/to/link

    # Create hard link:
    ln /path/to/original /path/to/link

    # Force overwrite existing link:
    ln -sf /path/to/original /path/to/link

    # Create link in current directory:
    ln -s /usr/bin/python3 python

    # Symbolic vs Hard links:

    # Symbolic (soft) link:
    # - Like a shortcut
    # - Points to path (can break if original moves)
    # - Can link directories
    # - Can cross filesystems
    # - Shows where it points: ls -l

    # Hard link:
    # - Direct reference to file data
    # - Won't break if original moves
    # - Cannot link directories
    # - Must be on same filesystem
    # - Same inode as original

    # View links:
    ls -l  # Shows -> for symbolic links

    # Find broken symbolic links:
    find . -type l ! -exec test -e {} \; -print

    # List all symbolic links:
    find . -type l

    # Remove link:
    rm linkname  # (doesn't delete original)
    unlink linkname

    # Practical examples:

    # Link config file:
    ln -s ~/dotfiles/.vimrc ~/.vimrc

    # Link binary to PATH:
    sudo ln -s /opt/app/binary /usr/local/bin/app

    # Multiple links to same file:
    ln -s ~/Documents/important.txt ~/Desktop/important.txt
    ln -s ~/Documents/important.txt ~/important.txt

    # Link directory:
    ln -s /var/www/project ~/project

    # Update link:
    ln -sf /new/path /existing/link

    # Create relative symbolic link:
    ln -sr ../path/to/file linkname

    # Link all files in directory:
    for f in /source/*; do ln -s "$f" .; done

    # Check if link exists:
    if [ -L linkname ]; then echo "Is link"; fi

    # Get link target:
    readlink linkname
    readlink -f linkname  # Follow to final target

    # Common uses:
    # - Config files (dotfiles)
    # - Making binaries accessible
    # - Organizing without duplicating
    # - Version management (node -> node-v14)`
    },
    {
        title: "head & tail - View File Parts",
        category: "terminal-tools",
        description: "View the beginning or end of files. Perfect for logs, large files, and monitoring file changes in real-time!",
        tags: ["terminal", "files", "text", "viewing"],
        difficulty: 1,
        lines: "Command: head/tail",
        code: `# Pre-installed on Unix systems

    # HEAD - View beginning of file

    # First 10 lines (default):
    head file.txt

    # First N lines:
    head -n 20 file.txt
    head -20 file.txt

    # First N bytes:
    head -c 100 file.txt

    # Multiple files:
    head file1.txt file2.txt

    # All but last N lines:
    head -n -5 file.txt

    # TAIL - View end of file

    # Last 10 lines (default):
    tail file.txt

    # Last N lines:
    tail -n 20 file.txt
    tail -20 file.txt

    # Last N bytes:
    tail -c 100 file.txt

    # Follow file (real-time updates):
    tail -f /var/log/syslog

    # Follow with retry (if file doesn't exist yet):
    tail -F logfile.log

    # Follow multiple files:
    tail -f file1.log file2.log

    # Show file name headers:
    tail -v file1.txt file2.txt

    # Start from line N:
    tail -n +50 file.txt  # From line 50 to end

    # Practical examples:

    # Monitor log file:
    tail -f /var/log/apache2/access.log

    # Last 100 lines:
    tail -n 100 /var/log/syslog

    # First 5 and last 5 lines:
    head -n 5 file.txt && echo "..." && tail -n 5 file.txt

    # View middle of file:
    head -n 100 file.txt | tail -n 10  # Lines 91-100

    # Follow with grep:
    tail -f /var/log/syslog | grep ERROR

    # Monitor multiple logs:
    tail -f *.log

    # Show last N lines every 2 seconds:
    watch -n 2 'tail -n 20 logfile.log'

    # Get line count then show last:
    tail -n $(wc -l < file.txt | awk '{print $1/2}') file.txt

    # Exclude first line (header):
    tail -n +2 data.csv

    # Real-time monitoring with timestamps:
    tail -f logfile.log | while read line; do echo "$(date): $line"; done

    # Follow and save:
    tail -f access.log | tee -a saved.log

    # Color output:
    tail -f error.log | grep --color=auto ERROR

    # Tips:
    # Ctrl+C to stop tail -f
    # Use less +F for follow with less features
    # tail -f is perfect for debugging`
    },
    {
        title: "chmod - Change Permissions",
        category: "terminal-tools",
        description: "Change file and directory permissions. Control who can read, write, and execute your files!",
        tags: ["terminal", "permissions", "security", "files"],
        difficulty: 2,
        lines: "Command: chmod",
        code: `# Pre-installed on Unix systems

    # Numeric mode:
    chmod 755 file.txt
    chmod 644 file.txt
    chmod 777 file.txt

    # Permission numbers:
    # 7 = rwx (read, write, execute)
    # 6 = rw- (read, write)
    # 5 = r-x (read, execute)
    # 4 = r-- (read only)
    # 0 = --- (no permissions)

    # Format: [owner][group][others]
    # 755 = rwxr-xr-x (owner: full, others: read+execute)
    # 644 = rw-r--r-- (owner: read+write, others: read only)

    # Symbolic mode:
    chmod u+x file.txt    # Add execute for user
    chmod g-w file.txt    # Remove write for group
    chmod o+r file.txt    # Add read for others
    chmod a+x file.txt    # Add execute for all

    # Users:
    # u = user (owner)
    # g = group
    # o = others
    # a = all

    # Operations:
    # + = add permission
    # - = remove permission
    # = = set exact permission

    # Permissions:
    # r = read (4)
    # w = write (2)
    # x = execute (1)

    # Recursive:
    chmod -R 755 directory/

    # Common permissions:

    # Files:
    chmod 644 file.txt     # Regular file
    chmod 600 private.key  # Private file
    chmod 755 script.sh    # Executable script

    # Directories:
    chmod 755 directory/   # Normal directory
    chmod 700 private/     # Private directory
    chmod 777 public/      # Fully open (not recommended!)

    # Practical examples:

    # Make script executable:
    chmod +x script.sh
    chmod u+x script.sh

    # Remove all permissions:
    chmod 000 file.txt

    # Copy permissions from another file:
    chmod --reference=file1.txt file2.txt

    # Set permissions for new files:
    chmod u+w,go-w file.txt

    # Recursive for files only:
    find . -type f -exec chmod 644 {} \;

    # Recursive for directories only:
    find . -type d -exec chmod 755 {} \;

    # Set directory permissions properly:
    chmod 755 $(find . -type d)
    chmod 644 $(find . -type f)

    # Special permissions:

    # Setuid (4):
    chmod 4755 file  # Run as file owner

    # Setgid (2):
    chmod 2755 dir/  # Inherit group

    # Sticky bit (1):
    chmod 1777 /tmp  # Only owner can delete

    # View permissions:
    ls -l file.txt

    # Understanding ls -l output:
    # -rw-r--r-- 1 user group size date file
    # │└┬┘└┬┘└┬┘
    # │ │  │  └─ others permissions
    # │ │  └──── group permissions
    # │ └─────── owner permissions
    # └───────── file type (- = file, d = directory, l = link)

    # Security best practices:
    # - Never use 777 in production
    # - Keep private keys at 600
    # - Web files typically 644
    # - Directories typically 755
    # - Scripts need execute (+x)`
    },
    {
        title: "sl - Steam Locomotive",
        category: "terminal",
        description: "A fun alternative to 'ls' - displays an ASCII art steam locomotive animation when you mistype 'ls'. Install with: brew install sl (Mac) or apt install sl (Linux)",
        tags: ["terminal", "fun", "ascii-art", "animation"],
        difficulty: 1,
        lines: "Command: sl",
        code: `# Installation:
    # macOS: brew install sl
    # Linux: sudo apt-get install sl
    # Windows: Use WSL or install via chocolatey

    # Usage:
    sl

    # Variations:
    sl -a    # Add an accident
    sl -l    # Little locomotive
    sl -F    # Flying locomotive
    sl -e    # Allow Ctrl+C to interrupt`
    },
    {
        title: "cowsay - Talking Cow",
        category: "terminal",
        description: "Make an ASCII cow say anything you want! A classic terminal command for displaying messages in a speech bubble.",
        tags: ["terminal", "fun", "ascii-art", "text"],
        difficulty: 1,
        lines: "Command: cowsay",
        code: `# Installation:
    # macOS: brew install cowsay
    # Linux: sudo apt-get install cowsay
    # Windows: pip install cowsay

    # Basic usage:
    cowsay "Hello World!"

    # Different animals:
    cowsay -f dragon "I'm a dragon!"
    cowsay -f tux "Linux rules!"
    cowsay -f stegosaurus "Rawr!"

    # List all available animals:
    cowsay -l

    # Pipe output to cowsay:
    fortune | cowsay

    # Think instead of say:
    cowthink "Hmm..."`
    },
    {
        title: "fortune - Random Quotes",
        category: "terminal",
        description: "Displays random quotes, jokes, and fortunes. Great for adding to your .bashrc or .zshrc for a daily dose of wisdom!",
        tags: ["terminal", "fun", "quotes", "text"],
        difficulty: 1,
        lines: "Command: fortune",
        code: `# Installation:
    # macOS: brew install fortune
    # Linux: sudo apt-get install fortune-mod
    # Windows: Use WSL

    # Basic usage:
    fortune

    # Specific categories:
    fortune -a        # All fortunes
    fortune computers # Computer-related fortunes
    fortune people    # People-related fortunes

    # Short fortunes only:
    fortune -s

    # Long fortunes only:
    fortune -l

    # Combine with cowsay:
    fortune | cowsay

    # Add to your .bashrc or .zshrc:
    echo "fortune | cowsay" >> ~/.bashrc`
    },
    {
        title: "figlet - ASCII Art Text",
        category: "terminal",
        description: "Generate large ASCII art text banners in various fonts. Perfect for terminal headers and cool text displays.",
        tags: ["terminal", "ascii-art", "text", "banner"],
        difficulty: 1,
        lines: "Command: figlet",
        code: `# Installation:
    # macOS: brew install figlet
    # Linux: sudo apt-get install figlet
    # Windows: Use WSL or download from figlet.org

    # Basic usage:
    figlet "Hello World"

    # Different fonts:
    figlet -f slant "Cool Text"
    figlet -f banner "BANNER"
    figlet -f digital "12345"
    figlet -f bubble "Bubble"

    # List all fonts:
    figlet -l

    # Center text:
    figlet -c "Centered"

    # Width control:
    figlet -w 80 "Fixed Width"

    # Combine with lolcat for colors:
    figlet "Rainbow Text" | lolcat`
    },
    {
        title: "lolcat - Rainbow Terminal Output",
        category: "terminal",
        description: "Make any terminal output rainbow colored! Pipe any command through lolcat for a colorful display.",
        tags: ["terminal", "colors", "fun", "rainbow"],
        difficulty: 1,
        lines: "Command: lolcat",
        code: `# Installation:
    # macOS: brew install lolcat
    # Linux: sudo apt-get install lolcat
    # Windows: gem install lolcat (requires Ruby)

    # Basic usage:
    echo "Rainbow text!" | lolcat

    # With figlet:
    figlet "AWESOME" | lolcat

    # List files with colors:
    ls -la | lolcat

    # Animate the rainbow:
    echo "Animated!" | lolcat -a

    # Speed control:
    echo "Fast rainbow" | lolcat -a -d 1
    echo "Slow rainbow" | lolcat -a -d 50

    # Force colors:
    fortune | lolcat -f

    # Read a file with colors:
    cat yourfile.txt | lolcat`
    },
    {
        title: "cmatrix - Matrix Rain",
        category: "terminal",
        description: "Simulate the falling matrix code from The Matrix movies! A classic terminal screen saver with customizable colors and speed.",
        tags: ["terminal", "animation", "matrix", "screensaver"],
        difficulty: 1,
        lines: "Command: cmatrix",
        code: `# Installation:
    # macOS: brew install cmatrix
    # Linux: sudo apt-get install cmatrix
    # Windows: Use WSL

    # Basic usage:
    cmatrix

    # Exit: Press Ctrl+C or 'q'

    # Bold characters:
    cmatrix -b

    # Different colors:
    cmatrix -C red
    cmatrix -C green
    cmatrix -C blue
    cmatrix -C yellow
    cmatrix -C magenta
    cmatrix -C cyan
    cmatrix -C white

    # Asynchronous scroll:
    cmatrix -a

    # Speed control (1-10):
    cmatrix -u 2    # Slower
    cmatrix -u 10   # Faster

    # Screensaver mode (no bold):
    cmatrix -s`
    },
    {
        title: "htop - System Monitor",
        category: "terminal",
        description: "Interactive process viewer and system monitor. A beautiful, colorful alternative to the standard 'top' command with mouse support!",
        tags: ["terminal", "system", "monitoring", "processes"],
        difficulty: 2,
        lines: "Command: htop",
        code: `# Installation:
    # macOS: brew install htop
    # Linux: sudo apt-get install htop
    # Windows: Use WSL

    # Basic usage:
    htop

    # Navigation:
    # Arrow keys - Navigate
    # F1 - Help
    # F2 - Setup
    # F3 - Search process
    # F4 - Filter
    # F5 - Tree view
    # F6 - Sort by column
    # F9 - Kill process
    # F10 - Quit

    # Sort by CPU:
    # Press F6, then select CPU%

    # Sort by Memory:
    # Press F6, then select MEM%

    # Kill a process:
    # Navigate to process, press F9, select signal

    # Tree view (shows process hierarchy):
    # Press F5`
    },
    {
        title: "neofetch - System Info Display",
        category: "terminal",
        description: "Display system information alongside your distro's ASCII logo. Shows OS, kernel, CPU, GPU, memory, and more in a beautiful format!",
        tags: ["terminal", "system-info", "ascii-art", "colorful"],
        difficulty: 1,
        lines: "Command: neofetch",
        code: `# Installation:
    # macOS: brew install neofetch
    # Linux: sudo apt-get install neofetch
    # Windows: Use WSL or scoop install neofetch

    # Basic usage:
    neofetch

    # Disable ASCII art:
    neofetch --off

    # Use image instead of ASCII (requires terminal with image support):
    neofetch --image /path/to/image.png

    # Different ASCII art:
    neofetch --ascii_distro arch
    neofetch --ascii_distro ubuntu
    neofetch --ascii_distro macos

    # Custom colors:
    neofetch --ascii_colors 1 2 3 4 5 6

    # Show less info:
    neofetch --disable gpu disk

    # Show more info:
    neofetch --enable term

    # Add to .bashrc or .zshrc to run on terminal start:
    echo "neofetch" >> ~/.bashrc`
    },
    {
        title: "pipes.sh - Animated Pipes",
        category: "terminal",
        description: "Mesmerizing animated pipes flowing across your terminal. Highly customizable screensaver with multiple pipe styles and colors!",
        tags: ["terminal", "animation", "screensaver", "art"],
        difficulty: 1,
        lines: "Command: pipes.sh",
        code: `# Installation:
    # macOS: brew install pipes-sh
    # Linux: git clone https://github.com/pipeseroni/pipes.sh
    #        cd pipes.sh && sudo make install
    # Or: curl -o pipes.sh https://raw.githubusercontent.com/pipeseroni/pipes.sh/master/pipes.sh
    #     chmod +x pipes.sh

    # Basic usage:
    pipes.sh

    # Exit: Press Ctrl+C

    # More pipes:
    pipes.sh -p 5

    # Different colors:
    pipes.sh -c 1   # Red/Green
    pipes.sh -c 2   # Blue/Cyan

    # Different pipe types:
    pipes.sh -t 1   # Standard
    pipes.sh -t 2   # Curved
    pipes.sh -t 3   # Angular

    # Random colors:
    pipes.sh -R

    # Speed control:
    pipes.sh -f 60  # Frames per second

    # Combine options:
    pipes.sh -p 10 -t 2 -R -f 75`
    },
    {
        title: "asciiquarium - Underwater Animation",
        category: "terminal",
        description: "An ASCII aquarium animation with fish, sharks, whales, and sea creatures swimming across your terminal!",
        tags: ["terminal", "animation", "ascii-art", "fun"],
        difficulty: 1,
        lines: "Command: asciiquarium",
        code: `# Installation:
    # macOS: brew install asciiquarium
    # Linux: sudo apt-get install asciiquarium
    # Windows: Use WSL

    # Requires: libcurses-perl
    # Install perl module first if needed:
    sudo cpan Term::Animation

    # Basic usage:
    asciiquarium

    # Exit: Press Ctrl+C or 'q'

    # The aquarium shows:
    # - Swimming fish
    # - Sharks
    # - Whales  
    # - Dolphins
    # - Seaweed
    # - Bubbles
    # - Submarines
    # - And more!

    # No additional options needed - just enjoy!`
    },
    {
        title: "ranger - File Manager",
        category: "terminal",
        description: "Vi-inspired file manager for the terminal with image previews, tabs, bookmarks, and powerful keyboard navigation.",
        tags: ["terminal", "file-manager", "vim", "productivity"],
        difficulty: 2,
        lines: "Command: ranger",
        code: `# Installation:
    # macOS: brew install ranger
    # Linux: sudo apt-get install ranger
    # Windows: pip install ranger-fm

    # Basic usage:
    ranger

    # Navigation:
    # h/j/k/l or Arrow keys - Navigate
    # Enter - Open file/directory
    # q - Quit
    # S - Open shell in current directory

    # File operations:
    # yy - Copy file
    # dd - Cut file
    # pp - Paste file
    # dD - Delete file
    # / - Search
    # n - Next search result

    # View modes:
    # i - Preview file
    # zh - Show hidden files
    # zp - Toggle preview

    # Tabs:
    # gn - Create new tab
    # gt - Go to next tab
    # gT - Go to previous tab

    # Bookmarks:
    # m<key> - Create bookmark
    # '<key> - Go to bookmark`
    },
    {
        title: "hollywood - Hacker Terminal",
        category: "terminal",
        description: "Fill your terminal with Hollywood-style hacker screens! Multiple terminal windows with various system monitoring and hacking animations.",
        tags: ["terminal", "fun", "animation", "hacker"],
        difficulty: 1,
        lines: "Command: hollywood",
        code: `# Installation:
    # Ubuntu/Debian: sudo apt-get install hollywood
    # Other Linux: Requires byobu, build from source
    # macOS: Not officially available
    # Windows: Use WSL with Ubuntu

    # Basic usage:
    hollywood

    # Exit: Press Ctrl+C

    # What it does:
    # - Splits terminal into multiple panes
    # - Runs various commands:
    #   * htop (system monitor)
    #   * Directory tree visualization
    #   * Code compilation output
    #   * Network traffic
    #   * Log file streaming
    #   * Matrix-style output
    #   * And more!

    # Makes you look like a movie hacker!
    # Great for impressing non-technical friends!`
    },
    {
        title: "toilet - ASCII Art Text",
        category: "terminal",
        description: "Like figlet but with color support! Create colorful ASCII art text with various fonts and effects including borders and filters.",
        tags: ["terminal", "ascii-art", "text", "colors"],
        difficulty: 1,
        lines: "Command: toilet",
        code: `# Installation:
    # macOS: brew install toilet
    # Linux: sudo apt-get install toilet
    # Windows: Use WSL

    # Basic usage:
    toilet "Hello World"

    # With colors:
    toilet -f mono12 -F gay "Rainbow"
    toilet -F metal "Metal Text"
    toilet -F border "Bordered"

    # Different fonts:
    toilet -f standard "Standard"
    toilet -f bigmono9 "Big Mono"
    toilet -f pagga "Pagga"
    toilet -f term "Terminal"

    # List all fonts:
    toilet -f list

    # Filters:
    toilet -F gay      # Rainbow colors
    toilet -F metal    # Metal effect
    toilet -F flip     # Flip vertically
    toilet -F flop     # Flip horizontally
    toilet -F 180      # Rotate 180°
    toilet -F left     # Left alignment
    toilet -F right    # Right alignment
    toilet -F border   # Add border

    # Combine filters:
    toilet -F gay:border "Awesome"`
    },
    {
        title: "bat - Better Cat",
        category: "terminal",
        description: "A cat clone with syntax highlighting, line numbers, and git integration. Beautiful file viewing with automatic paging!",
        tags: ["terminal", "productivity", "syntax-highlighting", "file-viewer"],
        difficulty: 1,
        lines: "Command: bat",
        code: `# Installation:
    # macOS: brew install bat
    # Linux: sudo apt-get install bat
    # Windows: choco install bat

    # Basic usage:
    bat filename.py

    # Show line numbers:
    bat -n filename.py

    # Show git changes:
    bat filename.py

    # Multiple files:
    bat file1.txt file2.txt

    # Specific line range:
    bat -r 10:20 filename.py

    # Different themes:
    bat --theme="Dracula" filename.py
    bat --theme="Monokai Extended" filename.py

    # List themes:
    bat --list-themes

    # Plain output (no decorations):
    bat -p filename.py

    # Use as cat replacement:
    alias cat='bat'

    # Pipe support:
    curl -s https://example.com | bat -l html`
    },
    {
        title: "tldr - Simplified Man Pages",
        category: "terminal",
        description: "Community-driven simplified man pages. Get practical examples for any command without reading lengthy documentation!",
        tags: ["terminal", "productivity", "documentation", "help"],
        difficulty: 1,
        lines: "Command: tldr",
        code: `# Installation:
    # Node.js: npm install -g tldr
    # macOS: brew install tldr
    # Linux: sudo apt-get install tldr
    # Python: pip install tldr

    # Update cache first:
    tldr --update

    # Basic usage:
    tldr tar
    tldr git
    tldr ssh
    tldr ffmpeg

    # Search for command:
    tldr --search "compress"

    # List all pages:
    tldr --list

    # Render in specific language:
    tldr -L es git  # Spanish
    tldr -L fr tar  # French

    # Examples of what you'll get:
    # Instead of lengthy man pages, you get:
    # - Clear command syntax
    # - Practical examples
    # - Common use cases
    # - Easy to understand format`
    },
    {
        title: "exa - Modern ls",
        category: "terminal",
        description: "A modern replacement for ls with colors, icons, git status, tree view, and more features. Written in Rust for speed!",
        tags: ["terminal", "productivity", "file-listing", "modern"],
        difficulty: 1,
        lines: "Command: exa",
        code: `# Installation:
    # macOS: brew install exa
    # Linux: sudo apt-get install exa
    # Windows: cargo install exa

    # Basic usage:
    exa

    # Long listing (like ls -l):
    exa -l

    # With icons:
    exa --icons

    # Show hidden files:
    exa -a

    # Tree view:
    exa --tree
    exa --tree --level=2

    # Sort by:
    exa --sort=size     # By size
    exa --sort=modified # By date
    exa --sort=name     # By name

    # Git status:
    exa -l --git

    # Grid view:
    exa --grid

    # Combine options:
    exa -la --icons --git --sort=modified

    # Recommended aliases:
    alias ls='exa --icons'
    alias ll='exa -l --icons --git'
    alias la='exa -la --icons --git'
    alias lt='exa --tree --level=2 --icons'`
    },
    {
        title: "cava - Audio Visualizer",
        category: "terminal",
        description: "Console-based Audio Visualizer for ALSA. See your music come alive with real-time spectrum analyzer bars in your terminal!",
        tags: ["terminal", "audio", "music", "visualizer"],
        difficulty: 2,
        lines: "Command: cava",
        code: `# Installation:
    # macOS: brew install cava
    # Linux: sudo apt-get install cava
    # Arch: sudo pacman -S cava

    # Basic usage:
    cava

    # Exit: Press Ctrl+C

    # Configuration:
    # Create config file:
    mkdir -p ~/.config/cava
    cava -p > ~/.config/cava/config

    # Edit ~/.config/cava/config to customize:
    # - Colors
    # - Bar spacing
    # - Sensitivity
    # - Smoothing
    # - And more!

    # Different modes:
    # Stereo mode, mono mode, wave mode

    # Works with:
    # - Spotify
    # - YouTube
    # - Any audio playing on your system

    # Perfect for music lovers and streamers!`
    },
    {
        title: "tmux - Terminal Multiplexer",
        category: "terminal",
        description: "Manage multiple terminal sessions in one window. Split panes, create tabs, detach/reattach sessions. Essential for serious terminal users!",
        tags: ["terminal", "productivity", "multiplexer", "sessions"],
        difficulty: 3,
        lines: "Command: tmux",
        code: `# Installation:
    # macOS: brew install tmux
    # Linux: sudo apt-get install tmux
    # Windows: Use WSL

    # Basic usage:
    tmux

    # Prefix key: Ctrl+b (press before all commands)

    # Sessions:
    tmux new -s mysession      # New named session
    tmux attach -t mysession   # Attach to session
    tmux ls                    # List sessions
    Ctrl+b d                   # Detach from session
    tmux kill-session -t name  # Kill session

    # Windows (tabs):
    Ctrl+b c    # Create new window
    Ctrl+b n    # Next window
    Ctrl+b p    # Previous window
    Ctrl+b 0-9  # Switch to window number
    Ctrl+b ,    # Rename window
    Ctrl+b &    # Kill window

    # Panes (splits):
    Ctrl+b %    # Split vertically
    Ctrl+b "    # Split horizontally
    Ctrl+b →    # Move to right pane
    Ctrl+b ←    # Move to left pane
    Ctrl+b ↑    # Move to upper pane
    Ctrl+b ↓    # Move to lower pane
    Ctrl+b x    # Kill pane
    Ctrl+b z    # Zoom pane (fullscreen toggle)

    # Resize panes:
    Ctrl+b :resize-pane -D 5   # Down
    Ctrl+b :resize-pane -U 5   # Up
    Ctrl+b :resize-pane -L 5   # Left
    Ctrl+b :resize-pane -R 5   # Right`
    },
    {
        title: "fzf - Fuzzy Finder",
        category: "terminal",
        description: "Blazing fast fuzzy finder for your command line. Search files, command history, processes, and more with lightning speed!",
        tags: ["terminal", "productivity", "search", "finder"],
        difficulty: 2,
        lines: "Command: fzf",
        code: `# Installation:
    # macOS: brew install fzf
    # Linux: sudo apt-get install fzf
    # Git: git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf
    #      ~/.fzf/install

    # Basic usage:
    fzf

    # Find and open file:
    vim $(fzf)

    # Search command history:
    history | fzf

    # Search and cd to directory:
    cd $(find . -type d | fzf)

    # Kill process:
    kill -9 $(ps aux | fzf | awk '{print $2}')

    # Preview files:
    fzf --preview 'cat {}'
    fzf --preview 'bat --color=always {}'

    # Multi-select:
    fzf -m

    # Keybindings (after installation):
    Ctrl+t    # Paste selected files
    Ctrl+r    # Paste from history
    Alt+c     # cd into selected directory

    # Aliases to add to .bashrc or .zshrc:
    alias preview="fzf --preview 'bat --color=always --style=numbers --line-range=:500 {}'"
    alias vimf="vim \$(fzf)"

    # Integration with other commands:
    export FZF_DEFAULT_COMMAND='fd --type f'
    export FZF_CTRL_T_COMMAND="$FZF_DEFAULT_COMMAND"`
    },
    {
        title: "glances - System Monitor",
        category: "terminal",
        description: "Cross-platform advanced system monitoring tool. Shows CPU, memory, network, disk I/O, processes, sensors, and more in one screen!",
        tags: ["terminal", "monitoring", "system", "performance"],
        difficulty: 2,
        lines: "Command: glances",
        code: `# Installation:
    # Python: pip install glances
    # macOS: brew install glances
    # Linux: sudo apt-get install glances

    # Basic usage:
    glances

    # Exit: Press 'q' or Ctrl+C

    # Navigation:
    # 1-9: Sort processes by different columns
    # a: Auto-sort
    # c: CPU
    # m: Memory
    # n: Network
    # d: Disk I/O
    # f: Filesystem
    # s: Sensors
    # w: Warnings
    # l: Logs
    # h: Help

    # Export to file:
    glances --export csv --export-csv-file /tmp/glances.csv

    # Web server mode:
    glances -w
    # Then open http://localhost:61208 in browser

    # Client/Server mode:
    glances -s              # Server
    glances -c localhost    # Client

    # Show only specific stats:
    glances --disable-network
    glances --disable-disk

    # Refresh interval:
    glances -t 2    # Update every 2 seconds`
    },
    {
        title: "speedtest-cli - Internet Speed Test",
        category: "terminal",
        description: "Test your internet speed directly from terminal. Check download/upload speeds and ping using Speedtest.net infrastructure.",
        tags: ["terminal", "network", "speed-test", "internet"],
        difficulty: 1,
        lines: "Command: speedtest-cli",
        code: `# Installation:
    # Python: pip install speedtest-cli
    # macOS: brew install speedtest-cli
    # Linux: sudo apt-get install speedtest-cli

    # Basic usage:
    speedtest-cli

    # Simple output (no progress bar):
    speedtest-cli --simple

    # Share results:
    speedtest-cli --share

    # List nearby servers:
    speedtest-cli --list

    # Use specific server:
    speedtest-cli --server 12345

    # JSON output:
    speedtest-cli --json

    # CSV output:
    speedtest-cli --csv

    # Bytes instead of bits:
    speedtest-cli --bytes

    # Secure connection:
    speedtest-cli --secure

    # No download test (upload only):
    speedtest-cli --no-download

    # No upload test (download only):
    speedtest-cli --no-upload

    # Create alias for quick tests:
    alias speed='speedtest-cli --simple'`
    },
    {
        title: "ncdu - Disk Usage Analyzer",
        category: "terminal",
        description: "NCurses Disk Usage analyzer. Find what's eating your disk space with an interactive, easy-to-navigate interface!",
        tags: ["terminal", "disk", "storage", "analyzer"],
        difficulty: 2,
        lines: "Command: ncdu",
        code: `# Installation:
    # macOS: brew install ncdu
    # Linux: sudo apt-get install ncdu
    # Windows: Use WSL

    # Basic usage:
    ncdu

    # Scan specific directory:
    ncdu /home/user
    ncdu ~/Downloads

    # Navigation:
    # ↑/↓: Navigate
    # Enter: Enter directory
    # Left: Go back
    # d: Delete file/directory
    # g: Show percentage/graph
    # n: Sort by name
    # s: Sort by size
    # c: Show item counts
    # e: Show hidden files
    # i: Show file info
    # r: Refresh/Recalculate
    # q: Quit

    # Export to file:
    ncdu -o dump.txt

    # Import from file:
    ncdu -f dump.txt

    # Exclude patterns:
    ncdu --exclude .git --exclude node_modules

    # Follow symlinks:
    ncdu -L

    # One filesystem only:
    ncdu -x

    # Show disk usage graph:
    ncdu -g`
    },
    {
        title: "tree - Directory Tree",
        category: "terminal",
        description: "Display directory structure as a tree. Beautiful ASCII art representation of your file hierarchy with colors and icons!",
        tags: ["terminal", "files", "directory", "visualization"],
        difficulty: 1,
        lines: "Command: tree",
        code: `# Installation:
    # macOS: brew install tree
    # Linux: sudo apt-get install tree
    # Windows: Built-in or use WSL

    # Basic usage:
    tree

    # Limit depth:
    tree -L 2    # 2 levels deep
    tree -L 1    # Only current directory

    # Show hidden files:
    tree -a

    # Only directories:
    tree -d

    # Show file sizes:
    tree -h

    # Full path:
    tree -f

    # Show permissions:
    tree -p

    # Pattern matching:
    tree -P "*.py"      # Only Python files
    tree -I "node_modules" # Ignore node_modules

    # Colorized output:
    tree -C

    # Output to file:
    tree > structure.txt
    tree -H . > tree.html  # HTML output

    # File count summary:
    tree --du

    # Sort by:
    tree -t    # Sort by modification time
    tree -v    # Sort naturally

    # Combine options:
    tree -L 3 -C -h -I "node_modules|.git"`
    },
    {
        title: "httrack - Website Copier",
        category: "terminal",
        description: "Download entire websites for offline browsing. Mirror websites to your local machine with all links working offline!",
        tags: ["terminal", "web", "download", "scraping"],
        difficulty: 2,
        lines: "Command: httrack",
        code: `# Installation:
    # macOS: brew install httrack
    # Linux: sudo apt-get install httrack
    # Windows: Download from httrack.com

    # Basic usage (interactive):
    httrack

    # Command line:
    httrack "https://example.com" -O "/path/to/output"

    # Download with options:
    httrack "https://example.com" \\
    -O "./website" \\
    -%v \\  # Verbose
    -r2    # Depth level 2

    # Mirror single page:
    httrack "https://example.com/page" -O "./page" -r1

    # Download with filters:
    # Only images:
    httrack "https://example.com" -O "./images" +*.jpg +*.png

    # Exclude certain files:
    httrack "https://example.com" -O "./site" -*.pdf -*.zip

    # Update existing mirror:
    httrack --update "https://example.com" -O "./website"

    # Bandwidth limit:
    httrack "https://example.com" -O "./site" --max-rate=50000

    # Warning: 
    # - Respect robots.txt
    # - Don't abuse servers
    # - Use responsibly`
    },
    {
        title: "youtube-dl - Video Downloader",
        category: "terminal",
        description: "Download videos from YouTube and 1000+ other sites. Extract audio, choose quality, get subtitles, and more!",
        tags: ["terminal", "video", "download", "youtube"],
        difficulty: 2,
        lines: "Command: youtube-dl",
        code: `# Installation:
    # Python: pip install youtube-dl
    # macOS: brew install youtube-dl
    # Linux: sudo apt-get install youtube-dl
    # Or: sudo curl -L https://yt-dl.org/downloads/latest/youtube-dl -o /usr/local/bin/youtube-dl
    #     sudo chmod a+rx /usr/local/bin/youtube-dl

    # Note: yt-dlp is a more actively maintained fork
    # Install: pip install yt-dlp

    # Basic usage:
    youtube-dl "VIDEO_URL"

    # Best quality:
    youtube-dl -f best "VIDEO_URL"

    # Audio only (MP3):
    youtube-dl -x --audio-format mp3 "VIDEO_URL"

    # Specific quality:
    youtube-dl -f 'bestvideo[height<=720]+bestaudio' "VIDEO_URL"

    # List all formats:
    youtube-dl -F "VIDEO_URL"

    # Download playlist:
    youtube-dl "PLAYLIST_URL"

    # Download with subtitles:
    youtube-dl --write-sub --sub-lang en "VIDEO_URL"

    # Custom filename:
    youtube-dl -o "%(title)s.%(ext)s" "VIDEO_URL"

    # Download thumbnail:
    youtube-dl --write-thumbnail "VIDEO_URL"

    # Playlist range:
    youtube-dl --playlist-start 1 --playlist-end 5 "PLAYLIST_URL"

    # Resume download:
    youtube-dl -c "VIDEO_URL"`
    },
    {
        title: "mc - Midnight Commander",
        category: "terminal",
        description: "Visual file manager with two panels. Copy, move, edit files with an intuitive interface. Like Norton Commander but better!",
        tags: ["terminal", "file-manager", "visual", "productivity"],
        difficulty: 2,
        lines: "Command: mc",
        code: `# Installation:
    # macOS: brew install mc
    # Linux: sudo apt-get install mc
    # Windows: Use WSL

    # Basic usage:
    mc

    # Navigation:
    # Tab: Switch panels
    # Insert: Select/deselect file
    # +: Select group
    # -: Deselect group
    # *: Invert selection

    # Function keys:
    # F1: Help
    # F2: User menu
    # F3: View file
    # F4: Edit file
    # F5: Copy
    # F6: Move/rename
    # F7: Make directory
    # F8: Delete
    # F9: Menu
    # F10: Quit

    # Quick search:
    # Type filename to jump to it

    # Internal editor:
    mc -e filename

    # Internal viewer:
    mc -v filename

    # FTP connection:
    # F9 → Right/Left → FTP link
    # Or: cd /#ftp:user@server

    # Themes:
    # F9 → Options → Appearance

    # Virtual filesystem:
    # Browse archives (tar, zip, etc.)
    # Just navigate into them!`
    },
    {
        title: "nmap - Network Scanner",
        category: "terminal",
        description: "Network exploration and security auditing tool. Discover hosts, services, operating systems, and find security vulnerabilities!",
        tags: ["terminal", "network", "security", "scanning"],
        difficulty: 3,
        lines: "Command: nmap",
        code: `# Installation:
    # macOS: brew install nmap
    # Linux: sudo apt-get install nmap
    # Windows: Download from nmap.org

    # WARNING: Only scan networks you own or have permission to scan!

    # Basic scan:
    nmap 192.168.1.1

    # Scan subnet:
    nmap 192.168.1.0/24

    # Scan specific ports:
    nmap -p 80,443 192.168.1.1

    # Scan port range:
    nmap -p 1-1000 192.168.1.1

    # Scan all ports:
    nmap -p- 192.168.1.1

    # Fast scan (top 100 ports):
    nmap -F 192.168.1.1

    # Service version detection:
    nmap -sV 192.168.1.1

    # OS detection:
    sudo nmap -O 192.168.1.1

    # Aggressive scan:
    sudo nmap -A 192.168.1.1

    # Ping scan (find live hosts):
    nmap -sn 192.168.1.0/24

    # UDP scan:
    sudo nmap -sU 192.168.1.1

    # Stealth scan:
    sudo nmap -sS 192.168.1.1

    # Output to file:
    nmap -oN output.txt 192.168.1.1
    nmap -oX output.xml 192.168.1.1

    # Scan with scripts:
    nmap --script vuln 192.168.1.1`
    },
    {
        title: "nyancat - Flying Cat Animation",
        category: "terminal",
        description: "Nyan Cat flies across your terminal with rainbow trail! A colorful, animated ASCII art version of the famous internet meme.",
        tags: ["terminal", "fun", "animation", "meme"],
        difficulty: 1,
        lines: "Command: nyancat",
        code: `# Installation:
    # macOS: brew install nyancat
    # Linux: sudo apt-get install nyancat
    # Or compile from source:
    # git clone https://github.com/klange/nyancat.git
    # cd nyancat && make && sudo make install

    # Basic usage:
    nyancat

    # Exit: Press Ctrl+C

    # Telnet version (if installed):
    telnet nyancat.dakko.us

    # Features:
    # - Animated Nyan Cat
    # - Rainbow trail
    # - Music (if terminal supports it)
    # - Frame counter
    # - Full color animation

    # Great for:
    # - Testing terminal colors
    # - Impressing friends
    # - Taking a break
    # - Fun screensaver

    # The cat flies forever!
    # Watch the frame counter increase!`
    },
    {
        title: "curl - Transfer Data",
        category: "terminal",
        description: "Transfer data from/to servers. Download files, test APIs, check websites, send data. The Swiss Army knife of data transfer!",
        tags: ["terminal", "network", "http", "api"],
        difficulty: 2,
        lines: "Command: curl",
        code: `# Usually pre-installed on most systems

    # Basic GET request:
    curl https://example.com

    # Save to file:
    curl -o filename.html https://example.com
    curl -O https://example.com/file.zip  # Use remote filename

    # Follow redirects:
    curl -L https://example.com

    # Download with progress bar:
    curl -# -O https://example.com/file.zip

    # Resume download:
    curl -C - -O https://example.com/largefile.zip

    # POST request:
    curl -X POST https://api.example.com/data

    # POST with data:
    curl -X POST -d "name=John&age=30" https://api.example.com

    # POST JSON:
    curl -X POST -H "Content-Type: application/json" \\
    -d '{"name":"John","age":30}' \\
    https://api.example.com

    # Authentication:
    curl -u username:password https://example.com

    # Headers:
    curl -H "Authorization: Bearer TOKEN" https://api.example.com

    # Show headers:
    curl -I https://example.com
    curl -i https://example.com  # Headers + body

    # Verbose output:
    curl -v https://example.com

    # Silent mode:
    curl -s https://example.com

    # Check weather:
    curl wttr.in
    curl wttr.in/London

    # Get public IP:
    curl ifconfig.me
    curl ipinfo.io`
    },
    {
        title: "grep - Search Text",
        category: "terminal",
        description: "Search for patterns in files. The most powerful text searching tool in Unix with regex support and countless options!",
        tags: ["terminal", "search", "text", "regex"],
        difficulty: 2,
        lines: "Command: grep",
        code: `# Pre-installed on Unix systems

    # Basic search:
    grep "pattern" filename.txt

    # Case insensitive:
    grep -i "pattern" filename.txt

    # Recursive search in directory:
    grep -r "pattern" /path/to/dir

    # Show line numbers:
    grep -n "pattern" filename.txt

    # Show only filenames:
    grep -l "pattern" *.txt

    # Invert match (lines NOT containing pattern):
    grep -v "pattern" filename.txt

    # Count matches:
    grep -c "pattern" filename.txt

    # Show context (lines before/after):
    grep -A 3 "pattern" file.txt  # 3 lines after
    grep -B 3 "pattern" file.txt  # 3 lines before
    grep -C 3 "pattern" file.txt  # 3 lines both sides

    # Multiple patterns (OR):
    grep -E "pattern1|pattern2" filename.txt

    # Extended regex:
    grep -E "^[0-9]{3}-[0-9]{3}-[0-9]{4}$" contacts.txt

    # Whole word match:
    grep -w "word" filename.txt

    # Color output:
    grep --color "pattern" filename.txt

    # Search in gzipped files:
    zgrep "pattern" file.gz

    # Exclude files/directories:
    grep -r --exclude="*.log" "pattern" .
    grep -r --exclude-dir=".git" "pattern" .

    # Practical examples:
    grep -r "TODO" .  # Find TODOs in code
    grep -i "error" /var/log/syslog  # Find errors in logs
    ps aux | grep python  # Find Python processes`
    },
    {
        title: "jq - JSON Processor",
        category: "terminal",
        description: "Parse, filter, and manipulate JSON data like sed for JSON. Essential tool for working with APIs and JSON files!",
        tags: ["terminal", "json", "parsing", "api"],
        difficulty: 3,
        lines: "Command: jq",
        code: `# Installation:
    # macOS: brew install jq
    # Linux: sudo apt-get install jq
    # Windows: choco install jq

    # Pretty print JSON:
    cat data.json | jq '.'
    echo '{"name":"John","age":30}' | jq '.'

    # Access field:
    echo '{"name":"John","age":30}' | jq '.name'

    # Access nested field:
    jq '.user.address.city' data.json

    # Array access:
    jq '.[0]' array.json
    jq '.[0:3]' array.json  # First 3 elements

    # Filter array:
    jq '.[] | select(.age > 25)' users.json

    # Map array:
    jq '.users | map(.name)' data.json

    # Multiple fields:
    jq '.name, .age' data.json

    # Create new object:
    jq '{username: .name, years: .age}' data.json

    # Array of specific fields:
    jq '[.[] | {name: .name, email: .email}]' users.json

    # Count array elements:
    jq '. | length' array.json

    # Keys:
    jq 'keys' data.json

    # Sort:
    jq 'sort_by(.age)' users.json

    # Group by:
    jq 'group_by(.category)' items.json

    # API examples:
    curl -s https://api.github.com/users/github | jq '.name'
    curl -s https://api.github.com/users/github/repos | jq '.[].name'

    # Multiple conditions:
    jq '.[] | select(.age > 25 and .city == "NYC")' data.json

    # Raw output (no quotes):
    jq -r '.name' data.json`
    },
    // ============ TERMINAL GAMES ============
// ============ MORE TERMINAL GAMES ============
    {
        title: "nethack - Roguelike Adventure",
        category: "terminal-games",
        description: "Classic dungeon crawler roguelike. Explore dungeons, fight monsters, find the Amulet of Yendor! Decades of gameplay depth.",
        tags: ["terminal", "game", "roguelike", "rpg", "dungeon"],
        difficulty: 4,
        lines: "Command: nethack",
        code: `# Installation:
    # Linux: sudo apt-get install nethack-console
    # macOS: brew install nethack
    # Windows: Use WSL

    # Basic usage:
    nethack

    # Controls:
    # Numpad or vi keys (hjkl yubn): Move
    # ?: Help
    # i: Inventory
    # e: Eat
    # q: Quaff (drink)
    # r: Read
    # w: Wield weapon
    # W: Wear armor
    # T: Take off armor
    # a: Apply item
    # d: Drop
    # p: Pay shopkeeper
    # s: Search
    # .: Rest
    # >: Go down stairs
    # <: Go up stairs
    # Shift+S: Save and quit

    # Character classes:
    # - Archeologist
    # - Barbarian
    # - Caveman
    # - Healer
    # - Knight
    # - Monk
    # - Priest
    # - Ranger
    # - Rogue
    # - Samurai
    # - Tourist
    # - Valkyrie
    # - Wizard

    # Tips for beginners:
    # - Start with Valkyrie (easiest)
    # - Always search for secret doors
    # - Don't eat everything (some food is poisonous)
    # - Pray when in trouble (but not too often)
    # - Identify items before using
    # - Engrave "Elbereth" for protection

    # Features:
    # - Permadeath
    # - Procedural generation
    # - Complex interactions
    # - ASCII graphics
    # - Hundreds of items
    # - Deep strategic gameplay

    # Famous for:
    # "The DevTeam thinks of everything"
    # Extremely detailed game world
    # Dark sense of humor

    # Warning: Extremely addictive!
    # One of the deepest games ever made!`
    },
    {
        title: "angband - Tolkien Roguelike",
        category: "terminal-games",
        description: "Roguelike set in Tolkien's Middle-earth! Fight Morgoth, explore 100 dungeon levels, find artifacts from LOTR!",
        tags: ["terminal", "game", "roguelike", "tolkien", "fantasy"],
        difficulty: 4,
        lines: "Command: angband",
        code: `# Installation:
    # Linux: sudo apt-get install angband
    # macOS: brew install angband
    # Windows: Download from rephial.org

    # Basic usage:
    angband

    # Controls:
    # Arrow keys or vi keys: Move
    # ,: Pick up
    # d: Drop
    # i: Inventory
    # e: Equipment
    # w: Wear/wield
    # t: Take off
    # E: Eat
    # q: Quaff potion
    # r: Read scroll
    # a: Aim wand
    # z: Zap staff
    # f: Fire missile
    # m: Cast spell
    # R: Rest
    # s: Search
    # >: Go down
    # <: Go up
    # ?: Help

    # Character creation:
    # Choose race:
    # - Human, Half-Elf, Elf, Hobbit
    # - Dwarf, Half-Orc, Half-Troll
    # - Dunadan, High-Elf

    # Choose class:
    # - Warrior, Mage, Priest, Rogue
    # - Ranger, Paladin, Druid, Monk

    # Gameplay:
    # - 100 dungeon levels
    # - Find artifacts from LOTR
    # - Fight Morgoth (final boss)
    # - Town above dungeon
    # - Buy/sell items in shops
    # - Permadeath

    # Features:
    # - Based on Tolkien's works
    # - Deep character progression
    # - Hundreds of monsters
    # - Legendary artifacts
    # - Magic system
    # - Multiple towns

    # Tips:
    # - Start with Warrior/Ranger
    # - Level up before going deep
    # - Use detection spells
    # - Hoard healing potions
    # - Learn monster abilities
    # - Use recall to return to town

    # Variants available:
    # - ZAngband (Zelazny + Angband)
    # - ToME (Tales of Middle Earth)
    # - Many more!`
    },
    {
        title: "cataclysm-dda - Zombie Survival",
        category: "terminal-games",
        description: "Post-apocalyptic zombie survival roguelike! Craft, build, explore, survive. Incredibly detailed simulation with tile or ASCII graphics!",
        tags: ["terminal", "game", "roguelike", "survival", "zombies"],
        difficulty: 4,
        lines: "Command: cataclysm-dda",
        code: `# Installation:
    # Linux: sudo apt-get install cataclysm-dda-curses
    # macOS: brew install cataclysm-dda
    # Or download from: cataclysmdda.org

    # Basic usage:
    cataclysm-dda

    # Controls:
    # Arrow keys or vi keys: Move
    # e: Examine
    # g: Pick up
    # d: Drop
    # i: Inventory
    # w: Wear
    # t: Take off
    # a: Apply/Use
    # f: Fire weapon
    # r: Reload
    # &: Craft
    # *: Construction
    # ^: Vehicles
    # s: Smash
    # o: Open
    # c: Close
    # B: Butcher
    # .: Wait/Rest
    # ?: Help

    # Gameplay:
    # - Open world survival
    # - Craft weapons, armor, tools
    # - Build bases and vehicles
    # - Scavenge for supplies
    # - Fight zombies and mutants
    # - Hunger, thirst, temperature
    # - Disease and injuries
    # - Mutations and bionics

    # Character creation:
    # - Choose profession
    # - Select traits
    # - Distribute stats
    # - Pick starting scenario

    # Features:
    # - Extremely detailed crafting
    # - Realistic survival mechanics
    # - Vehicle construction
    # - Chemistry and cooking
    # - Mutations and CBMs
    # - Huge world to explore
    # - Active development

    # Tips:
    # - Start in shelter
    # - Boil water before drinking
    # - Make a crowbar early
    # - Avoid cities at first
    # - Learn to craft
    # - Build a safe base
    # - Hoard non-perishables

    # Scenarios:
    # - Evacuee (standard start)
    # - Lab escape
    # - Prison break
    # - Wilderness start
    # - Many challenge scenarios

    # One of the most detailed survival games!
    # Incredible depth and replayability!`
    },
    {
        title: "brogue - Elegant Roguelike",
        category: "terminal-games",
        description: "Beautiful, streamlined roguelike with stunning ASCII visuals! Easy to learn, hard to master. Perfect introduction to roguelikes!",
        tags: ["terminal", "game", "roguelike", "dungeon", "elegant"],
        difficulty: 3,
        lines: "Command: brogue",
        code: `# Installation:
    # Linux: sudo apt-get install brogue
    # macOS: brew install brogue
    # Or download from: sites.google.com/site/broguegame

    # Basic usage:
    brogue

    # Controls:
    # Arrow keys or vi keys: Move
    # i: Inventory
    # d: Drop
    # e: Eat
    # r: Read scroll
    # q: Quaff potion
    # a: Apply staff
    # w: Wield weapon
    # W: Wear armor
    # z: Zap wand
    # t: Throw
    # s: Search
    # >: Descend stairs
    # <: Ascend stairs
    # ?: Help

    # Objective:
    # - Descend 26 dungeon levels
    # - Find the Amulet of Yendor
    # - Escape back to surface
    # - Achieve high score

    # Features:
    # - Beautiful ASCII graphics
    # - Smooth animations
    # - Strategic gameplay
    # - No grinding
    # - Every item is useful
    # - Environmental interactions
    # - Fire, water, poison gas
    # - Allied creatures

    # Gameplay mechanics:
    # - Permadeath
    # - Procedural generation
    # - Item identification
    # - Light and darkness
    # - Stealth system
    # - Terrain effects

    # Tips:
    # - Learn item effects
    # - Use environment tactically
    # - Don't hoard consumables
    # - Retreat when needed
    # - Experiment with items
    # - Enchant strategically
    # - Make allies

    # Why it's special:
    # - Elegant design
    # - No bloat
    # - Beautiful to look at
    # - Streamlined interface
    # - Perfect difficulty curve
    # - Every run is different

    # Best roguelike for beginners!
    # Clean, focused, challenging!`
    },
    {
        title: "adom - Ancient Domains of Mystery",
        category: "terminal-games",
        description: "Complex fantasy roguelike with story elements! Choose from 12 races and classes, complete quests, save the world!",
        tags: ["terminal", "game", "roguelike", "rpg", "fantasy"],
        difficulty: 4,
        lines: "Command: adom",
        code: `# Installation:
    # Linux: Download from adom.de
    # macOS: Download from adom.de
    # Or: sudo apt-get install adom (older version)

    # Basic usage:
    adom

    # Controls:
    # Numpad or vi keys: Move
    # i: Inventory
    # d: Drop
    # e: Eat
    # q: Quaff
    # r: Read
    # w: Wield
    # W: Wear
    # a: Apply
    # z: Zap wand
    # c: Close door
    # o: Open door
    # s: Search
    # >: Down
    # <: Up
    # C: Chat
    # ?: Help

    # Races:
    # - Human, Dwarf, Gnome, Hurthling
    # - High Elf, Gray Elf, Dark Elf
    # - Orc, Troll, Drakeling, Mist Elf, Ratling

    # Classes:
    # - Warrior, Paladin, Ranger, Thief
    # - Assassin, Monk, Bard, Priest
    # - Wizard, Elementalist, Druid, Necromancer

    # Main Quest:
    # - Close the Chaos Gate
    # - Save the world from corruption
    # - Complete various sub-quests
    # - Prevent chaos from spreading

    # Features:
    # - Story-driven gameplay
    # - Complex quest system
    # - Corruption mechanics
    # - Skills and talents
    # - Multiple endings
    # - Overworld + dungeons
    # - Towns and NPCs
    # - Crafting system

    # Corruption system:
    # - Chaos corrupts you over time
    # - Gain mutations (good and bad)
    # - Too much corruption = game over
    # - Must balance exploration vs corruption

    # Tips:
    # - Talk to all NPCs
    # - Complete early quests
    # - Watch corruption level
    # - Save often (if not playing hardcore)
    # - Learn to cook
    # - Train important skills
    # - Don't rush the main quest

    # One of the "major" roguelikes!
    # Deep, complex, rewarding!`
    },
    {
        title: "dwarf-fortress - Fortress Simulator",
        category: "terminal-games",
        description: "Incredibly complex fortress building and adventure game! Manage dwarves, build fortresses, face fun. Most complex game ever made!",
        tags: ["terminal", "game", "simulation", "fortress", "complex"],
        difficulty: 5,
        lines: "Command: dwarffortress",
        code: `# Installation:
    # Download from: bay12games.com/dwarves
    # Linux: Extract and run ./df
    # macOS: Download Mac version
    # Windows: Run Dwarf Fortress.exe

    # Launch:
    cd dwarffortress
    ./df  # or ./dwarffortress

    # Two game modes:

    # FORTRESS MODE:
    # - Build and manage dwarf fortress
    # - Mine resources
    # - Craft items
    # - Trade with caravans
    # - Defend from sieges
    # - Manage 200+ dwarves

    # ADVENTURE MODE:
    # - Single character RPG
    # - Explore generated world
    # - Complete quests
    # - Fight creatures
    # - Roguelike gameplay

    # Controls (Fortress Mode):
    # Arrow keys: Move view
    # u/k/m/h: Designate mining
    # b: Build menu
    # d: Designations
    # q: Query building
    # v: View units
    # j: Jobs
    # z: Status
    # ESC: Cancel/Back

    # Why it's legendary:
    # - Insane complexity
    # - Emergent storytelling
    # - "Losing is fun!"
    # - Procedural everything
    # - Decades of development
    # - Active community

    # Features:
    # - Entire world simulated
    # - Thousands of years of history
    # - Weather, seasons, geology
    # - Complex materials system
    # - Personality and emotions
    # - Combat system (very detailed)
    # - Legendary artifacts
    # - Nobles and politics

    # Famous stories:
    # - Boatmurdered
    # - The Hamlet of Tyranny
    # - Countless fortress collapses

    # Learning curve:
    # Vertical. Nearly straight up.
    # Use wiki extensively!
    # Watch tutorials!

    # Tips:
    # - Use quickstart guide
    # - Start with tutorial
    # - Watch video tutorials
    # - Use wiki constantly
    # - Expect to fail
    # - Embrace the chaos
    # - "Losing is fun!"

    # Most complex game ever created!
    # Steam version has graphics!`
    },
    {
        title: "zork - Text Adventure",
        category: "terminal-games",
        description: "Classic interactive fiction! Explore the Great Underground Empire, solve puzzles, find treasures. A piece of gaming history!",
        tags: ["terminal", "game", "text-adventure", "classic", "puzzle"],
        difficulty: 2,
        lines: "Command: zork",
        code: `# Installation:
    # Linux: sudo apt-get install frotz zork1 zork2 zork3
    # macOS: brew install frotz, then download zork files
    # Or play online at: textadventures.co.uk

    # Basic usage:
    frotz /usr/games/zork1.dat

    # Or if installed via package:
    zork1

    # How to play:
    # Type commands in plain English:
    go north
    take lamp
    open mailbox
    read leaflet
    attack troll with sword
    inventory

    # Common commands:
    # Movement: n, s, e, w, ne, nw, se, sw, u, d
    # Actions: take, drop, look, examine, open, close
    # inventory (i): Show items
    # look (l): Describe location
    # save: Save game
    # restore: Load game
    # quit: Exit game

    # Starting the game:
    # "West of House"
    # Famous opening: "You are standing in an open field
    # west of a white house, with a boarded front door.
    # There is a small mailbox here."

    # Objective:
    # - Explore underground empire
    # - Collect 20 treasures
    # - Return them to trophy case
    # - Achieve "Master Adventurer" rank

    # Tips:
    # - EXAMINE everything
    # - Draw a map!
    # - Take notes
    # - Try unusual commands
    # - "XYZZY" is a famous command
    # - Save often
    # - Think creatively

    # Famous puzzles:
    # - The maze
    # - The troll
    # - The thief
    # - The Flood Control Dam #3

    # Famous quotes:
    # "You are likely to be eaten by a grue."
    # "It is pitch black."
    # "Your lamp has run out of power."

    # Why it's important:
    # - First commercial text adventure
    # - Defined the genre
    # - Influenced countless games
    # - Cultural phenomenon
    # - Still fun today!

    # Sequels:
    # - Zork I
    # - Zork II
    # - Zork III
    # - Many more!`
    },
    {
        title: "adventure (colossal cave) - Original Text Adventure",
        category: "terminal-games",
        description: "The ORIGINAL text adventure from 1976! Explore Colossal Cave, collect treasures, solve puzzles. Where it all began!",
        tags: ["terminal", "game", "text-adventure", "classic", "original"],
        difficulty: 2,
        lines: "Command: adventure",
        code: `# Installation:
    # Linux: sudo apt-get install bsdgames
    # macOS: brew install adventure
    # Then run: adventure

    # Basic usage:
    adventure

    # How to play:
    # Type simple commands (usually 1-2 words):
    go east
    get lamp
    kill dragon
    say xyzzy

    # Common commands:
    # Directions: n, s, e, w, ne, nw, se, sw, u, d, in, out
    # Actions: get, drop, inventory, look, quit
    # Special: xyzzy, plugh, plover

    # The game:
    # - Explore Colossal Cave
    # - Find treasures
    # - Solve puzzles
    # - Avoid hazards
    # - Get maximum score

    # Starting text:
    # "You are standing at the end of a road before a
    # small brick building. Around you is a forest.
    # A small stream flows out of the building and
    # down a gully."

    # Famous locations:
    # - The Building
    # - The Well House
    # - The Hall of Mists
    # - The Pit
    # - Witt's End

    # Magic words:
    # xyzzy - Teleport command
    # plugh - Another teleport
    # plover - Access Plover Room
    # fee fie foe foo - Special action

    # Tips:
    # - Light is important!
    # - Save lamp battery
    # - Draw a map
    # - Take notes
    # - Try obvious things
    # - Nothing is too silly to try
    # - Read messages carefully

    # Items to find:
    # - Keys
    # - Lamp
    # - Food
    # - Water
    # - Treasures (gold, diamonds, etc.)

    # Hazards:
    # - Darkness (grues?)
    # - Dwarves with axes
    # - Trolls
    # - Dragons
    # - Bottomless pits

    # Historical significance:
    # - Created in 1976
    # - First adventure game
    # - Inspired entire genre
    # - Source code studied by generations
    # - Gaming history artifact

    # Fun fact:
    # Based on real Mammoth Cave in Kentucky!
    # Creator Will Crowther was a caver!

    # The game that started it all!`
    },
    {
        title: "frotz - Interactive Fiction Player",
        category: "terminal-games",
        description: "Play hundreds of interactive fiction games! Z-machine interpreter for Infocom games and modern IF. A whole genre in one tool!",
        tags: ["terminal", "game", "text-adventure", "interactive-fiction", "player"],
        difficulty: 1,
        lines: "Command: frotz",
        code: `# Installation:
    # Linux: sudo apt-get install frotz
    # macOS: brew install frotz
    # Windows: Download from frotz.sourceforge.net

    # Basic usage:
    frotz gamefile.z5

    # Find games:
    # - ifdb.org (Interactive Fiction Database)
    # - ifarchive.org (IF Archive)
    # - itch.io (modern IF games)

    # Common game formats:
    # .z3, .z5, .z8 - Classic Infocom format
    # .zblorb - Modern format with graphics/sound
    # .ulx - Glulx games (newer, more powerful)

    # Classic Infocom games:
    # - All Zork games (I, II, III)
    # - Hitchhiker's Guide to the Galaxy
    # - Planetfall
    # - A Mind Forever Voyaging
    # - Trinity
    # - Leather Goddesses of Phobos
    # - Suspended
    # - Deadline
    # - Witness

    # Modern IF recommendations:
    # - Photopia (emotional)
    # - Anchorhead (horror)
    # - Spider and Web (spy thriller)
    # - Counterfeit Monkey (wordplay)
    # - Hadean Lands (alchemy)
    # - 80 Days (Around the world)

    # Standard commands:
    # examine [object]
    # take [object]
    # drop [object]
    # inventory
    # look
    # go [direction]
    # talk to [character]
    # save
    # restore
    # quit

    # Advanced commands:
    # undo - Take back last move
    # restart - Start over
    # script - Record session
    # transcript off - Stop recording

    # Tips:
    # - Read carefully
    # - Examine everything
    # - Try unusual combinations
    # - Save frequently
    # - Use built-in hints (if available)
    # - Map as you go

    # Annual competitions:
    # - IFComp (October each year)
    # - Spring Thing
    # - Many more!

    # Why play IF:
    # - Amazing stories
    # - Pure imagination
    # - Puzzle solving
    # - Literary quality
    # - Active community
    # - Free games!

    # Getting started:
    # 1. Download frotz
    # 2. Visit ifdb.org
    # 3. Download a game
    # 4. Run: frotz gamefile.z5
    # 5. Type "help" in game

    # Modern tools:
    # - Twine (create IF in browser)
    # - Inform 7 (IF programming language)
    # - Quest (IF authoring)

    # A whole genre of games!
    # Thousands of stories to experience!`
    },
    {
        title: "ski - Downhill Skiing",
        category: "terminal-games",
        description: "Simple but addictive ASCII skiing game! Dodge trees, make it down the mountain. Classic BSD game!",
        tags: ["terminal", "game", "arcade", "skiing", "simple"],
        difficulty: 1,
        lines: "Command: ski",
        code: `# Installation:
    # Linux: sudo apt-get install bsdgames
    # macOS: brew install bsdgames
    # Then run: ski

    # Basic usage:
    ski

    # Controls:
    # Left arrow or ',': Move left
    # Right arrow or '.': Move right
    # Space: Jump (some versions)
    # Ctrl+C: Quit

    # Gameplay:
    # - Ski down an endless slope
    # - Dodge trees and obstacles
    # - Try to go as far as possible
    # - Speed increases over time

    # Features:
    # - Simple ASCII graphics
    # - Procedurally generated slope
    # - Increasing difficulty
    # - Score tracking
    # - Pure arcade fun

    # ASCII art:
    # | = Tree
    # \ = Skier going left
    # / = Skier going right
    # | = Skier going straight

    # Tips:
    # - React quickly
    # - Plan ahead
    # - Stay centered
    # - Watch for patterns
    # - Don't panic!

    # Variations:
    # Different versions have:
    # - Different speeds
    # - Different controls
    # - Jump mechanics
    # - Special obstacles

    # Why it's fun:
    # - Quick games
    # - Easy to learn
    # - Hard to master
    # - Perfect coffee break game
    # - Nostalgic charm

    # High score challenge:
    # - Try to beat 1000m
    # - Speed increases constantly
    # - How far can you go?

    # Similar games:
    # - snake
    # - worm
    # - tetris-bsd

    # Perfect for:
    # - Quick gaming session
    # - Testing reflexes
    # - Nostalgia
    # - Learning terminal games

    # Simple, fun, classic!`
    },
    {
        title: "myman - Pac-Man Clone",
        category: "terminal-games",
        description: "Pac-Man in your terminal! Eat dots, avoid ghosts, get power pellets. Classic arcade action in ASCII!",
        tags: ["terminal", "game", "arcade", "pacman", "classic"],
        difficulty: 1,
        lines: "Command: myman",
        code: `# Installation:
    # Linux: Download from myman.sourceforge.net
    #        or: git clone https://github.com/kifferltd/myman.git
    #        cd myman && ./configure && make && sudo make install
    # macOS: brew install myman (if available in tap)

    # Or compile from source:
    # git clone https://github.com/kifferltd/myman.git
    # cd myman
    # ./configure
    # make
    # sudo make install

    # Basic usage:
    myman

    # Controls:
    # Arrow keys: Move
    # q: Quit
    # p: Pause
    # Space: Pause (some versions)

    # Gameplay (classic Pac-Man):
    # - Eat all dots to advance
    # - Avoid ghosts (Inky, Blinky, Pinky, Clyde)
    # - Eat power pellets to eat ghosts
    # - Collect fruit for bonus points
    # - Clear all mazes!

    # Features:
    # - Classic Pac-Man gameplay
    # - Multiple maze variations
    # - Ghost AI
    # - Power-ups
    # - Increasing difficulty
    # - Score tracking
    # - Lives system

    # Ghost behavior:
    # - Red (Blinky): Chases directly
    # - Pink (Pinky): Ambushes ahead
    # - Cyan (Inky): Unpredictable
    # - Orange (Clyde): Wanders randomly

    # Power pellets:
    # - Make ghosts blue
    # - Can eat ghosts temporarily
    # - Ghosts return to center
    # - Points multiplier

    # Tips:
    # - Learn ghost patterns
    # - Save power pellets
    # - Clear corners first
    # - Use tunnels to escape
    # - Chase combo points

    # ASCII graphics:
    # @ or C = Pac-Man
    # & or M = Ghosts
    # . = Dots
    # o or O = Power pellets
    # % = Fruit

    # Scoring:
    # - Dot: 10 points
    # - Power pellet: 50 points
    # - Ghost: 200, 400, 800, 1600
    # - Fruit: Varies by level

    # Why play:
    # - Nostalgic fun
    # - Works anywhere
    # - Pure arcade gameplay
    # - Challenge high scores
    # - Quick sessions

    # Classic arcade in ASCII!
    # Waka waka waka!`
    },
    {
        title: "bastet - Tetris",
        category: "terminal-games",
        description: "Play Tetris in your terminal! Classic falling blocks game with high scores and different difficulty levels.",
        tags: ["terminal", "game", "tetris", "puzzle"],
        difficulty: 1,
        lines: "Command: bastet",
        code: `# Installation:
    # Linux: sudo apt-get install bastet
    # macOS: brew install bastet
    # Arch: sudo pacman -S bastet

    # Basic usage:
    bastet

    # Controls:
    # Arrow keys: Move pieces
    # Space: Drop piece
    # p: Pause
    # q: Quit

    # Features:
    # - Classic Tetris gameplay
    # - High score tracking
    # - Preview next piece
    # - Level progression
    # - Score system

    # The name "bastet" is a play on words:
    # - Bastet (Egyptian cat goddess)
    # - "Bastard Tetris" (the game is evil!)

    # The game tries to give you the worst possible pieces!`
    },
    {
        title: "moon-buggy - Jump Game",
        category: "terminal-games",
        description: "Drive a moon buggy across the moon's surface! Jump over craters and obstacles in this simple but addictive side-scrolling game.",
        tags: ["terminal", "game", "jump", "arcade"],
        difficulty: 1,
        lines: "Command: moon-buggy",
        code: `# Installation:
    # Linux: sudo apt-get install moon-buggy
    # macOS: brew install moon-buggy
    # Arch: sudo pacman -S moon-buggy

    # Basic usage:
    moon-buggy

    # Controls:
    # Space: Jump
    # a: Long jump
    # q: Quit

    # Features:
    # - Side-scrolling gameplay
    # - Increasing difficulty
    # - Score tracking
    # - Simple ASCII graphics

    # Tips:
    # - Short jumps for small craters
    # - Long jumps for wide gaps
    # - Watch ahead for obstacles
    # - Speed increases over time

    # Perfect for quick gaming sessions!`
    },
    {
        title: "ninvaders - Space Invaders",
        category: "terminal-games",
        description: "Classic Space Invaders in your terminal! Shoot aliens, dodge missiles, and rack up high scores in this retro arcade game.",
        tags: ["terminal", "game", "arcade", "shooter"],
        difficulty: 1,
        lines: "Command: ninvaders",
        code: `# Installation:
    # Linux: sudo apt-get install ninvaders
    # macOS: brew install ninvaders
    # Arch: sudo pacman -S ninvaders

    # Basic usage:
    ninvaders

    # Controls:
    # Arrow keys: Move left/right
    # Space: Fire
    # q: Quit
    # p: Pause

    # Features:
    # - Classic Space Invaders gameplay
    # - Multiple levels
    # - Increasing difficulty
    # - Shields for protection
    # - UFO bonus targets

    # Game mechanics:
    # - Aliens move faster as you destroy them
    # - Hide behind shields
    # - Bonus UFO appears randomly
    # - Don't let aliens reach the bottom!

    # Addictive retro fun!`
    },
    {
        title: "2048-cli - Number Puzzle",
        category: "terminal-games",
        description: "Play 2048 in your terminal! Slide tiles to combine numbers and reach 2048. Simple, addictive, and runs everywhere!",
        tags: ["terminal", "game", "puzzle", "2048"],
        difficulty: 1,
        lines: "Command: 2048",
        code: `# Installation:
    # npm: npm install -g 2048-cli
    # Or clone: git clone https://github.com/tiehuis/2048-cli.git
    #           cd 2048-cli && make

    # Basic usage:
    2048

    # Controls:
    # Arrow keys: Move tiles
    # w/a/s/d: Alternative movement
    # q: Quit
    # r: Restart

    # How to play:
    # - Swipe tiles in any direction
    # - Same numbers combine when they touch
    # - 2 + 2 = 4, 4 + 4 = 8, etc.
    # - Goal: Reach 2048!

    # Tips:
    # - Keep highest tile in a corner
    # - Build numbers in one direction
    # - Don't spread numbers randomly
    # - Plan several moves ahead

    # Features:
    # - Score tracking
    # - Best score saving
    # - Undo moves (some versions)
    # - Different board sizes`
    },
    {
        title: "nudoku - Sudoku",
        category: "terminal-games",
        description: "Play Sudoku in your terminal! Multiple difficulty levels, hints, and a clean interface for the classic number puzzle game.",
        tags: ["terminal", "game", "puzzle", "sudoku"],
        difficulty: 1,
        lines: "Command: nudoku",
        code: `# Installation:
    # Linux: sudo apt-get install nudoku
    # macOS: brew install nudoku
    # Arch: sudo pacman -S nudoku

    # Basic usage:
    nudoku

    # Controls:
    # Arrow keys: Navigate
    # 1-9: Enter number
    # 0 or Delete: Clear cell
    # h: Hint
    # n: New game
    # q: Quit

    # Difficulty levels:
    nudoku -d easy
    nudoku -d normal
    nudoku -d hard

    # Features:
    # - Multiple difficulty levels
    # - Hint system
    # - Error checking
    # - Timer
    # - Clean interface

    # Tips:
    # - Start with easy numbers
    # - Use pencil marks (notes)
    # - Look for naked singles
    # - Check rows, columns, boxes

    # Perfect for puzzle lovers!`
    },
    {
        title: "greed - Dice Game",
        category: "terminal-games",
        description: "Terminal dice game similar to Farkle. Roll dice, score points, but don't get greedy or you'll lose everything!",
        tags: ["terminal", "game", "dice", "strategy"],
        difficulty: 1,
        lines: "Command: greed",
        code: `# Installation:
    # Linux: sudo apt-get install bsdgames
    # macOS: brew install bsdgames
    # Then run: greed

    # Basic usage:
    greed

    # How to play:
    # - Roll 5 dice
    # - Select dice to keep for points
    # - Re-roll remaining dice
    # - Bank points or risk losing them
    # - First to target score wins!

    # Scoring:
    # - 1 = 100 points
    # - 5 = 50 points
    # - Three 1s = 1000 points
    # - Three 2s = 200 points
    # - Three 3s = 300 points
    # - Three 4s = 400 points
    # - Three 5s = 500 points
    # - Three 6s = 600 points

    # Strategy:
    # - Know when to stop rolling
    # - Bank points before losing them
    # - Calculate risk vs reward

    # Simple but addictive!`
    },
    {
        title: "bsdgames - Game Collection",
        category: "terminal-games",
        description: "Collection of classic text-based games: adventure, battleship, hangman, snake, worm, and many more! Hours of retro gaming fun.",
        tags: ["terminal", "games", "collection", "retro"],
        difficulty: 1,
        lines: "Command: various",
        code: `# Installation:
    # Linux: sudo apt-get install bsdgames
    # macOS: brew install bsdgames

    # Available games:

    # adventure - Classic text adventure
    adventure

    # battleship - Naval combat game
    battleship

    # hangman - Word guessing game
    hangman

    # snake - Snake game
    snake

    # worm - Worm game (like snake)
    worm

    # tetris-bsd - Tetris
    tetris-bsd

    # boggle - Word finding game
    boggle

    # hunt - Multi-player combat
    hunt

    # quiz - Trivia game
    quiz

    # mille - Card game
    mille

    # List all games:
    ls /usr/games/

    # Each game has different controls
    # Press 'h' or '?' for help in most games

    # Classic gaming nostalgia!`
    },
    {
        title: "crawl - Roguelike RPG",
        category: "terminal-games",
        description: "Dungeon Crawl Stone Soup - Complex roguelike RPG with permadeath. Explore dungeons, fight monsters, find treasures!",
        tags: ["terminal", "game", "rpg", "roguelike"],
        difficulty: 3,
        lines: "Command: crawl",
        code: `# Installation:
    # Linux: sudo apt-get install crawl
    # macOS: brew install crawl
    # Or play online: https://crawl.develz.org/

    # Basic usage:
    crawl

    # Controls:
    # Numpad or vi keys (hjkl): Move
    # ?: Help
    # i: Inventory
    # a: Use item
    # z: Cast spell
    # o: Auto-explore
    # s: Search
    # S: Save and quit

    # Character creation:
    # - Choose species (Human, Elf, Dwarf, etc.)
    # - Choose background (Fighter, Wizard, etc.)
    # - Choose god (optional)

    # Tips for beginners:
    # - Start with Minotaur Fighter
    # - Read the tutorial (?)
    # - Don't fight everything
    # - Use stairs to escape
    # - Save frequently

    # Features:
    # - Deep gameplay
    # - Many character combinations
    # - Tactical combat
    # - Permadeath (roguelike!)
    # - Huge dungeons

    # Warning: Very addictive!`
    },

    // ============ TERMINAL FUN STUFF ============
    {
        title: "yes - Infinite Yes",
        category: "terminal-fun",
        description: "Output 'yes' infinitely! Simple but surprisingly useful. Pipe it to other commands for automatic confirmations!",
        tags: ["terminal", "fun", "utility", "simple"],
        difficulty: 1,
        lines: "Command: yes",
        code: `# Pre-installed on Unix systems

    # Basic usage (infinite 'yes'):
    yes

    # Exit: Press Ctrl+C

    # Custom text:
    yes "Hello World"
    yes "no"
    yes "🎉"

    # Practical uses:

    # Auto-confirm installations:
    yes | sudo apt-get install package

    # Delete files without prompts:
    yes | rm -i *.txt

    # Fill disk (testing):
    yes > /dev/null

    # Generate test data:
    yes "test line" | head -n 1000 > testfile.txt

    # Stress test:
    yes | head -n 1000000 | wc -l

    # Fill terminal with text:
    yes "$(tput setaf $((RANDOM % 7 + 1)))SPAM"

    # Fun with pipes:
    yes "🌈" | lolcat

    # Create large file quickly:
    yes "data" | head -c 1G > bigfile.txt

    # Why it exists:
    # - Shell scripting automation
    # - Testing purposes
    # - Piping to other commands
    # - Bypassing confirmations

    # Alternatives:
    printf 'yes\n%.0s' {1..100}  # 100 times
    seq inf | xargs -I{} echo yes

    # Fun combinations:
    yes "$(date)" | head -n 5
    yes "Line $(seq 1 10)" | head -n 10

    # Caution:
    # Can fill disk if not careful!
    # Use with head or timeout!

    # Simple but useful!`
    },
    {
        title: "banner - Large Text Banner",
        category: "terminal-fun",
        description: "Print large ASCII art text banners! Old-school text art for headers and announcements. Retro terminal vibes!",
        tags: ["terminal", "ascii-art", "text", "banner"],
        difficulty: 1,
        lines: "Command: banner",
        code: `# Installation:
    # Linux: sudo apt-get install sysvbanner
    # macOS: Often pre-installed, or brew install banner
    # Part of bsdgames package

    # Basic usage:
    banner "HELLO"

    # Features:
    # - Large block letters
    # - Vertical orientation
    # - Classic ASCII style
    # - Limited to uppercase
    # - Simple and retro

    # Examples:
    banner "WELCOME"
    banner "START"
    banner "ERROR"
    banner "SUCCESS"
    banner "PARTY"

    # Multiple words (limited):
    banner "HI THERE"

    # With color:
    banner "COLOR" | lolcat

    # Limitations:
    # - Usually max 10 characters
    # - Uppercase only
    # - Simple font
    # - Vertical layout

    # Similar commands:
    # figlet - More fonts, horizontal
    # toilet - Color support
    # banner - Classic vertical

    # Compare styles:
    banner "TEXT"
    figlet "TEXT"
    toilet "TEXT"

    # Practical uses:
    # - Script headers
    # - Alerts
    # - Status messages
    # - System notifications
    # - Login messages

    # In scripts:
    #!/bin/bash
    clear
    banner "BACKUP"
    echo "Starting backup process..."

    # Terminal decoration:
    banner "$(hostname)"

    # Fun combinations:
    banner "RETRO" | grep "#"

    # Redirect to file:
    banner "TITLE" > header.txt

    # Why it's cool:
    # - Retro aesthetic
    # - Clear visual impact
    # - Simple and fast
    # - Part of Unix history

    # Classic terminal art!`
    },
    {
        title: "rev - Reverse Text",
        category: "terminal-fun",
        description: "Reverse lines character by character! Make mirror text, scramble output, or just have fun with reversed text!",
        tags: ["terminal", "text", "fun", "reverse"],
        difficulty: 1,
        lines: "Command: rev",
        code: `# Pre-installed on most Unix systems

    # Basic usage:
    echo "Hello World" | rev
    # Output: dlroW olleH

    # Reverse file lines:
    rev filename.txt

    # Interactive mode:
    rev
    # Type text, press Enter
    # See it reversed!
    # Ctrl+D to exit

    # Double reverse (original):
    echo "test" | rev | rev

    # Reverse multiple lines:
    cat file.txt | rev

    # Practical examples:

    # Check if palindrome:
    echo "racecar" | rev
    # If same = palindrome!

    # Create mirror effect:
    echo "MIRROR" && echo "MIRROR" | rev

    # Reverse ASCII art:
    figlet "TEXT" | rev

    # Make secret messages:
    echo "secret message" | rev
    # dlroW olleH
    # Give to friend to reverse back!

    # Reverse CSV columns:
    cat data.csv | rev

    # Fun with pipes:
    fortune | rev
    cowsay "Hello" | rev

    # Create puzzles:
    echo "Can you read this?" | rev
    # ?siht daer uoy naC

    # Reverse URLs:
    echo "https://example.com" | rev

    # Reverse code:
    cat script.sh | rev

    # With lolcat:
    echo "RAINBOW REVERSE" | rev | lolcat

    # Reverse directory listing:
    ls -1 | rev

    # Games with friends:
    # Send reversed messages:
    echo "Meet me at the park" | rev
    # krap eht ta em teeM

    # Scramble text:
    cat poem.txt | rev > scrambled.txt

    # Reverse alphabet:
    echo "ABCDEFGHIJKLMNOPQRSTUVWXYZ" | rev

    # Fun facts:
    # - Simple but entertaining
    # - Great for puzzles
    # - Works with any text
    # - Fast and lightweight

    # Why it exists:
    # - Text processing
    # - Data manipulation
    # - Fun and games!

    # Simple tool, endless fun!`
    },
    {
        title: "factor - Prime Factorization",
        category: "terminal-fun",
        description: "Calculate prime factors of numbers! See the building blocks of any number. Math fun in the terminal!",
        tags: ["terminal", "math", "numbers", "prime"],
        difficulty: 1,
        lines: "Command: factor",
        code: `# Pre-installed on Unix systems

    # Basic usage:
    factor 100
    # Output: 100: 2 2 5 5

    # Multiple numbers:
    factor 12 15 20
    # 12: 2 2 3
    # 15: 3 5
    # 20: 2 2 5

    # Large numbers:
    factor 1234567890
    factor 999999999

    # Prime number check:
    factor 17
    # Output: 17: 17
    # (Only itself = prime!)

    # Interactive mode:
    factor
    # Type numbers, press Enter
    # Ctrl+D to exit

    # Find primes in range:
    seq 1 20 | xargs -I {} sh -c 'f=$(factor {}); [ "$(echo $f | wc -w)" -eq 2 ] && echo {}'

    # Factor squares:
    factor $((100 * 100))
    factor 10000

    # Powers of 2:
    factor 256
    factor 1024
    factor 65536

    # Fun examples:

    # Your age:
    factor 25

    # Current year:
    factor 2025
    # 2025: 3 3 3 3 5 5

    # Phone number:
    factor 5551234

    # Lucky numbers:
    factor 777
    factor 888

    # Factorials:
    factor 120  # 5!
    factor 720  # 6!

    # Perfect squares:
    factor 144
    factor 169
    factor 196

    # Programming uses:
    # Check if prime:
    count=$(factor 17 | wc -w)
    if [ $count -eq 2 ]; then
        echo "Prime!"
    fi

    # Find common factors:
    factor 24
    factor 36
    # Common: 2, 3

    # Educational:
    # Great for learning math
    # Understanding prime numbers
    # Factorization practice

    # Math challenges:
    # What's the prime factorization of:
    factor 1000000
    factor 123456789

    # Patterns:
    seq 10 | xargs factor
    # See patterns emerge!

    # Large primes:
    factor 2147483647
    # Mersenne prime!

    # Combine with other tools:
    seq 100 | xargs factor | grep ": [0-9]*$"
    # Find primes up to 100!

    # Fun facts:
    # - Fast algorithm
    # - Works with huge numbers
    # - Educational tool
    # - Math nerd paradise

    # Make math fun!`
    },
    {
        title: "rig - Random Identity Generator",
        category: "terminal-fun",
        description: "Generate random fake identities! Create names, addresses, phone numbers for testing. Perfect for developers!",
        tags: ["terminal", "fun", "random", "generator"],
        difficulty: 1,
        lines: "Command: rig",
        code: `# Installation:
    # Linux: sudo apt-get install rig
    # macOS: brew install rig
    # Or compile from source

    # Basic usage:
    rig

    # Example output:
    # John Smith
    # 123 Main St
    # Springfield, IL  12345
    # (555) 123-4567

    # Generate multiple:
    rig 5

    # Male names only:
    rig -m

    # Female names only:
    rig -f

    # Specific data sets:
    rig -d usa     # US addresses
    rig -d canada  # Canadian addresses

    # Custom format:
    rig | head -n 1  # Name only
    rig | tail -n 1  # Phone only

    # Practical uses:

    # Test data for forms:
    for i in {1..10}; do rig; echo "---"; done

    # Database seeding:
    rig 100 > test_users.txt

    # CSV format:
    rig | paste -sd "," -

    # API testing:
    rig | jq -R -s -c 'split("\n")'

    # Mock user creation:
    #!/bin/bash
    identity=$(rig)
    name=$(echo "$identity" | head -n 1)
    echo "Creating user: $name"

    # Generate test emails:
    rig | head -1 | tr ' ' '.' | tr '[:upper:]' '[:lower:]'
    # Output: john.smith

    # Privacy testing:
    # Don't use real data!
    # Use rig instead

    # Batch generation:
    for i in {1..5}; do
        echo "User $i:"
        rig
        echo ""
    done

    # Random scenarios:
    # - Testing registration forms
    # - Dummy user accounts
    # - Address validation
    # - Phone number formats
    # - Name parsing logic

    # With other tools:
    rig | cowsay
    rig | figlet
    rig | lolcat

    # Save to file:
    rig 1000 > fake_users.txt

    # Extract parts:
    name=$(rig | head -n 1)
    address=$(rig | sed -n '2p')
    phone=$(rig | tail -n 1)

    # Fun uses:
    # - Character generation for games
    # - Story writing
    # - Roleplaying
    # - Privacy education

    # Alternative tools:
    # - faker (Python)
    # - faker.js (Node.js)
    # - generatedata.com (web)

    # Note:
    # All data is randomly generated
    # Not real people!
    # Safe for testing!

    # Perfect for developers!
    # Never use real data in tests!`
    },
    {
        title: "espeak - Text to Speech",
        category: "terminal-fun",
        description: "Make your terminal talk! Convert text to speech with different voices, speeds, and accents. Robot voice fun!",
        tags: ["terminal", "fun", "speech", "audio", "tts"],
        difficulty: 1,
        lines: "Command: espeak",
        code: `# Installation:
    # Linux: sudo apt-get install espeak
    # macOS: brew install espeak
    # Windows: Download from espeak.sourceforge.net

    # Basic usage:
    espeak "Hello World"

    # Different speeds:
    espeak -s 150 "Fast speech"  # 150 words per minute
    espeak -s 80 "Slow speech"   # 80 words per minute
    # Default is 175 wpm

    # Volume control:
    espeak -a 200 "Loud"    # 200 = very loud
    espeak -a 50 "Quiet"    # 50 = quiet
    # Range: 0-200, default 100

    # Different voices:
    espeak -v en "English"
    espeak -v en-us "American English"
    espeak -v en-gb "British English"
    espeak -v es "Spanish"
    espeak -v fr "French"
    espeak -v de "German"
    espeak -v it "Italian"

    # List all voices:
    espeak --voices

    # Male/female variants:
    espeak -v en+m1 "Male voice 1"
    espeak -v en+f1 "Female voice 1"

    # Pitch control:
    espeak -p 80 "High pitch"   # 0-99
    espeak -p 20 "Low pitch"    # 0-99
    # Default is 50

    # Save to file:
    espeak -w output.wav "Save this audio"

    # Read from file:
    espeak -f textfile.txt

    # Pipe text:
    echo "Hello from pipe" | espeak
    cat story.txt | espeak

    # Fun examples:

    # Make computer greet you:
    espeak "Welcome $(whoami)"

    # Speak fortune:
    fortune | espeak

    # Alarm:
    sleep 10 && espeak "Time is up!"

    # Countdown:
    for i in {10..1}; do
        espeak "$i"
        sleep 1
    done
    espeak "Blast off!"

    # Robot voice:
    espeak -p 1 -s 200 "I am a robot"

    # Sing (kinda):
    espeak -p 80 "La la la la la"

    # System notifications:
    espeak "Backup complete"
    espeak "Warning: Low disk space"

    # Different accents:
    espeak -v en-scottish "Scottish accent"
    espeak -v en-westindies "Caribbean accent"

    # SSML support (markup):
    espeak '<speak><prosody rate="slow">Slow</prosody></speak>'

    # Practical uses:

    # Accessibility:
    cat document.txt | espeak

    # Learning:
    espeak -v es "Buenos días"  # Learn pronunciation

    # Alerts:
    if ! ping -c 1 google.com; then
        espeak "Network is down"
    fi

    # Script feedback:
    espeak "Process started"
    ./long_script.sh
    espeak "Process completed"

    # Time announcements:
    while true; do
        espeak "The time is $(date '+%I %M %p')"
        sleep 3600  # Every hour
    done

    # Fun with pipes:
    cowsay "Moo" | espeak
    figlet "LOUD" | espeak

    # Prank scripts:
    espeak -a 200 "Surprise!"

    # Story reader:
    espeak -s 150 -f story.txt

    # Why it's awesome:
    # - Accessibility tool
    # - System notifications
    # - Learning pronunciation
    # - Fun experiments
    # - Automation feedback

    # Make your terminal talk!`
    },
    {
        title: "cal - Calendar Display",
        category: "terminal-fun",
        description: "Display beautiful ASCII calendars! View any month/year, see the whole year, highlight today. Simple and useful!",
        tags: ["terminal", "calendar", "date", "time"],
        difficulty: 1,
        lines: "Command: cal",
        code: `# Pre-installed on Unix systems

    # Current month:
    cal

    # Example output:
    #     March 2025
    # Su Mo Tu We Th Fr Sa
    #                    1
    #  2  3  4  5  6  7  8
    #  9 10 11 12 13 14 15
    # 16 17 18 19 20 21 22
    # 23 24 25 26 27 28 29
    # 30 31

    # Specific month and year:
    cal 12 2025        # December 2025
    cal january 2024   # January 2024

    # Whole year:
    cal 2025

    # Three months (previous, current, next):
    cal -3

    # Highlight a date:
    cal -h 15  # Highlight the 15th

    # Monday as first day:
    cal -m

    # Julian calendar:
    cal -j  # Shows day numbers (1-365)

    # No highlighting:
    cal -h no

    # Fun examples:

    # Your birthday:
    cal 7 1990  # July 1990

    # Historical dates:
    cal 7 1969  # Moon landing month
    cal 12 1999 # Y2K month

    # Future planning:
    cal 12 2030

    # See patterns:
    cal 2025 | grep "13"  # All Friday 13ths

    # Full year view:
    cal 2025 | less

    # Check weekday:
    cal 12 25 2025  # What day is Christmas?

    # Year you were born:
    cal 1990

    # Leap years:
    cal 2 2024  # 29 days
    cal 2 2025  # 28 days

    # Month when started job:
    cal 6 2020

    # Practical uses:

    # Planning:
    cal -3  # See 3 months for planning

    # Quick date check:
    cal | grep "$(date +%e)"

    # Historical events:
    cal 7 1776  # Declaration of Independence
    cal 11 1989 # Berlin Wall

    # Combine with date:
    echo "Today is $(date +%A)" && cal

    # Script for reminders:
    #!/bin/bash
    cal
    echo "Meetings today: $(date +%A)"

    # Check holidays:
    cal 12 2025  # See when Christmas falls

    # Year comparison:
    cal 2024 > cal2024.txt
    cal 2025 > cal2025.txt
    diff cal2024.txt cal2025.txt

    # Colorful calendar:
    cal | lolcat

    # With decorations:
    figlet "$(date +%B)" && cal

    # ASCII art calendar:
    banner "$(date +%Y)" && cal

    # Fun facts about calendar:

    # 13 Friday the 13ths max per year:
    for m in {1..12}; do cal $m 2025 | grep " 13"; done

    # Leap year check:
    cal 2 2024 | grep "29"

    # Century patterns:
    cal 1900
    cal 2000

    # Tips:
    # - Great for quick date checks
    # - Planning meetings
    # - Historical reference
    # - Simple and fast

    # Alternatives:
    # - ncal (BSD variant)
    # - gcal (advanced features)
    # - date (just today)

    # Simple but essential!`
    },
    {
        title: "oneko - Cat Chases Cursor",
        category: "terminal-fun",
        description: "A cute cat chases your mouse cursor! Classic X11 toy. Adorable desktop pet that follows your pointer around!",
        tags: ["terminal", "fun", "gui", "cat", "cursor"],
        difficulty: 1,
        lines: "Command: oneko",
        code: `# Installation:
    # Linux: sudo apt-get install oneko
    # macOS: brew install oneko
    # Requires X11/XQuartz

    # Basic usage:
    oneko &

    # The cat appears and chases your cursor!

    # Different animals:
    oneko -dog         # Dog instead of cat
    oneko -tora        # Tiger
    oneko -sakura      # Pink cat
    oneko -tomoyo      # Different character

    # Multiple cats:
    oneko &
    oneko -tora &
    oneko -dog &

    # Speed control:
    oneko -speed 20    # Faster
    oneko -speed 5     # Slower

    # Size control:
    oneko -scale 2     # Double size
    oneko -scale 0.5   # Half size

    # Reverse (cat runs from cursor):
    oneko -reverse

    # Different behaviors:
    oneko -idle 3      # Cat sleeps after 3 seconds
    oneko -nekomata    # Two-tailed cat

    # Position:
    oneko -position +100+100  # Start position

    # No wandering:
    oneko -stay

    # Stop all oneko instances:
    killall oneko

    # Fun combinations:

    # Cat party:
    for i in {1..5}; do oneko -tora & sleep 0.5; done

    # Different speeds:
    oneko -speed 30 &
    oneko -dog -speed 10 &

    # Big and small:
    oneko -scale 2 &
    oneko -scale 0.5 &

    # Cat family:
    oneko &
    oneko -sakura &
    oneko -tora &

    # Chase mode:
    oneko -reverse &  # Runs from cursor

    # Easter eggs:
    # Try different character names!
    # Some versions have hidden characters

    # Productivity killer:
    # Warning: Very distracting!
    # Hard to work with cute cat chasing cursor
    # You've been warned!

    # Alternatives:
    # - xeyes (eyes follow cursor)
    # - xsnow (snow on desktop)
    # - xpenguins (penguins on screen)

    # Similar programs:
    xeyes &    # Eyes follow cursor
    # Both running is chaos!

    # Desktop toys:
    oneko &
    xeyes &
    # Cursor party!

    # Why it's awesome:
    # - Cute and fun
    # - Desktop decoration
    # - Stress relief
    # - Makes people smile
    # - Classic Unix toy

    # History:
    # - Created in 1989
    # - Japanese origin (neko = cat)
    # - Classic X11 toy
    # - Still loved today

    # Tips:
    # - Run in background with &
    # - Kill with: killall oneko
    # - Great for screenshots
    # - Fun in presentations
    # - Prank coworkers!

    # Caution:
    # EXTREMELY distracting
    # Not recommended during work
    # May cause excessive smiling
    # Could reduce productivity by 50%

    # But totally worth it!`
    },
    {
        title: "bb - ASCII Art Demo",
        category: "terminal-fun",
        description: "Amazing ASCII art demo/animation! Classic demoscene production in terminal. Watch the show with music and effects!",
        tags: ["terminal", "animation", "ascii-art", "demo", "art"],
        difficulty: 1,
        lines: "Command: bb",
        code: `# Installation:
    # Linux: sudo apt-get install bb
    # macOS: brew install bb
    # Part of aalib (ASCII art library)

    # Basic usage:
    bb

    # Exit: Press any key or Ctrl+C

    # Features:
    # - Animated ASCII art
    # - 3D-like effects
    # - Music visualization (if audio available)
    # - Multiple scenes
    # - Credits scroll
    # - Demoscene tribute

    # What you'll see:
    # - Rotating 3D objects
    # - Tunnel effects
    # - Plasma animations
    # - Text effects
    # - Morphing shapes
    # - Fire effects

    # Controls:
    # - Space or any key: Skip/Exit
    # - Sometimes 'q': Quit
    # - Just watch and enjoy!

    # The demo includes:
    # 1. Intro sequence
    # 2. 3D objects
    # 3. Tunnel ride
    # 4. Plasma effects
    # 5. Credits
    # 6. Loops back

    # History:
    # - Released 1997
    # - Created by Jan Hubicka
    # - Demoscene production
    # - Pure ASCII art
    # - No graphics mode needed

    # Demoscene:
    # - Computer art subculture
    # - Real-time animations
    # - Size-limited demos
    # - Technical showcase
    # - Often with music

    # Why it's special:
    # - Runs in terminal
    # - Pure text mode
    # - Impressive for ASCII
    # - Historic demo
    # - Still cool today

    # Similar demos:
    # - aafire (fire animation)
    # - cacademo (libcaca demo)
    # - Other aalib programs

    # Technical details:
    # - Uses aalib
    # - ASCII rendering engine
    # - Real-time generation
    # - Dithering algorithms
    # - Character selection

    # Run with audio (if supported):
    # Some versions have audio output
    # Check documentation for your version

    # Screenshot it:
    # Terminal: take screenshot during demo
    # Impress friends with ASCII art

    # Show it to:
    # - Fellow geeks
    # - Retro computing fans
    # - ASCII art lovers
    # - Demoscene enthusiasts

    # Fun facts:
    # - Still actively maintained
    # - Ported to many systems
    # - Educational tool
    # - Art meets code
    # - Terminal beauty

    # Other aalib programs:
    aview image.jpg   # View images as ASCII
    aainfo            # Show aalib info

    # Why watch:
    # - Pure nostalgia
    # - Technical appreciation
    # - ASCII art beauty
    # - Demoscene culture
    # - It's just cool!

    # Perfect for:
    # - Terminal demos
    # - Impressing people
    # - Geek cred
    # - Coffee break entertainment

    # A piece of digital art history!
    # Pure terminal magic!`
    },
    {
        title: "xcowsay - GUI Cowsay",
        category: "terminal-fun",
        description: "Cow displays messages on your desktop! GUI version of cowsay with a cute cow in a speech bubble. Desktop notifications with moo!",
        tags: ["terminal", "fun", "gui", "cow", "notification"],
        difficulty: 1,
        lines: "Command: xcowsay",
        code: `# Installation:
    # Linux: sudo apt-get install xcowsay
    # macOS: brew install xcowsay (requires XQuartz)
    # Requires X11

    # Basic usage:
    xcowsay "Hello World"

    # A cow appears on desktop with message!

    # Custom duration:
    xcowsay --time=5 "5 second message"
    xcowsay -t 10 "10 seconds"

    # Different cow images:
    xcowsay --cow-size=large "Big cow"
    xcowsay --cow-size=medium "Medium cow"
    xcowsay --cow-size=small "Small cow"

    # Different animals:
    xcowsay --image=/path/to/image.png "Custom"

    # Reading mode (fortune cow):
    xcowsay --reading-speed=fast "Quick read"
    xcowsay --reading-speed=slow "Slow read"

    # At specific position:
    xcowsay --at=100,100 "Positioned"

    # Daemon mode:
    xcowsay --daemon  # Background server
    echo "Message" | xcowsay --daemon

    # Debug mode:
    xcowsay --debug "Debug info"

    # Practical examples:

    # System notifications:
    xcowsay "Backup completed successfully"
    xcowsay "Warning: Low disk space"
    xcowsay "Update available"

    # Script notifications:
    #!/bin/bash
    ./long_process.sh
    xcowsay "Process finished!"

    # With fortune:
    xcowsay "$(fortune)"

    # Random wisdom:
    fortune | xcowsay

    # Timer notifications:
    sleep 1800 && xcowsay "Break time!"

    # Greeting:
    xcowsay "Good morning, $(whoami)!"

    # System stats:
    xcowsay "Uptime: $(uptime -p)"

    # Reminders:
    xcowsay -t 10 "Meeting in 5 minutes!"

    # Fun messages:
    xcowsay "Moo! 🐮"
    xcowsay "The cow says: Moo-ve over!"
    xcowsay "Holy cow! 🎉"

    # Error notifications:
    if [ $? -ne 0 ]; then
        xcowsay "Error occurred!"
    fi

    # Success messages:
    if [ $? -eq 0 ]; then
        xcowsay "Success! 🎊"
    fi

    # Time announcements:
    while true; do
        xcowsay "$(date '+%I:%M %p')"
        sleep 3600
    done

    # Combine with other tools:
    # Fortune cow:
    while true; do
        fortune | xcowsay -t 10
        sleep 300
    done

    # News cow:
    curl -s news-api.com | xcowsay

    # Weather cow:
    curl wttr.in?format=3 | xcowsay

    # Pomodoro timer:
    xcowsay "Work time: 25 minutes"
    sleep 1500
    xcowsay "Break time: 5 minutes"

    # Desktop pet:
    while true; do
        xcowsay -t 5 "Moo! $(date +%T)"
        sleep 60
    done

    # Creative uses:
    # - Easter eggs in scripts
    # - Friendly reminders
    # - System alerts
    # - Gaming notifications
    # - Prank messages

    # Startup message:
    # Add to ~/.bashrc or startup:
    xcowsay "Welcome back, $(whoami)!"

    # Why it's fun:
    # - Visual notifications
    # - Desktop personality
    # - Friendly interface
    # - Fun alternative to notify-send
    # - Makes people smile

    # Compared to:
    # - notify-send (boring rectangles)
    # - xmessage (plain dialogs)
    # - xcowsay (cow with personality!)

    # Perfect for:
    # - Script feedback
    # - System monitoring
    # - Friendly reminders
    # - Desktop decoration
    # - Humor

    # The cow makes everything better!
    # Moo-ve over, boring notifications!`
    },
    {
        title: "aafire - Animated Fire",
        category: "terminal-fun",
        description: "Watch realistic ASCII fire animation in your terminal! Mesmerizing flame effects with different colors and intensities.",
        tags: ["terminal", "animation", "fire", "art"],
        difficulty: 1,
        lines: "Command: aafire",
        code: `# Installation:
    # Linux: sudo apt-get install libaa-bin
    # macOS: brew install aalib
    # Then run: aafire

    # Basic usage:
    aafire

    # Exit: Press Ctrl+C

    # Features:
    # - Realistic fire simulation
    # - ASCII art rendering
    # - Smooth animation
    # - Different flame patterns

    # Other AA-lib programs:
    # - aview: Image viewer
    # - bb: Demo program

    # The fire algorithm:
    # - Simulates heat distribution
    # - Bottom row has highest heat
    # - Heat rises and dissipates
    # - Colors represent temperature

    # Relaxing to watch!
    # Good for testing terminal capabilities!`
    },
    {
        title: "cbeams - Light Beams",
        category: "terminal-fun",
        description: "Colorful light beam animation inspired by blade runner. Watch colorful beams dance across your terminal!",
        tags: ["terminal", "animation", "art", "colors"],
        difficulty: 1,
        lines: "Command: cbeams",
        code: `# Installation:
    # git clone https://github.com/bartobri/cbeams.git
    # cd cbeams
    # make
    # sudo make install

    # Or download binary from releases:
    # https://github.com/bartobri/cbeams/releases

    # Basic usage:
    cbeams

    # Exit: Press Ctrl+C or 'q'

    # Features:
    # - Beautiful light beam effects
    # - Rainbow colors
    # - Smooth animation
    # - Inspired by "Blade Runner"

    # The famous quote:
    # "All those moments will be lost in time,
    #  like tears in rain"

    # Perfect for:
    # - Sci-fi fans
    # - Terminal art lovers
    # - Screensaver
    # - Relaxation

    # Mesmerizing animation!`
    },
    {
        title: "boxes - Text Box Drawing",
        category: "terminal-fun",
        description: "Draw ASCII art boxes around text! Choose from dozens of box styles - perfect for comments, headers, and banners.",
        tags: ["terminal", "ascii-art", "text", "decoration"],
        difficulty: 1,
        lines: "Command: boxes",
        code: `# Installation:
    # Linux: sudo apt-get install boxes
    # macOS: brew install boxes

    # Basic usage:
    echo "Hello World" | boxes

    # Different box styles:
    echo "Hello" | boxes -d stone
    echo "Hello" | boxes -d unicornsay
    echo "Hello" | boxes -d dog
    echo "Hello" | boxes -d diamonds
    echo "Hello" | boxes -d santa

    # List all designs:
    boxes -l

    # Remove box:
    boxes -r < boxed_file.txt

    # Box a file:
    boxes -d stone < input.txt > output.txt

    # Create comment blocks:
    echo "Function description" | boxes -d c-cmt
    echo "TODO: Fix this" | boxes -d java-cmt

    # Box with custom size:
    echo "Text" | boxes -s 40x10

    # Align text:
    echo "Centered" | boxes -a c
    echo "Left" | boxes -a l
    echo "Right" | boxes -a r

    # Perfect for:
    # - Code comments
    # - README files
    # - Banners
    # - Decorating text`
    },
    {
        title: "figlet fonts - More ASCII Fonts",
        category: "terminal-fun",
        description: "Hundreds of additional figlet fonts! Download the full collection for even more ASCII text art styles.",
        tags: ["terminal", "ascii-art", "fonts", "text"],
        difficulty: 1,
        lines: "Command: figlet",
        code: `# Install additional fonts:
    # Linux: sudo apt-get install figlet-fonts
    # macOS: brew install figlet-fonts

    # Or download manually:
    # wget http://www.figlet.org/fonts/contributed.tar.gz
    # tar -xzf contributed.tar.gz
    # sudo cp *.flf /usr/share/figlet/

    # Cool fonts to try:

    figlet -f big "BIG TEXT"
    figlet -f banner3 "BANNER"
    figlet -f block "BLOCK"
    figlet -f bubble "BUBBLE"
    figlet -f digital "12345"
    figlet -f doom "DOOM"
    figlet -f epic "EPIC"
    figlet -f graffiti "GRAFFITI"
    figlet -f isometric1 "3D"
    figlet -f larry3d "LARRY 3D"
    figlet -f nancyj "FANCY"
    figlet -f ogre "OGRE"
    figlet -f rectangles "RECTANGLES"
    figlet -f shadow "SHADOW"
    figlet -f slant "SLANT"
    figlet -f speed "SPEED"
    figlet -f starwars "STAR WARS"
    figlet -f sub-zero "MORTAL KOMBAT"

    # Random font:
    figlet -f $(ls /usr/share/figlet/*.flf | shuf -n1) "RANDOM"

    # Combine with lolcat:
    figlet -f starwars "AWESOME" | lolcat`
    },

    // ============ TERMINAL TOOLS (USEFUL) ============
    {
        title: "rsync - File Sync",
        category: "terminal-tools",
        description: "Efficiently sync files and directories between locations. Essential for backups, deployments, and file transfers!",
        tags: ["terminal", "sync", "backup", "transfer"],
        difficulty: 2,
        lines: "Command: rsync",
        code: `# Usually pre-installed on Unix systems

    # Basic syntax:
    rsync [options] source destination

    # Copy directory locally:
    rsync -av /source/dir/ /dest/dir/

    # Sync to remote server:
    rsync -av /local/dir/ user@server:/remote/dir/

    # Sync from remote server:
    rsync -av user@server:/remote/dir/ /local/dir/

    # Important options:
    # -a: Archive mode (preserves everything)
    # -v: Verbose
    # -z: Compress during transfer
    # -P: Show progress
    # -n: Dry run (test without changes)
    # --delete: Delete files in dest not in source

    # Backup with progress:
    rsync -avzP /source/ /backup/

    # Exclude files:
    rsync -av --exclude='*.log' --exclude='.git' /source/ /dest/

    # Dry run (test first!):
    rsync -avn --delete /source/ /dest/

    # Resume interrupted transfer:
    rsync -avzP --partial /source/ user@server:/dest/

    # Sync over SSH:
    rsync -avz -e ssh /local/ user@server:/remote/

    # Show bandwidth usage:
    rsync -av --progress --stats /source/ /dest/

    # Common use cases:
    # - Backup: rsync -avz /data/ /backup/
    # - Deploy: rsync -avz --delete /local/site/ user@server:/var/www/
    # - Mirror: rsync -av --delete /source/ /mirror/`
    },
    {
        title: "diff - Compare Files",
        category: "terminal-tools",
        description: "Compare files line by line. Find differences between text files, configurations, or code. Essential for debugging!",
        tags: ["terminal", "compare", "diff", "text"],
        difficulty: 2,
        lines: "Command: diff",
        code: `# Pre-installed on Unix systems

    # Basic comparison:
    diff file1.txt file2.txt

    # Side-by-side comparison:
    diff -y file1.txt file2.txt

    # Unified format (like git diff):
    diff -u file1.txt file2.txt

    # Context format:
    diff -c file1.txt file2.txt

    # Ignore whitespace:
    diff -w file1.txt file2.txt

    # Ignore blank lines:
    diff -B file1.txt file2.txt

    # Ignore case:
    diff -i file1.txt file2.txt

    # Compare directories:
    diff -r dir1/ dir2/

    # Show only if files differ:
    diff -q file1.txt file2.txt

    # Color output (on systems with colordiff):
    colordiff file1.txt file2.txt

    # Generate patch file:
    diff -u old.txt new.txt > changes.patch

    # Apply patch:
    patch old.txt < changes.patch

    # Compare with context:
    diff -U 3 file1.txt file2.txt  # 3 lines of context

    # Practical examples:
    diff config.old config.new
    diff -r website-v1/ website-v2/
    diff <(ls dir1) <(ls dir2)  # Compare directory contents`
    },
    {
        title: "watch - Run Command Repeatedly",
        category: "terminal-tools",
        description: "Execute a command periodically and watch the output update. Monitor logs, processes, disk space, and more in real-time!",
        tags: ["terminal", "monitoring", "periodic", "watch"],
        difficulty: 1,
        lines: "Command: watch",
        code: `# Pre-installed on most Unix systems

    # Basic usage (updates every 2 seconds):
    watch df -h

    # Custom interval (1 second):
    watch -n 1 date

    # Highlight differences:
    watch -d free -h

    # No title/header:
    watch -t date

    # Exit on error:
    watch -e command

    # Precise timing:
    watch -p -n 0.5 command

    # Useful monitoring examples:

    # Watch disk space:
    watch -n 5 df -h

    # Watch memory usage:
    watch -n 2 free -h

    # Watch processes:
    watch -n 1 'ps aux | grep python'

    # Watch network:
    watch -n 1 'netstat -an | grep ESTABLISHED | wc -l'

    # Watch file size:
    watch -n 1 'ls -lh largefile.zip'

    # Watch directory size:
    watch -n 5 'du -sh /var/log'

    # Watch Docker containers:
    watch -n 2 'docker ps'

    # Watch GPU usage (if nvidia):
    watch -n 1 nvidia-smi

    # Watch who's logged in:
    watch -n 10 w

    # Watch system load:
    watch -n 1 uptime

    # Tips:
    # - Ctrl+C to exit
    # - Use quotes for complex commands
    # - Great for monitoring long operations`
    },
    {
        title: "screen - Terminal Multiplexer",
        category: "terminal-tools",
        description: "Keep programs running after disconnecting! Create persistent terminal sessions, split screens, and never lose your work.",
        tags: ["terminal", "multiplexer", "sessions", "productivity"],
        difficulty: 2,
        lines: "Command: screen",
        code: `# Installation:
    # macOS: brew install screen
    # Linux: sudo apt-get install screen
    # (Often pre-installed)

    # Start new session:
    screen

    # Start named session:
    screen -S mysession

    # List sessions:
    screen -ls

    # Attach to session:
    screen -r
    screen -r mysession

    # Detach from session:
    Ctrl+a d

    # Key bindings (Ctrl+a then...):
    # c: Create new window
    # n: Next window
    # p: Previous window
    # 0-9: Switch to window number
    # ": List windows
    # A: Rename window
    # k: Kill window
    # [: Enter copy mode
    # ]: Paste
    # |: Split vertically
    # S: Split horizontally
    # Tab: Switch split
    # X: Close split
    # d: Detach

    # Scroll back:
    # Ctrl+a [ then use arrow keys
    # Press Esc to exit scroll mode

    # Copy mode:
    # Ctrl+a [
    # Navigate with arrow keys
    # Space to start selection
    # Space again to copy
    # Ctrl+a ] to paste

    # Share session:
    screen -x mysession

    # Kill session:
    screen -X -S mysession quit

    # Use cases:
    # - Run long processes
    # - SSH sessions that persist
    # - Remote server management
    # - Multiple terminals in one

    # Example workflow:
    screen -S work
    # Do work
    Ctrl+a d  # Detach
    # Later...
    screen -r work  # Resume`
    },
    {
        title: "sed - Stream Editor",
        category: "terminal-tools",
        description: "Edit text streams and files with powerful pattern matching. Search and replace, delete lines, insert text, and more!",
        tags: ["terminal", "text-processing", "regex", "editing"],
        difficulty: 3,
        lines: "Command: sed",
        code: `# Pre-installed on Unix systems

    # Basic substitution:
    sed 's/old/new/' file.txt

    # Replace all occurrences:
    sed 's/old/new/g' file.txt

    # Replace in-place:
    sed -i 's/old/new/g' file.txt

    # Delete lines:
    sed '5d' file.txt              # Delete line 5
    sed '1,10d' file.txt           # Delete lines 1-10
    sed '/pattern/d' file.txt      # Delete lines matching pattern

    # Print specific lines:
    sed -n '5p' file.txt           # Print line 5
    sed -n '10,20p' file.txt       # Print lines 10-20
    sed -n '/pattern/p' file.txt   # Print matching lines

    # Insert text:
    sed '5i\New line' file.txt     # Insert before line 5
    sed '5a\New line' file.txt     # Append after line 5

    # Multiple commands:
    sed -e 's/old/new/g' -e 's/foo/bar/g' file.txt

    # Use different delimiter:
    sed 's|/old/path|/new/path|g' file.txt

    # Case insensitive:
    sed 's/pattern/replacement/gI' file.txt

    # Practical examples:

    # Remove empty lines:
    sed '/^$/d' file.txt

    # Remove comments:
    sed '/^#/d' file.txt

    # Add line numbers:
    sed = file.txt | sed 'N;s/\n/\t/'

    # Replace in multiple files:
    sed -i 's/old/new/g' *.txt

    # Remove Windows line endings:
    sed -i 's/\r$//' file.txt

    # Double space a file:
    sed G file.txt

    # Add prefix to lines:
    sed 's/^/PREFIX: /' file.txt`
    },
    {
        title: "awk - Text Processing",
        category: "terminal-tools",
        description: "Process and analyze text files with pattern scanning and processing. Extract columns, calculate sums, format output!",
        tags: ["terminal", "text-processing", "data", "scripting"],
        difficulty: 3,
        lines: "Command: awk",
        code: `# Pre-installed on Unix systems

    # Print specific column:
    awk '{print $1}' file.txt          # First column
    awk '{print $1, $3}' file.txt      # First and third columns
    awk '{print $NF}' file.txt         # Last column

    # With delimiter:
    awk -F',' '{print $1, $2}' file.csv    # CSV
    awk -F':' '{print $1}' /etc/passwd     # Colon-separated

    # Pattern matching:
    awk '/pattern/ {print $0}' file.txt
    awk '$3 > 100 {print $1}' file.txt     # Where column 3 > 100

    # Calculate sum:
    awk '{sum += $1} END {print sum}' numbers.txt

    # Calculate average:
    awk '{sum += $1; count++} END {print sum/count}' numbers.txt

    # Count lines:
    awk 'END {print NR}' file.txt

    # Print line numbers:
    awk '{print NR, $0}' file.txt

    # Format output:
    awk '{printf "%-10s %5d\n", $1, $2}' file.txt

    # Multiple conditions:
    awk '$3 > 100 && $4 < 200 {print $1}' file.txt

    # BEGIN and END blocks:
    awk 'BEGIN {print "Start"} {print $1} END {print "End"}' file.txt

    # Practical examples:

    # Sum column:
    ps aux | awk '{sum += $3} END {print "Total CPU:", sum "%"}'

    # Print unique values:
    awk '!seen[$1]++' file.txt

    # Get file sizes:
    ls -l | awk '{sum += $5} END {print "Total:", sum/1024/1024 "MB"}'

    # Extract email domain:
    awk -F'@' '{print $2}' emails.txt

    # Format CSV:
    awk -F',' '{printf "%-20s %s\n", $1, $2}' data.csv

    # Print lines longer than 80 chars:
    awk 'length > 80' file.txt

    # Replace field:
    awk '{$2 = "REDACTED"; print}' file.txt

    # Count occurrences:
    awk '{count[$1]++} END {for (word in count) print word, count[word]}' file.txt`
    },
    {
        title: "find - Search Files",
        category: "terminal-tools",
        description: "Search for files and directories with powerful filters. Find by name, size, date, permissions, and execute commands on results!",
        tags: ["terminal", "search", "files", "find"],
        difficulty: 2,
        lines: "Command: find",
        code: `# Pre-installed on Unix systems

    # Find by name:
    find . -name "*.txt"
    find . -iname "*.TXT"              # Case insensitive
    find /path -name "pattern*"

    # Find by type:
    find . -type f                     # Files only
    find . -type d                     # Directories only
    find . -type l                     # Symbolic links

    # Find by size:
    find . -size +100M                 # Larger than 100MB
    find . -size -1M                   # Smaller than 1MB
    find . -size 50k                   # Exactly 50KB

    # Find by time:
    find . -mtime -7                   # Modified in last 7 days
    find . -mtime +30                  # Modified more than 30 days ago
    find . -atime -1                   # Accessed in last 24 hours

    # Find by permissions:
    find . -perm 644
    find . -perm -u+x                  # User executable

    # Find empty files/directories:
    find . -empty

    # Find and delete:
    find . -name "*.log" -delete

    # Find and execute command:
    find . -name "*.txt" -exec cat {} \;
    find . -type f -exec chmod 644 {} \;

    # Find with multiple conditions:
    find . -name "*.py" -and -size +1M
    find . -name "*.txt" -or -name "*.md"
    find . \( -name "*.jpg" -o -name "*.png" \) -size +1M

    # Find and move:
    find . -name "*.bak" -exec mv {} /backup/ \;

    # Find and count:
    find . -type f | wc -l

    # Practical examples:

    # Find large files:
    find / -type f -size +100M 2>/dev/null

    # Find recently modified:
    find . -mtime -1 -type f

    # Find and compress:
    find . -name "*.log" -exec gzip {} \;

    # Find duplicates by name:
    find . -type f -printf '%f\n' | sort | uniq -d

    # Find by user:
    find / -user username 2>/dev/null

    # Find and copy:
    find . -name "*.jpg" -exec cp {} /destination/ \;

    # Clean old files:
    find /tmp -type f -mtime +7 -delete

    # Complex search:
    find . -type f -name "*.js" -not -path "*/node_modules/*" -exec grep -l "TODO" {} \;`
    },
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
  
  // Set textContent instead of innerHTML to preserve formatting
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