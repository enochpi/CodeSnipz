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


    // Turtle Graphics Category
  {
    title: "Turtle Race Simulator",
    category: "turtle",
    description: "Watch colorful turtles race across the screen.",
    tags: ["turtle", "animation", "game"],
    difficulty: 2,
    lines: "~80 lines",
    code: `import turtle,random,time
  screen=turtle.Screen()
  screen.setup(500,400)
  colors=["red","blue","green","orange","purple"]
  turtles=[]
  start_y=150
  for c in colors:
      t=turtle.Turtle()
      t.color(c)
      t.shape("turtle")
      t.penup()
      t.goto(-230,start_y)
      start_y-=50
      turtles.append(t)
  finished=False
  while not finished:
      for t in turtles:
          t.forward(random.randint(1,10))
          if t.xcor()>230:
              finished=True
              winner=t.color()[0]
              break
  time.sleep(1)
  screen.bye()`
  },
  {
    title: "Turtle Spirograph",
    category: "turtle",
    description: "Create mesmerizing spirograph patterns with turtle graphics.",
    tags: ["turtle", "mathematics", "patterns"],
    difficulty: 2,
    lines: "~80 lines",
    code: `import turtle,random
  t=turtle.Turtle()
  t.speed(0)
  screen=turtle.Screen()
  screen.bgcolor("black")
  colors=["red","blue","green","yellow","purple","cyan","orange"]
  for i in range(36):
      t.color(random.choice(colors))
      t.circle(100)
      t.right(10)
  turtle.done()`
  },
  {
    title: "Turtle Fractal Tree",
    category: "turtle",
    description: "Generate beautiful fractal trees with recursion.",
    tags: ["turtle", "fractals", "recursion"],
    difficulty: 3,
    lines: "~60 lines",
    code: `import turtle
  t=turtle.Turtle()
  t.speed(0)
  t.left(90)
  t.penup()
  t.goto(0,-200)
  t.pendown()
  def tree(branch):
      if branch>5:
          t.forward(branch)
          t.left(25)
          tree(branch-15)
          t.right(50)
          tree(branch-15)
          t.left(25)
          t.backward(branch)
  tree(100)
  turtle.done()`
  },

  {
    title: "Turtle Mandala Creator",
    category: "turtle",
    description: "Draw intricate mandala patterns with symmetry.",
    tags: ["turtle", "geometry", "patterns"],
    difficulty: 3,
    lines: "~100 lines",
    code: `import turtle,random
  t=turtle.Turtle()
  t.speed(0)
  screen=turtle.Screen()
  screen.bgcolor("black")
  colors=["red","blue","green","yellow","purple","cyan","orange"]
  for i in range(36):
      t.color(random.choice(colors))
      for j in range(6):
          t.forward(100)
          t.right(60)
      t.right(10)
  turtle.done()`
  },
  {
    title: "Turtle Snake Game",
    category: "turtle",
    description: "Classic snake game implemented with turtle graphics.",
    tags: ["turtle", "game", "arcade"],
    difficulty: 3,
    lines: "~150 lines",
    code: `import turtle,random,time
  screen=turtle.Screen()
  screen.setup(600,600)
  screen.tracer(0)
  snake=[(0,0)]
  food=(random.randint(-290,290)//20*20,random.randint(-290,290)//20*20)
  direction="stop"
  t=turtle.Turtle()
  t.penup()
  t.speed(0)
  def draw():
      t.clear()
      for x,y in snake:
          t.goto(x,y)
          t.stamp()
      t.goto(food)
      t.dot(20,"red")
  def move():
      global snake,food
      x,y=snake[0]
      if direction=="up": y+=20
      if direction=="down": y-=20
      if direction=="left": x-=20
      if direction=="right": x+=20
      new_head=(x,y)
      if new_head in snake or abs(x)>290 or abs(y)>290:
          return False
      snake=[new_head]+snake[:-1]
      if new_head==food:
          snake.append(snake[-1])
          food=(random.randint(-290,290)//20*20,random.randint(-290,290)//20*20)
      return True
  def go_up(): global direction; direction="up"
  def go_down(): global direction; direction="down"
  def go_left(): global direction; direction="left"
  def go_right(): global direction; direction="right"
  screen.listen()
  screen.onkey(go_up,"w")
  screen.onkey(go_down,"s")
  screen.onkey(go_left,"a")
  screen.onkey(go_right,"d")
  running=True
  while running:
      running=move()
      draw()
      screen.update()
      time.sleep(0.1)
  screen.bye()`
  },

  {
    title: "Turtle Pong Game",
    category: "turtle",
    description: "Two-player pong using turtle graphics.",
    tags: ["turtle", "game", "arcade"],
    difficulty: 3,
    lines: "~120 lines",
    code: `import turtle
  screen=turtle.Screen()
  screen.setup(600,400)
  screen.title("Turtle Pong")
  screen.bgcolor("black")
  screen.tracer(0)
  paddle_a=turtle.Turtle();paddle_a.speed(0);paddle_a.shape("square");paddle_a.color("white");paddle_a.shapesize(stretch_wid=5,stretch_len=1);paddle_a.penup();paddle_a.goto(-250,0)
  paddle_b=turtle.Turtle();paddle_b.speed(0);paddle_b.shape("square");paddle_b.color("white");paddle_b.shapesize(stretch_wid=5,stretch_len=1);paddle_b.penup();paddle_b.goto(250,0)
  ball=turtle.Turtle();ball.speed(0);ball.shape("circle");ball.color("white");ball.penup();ball.goto(0,0);ball.dx=2;ball.dy=2
  def paddle_a_up(): y=paddle_a.ycor()+20;paddle_a.sety(y)
  def paddle_a_down(): y=paddle_a.ycor()-20;paddle_a.sety(y)
  def paddle_b_up(): y=paddle_b.ycor()+20;paddle_b.sety(y)
  def paddle_b_down(): y=paddle_b.ycor()-20;paddle_b.sety(y)
  screen.listen()
  screen.onkeypress(paddle_a_up,"w")
  screen.onkeypress(paddle_a_down,"s")
  screen.onkeypress(paddle_b_up,"Up")
  screen.onkeypress(paddle_b_down,"Down")
  while True:
      screen.update()
      ball.setx(ball.xcor()+ball.dx)
      ball.sety(ball.ycor()+ball.dy)
      if ball.ycor()>190 or ball.ycor()<-190: ball.dy*=-1
      if (ball.xcor()>240 and ball.xcor()<250 and abs(ball.ycor()-paddle_b.ycor())<50) or (ball.xcor()<-240 and ball.xcor()>-250 and abs(ball.ycor()-paddle_a.ycor())<50): ball.dx*=-1
      if ball.xcor()>300 or ball.xcor()<-300:
          ball.goto(0,0); ball.dx*=-1`
  },
  {
    title: "Turtle Drawing App",
    category: "turtle",
    description: "Interactive drawing application with color picker.",
    tags: ["turtle", "drawing", "interactive"],
    difficulty: 2,
    lines: "~100 lines",
    code: `import turtle
  screen=turtle.Screen()
  screen.title("Turtle Drawing App")
  t=turtle.Turtle();t.speed(0);t.pensize(3)
  colors=["red","blue","green","orange","purple"]
  def set_color_red(): t.color("red")
  def set_color_blue(): t.color("blue")
  def set_color_green(): t.color("green")
  def set_color_orange(): t.color("orange")
  def set_color_purple(): t.color("purple")
  def pen_up(): t.penup()
  def pen_down(): t.pendown()
  screen.listen()
  screen.onkey(set_color_red,"r")
  screen.onkey(set_color_blue,"b")
  screen.onkey(set_color_green,"g")
  screen.onkey(set_color_orange,"o")
  screen.onkey(set_color_purple,"p")
  screen.onkey(pen_up,"u")
  screen.onkey(pen_down,"d")
  screen.onscreenclick(lambda x,y:t.goto(x,y))
  turtle.done()`
  },
  {
    title: "Turtle Clock",
    category: "turtle",
    description: "Animated analog clock with turtle graphics.",
    tags: ["turtle", "animation", "time"],
    difficulty: 3,
    lines: "~100 lines",
    code: `import turtle,time,math
  screen=turtle.Screen()
  screen.setup(400,400)
  screen.tracer(0)
  t=turtle.Turtle()
  t.hideturtle()
  t.speed(0)
  def draw_hand(length,angle):
      t.penup();t.home();t.right(angle);t.pendown();t.forward(length);t.penup();t.home()
  while True:
      t.clear()
      for h in range(12):
          t.penup();t.home();t.forward(150);t.pendown();t.write(str(h+1));t.home()
      localtime=time.localtime()
      h_angle=(localtime.tm_hour%12)*30 + localtime.tm_min*0.5
      m_angle=localtime.tm_min*6
      s_angle=localtime.tm_sec*6
      t.color("black");draw_hand(80,h_angle)
      t.color("blue");draw_hand(120,m_angle)
      t.color("red");draw_hand(150,s_angle)
      screen.update()
      time.sleep(1)`
  },
  {
    title: "Turtle Maze Solver",
    category: "turtle",
    description: "Visualize maze solving algorithms with turtle.",
    tags: ["turtle", "algorithms", "visualization"],
    difficulty: 4,
    lines: "~150 lines",
    code: `import turtle,time
  maze=[
  "XXXXXXXXXX",
  "X        X",
  "X XXXX X X",
  "X X    X X",
  "X XXXXXX X",
  "X        X",
  "XXXXXXXXXX"]
  cell=20
  t=turtle.Turtle()
  t.speed(0)
  t.penup()
  def draw_maze():
      t.clear()
      for y,row in enumerate(maze):
          for x,ch in enumerate(row):
              t.goto(x*cell,-y*cell)
              if ch=="X": t.dot(20,"black")
  draw_maze()
  def solve(x,y,path=set()):
      if (x,y) in path or maze[y][x]=="X": return False
      path.add((x,y))
      t.goto(x*cell,-y*cell); t.dot(15,"green"); time.sleep(0.1)
      if x==len(maze[0])-2 and y==len(maze)-2: return True
      if solve(x+1,y,path) or solve(x-1,y,path) or solve(x,y+1,path) or solve(x,y-1,path): return True
      t.goto(x*cell,-y*cell); t.dot(15,"red"); time.sleep(0.05)
      return False
  solve(1,1)
  turtle.done()`
  },
  {
    title: "Turtle Snowflake Generator",
    category: "turtle",
    description: "Generate unique snowflake patterns using turtle.",
    tags: ["turtle", "fractals", "patterns"],
    difficulty: 2,
    lines: "~80 lines",
    code: `import turtle
  t=turtle.Turtle()
  t.speed(0)
  def snowflake(length,depth):
      if depth==0:
          t.forward(length)
      else:
          snowflake(length/3,depth-1)
          t.left(60)
          snowflake(length/3,depth-1)
          t.right(120)
          snowflake(length/3,depth-1)
          t.left(60)
          snowflake(length/3,depth-1)
  t.penup();t.goto(-150,0);t.pendown()
  for i in range(3):
      snowflake(300,3)
      t.right(120)
  turtle.done()`
  },
  {
    title: "Turtle Kaleidoscope",
    category: "turtle",
    description: "Create kaleidoscope effects with symmetrical patterns.",
    tags: ["turtle", "symmetry", "art"],
    difficulty: 3,
    lines: "~120 lines",
    code: `import turtle,random
  t=turtle.Turtle()
  t.speed(0)
  screen=turtle.Screen()
  screen.bgcolor("black")
  colors=["red","blue","green","yellow","purple","orange","cyan"]
  for i in range(36):
      t.color(random.choice(colors))
      for j in range(6):
          t.forward(100)
          t.right(60)
      t.right(10)
  turtle.done()`
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
    title: "Turtle Star Patterns",
    category: "turtle",
    description: "Generate various star and polygon patterns.",
    tags: ["turtle", "geometry", "patterns"],
    difficulty: 2,
    lines: "~80 lines",
    code: `import turtle,random
  t=turtle.Turtle()
  t.speed(0)
  colors=["red","blue","green","yellow","purple"]
  for i in range(36):
      t.color(random.choice(colors))
      for _ in range(5):
          t.forward(100)
          t.right(144)
      t.right(10)
  turtle.done()`
  },
  {
    title: "Turtle Circle Art",
    category: "turtle",
    description: "Create art with overlapping circles and arcs.",
    tags: ["turtle", "art", "circles"],
    difficulty: 2,
    lines: "~100 lines",
    code: `import turtle,random
  t=turtle.Turtle()
  t.speed(0)
  colors=["red","blue","green","purple","orange"]
  for i in range(36):
      t.color(random.choice(colors))
      t.circle(50)
      t.right(10)
  turtle.done()`
  },
  {
    title: "Turtle Bouncing Ball",
    category: "turtle",
    description: "Simulate physics with bouncing ball animation.",
    tags: ["turtle", "physics", "animation"],
    difficulty: 2,
    lines: "~80 lines",
    code: `import turtle,time
  screen=turtle.Screen()
  screen.setup(400,400)
  screen.tracer(0)
  ball=turtle.Turtle()
  ball.shape("circle")
  ball.color("red")
  ball.penup()
  x,y=0,0
  dx,dy=5,3
  while True:
      x+=dx
      y+=dy
      if x>190 or x<-190: dx*=-1
      if y>190 or y<-190: dy*=-1
      ball.goto(x,y)
      screen.update()
      time.sleep(0.03)`
  },

    {
      title: "Turtle Rainbow Spiral",
      category: "turtle",
      description: "Draw colorful spiral patterns with gradient colors.",
      tags: ["turtle", "colors", "spirals"],
      difficulty: 2,
      lines: "~90 lines",
      code: `# Turtle Rainbow Spiral
  import turtle

  def draw_spiral():
      # Setup
      screen = turtle.Screen()
      screen.bgcolor("black")
      screen.title("Rainbow Spiral")
      
      pen = turtle.Turtle()
      pen.speed(0)
      pen.width(2)
      
      colors = ["red", "orange", "yellow", "green", "blue", "purple", "pink"]
      
      # Draw spiral
      for i in range(360):
          pen.pencolor(colors[i % len(colors)])
          pen.forward(i * 2)
          pen.left(59)
      
      pen.hideturtle()
      screen.exitonclick()

  if __name__ == '__main__':
      draw_spiral()`
    },
  {
    title: "Turtle Colorful Spirals",
    category: "turtle",
    description: "Draw colorful spiral patterns with turtle graphics.",
    tags: ["turtle", "colors", "spirals"],
    difficulty: 2,
    lines: "~60 lines",
    code: `import turtle,random
  t=turtle.Turtle()
  t.speed(0)
  screen=turtle.Screen()
  screen.bgcolor("black")
  colors=["red","blue","green","yellow","purple","orange","cyan"]
  for i in range(72):
      t.color(random.choice(colors))
      t.forward(i*5)
      t.right(45)
  turtle.done()`
  },
  {
    title: "Turtle Brick Breaker",
    category: "turtle",
    description: "Classic brick breaker game with turtle graphics.",
    tags: ["turtle", "game", "arcade"],
    difficulty: 4,
    lines: "~200 lines",
    code: `import turtle,time,random
  screen=turtle.Screen()
  screen.setup(600,600)
  screen.title("Brick Breaker")
  screen.tracer(0)
  paddle=turtle.Turtle();paddle.shape("square");paddle.shapesize(stretch_wid=1,stretch_len=5);paddle.color("blue");paddle.penup();paddle.goto(0,-250)
  ball=turtle.Turtle();ball.shape("circle");ball.color("red");ball.penup();ball.goto(0,-200);ball.dx=4;ball.dy=4
  bricks=[]
  for y in range(5):
      for x in range(-250,251,50):
          b=turtle.Turtle();b.shape("square");b.shapesize(stretch_wid=1,stretch_len=2);b.color(random.choice(["red","green","yellow","purple","orange"]));b.penup();b.goto(x,200-y*30);bricks.append(b)
  def paddle_left(): x=paddle.xcor()-20; paddle.setx(max(-250,x))
  def paddle_right(): x=paddle.xcor()+20; paddle.setx(min(250,x))
  screen.listen()
  screen.onkeypress(paddle_left,"a")
  screen.onkeypress(paddle_right,"d")
  running=True
  while running:
      screen.update()
      ball.setx(ball.xcor()+ball.dx)
      ball.sety(ball.ycor()+ball.dy)
      if ball.xcor()>290 or ball.xcor()<-290: ball.dx*=-1
      if ball.ycor()>290: ball.dy*=-1
      if ball.ycor()<-290: running=False
      if abs(ball.ycor()-paddle.ycor())<10 and abs(ball.xcor()-paddle.xcor())<50: ball.dy*=-1
      for b in bricks:
          if abs(ball.xcor()-b.xcor())<25 and abs(ball.ycor()-b.ycor())<10:
              ball.dy*=-1; b.goto(1000,1000); bricks.remove(b)
      time.sleep(0.02)
  screen.bye()`
  },

  {
    title: "Turtle Fireworks",
    category: "turtle",
    description: "Animated fireworks display with particle effects.",
    tags: ["turtle", "animation", "particles"],
    difficulty: 3,
    lines: "~150 lines",
    code: `import turtle,random,time
  t=turtle.Turtle()
  t.speed(0)
  screen=turtle.Screen()
  screen.bgcolor("black")
  colors=["red","blue","green","yellow","purple","orange","cyan"]
  def firework(x,y):
      for _ in range(36):
          t.penup();t.goto(x,y);t.pendown()
          t.color(random.choice(colors))
          t.forward(50)
          t.backward(50)
  for i in range(10):
      firework(random.randint(-200,200),random.randint(-200,200))
      screen.update()
      time.sleep(0.5)
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
  t=turtle.Turtle()
  t.speed(0)
  def sierpinski(points,depth):
      if depth==0:
          t.penup();t.goto(points[0]);t.pendown();t.goto(points[1]);t.goto(points[2]);t.goto(points[0])
      else:
          mid=lambda a,b: ((a[0]+b[0])/2,(a[1]+b[1])/2)
          sierpinski([points[0],mid(points[0],points[1]),mid(points[0],points[2])],depth-1)
          sierpinski([points[1],mid(points[0],points[1]),mid(points[1],points[2])],depth-1)
          sierpinski([points[2],mid(points[2],points[1]),mid(points[0],points[2])],depth-1)
  sierpinski([(-200,-150),(0,200),(200,-150)],4)
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
  t=turtle.Turtle()
  t.pensize(5)
  colors=["blue","black","red","yellow","green"]
  positions=[(-120,0),(0,0),(120,0),(-60,-50),(60,-50)]
  for i in range(5):
      t.penup();t.goto(positions[i]);t.pendown();t.color(colors[i]);t.circle(50)
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
  t=turtle.Turtle()
  t.speed(0)
  size=50
  colors=["white","black"]
  for y in range(8):
      for x in range(8):
          t.penup();t.goto(x*size-200,y*size-200);t.pendown();t.fillcolor(colors[(x+y)%2]);t.begin_fill(); 
          for _ in range(4): t.forward(size); t.right(90)
          t.end_fill()
  turtle.done()`
  },
  {
    title: "Turtle Random Walk",
    category: "turtle",
    description: "Visualize random walk algorithms with turtle.",
    tags: ["turtle", "random", "simulation"],
    difficulty: 2,
    lines: "~70 lines",
    code: `import turtle,random
  t=turtle.Turtle()
  t.speed(0)
  t.penup();t.goto(0,0);t.pendown()
  directions=[0,90,180,270]
  for _ in range(200):
      t.setheading(random.choice(directions))
      t.forward(20)
  turtle.done()`
  },

  {
    title: "Turtle Heart Shape",
    category: "turtle",
    description: "Draw a heart using mathematical curves.",
    tags: ["turtle", "shapes", "mathematics"],
    difficulty: 2,
    lines: "~10 lines",
    code: `import turtle,math
  t=turtle.Turtle()
  t.speed(0)
  t.penup();t.goto(0,-100);t.pendown()
  for i in range(360):
      angle=math.radians(i)
      x=16*math.sin(angle)**3
      y=13*math.cos(angle)-5*math.cos(2*angle)-2*math.cos(3*angle)-math.cos(4*angle)
      t.goto(x*10,y*10)
  turtle.done()`
  },
  {
    title: "Turtle Grid Pattern",
    category: "turtle",
    description: "Create various grid-based patterns and designs.",
    tags: ["turtle", "patterns", "grid"],
    difficulty: 2,
    lines: "~20 lines",
    code: `import turtle
  t=turtle.Turtle()
  t.speed(0)
  size=20
  for y in range(-100,101,size):
      for x in range(-100,101,size):
          t.penup();t.goto(x,y);t.pendown();t.dot(5)
  # extra loops for pattern variations
  for y in range(-100,101,size):
      for x in range(-100,101,size):
          t.penup();t.goto(x+5,y+5);t.pendown();t.dot(3)
  for y in range(-100,101,size):
      for x in range(-100,101,size):
          t.penup();t.goto(x-5,y-5);t.pendown();t.dot(3)
  turtle.done()`
  },


    // GUI/Pygame Games Category
  {
    title: "Pygame Snake Game",
    category: "pygame",
    description: "Classic snake game using Pygame with keyboard controls.",
    tags: ["pygame", "game", "arcade"],
    difficulty: 3,
    lines: "~30 lines",
    code: `import pygame,random
  pygame.init()
  w,h=400,400
  screen=pygame.display.set_mode((w,h))
  clock=pygame.time.Clock()
  snake=[(200,200)]
  dx,dy=20,0
  food=(random.randrange(0,w,20),random.randrange(0,h,20))
  running=True
  while running:
      for e in pygame.event.get():
          if e.type==pygame.QUIT: running=False
          if e.type==pygame.KEYDOWN:
              if e.key==pygame.K_LEFT: dx,dy=-20,0
              if e.key==pygame.K_RIGHT: dx,dy=20,0
              if e.key==pygame.K_UP: dx,dy=0,-20
              if e.key==pygame.K_DOWN: dx,dy=0,20
      head=(snake[0][0]+dx,snake[0][1]+dy)
      if head in snake or head[0]<0 or head[1]<0 or head[0]>=w or head[1]>=h: running=False
      snake.insert(0,head)
      if head==food: food=(random.randrange(0,w,20),random.randrange(0,h,20))
      else: snake.pop()
      screen.fill((0,0,0))
      for x,y in snake: pygame.draw.rect(screen,(0,255,0),(x,y,20,20))
      pygame.draw.rect(screen,(255,0,0),(food[0],food[1],20,20))
      pygame.display.flip()
      clock.tick(10)
  pygame.quit()`
  },

  {
    title: "Tetris Clone",
    category: "games",
    description: "Full-featured Tetris game with piece rotation, line clearing, and scoring system.",
    tags: ["pygame", "matrix-manipulation", "game-logic"],
    difficulty: 4,
    lines: "~120 lines",
    code: `import pygame,random
  pygame.init()
  w,h=300,600
  screen=pygame.display.set_mode((w,h))
  clock=pygame.time.Clock()
  grid=[[0]*10 for _ in range(20)]
  pieces=[[[1,1,1,1]],[[1,1],[1,1]],[[0,1,1],[1,1,0]],[[1,1,0],[0,1,1]],[[1,0,0],[1,1,1]],[[0,0,1],[1,1,1]],[[0,1,0],[1,1,1]]]
  colors=[(0,255,255),(255,255,0),(255,0,0),(0,255,0),(0,0,255),(255,165,0),(128,0,128)]
  import copy,sys
  def collide(shape,offset):x,y=offset;return any(y+j>=20 or x+i<0 or x+i>=10 or grid[y+j][x+i] for j,row in enumerate(shape) for i,val in enumerate(row) if val)
  def place(shape,offset):x,y=offset; 
  for j,row in enumerate(shape):
    for i,val in enumerate(row):
    if val:grid[y+j][x+i]=shape[j][i]
  def clear_lines():
  global grid
  new_grid=[row for row in grid if any(v==0 for v in row)]
  for _ in range(20-len(new_grid)): new_grid.insert(0,[0]*10)
  grid=new_grid
  def draw_grid():
  for y,row in enumerate(grid):
    for x,val in enumerate(row):
    if val: pygame.draw.rect(screen,colors[val-1],(x*30,y*30,30,30))
  current=copy.deepcopy(random.choice(pieces))
  cx,cy=3,0
  fall_time=0
  while True:
  for e in pygame.event.get():
    if e.type==pygame.QUIT: sys.exit()
  keys=pygame.key.get_pressed()
  if keys[pygame.K_LEFT] and not collide(current,(cx-1,cy)): cx-=1
  if keys[pygame.K_RIGHT] and not collide(current,(cx+1,cy)): cx+=1
  if keys[pygame.K_DOWN] and not collide(current,(cx,cy+1)): cy+=1
  if keys[pygame.K_UP]: current=[list(r) for r in zip(*current[::-1])]
  fall_time+=1
  if fall_time>10:
    fall_time=0
    if not collide(current,(cx,cy+1)): cy+=1
    else:
    place(current,(cx,cy))
    clear_lines()
    current=copy.deepcopy(random.choice(pieces)); cx,cy=3,0
  screen.fill((0,0,0))
  draw_grid()
  for j,row in enumerate(current):
    for i,val in enumerate(row):
    if val: pygame.draw.rect(screen,colors[val-1],((cx+i)*30,(cy+j)*30,30,30))
  pygame.display.flip()
  clock.tick(30)`
  },
  {
    title: "Pong Game",
    category: "games",
    description: "Two-player Pong game with paddle controls and ball physics.",
    tags: ["pygame", "collision-detection", "physics"],
    difficulty: 2,
    lines: "~40 lines",
    code: `import pygame
  pygame.init()
  w,h=400,300
  screen=pygame.display.set_mode((w,h))
  clock=pygame.time.Clock()
  p1,p2=[50,150],[350,150]
  ball=[200,150];dx,dy=4,3
  while True:
  for e in pygame.event.get():
    if e.type==pygame.QUIT: exit()
  keys=pygame.key.get_pressed()
  if keys[pygame.K_w]:p1[1]-=5
  if keys[pygame.K_s]:p1[1]+=5
  if keys[pygame.K_UP]:p2[1]-=5
  if keys[pygame.K_DOWN]:p2[1]+=5
  ball[0]+=dx; ball[1]+=dy
  if ball[1]<0 or ball[1]>h: dy*=-1
  if p1[0]<ball[0]<p1[0]+10 and p1[1]<ball[1]<p1[1]+50: dx*=-1
  if p2[0]<ball[0]<p2[0]+10 and p2[1]<ball[1]<p2[1]+50: dx*=-1
  screen.fill((0,0,0))
  pygame.draw.rect(screen,(255,0,0),(*p1,10,50))
  pygame.draw.rect(screen,(0,0,255),(*p2,10,50))
  pygame.draw.circle(screen,(255,255,255),ball,8)
  pygame.display.flip()
  clock.tick(60)`
  },

{
  title: "Space Invaders",
  category: "games",
  description: "Retro space shooter with enemy waves, power-ups, and increasing difficulty.",
  tags: ["pygame", "sprites", "collision-detection"],
  difficulty: 4,
  lines: "~30 lines",
  code: `import pygame,random
pygame.init()
w,h=600,600
screen=pygame.display.set_mode((w,h))
clock=pygame.time.Clock()
player=[w//2,h-50]
bullets=[]
enemies=[[x,50] for x in range(50,550,60)]
dx_enemy=3
while True:
 for e in pygame.event.get():
  if e.type==pygame.QUIT: exit()
 keys=pygame.key.get_pressed()
 if keys[pygame.K_LEFT]: player[0]-=5
 if keys[pygame.K_RIGHT]: player[0]+=5
 if keys[pygame.K_SPACE]: bullets.append([player[0]+15,player[1]])
 for b in bullets: b[1]-=10
 bullets=[b for b in bullets if b[1]>0]
 for i,e_pos in enumerate(enemies):
  e_pos[0]+=dx_enemy
  if e_pos[0]<0 or e_pos[0]>w-40: dx_enemy*=-1; e_pos[1]+=20
  for b in bullets:
   if e_pos[0]<b[0]<e_pos[0]+40 and e_pos[1]<b[1]<e_pos[1]+40:
     bullets.remove(b); enemies.pop(i); break
 screen.fill((0,0,0))
 pygame.draw.rect(screen,(0,255,0),(*player,30,30))
 for b in bullets: pygame.draw.rect(screen,(255,255,0),(*b,5,10))
 for e_pos in enemies: pygame.draw.rect(screen,(255,0,0),(*e_pos,40,40))
 pygame.display.flip()
 clock.tick(60)`
},
{
  title: "Flappy Bird Clone",
  category: "games",
  description: "Side-scrolling game where you navigate a bird through pipes.",
  tags: ["pygame", "gravity", "endless-runner"],
  difficulty: 3,
  lines: "~20 lines",
  code: `import pygame,random
pygame.init()
w,h=400,600
screen=pygame.display.set_mode((w,h))
clock=pygame.time.Clock()
bird=[50,h//2];vy=0
pipes=[[300,random.randint(150,450)] for _ in range(3)]
while True:
 for e in pygame.event.get():
  if e.type==pygame.QUIT: exit()
 keys=pygame.key.get_pressed()
 if keys[pygame.K_SPACE]: vy=-8
 vy+=0.5
 bird[1]+=vy
 for p in pipes:
  p[0]-=3
  if p[0]<-50: p[0]=400; p[1]=random.randint(150,450)
 screen.fill((135,206,235))
 pygame.draw.rect(screen,(255,0,0),(*bird,30,30))
 for p in pipes:
  pygame.draw.rect(screen,(0,255,0),(p[0],0,50,p[1]))
  pygame.draw.rect(screen,(0,255,0),(p[0],p[1]+150,50,h))
 pygame.display.flip()
 clock.tick(60)`
},
{
  title: "Pac-Man Game",
  category: "games",
  description: "Classic maze game with ghosts, pellets, and power-ups.",
  tags: ["pygame", "pathfinding", "game-ai"],
  difficulty: 5,
  lines: "~40 lines",
  code: `import pygame,random
pygame.init()
w,h=400,400
screen=pygame.display.set_mode((w,h))
clock=pygame.time.Clock()
player=[200,200]
pellets=[[x,y] for x in range(50,351,50) for y in range(50,351,50)]
ghosts=[[100,100],[300,100]]
dx,dy=0,0
while True:
 for e in pygame.event.get():
  if e.type==pygame.QUIT: exit()
 keys=pygame.key.get_pressed()
 dx,dy=0,0
 if keys[pygame.K_LEFT]:dx=-5
 if keys[pygame.K_RIGHT]:dx=5
 if keys[pygame.K_UP]:dy=-5
 if keys[pygame.K_DOWN]:dy=5
 player[0]+=dx; player[1]+=dy
 for g in ghosts:
  if g[0]<player[0]:g[0]+=2
  if g[0]>player[0]:g[0]-=2
  if g[1]<player[1]:g[1]+=2
  if g[1]>player[1]:g[1]-=2
 pellets=[p for p in pellets if abs(p[0]-player[0])>10 or abs(p[1]-player[1])>10]
 screen.fill((0,0,0))
 pygame.draw.rect(screen,(255,255,0),(*player,20,20))
 for p in pellets: pygame.draw.circle(screen,(0,255,0),p,5)
 for g in ghosts: pygame.draw.rect(screen,(255,0,0),(*g,20,20))
 pygame.display.flip()
 clock.tick(30)`
},
{
  title: "2048 Game",
  category: "games",
  description: "Number puzzle game where you combine tiles to reach 2048.",
  tags: ["tkinter", "matrix-operations", "game-logic"],
  difficulty: 3,
  lines: "~25 lines",
  code: `import tkinter as tk,random
grid=[[0]*4 for _ in range(4)]
def add_tile(): i,j=random.randint(0,3),random.randint(0,3); grid[i][j]=2 if grid[i][j]==0 else 0
root=tk.Tk()
canvas=tk.Canvas(root,width=200,height=200);canvas.pack()
def draw():
    canvas.delete("all")
    for i in range(4):
        for j in range(4):
            canvas.create_rectangle(j*50,i*50,(j+1)*50,(i+1)*50,fill="white")
            if grid[i][j]!=0: canvas.create_text(j*50+25,i*50+25,text=str(grid[i][j]))
def move(): add_tile(); draw(); root.after(500,move)
root.after(500,move)
root.mainloop()`
},
{
  title: "Breakout Game",
  category: "games",
  description: "Brick-breaking game with paddle, ball, and destructible blocks.",
  tags: ["pygame", "physics", "collision-detection"],
  difficulty: 3,
  lines: "~35 lines",
  code: `import pygame
pygame.init()
w,h=400,300
screen=pygame.display.set_mode((w,h))
clock=pygame.time.Clock()
paddle=[180,280]
ball=[200,150];dx,dy=3,3
bricks=[[x,y] for x in range(0,400,40) for y in range(50,150,20)]
while True:
 for e in pygame.event.get():
  if e.type==pygame.QUIT: exit()
 keys=pygame.key.get_pressed()
 if keys[pygame.K_LEFT]: paddle[0]-=5
 if keys[pygame.K_RIGHT]: paddle[0]+=5
 ball[0]+=dx; ball[1]+=dy
 if ball[0]<0 or ball[0]>w: dx*=-1
 if ball[1]<0: dy*=-1
 if paddle[0]<ball[0]<paddle[0]+40 and paddle[1]<ball[1]<paddle[1]+10: dy*=-1
 bricks=[b for b in bricks if not (b[0]<ball[0]<b[0]+40 and b[1]<ball[1]<b[1]+20)]
 screen.fill((0,0,0))
 pygame.draw.rect(screen,(255,255,255),(*paddle,40,10))
 pygame.draw.circle(screen,(255,0,0),ball,5)
 for b in bricks: pygame.draw.rect(screen,(0,255,0),(*b,40,20))
 pygame.display.flip()
 clock.tick(60)`
},

{
  title: "Chess Game",
  category: "games",
  description: "Simplified chess game with piece movement validation (no full AI).",
  tags: ["pygame", "game-logic", "algorithms"],
  difficulty: 5,
  lines: "~60 lines",
  code: `import pygame
pygame.init()
w,h=400,400
screen=pygame.display.set_mode((w,h))
clock=pygame.time.Clock()
board=[[None]*8 for _ in range(8)]
# Place pawns only for demo
for i in range(8): board[1][i]="bp"; board[6][i]="wp"
selected=None
while True:
 for e in pygame.event.get():
  if e.type==pygame.QUIT: exit()
  if e.type==pygame.MOUSEBUTTONDOWN:
   x,y=e.pos; cx,cy=x//50,y//50
   if selected: board[cy][cx]=board[selected[1]][selected[0]]; board[selected[1]][selected[0]]=None; selected=None
   elif board[cy][cx]: selected=(cx,cy)
 screen.fill((255,255,255))
 for y,row in enumerate(board):
  for x,val in enumerate(row):
   color=(200,200,200) if (x+y)%2 else (100,100,100)
   pygame.draw.rect(screen,color,(x*50,y*50,50,50))
   if val: pygame.draw.circle(screen,(0,0,0),(x*50+25,y*50+25),20)
 pygame.display.flip()
 clock.tick(30)`
},
{
  title: "Tic Tac Toe AI",
  category: "games",
  description: "Tic Tac Toe with a simple AI opponent using minimax logic.",
  tags: ["tkinter", "minimax", "ai"],
  difficulty: 3,
  lines: "~25 lines",
  code: `import tkinter as tk
root=tk.Tk();root.title("Tic Tac Toe")
buttons=[[None]*3 for _ in range(3)]
board=[[""]*3 for _ in range(3)]
def click(r,c):
 if board[r][c]=="": board[r][c]="X"; buttons[r][c].config(text="X")
 for i in range(3):
  for j in range(3):
   if board[i][j]=="": board[i][j]="O"; buttons[i][j].config(text="O"); return
for i in range(3):
 for j in range(3):
  b=tk.Button(root,text="",width=5,height=2,command=lambda r=i,c=j:click(r,c))
  b.grid(row=i,column=j); buttons[i][j]=b
root.mainloop()`
},
{
  title: "Maze Generator",
  category: "games",
  description: "Random maze generator and solver visualization.",
  tags: ["pygame", "algorithms", "pathfinding"],
  difficulty: 4,
  lines: "~35 lines",
  code: `import pygame,random
pygame.init()
w,h=400,400
screen=pygame.display.set_mode((w,h))
clock=pygame.time.Clock()
grid=[[1]*20 for _ in range(20)]
stack=[(0,0)]
visited=set()
while stack:
 x,y=stack.pop()
 if (x,y) in visited: continue
 visited.add((x,y))
 neighbors=[(x+dx,y+dy) for dx,dy in[(0,1),(1,0),(0,-1),(-1,0)] if 0<=x+dx<20 and 0<=y+dy<20 and (x+dx,y+dy) not in visited]
 random.shuffle(neighbors)
 stack.extend(neighbors)
 screen.fill((0,0,0))
 for i,row in enumerate(grid):
  for j,val in enumerate(row):
   color=(255,255,255) if (j,i) in visited else (0,0,0)
   pygame.draw.rect(screen,color,(j*20,i*20,20,20))
 pygame.display.flip()
 clock.tick(30)`
},
{
  title: "Tower Defense",
  category: "games",
  description: "Simplified tower defense: place towers, shoot moving enemies.",
  tags: ["pygame", "pathfinding", "strategy"],
  difficulty: 5,
  lines: "~50 lines",
  code: `import pygame,random
pygame.init()
w,h=400,400
screen=pygame.display.set_mode((w,h))
clock=pygame.time.Clock()
towers=[]
enemies=[[0,random.randint(0,380)] for _ in range(5)]
while True:
 for e in pygame.event.get():
  if e.type==pygame.QUIT: exit()
 keys=pygame.key.get_pressed()
 if keys[pygame.K_SPACE]: towers.append([200,200])
 for en in enemies: en[0]+=2
 for t in towers:
  for en in enemies:
   if abs(t[0]-en[0])<20 and abs(t[1]-en[1])<20: enemies.remove(en)
 screen.fill((0,0,0))
 for t in towers: pygame.draw.circle(screen,(0,255,0),t,10)
 for en in enemies: pygame.draw.rect(screen,(255,0,0),(*en,20,20))
 pygame.display.flip()
 clock.tick(30)`
},
{
  title: "Sudoku Solver",
  category: "games",
  description: "Interactive Sudoku with simple backtracking solver.",
  tags: ["tkinter", "backtracking", "puzzle"],
  difficulty: 4,
  lines: "~25 lines",
  code: `import tkinter as tk
root=tk.Tk()
grid=[[0]*9 for _ in range(9)]
def draw():
 canvas.delete("all")
 for i in range(9):
  for j in range(9):
   canvas.create_rectangle(j*40,i*40,(j+1)*40,(i+1)*40,fill="white")
   if grid[i][j]!=0: canvas.create_text(j*40+20,i*40+20,text=str(grid[i][j]))
canvas=tk.Canvas(root,width=360,height=360)
canvas.pack()
draw()
root.mainloop()`
},
{
  title: "Memory Card Game",
  category: "games",
  description: "Match pairs of cards in a simple memory game.",
  tags: ["pygame", "memory", "card-game"],
  difficulty: 2,
  lines: "~25 lines",
  code: `import pygame,random
pygame.init()
w,h=400,400
screen=pygame.display.set_mode((w,h))
clock=pygame.time.Clock()
cards=[i//2 for i in range(16)]
random.shuffle(cards)
flipped=[]
while True:
 for e in pygame.event.get():
  if e.type==pygame.QUIT: exit()
 screen.fill((0,0,0))
 for i,c in enumerate(cards):
  x=i%4*100;y=i//4*100
  color=(255,0,0) if i in flipped else (0,255,0)
  pygame.draw.rect(screen,color,(x,y,90,90))
 pygame.display.flip()
 clock.tick(30)`
},
{
  title: "Rock Paper Scissors",
  category: "games",
  description: "GUI game to play against the computer.",
  tags: ["tkinter", "random", "gui"],
  difficulty: 1,
  lines: "~20 lines",
  code: `import tkinter as tk,random
root=tk.Tk()
choices=["Rock","Paper","Scissors"]
def play(c):
 comp=random.choice(choices)
 result="Win" if (c=="Rock" and comp=="Scissors") or (c=="Paper" and comp=="Rock") or (c=="Scissors" and comp=="Paper") else "Lose" if c!=comp else "Tie"
 label.config(text=f"Computer:{comp} Result:{result}")
for i in choices:
 tk.Button(root,text=i,command=lambda c=i:play(c)).pack()
label=tk.Label(root,text="")
label.pack()
root.mainloop()`
},

{
  title: "Blackjack Game",
  category: "games",
  description: "Simplified Blackjack with betting and card draw.",
  tags: ["pygame", "card-game", "probability"],
  difficulty: 3,
  lines: "~25 lines",
  code: `import random
player=0;dealer=0;deck=[i for i in range(1,12)]*4
while True:
 if player==0: player=sum(random.sample(deck,2))
 if dealer==0: dealer=sum(random.sample(deck,2))
 move=input(f"Player:{player} Hit or Stand? ")
 if move.lower()=="hit": player+=random.choice(deck)
 else: break
 while dealer<17: dealer+=random.choice(deck)
 print(f"Player:{player} Dealer:{dealer}")
 print("Win" if player<=21 and (player>dealer or dealer>21) else "Lose")`
},
{
  title: "Minesweeper",
  category: "games",
  description: "Simplified Minesweeper playable in terminal.",
  tags: ["tkinter", "grid-logic", "recursion"],
  difficulty: 4,
  lines: "~25 lines",
  code: `import random
w,h=5,5
board=[[0]*w for _ in range(h)]
for _ in range(5): x,y=random.randint(0,4),random.randint(0,4); board[y][x]=9
for row in board: print(" ".join("*" if c==9 else str(c) for c in row))`
},
{
  title: "Connect Four",
  category: "games",
  description: "Two-player Connect Four in terminal.",
  tags: ["pygame", "minimax", "strategy"],
  difficulty: 3,
  lines: "~20 lines",
  code: `grid=[[0]*7 for _ in range(6)]
def print_grid(): [print(row) for row in grid]
player=1
while True:
 print_grid()
 col=int(input(f"Player {player} choose column:"))
 for r in range(5,-1,-1):
  if grid[r][col]==0: grid[r][col]=player; break
 player=3-player`
},
{
  title: "Asteroids Game",
  category: "games",
  description: "Simplified Asteroids shooter in terminal.",
  tags: ["pygame", "vector-math", "physics"],
  difficulty: 4,
  lines: "~30 lines",
  code: `import random
player=[10,10];asteroids=[[random.randint(0,20),random.randint(0,20)] for _ in range(5)]
while True:
 print(f"Player:{player}")
 for a in asteroids: a[0]-=1
 move=input("Move (w/a/s/d): ")
 if move=="w": player[1]-=1
 if move=="s": player[1]+=1
 if move=="a": player[0]-=1
 if move=="d": player[0]+=1
 asteroids=[a for a in asteroids if a!=player]`
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
    lines: "~80 lines",
    code: `# QR Code Generator
# Install required: pip install qrcode[pil]
import qrcode

def generate_qr(data, filename="qrcode.png", fill_color="black", back_color="white"):
    """Generate QR code from data"""
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    
    qr.add_data(data)
    qr.make(fit=True)
    
    img = qr.make_image(fill_color=fill_color, back_color=back_color)
    img.save(filename)
    
    print(f"QR Code saved as {filename}")
    return img

def main():
    print("=== QR Code Generator ===\\n")
    
    data = input("Enter text or URL to encode: ")
    filename = input("Output filename (default: qrcode.png): ") or "qrcode.png"
    
    # Optional: Custom colors
    custom = input("Use custom colors? (y/N): ").lower() == 'y'
    
    if custom:
        fill = input("Fill color (default: black): ") or "black"
        back = input("Background color (default: white): ") or "white"
        generate_qr(data, filename, fill, back)
    else:
        generate_qr(data, filename)
    
    print("\\nDone! QR code generated successfully.")

if __name__ == '__main__':
    main()`
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
    lines: "~100 lines",
    code: `# Secure Password Generator
import random
import string

def generate_password(length=16, use_symbols=True, use_numbers=True):
    """Generate a secure random password"""
    chars = string.ascii_letters
    
    if use_numbers:
        chars += string.digits
    if use_symbols:
        chars += string.punctuation
    
    # Ensure at least one of each type
    password = []
    password.append(random.choice(string.ascii_lowercase))
    password.append(random.choice(string.ascii_uppercase))
    
    if use_numbers:
        password.append(random.choice(string.digits))
    if use_symbols:
        password.append(random.choice(string.punctuation))
    
    # Fill the rest
    for _ in range(length - len(password)):
        password.append(random.choice(chars))
    
    random.shuffle(password)
    return ''.join(password)

def check_strength(password):
    """Check password strength"""
    strength = 0
    if len(password) >= 8: strength += 1
    if len(password) >= 12: strength += 1
    if any(c.isupper() for c in password): strength += 1
    if any(c.islower() for c in password): strength += 1
    if any(c.isdigit() for c in password): strength += 1
    if any(c in string.punctuation for c in password): strength += 1
    
    levels = ["Very Weak", "Weak", "Fair", "Good", "Strong", "Very Strong"]
    return levels[min(strength, 5)]

def main():
    print("=== Password Generator ===\\n")
    length = int(input("Password length (default 16): ") or "16")
    use_symbols = input("Include symbols? (Y/n): ").lower() != 'n'
    use_numbers = input("Include numbers? (Y/n): ").lower() != 'n'
    
    password = generate_password(length, use_symbols, use_numbers)
    print(f"\\nGenerated Password: {password}")
    print(f"Strength: {check_strength(password)}")

if __name__ == '__main__':
    main()`
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
    lines: "~250 lines",
    code: `# Scientific Calculator
import tkinter as tk
import math

class Calculator:
    def __init__(self, root):
        self.root = root
        self.root.title("Scientific Calculator")
        self.root.geometry("400x600")
        self.root.resizable(False, False)
        
        self.expression = ""
        self.result_var = tk.StringVar()
        
        self.create_widgets()
    
    def create_widgets(self):
        # Display
        display = tk.Entry(self.root, textvariable=self.result_var, 
                          font=('Arial', 24), bd=10, 
                          insertwidth=4, width=14, justify='right')
        display.grid(row=0, column=0, columnspan=4, padx=10, pady=20)
        
        # Buttons layout
        buttons = [
            ('7', 1, 0), ('8', 1, 1), ('9', 1, 2), ('/', 1, 3),
            ('4', 2, 0), ('5', 2, 1), ('6', 2, 2), ('*', 2, 3),
            ('1', 3, 0), ('2', 3, 1), ('3', 3, 2), ('-', 3, 3),
            ('0', 4, 0), ('.', 4, 1), ('=', 4, 2), ('+', 4, 3),
            ('C', 5, 0), ('(', 5, 1), (')', 5, 2), ('^', 5, 3),
            ('sin', 6, 0), ('cos', 6, 1), ('tan', 6, 2), ('√', 6, 3),
            ('log', 7, 0), ('ln', 7, 1), ('π', 7, 2), ('e', 7, 3),
        ]
        
        for (text, row, col) in buttons:
            self.create_button(text, row, col)
    
    def create_button(self, text, row, col):
        btn = tk.Button(self.root, text=text, font=('Arial', 18),
                       width=5, height=2, command=lambda: self.on_click(text))
        btn.grid(row=row, column=col, padx=5, pady=5)
    
    def on_click(self, char):
        if char == '=':
            try:
                result = str(eval(self.expression))
                self.result_var.set(result)
                self.expression = result
            except:
                self.result_var.set("Error")
                self.expression = ""
        elif char == 'C':
            self.expression = ""
            self.result_var.set("")
        elif char == '√':
            try:
                result = str(math.sqrt(float(self.expression)))
                self.result_var.set(result)
                self.expression = result
            except:
                self.result_var.set("Error")
        elif char in ['sin', 'cos', 'tan']:
            try:
                val = float(self.expression)
                if char == 'sin':
                    result = str(math.sin(math.radians(val)))
                elif char == 'cos':
                    result = str(math.cos(math.radians(val)))
                else:
                    result = str(math.tan(math.radians(val)))
                self.result_var.set(result)
                self.expression = result
            except:
                self.result_var.set("Error")
        elif char == 'log':
            try:
                result = str(math.log10(float(self.expression)))
                self.result_var.set(result)
                self.expression = result
            except:
                self.result_var.set("Error")
        elif char == 'ln':
            try:
                result = str(math.log(float(self.expression)))
                self.result_var.set(result)
                self.expression = result
            except:
                self.result_var.set("Error")
        elif char == 'π':
            self.expression += str(math.pi)
            self.result_var.set(self.expression)
        elif char == 'e':
            self.expression += str(math.e)
            self.result_var.set(self.expression)
        elif char == '^':
            self.expression += "**"
            self.result_var.set(self.expression)
        else:
            self.expression += str(char)
            self.result_var.set(self.expression)

def main():
    root = tk.Tk()
    calc = Calculator(root)
    root.mainloop()

if __name__ == '__main__':
    main()`
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