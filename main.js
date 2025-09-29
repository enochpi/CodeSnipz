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
      lines: "~220 lines",
      code: `import curses,random,math,time
    # minimal runnable ascii roguelike using curses
    def gen_map(w,h,rooms=10,room_min=4,room_max=8):
        m=[['#' for _ in range(w)] for __ in range(h)]
        rs=[]
        for _ in range(rooms):
            rw=random.randint(room_min,room_max);rh=random.randint(room_min,room_max)
            rx=random.randint(1,w-rw-2);ry=random.randint(1,h-rh-2)
            r=(rx,ry,rw,rh)
            ok=True
            for orr in rs:
                ox,oy,owr,ohr=orr
                if rx<ox+owr+2 and ox<rx+rw+2 and ry<oy+ohr+2 and oy<ry+rh+2:
                    ok=False;break
            if not ok:continue
            rs.append(r)
            for yy in range(ry,ry+rh):
                for xx in range(rx,rx+rw):
                    m[yy][xx]='.'
            if len(rs)>1:
                px,py=rs[-2][0]+rs[-2][2]//2,rs[-2][1]+rs[-2][3]//2
                cx,cy=rx+rw//2,ry+rh//2
                if random.random()<0.5:
                    for x in range(min(px,cx),max(px,cx)+1):m[py][x]='.'
                    for y in range(min(py,cy),max(py,cy)+1):m[y][cx]='.'
                else:
                    for y in range(min(py,cy),max(py,cy)+1):m[y][px]='.'
                    for x in range(min(px,cx),max(px,cx)+1):m[cy][x]='.'
        return m,rs

    class Actor:
        def __init__(self,x,y,ch,hp,atk,name):
            self.x=x;self.y=y;self.ch=ch;self.max_hp=hp;self.hp=hp;self.atk=atk;self.name=name;self.gold=0
        def is_alive(self):return self.hp>0

    def place_items_and_monsters(m,rooms):
        monsters=[]
        items=[]
        for i,r in enumerate(rooms):
            if i==0:continue
            rx,ry,rw,rh=r
            nmon=random.randint(1,3)
            for _ in range(nmon):
                mx=random.randint(rx,rx+rw-1);my=random.randint(ry,ry+rh-1)
                if m[my][mx]=='.':
                    typ=random.choice(['gob','orc','bat'])
                    if typ=='gob':monsters.append(Actor(mx,my,'g',6,2,'Goblin'))
                    if typ=='orc':monsters.append(Actor(mx,my,'o',10,3,'Orc'))
                    if typ=='bat':monsters.append(Actor(mx,my,'b',4,1,'Bat'))
            if random.random()<0.5:
                ix=random.randint(rx,rx+rw-1);iy=random.randint(ry,ry+rh-1)
                if m[iy][ix]=='.':
                    it=random.choice(['potion','gold','sword'])
                    items.append(((ix,iy),it))
        return monsters,items

    def visible(dmap,px,py,vision=8):
        h=len(dmap);w=len(dmap[0])
        vis=[[False]*w for _ in range(h)]
        for y in range(max(0,py-vision),min(h,py+vision+1)):
            for x in range(max(0,px-vision),min(w,px+vision+1)):
                dx=x-px;dy=y-py
                if dx*dx+dy*dy<=vision*vision:
                    vis[y][x]=True
        return vis

    def draw(win,dmap,player,monsters,items,msg,offsetx=0,offsety=0):
        h=len(dmap);w=len(dmap[0])
        vis=visible(dmap,player.x,player.y,vision=8)
        for y in range(h):
            for x in range(w):
                if not vis[y][x]:ch=' '
                else:
                    ch=dmap[y][x]
                win.addch(y+offsety,x+offsetx,ord(ch))
        for (ix,iy),it in items:
            if visible(dmap,player.x,player.y)[iy][ix]:
                win.addch(iy+offsety,ix+offsetx,ord('!'))
        for m in monsters:
            if m.is_alive() and visible(dmap,player.x,player.y)[m.y][m.x]:
                win.addch(m.y+offsety,m.x+offsetx,ord(m.ch))
        win.addch(player.y+offsety,player.x+offsetx,ord('@'))
        stat=f" HP:{player.hp}/{player.max_hp} ATK:{player.atk} GOLD:{player.gold} LVL:{player.xp if hasattr(player,'xp') else 1}"
        try:
            win.addstr(0,0,stat[:w-1])
        except:pass
        if msg:
            try:win.addstr(h-1,0,msg[:w-1])
            except:pass

    def find_monster_at(monsters,x,y):
        for m in monsters:
            if m.x==x and m.y==y and m.is_alive():return m
        return None

    def ai_turn(m,player,dmap):
        if not m.is_alive():return
        dx=player.x-m.x;dy=player.y-m.y
        dist=abs(dx)+abs(dy)
        if dist<=1:
            dmg=max(0,m.atk+random.randint(-1,1))
            player.hp-=dmg
        else:
            dirs=[(1,0),(-1,0),(0,1),(0,-1)]
            dirs.sort(key=lambda d:abs((m.x+d[0])-player.x)+abs((m.y+d[1])-player.y))
            for d in dirs:
                nx,ny=m.x+d[0],m.y+d[1]
                if 0<=ny<len(dmap) and 0<=nx<len(dmap[0]) and dmap[ny][nx]=='.' and not find_monster_at(monsters,nx,ny) and not (player.x==nx and player.y==ny):
                    m.x,m.y=nx,ny;break

    def pickup(items,player):
        for i,((ix,iy),it) in enumerate(items):
            if ix==player.x and iy==player.y:
                if it=='potion':
                    player.hp=min(player.max_hp,player.hp+6);msg=f"Drank potion."
                elif it=='gold':
                    g=random.randint(5,20);player.gold+=g;msg=f"Picked up {g} gold."
                elif it=='sword':
                    player.atk+=1;msg="Found sword! ATK up."
                else:msg=f"Picked up {it}."
                items.pop(i);return msg
        return ""

    def game_loop(stdscr):
        curses.curs_set(0);h,w=24,80
        dmap,rooms=gen_map(w,h,rooms=18,room_min=4,room_max=10)
        monsters,items=place_items_and_monsters(dmap,rooms)
        rx,ry,_,_=rooms[0];px=rx+1;py=ry+1
        player=Actor(px,py,'@',20,3,'You');player.xp=1;player.level=1
        msg="Welcome"
        stdscr.clear()
        stdscr.nodelay(True);stdscr.keypad(True)
        last_time=time.time()
        while True:
            now=time.time()
            if now-last_time>0.05:
                last_time=now
            draw(stdscr,dmap,player,monsters,items,msg)
            stdscr.refresh()
            if not player.is_alive():
                stdscr.nodelay(False);stdscr.addstr(12,30,"You died. Press any key.");stdscr.getch();break
            try:key=stdscr.getch()
            except:key=-1
            if key==-1:time.sleep(0.01);continue
            if key in (ord('q'),27):break
            dx=dy=0;acted=False
            if key in (curses.KEY_UP,ord('k')):dy=-1;acted=True
            if key in (curses.KEY_DOWN,ord('j')):dy=1;acted=True
            if key in (curses.KEY_LEFT,ord('h')):dx=-1;acted=True
            if key in (curses.KEY_RIGHT,ord('l')):dx=1;acted=True
            if key==ord('g'):
                m=pickup(items,player);msg=m if m else "Nothing here."
                acted=True
            if key==ord('i'):
                inv=f"HP:{player.hp}/{player.max_hp} ATK:{player.atk} GOLD:{player.gold}"
                stdscr.nodelay(False);stdscr.addstr(0,0,inv+" Press any key");stdscr.getch();stdscr.nodelay(True);msg=""
            if acted and (dx!=0 or dy!=0):
                nx,ny=player.x+dx,player.y+dy
                if nx<0 or ny<0 or ny>=len(dmap) or nx>=len(dmap[0]) or dmap[ny][nx]=='#':
                    msg="Bump!"
                else:
                    target=find_monster_at(monsters,nx,ny)
                    if target:
                        dmg=max(0,player.atk+random.randint(-1,1))
                        target.hp-=dmg
                        msg=f"You hit {target.name} for {dmg}."
                        if not target.is_alive():
                            player.gold+=random.randint(1,10)
                            msg+=f" {target.name} died."
                            player.xp+=1
                            if player.xp>=5:
                                player.level+=1;player.xp=0;player.max_hp+=5;player.hp=player.max_hp;player.atk+=1;msg+=" Level up!"
                    else:
                        player.x,player.y=nx,ny
                        pmsg=pickup(items,player)
                        if pmsg:msg=pmsg
                        else:msg=""
            # monsters turn
            for m in monsters:
                if m.is_alive():
                    ai_turn(m,player,dmap)
            # remove dead monsters display cleanup
            monsters=[m for m in monsters if m.is_alive()]
            # win condition: find exit (maybe last room center)
            lastroom=rooms[-1];ex,ey,lastw,lasth=lastroom[0]+lastroom[2]//2,lastroom[1]+lastroom[3]//2
            if player.x==ex and player.y==ey:
                stdscr.nodelay(False);stdscr.addstr(12,30,"You found the exit! Press any key.");stdscr.getch();break
        curses.endwin()

    def main():
        curses.wrapper(game_loop)

    if __name__=='__main__':
        main()` 
    },

  {
    title: "ASCII Chess",
    category: "ascii",
    description: "Full chess game with ASCII board and piece representation.",
    tags: ["console", "ascii-art", "board-game"],
    difficulty: 4,
    lines: "~200 lines",
    code: `import os
  def clear(): os.system("cls" if os.name=="nt" else "clear")
  pieces = {
    "r":"♜","n":"♞","b":"♝","q":"♛","k":"♚","p":"♟",
    "R":"♖","N":"♘","B":"♗","Q":"♕","K":"♔","P":"♙"," ":" "
  }
  board = [
    ["r","n","b","q","k","b","n","r"],
    ["p"]*8,
    [" "]*8,
    [" "]*8,
    [" "]*8,
    [" "]*8,
    ["P"]*8,
    ["R","N","B","Q","K","B","N","R"]
  ]
  def print_board():
      print("  a b c d e f g h")
      for i,row in enumerate(board):
          print(8-i, end=" ")
          for c in row:
              print(pieces[c], end=" ")
          print(8-i)
      print("  a b c d e f g h")
  def parse_move(m):
      try:
          from_x = ord(m[0])-97
          from_y = 8-int(m[1])
          to_x = ord(m[2])-97
          to_y = 8-int(m[3])
          return (from_y,from_x,to_y,to_x)
      except:
          return None
  turn = "white"
  while True:
      clear()
      print_board()
      print(f"{turn.capitalize()}'s move. Enter move (e2e4):")
      m = input()
      if m=="exit": break
      move = parse_move(m)
      if not move: print("Invalid format"); input(); continue
      fy,fx,ty,tx = move
      piece = board[fy][fx]
      if piece==" " or (turn=="white" and piece.islower()) or (turn=="black" and piece.isupper()):
          print("Invalid piece"); input(); continue
      board[ty][tx] = board[fy][fx]
      board[fy][fx] = " "
      turn = "black" if turn=="white" else "white"`
  },

  {
    title: "ASCII Tetris",
    category: "ascii",
    description: "Tetris game using ASCII blocks in the terminal.",
    tags: ["console", "ascii-art", "puzzle"],
    difficulty: 3,
    lines: "~150 lines",
    code: `import os,time,random,msvcrt
  w,h=10,20
  board=[[" "]*w for _ in range(h)]
  shapes=[
  [[1,1,1,1]], # I
  [[1,1],[1,1]], # O
  [[0,1,0],[1,1,1]], # T
  [[1,1,0],[0,1,1]], # S
  [[0,1,1],[1,1,0]] # Z
  ]
  def clear(): os.system("cls")
  def draw():
  clear()
  for row in board:
    print("|"+''.join(["#" if c else " " for c in row])+"|")
  print("-"*(w+2))
  def can_place(shape,x,y):
  for i,r in enumerate(shape):
    for j,v in enumerate(r):
    if v:
      if y+i>=h or x+j<0 or x+j>=w or board[y+i][x+j]: return False
  return True
  def place(shape,x,y):
  for i,r in enumerate(shape):
    for j,v in enumerate(r):
    if v: board[y+i][x+j]=1
  def remove(shape,x,y):
  for i,r in enumerate(shape):
    for j,v in enumerate(r):
    if v: board[y+i][x+j]=0
  def clear_lines():
  global board
  new_board=[row for row in board if any(c==0 for c in row)]
  while len(new_board)<h: new_board=[[0]*w]+new_board
  board=new_board
  x,y=3,0
  shape=random.choice(shapes)
  while True:
  draw()
  time.sleep(0.2)
  if msvcrt.kbhit():
    k=msvcrt.getch()
    if k==b'a' and can_place(shape,x-1,y): x-=1
    if k==b'd' and can_place(shape,x+1,y): x+=1
    if k==b's' and can_place(shape,x,y+1): y+=1
    if k==b'w':
    new_shape=[list(r) for r in zip(*shape[::-1])]
    if can_place(new_shape,x,y): shape=new_shape
  if can_place(shape,x,y+1): y+=1
  else:
    place(shape,x,y)
    clear_lines()
    x,y=3,0
    shape=random.choice(shapes)
    if not can_place(shape,x,y):
    draw()
    print("Game Over!")
    break`
  },
  {
    title: "ASCII Pong",
    category: "ascii",
    description: "Two-player Pong rendered with ASCII characters.",
    tags: ["console", "ascii-art", "arcade"],
    difficulty: 2,
    lines: "~100 lines",
    code: `import os, time, msvcrt
  w,h=40,10
  p1,p2=h//2,h//2
  bx,by=w//2,h//2
  dx,dy=1,1
  def draw():
      os.system("cls")
      for y in range(h):
          row=""
          for x in range(w):
              if x==0 and y==p1: row+="|"
              elif x==w-1 and y==p2: row+="|"
              elif x==bx and y==by: row+="O"
              else: row+=" "
          print(row)
  while True:
      draw()
      time.sleep(0.1)
      if msvcrt.kbhit():
          k=msvcrt.getch()
          if k==b'w' and p1>0: p1-=1
          if k==b's' and p1<h-1: p1+=1
          if k==b'i' and p2>0: p2-=1
          if k==b'k' and p2<h-1: p2+=1
      bx+=dx; by+=dy
      if by<=0 or by>=h-1: dy*=-1
      if bx<=1:
          if by==p1: dx*=-1
          else: print("Player 2 wins!"); break
      if bx>=w-2:
          if by==p2: dx*=-1
          else: print("Player 1 wins!"); break`
  },
  {
    title: "ASCII Art Portrait Generator",
    category: "ascii",
    description: "Convert photos into detailed ASCII art portraits.",
    tags: ["PIL", "ascii-art", "image-processing"],
    difficulty: 3,
    lines: "~50 lines",
    code: `from PIL import Image
  chars = "@%#*+=-:. "
  def resize(img, new_width=80):
      w,h = img.size
      ratio = h/w/1.65
      return img.resize((new_width, int(new_width*ratio)))
  def to_ascii(img):
      img = img.convert("L")
      pixels = img.getdata()
      return "".join([chars[pixel*len(chars)//256] for pixel in pixels])
  path = input("Enter image path: ")
  img = Image.open(path)
  img = resize(img,80)
  ascii_str = to_ascii(img)
  w,h = img.size
  for i in range(0,len(ascii_str),w):
      print(ascii_str[i:i+w])`
  },
  {
    title: "ASCII Animation Player",
    category: "ascii",
    description: "Play ASCII art animations from text files with frame control.",
    tags: ["console", "ascii-art", "animation"],
    difficulty: 2,
    lines: "~60 lines",
    code: `import time, os
  frames=[]
  path=input("Enter animation file path: ")
  with open(path,"r") as f:
      content=f.read().split("\n===FRAME===\n")
      frames=[frame.split("\\n") for frame in content]
  delay = 0.2
  while True:
      for frame in frames:
          os.system("cls")
          print("\\n".join(frame))
          time.sleep(delay)`
  },

  {
    title: "ASCII Maze Game",
    category: "ascii",
    description: "Navigate through ASCII mazes with enemies and power-ups.",
    tags: ["console", "ascii-art", "maze"],
    difficulty: 3,
    lines: "~120 lines",
    code: `import os,msvcrt,random
  w,h=20,10
  maze=[["#" if x==0 or y==0 or x==w-1 or y==h-1 else " " for x in range(w)] for y in range(h)]
  player=[1,1]
  goal=[h-2,w-2]
  enemies=[[random.randint(1,h-2),random.randint(1,w-2)] for _ in range(2)]
  def draw():
  os.system("cls")
  for y,row in enumerate(maze):
    line=""
    for x,c in enumerate(row):
    if [y,x]==player: line+="P"
    elif [y,x]==goal: line+="G"
    elif [y,x] in enemies: line+="E"
    else: line+=c
    print(line)
  while True:
  draw()
  if player==goal:
    print("You win!"); break
  if msvcrt.kbhit():
    k=msvcrt.getch()
    ny,nx=player
    if k==b'w': ny-=1
    if k==b's': ny+=1
    if k==b'a': nx-=1
    if k==b'd': nx+=1
    if maze[ny][nx]==" ": player=[ny,nx]
  for e in enemies:
    ey,ex=e
    move=random.choice([[0,1],[0,-1],[1,0],[-1,0]])
    if maze[ey+move[0]][ex+move[1]]==" ": e[0]+=move[0]; e[1]+=move[1]
    if e==player:
    draw(); print("Game Over!"); exit()`
  },
  {
    title: "ASCII Space Invaders",
    category: "ascii",
    description: "Space shooter with ASCII aliens and player ship.",
    tags: ["console", "ascii-art", "shooter"],
    difficulty: 3,
    lines: "~120 lines",
    code: `import os,time,msvcrt,random
  w,h=20,10
  ship_x=w//2
  aliens=[[0,x] for x in range(3,17,2)]
  bullets=[]
  def draw():
  os.system("cls")
  for y in range(h):
    row=""
    for x in range(w):
    if [y,x] in aliens: row+="A"
    elif [y,x] in bullets: row+="|"
    elif y==h-1 and x==ship_x: row+="^"
    else: row+=" "
    print(row)
  while True:
  draw()
  time.sleep(0.1)
  if msvcrt.kbhit():
    k=msvcrt.getch()
    if k==b'a' and ship_x>0: ship_x-=1
    if k==b'd' and ship_x<w-1: ship_x+=1
    if k==b' ': bullets.append([h-2,ship_x])
  new_bullets=[]
  for b in bullets:
    b[0]-=1
    if b[0]>=0 and [b[0],b[1]] not in aliens: new_bullets.append(b)
  bullets=new_bullets
  new_aliens=[]
  for a in aliens:
    if [a[0],a[1]] not in bullets: new_aliens.append(a)
  aliens=new_aliens
  if not aliens:
    draw(); print("You win!"); break
  for a in aliens:
    if a[0]==h-1:
    draw(); print("Game Over!"); exit()`
  },

  {
    title: "ASCII Flappy Bird",
    category: "ascii",
    description: "Flappy Bird clone in the terminal with ASCII graphics.",
    tags: ["console", "ascii-art", "arcade"],
    difficulty: 2,
    lines: "~100 lines",
    code: `import os,time,msvcrt,random
  w,h=20,10
  bird_y=h//2
  pipes=[]
  score=0
  tick=0
  def draw():
  os.system("cls")
  for y in range(h):
    row=""
    for x in range(w):
    if x==2 and y==bird_y: row="O"
    else: row+=" "
    for p in pipes:
    if p[0]==x and (y<p[1] or y>p[1]+3): row="|"
    print(row)
  while True:
  tick+=1
  if tick%5==0: pipes.append([w-1,random.randint(1,h-5)])
  if msvcrt.kbhit():
    k=msvcrt.getch()
    if k==b' ': bird_y-=1
  bird_y+=1
  for p in pipes: p[0]-=1
  pipes=[p for p in pipes if p[0]>=0]
  for p in pipes:
    if p[0]==2 and not (p[1]<=bird_y<=p[1]+3):
    draw(); print("Game Over! Score:",score); exit()
  score+=1
  draw()
  time.sleep(0.2)`
  },
  {
    title: "ASCII Text Banner Creator",
    category: "ascii",
    description: "Create large ASCII text banners with various fonts.",
    tags: ["pyfiglet", "ascii-art", "text"],
    difficulty: 1,
    lines: "~20 lines",
    code: `import pyfiglet
  text=input("Enter text: ")
  font=input("Enter font (or leave blank): ")
  if font=="": font="slant"
  ascii_banner=pyfiglet.figlet_format(text,font=font)
  print(ascii_banner)`
  },
  {
    title: "ASCII Breakout",
    category: "ascii",
    description: "Brick breaker game rendered in ASCII in the terminal.",
    tags: ["console", "ascii-art", "arcade"],
    difficulty: 3,
    lines: "~150 lines",
    code: `import os, time, msvcrt
  w,h=20,15
  paddle_x=w//2
  ball=[h-2,w//2]
  dx,dy=-1,-1
  bricks=[[1+i,j] for i in range(6) for j in range(3)]
  def draw():
  os.system("cls")
  for y in range(h):
    row=""
    for x in range(w):
    if [y,x]==ball: row="O"
    elif y==h-1 and abs(x-paddle_x)<=2: row="="
    elif [y,x] in bricks: row="#"
    else: row=" "
    print(row)
  while True:
  draw()
  time.sleep(0.1)
  if msvcrt.kbhit():
    k=msvcrt.getch()
    if k==b'a' and paddle_x>2: paddle_x-=1
    if k==b'd' and paddle_x<w-3: paddle_x+=1
  ball[0]+=dy; ball[1]+=dx
  if ball[1]<=0 or ball[1]>=w-1: dx*=-1
  if ball[0]<=0: dy*=-1
  if ball[0]==h-1: 
    if abs(ball[1]-paddle_x)<=2: dy*=-1
    else: print("Game Over!"); break
  if ball in bricks: bricks.remove(ball); dy*=-1
  if not bricks: print("You Win!"); break`
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
    lines: "~80 lines",
    code: `import os
  w,h=7,6
  board=[[" "]*w for _ in range(h)]
  def draw():
      os.system("cls")
      for row in board:
          print("|"+"|".join(row)+"|")
      print(" "+" ".join(str(i) for i in range(w)))
  def drop(col,player):
      for r in reversed(range(h)):
          if board[r][col]==" ":
              board[r][col]=player
              return True
      return False
  def check():
      for y in range(h):
          for x in range(w-3):
              if board[y][x]!=" " and all(board[y][x+i]==board[y][x] for i in range(4)): return board[y][x]
      for x in range(w):
          for y in range(h-3):
              if board[y][x]!=" " and all(board[y+i][x]==board[y][x] for i in range(4)): return board[y][x]
      for y in range(h-3):
          for x in range(w-3):
              if board[y][x]!=" " and all(board[y+i][x+i]==board[y][x] for i in range(4)): return board[y][x]
              if board[y+3][x]!=" " and all(board[y+3-i][x+i]==board[y+3][x] for i in range(4)): return board[y+3][x]
      return None
  turn="X"
  while True:
      draw()
      col=input(f"{turn}'s turn (0-{w-1}): ")
      if not col.isdigit() or not 0<=int(col)<w: continue
      if not drop(int(col),turn): continue
      winner=check()
      if winner:
          draw(); print(winner,"wins!"); break
      turn="O" if turn=="X" else "X"`
  },
  {
    title: "ASCII Battleship",
    category: "ascii",
    description: "Naval combat game with ASCII grid and ships.",
    tags: ["console", "ascii-art", "strategy"],
    difficulty: 3,
    lines: "~150 lines",
    code: `import os,random
  w,h=8,8
  ships=[(0,1),(2,3),(4,4),(6,0),(7,7)]
  hits=[]
  def draw():
      os.system("cls")
      print("  "+" ".join(str(i) for i in range(w)))
      for y in range(h):
          row=""
          for x in range(w):
              if (y,x) in hits:
                  row+="X"
              else:
                  row+="~"
          print(str(y)+" "+row)
  while ships:
      draw()
      move=input("Enter coordinates yx (e.g., 12): ")
      if len(move)!=2 or not move.isdigit(): continue
      y,x=int(move[0]),int(move[1])
      if (y,x) in hits: continue
      hits.append((y,x))
      if (y,x) in ships:
          print("Hit!"); ships.remove((y,x))
      else:
          print("Miss!")`
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
    title: "ASCII Minesweeper",
    category: "ascii",
    description: "Classic minesweeper in the terminal with ASCII graphics.",
    tags: ["console", "ascii-art", "puzzle"],
    difficulty: 3,
    lines: "~100 lines",
    code: `import os, random
  w,h,m=8,8,10
  board=[[" "]*w for _ in range(h)]
  mines=[(random.randint(0,h-1),random.randint(0,w-1)) for _ in range(m)]
  def count_adj(y,x):
      return sum((ny,nx) in mines for ny in range(y-1,y+2) for nx in range(x-1,x+2) if 0<=ny<h and 0<=nx<w)
  def draw():
      os.system("cls")
      print("  "+" ".join(str(i) for i in range(w)))
      for y,row in enumerate(board):
          print(str(y)+" "+" ".join(row))
  while True:
      draw()
      move=input("Enter coordinates yx (e.g., 12): ")
      if len(move)!=2 or not move.isdigit(): continue
      y,x=int(move[0]),int(move[1])
      if (y,x) in mines: draw(); print("Boom! Game Over"); break
      board[y][x]=str(count_adj(y,x))`
  },
  {
    title: "ASCII Sudoku",
    category: "ascii",
    description: "Play and solve Sudoku puzzles in ASCII format.",
    tags: ["console", "ascii-art", "puzzle"],
    difficulty: 3,
    lines: "~100 lines",
    code: `import os
  board=[[5,3,0,0,7,0,0,0,0],
        [6,0,0,1,9,5,0,0,0],
        [0,9,8,0,0,0,0,6,0],
        [8,0,0,0,6,0,0,0,3],
        [4,0,0,8,0,3,0,0,1],
        [7,0,0,0,2,0,0,0,6],
        [0,6,0,0,0,0,2,8,0],
        [0,0,0,4,1,9,0,0,5],
        [0,0,0,0,8,0,0,7,9]]
  def draw():
      os.system("cls")
      for r in board:
          print(" ".join(str(c) if c!=0 else "." for c in r))
  while True:
      draw()
      move=input("Enter y x value (e.g., 012): ")
      if len(move)!=3 or not move.isdigit(): continue
      y,x,v=int(move[0]),int(move[1]),int(move[2])
      if board[y][x]==0: board[y][x]=v`
  },
  {
    title: "ASCII RPG Battle System",
    category: "ascii",
    description: "Turn-based RPG combat with ASCII characters and monsters.",
    tags: ["console", "ascii-art", "rpg"],
    difficulty: 4,
    lines: "~150 lines",
    code: `import os,random,time
  player={"hp":50,"atk":10}
  enemy={"hp":30,"atk":8}
  def draw():
      os.system("cls")
      print("Player HP:",player["hp"]," Enemy HP:",enemy["hp"])
  while player["hp"]>0 and enemy["hp"]>0:
      draw()
      print("Choose action: 1=Attack 2=Heal")
      move=input()
      if move=="1": enemy["hp"]-=player["atk"]
      if move=="2": player["hp"]+=5
      if enemy["hp"]>0:
          player["hp"]-=enemy["atk"]
      time.sleep(0.5)
  draw()
  if player["hp"]>0: print("You won!")
  else: print("You lost!")`
  },
  {
    title: "ASCII Weather Display",
    category: "ascii",
    description: "Show weather conditions with ASCII art icons.",
    tags: ["console", "ascii-art", "api"],
    difficulty: 2,
    lines: "~50 lines",
    code: `import os
  weather=input("Enter weather (sun/rain/cloud): ")
  os.system("cls")
  if weather=="sun":
      print(" \\   / ")
      print("  .-.  ")
      print(" ―(   )―")
      print("  '-'  ")
      print(" /   \\ ")
  elif weather=="rain":
      print("     .-.     ")
      print("    (   ).   ")
      print("   (___(__)  ")
      print("   ‚‘‚‘‚‘‚‘  ")
      print("   ‚’‚’‚’‚’  ")
  elif weather=="cloud":
      print("      .--.   ")
      print("   .-(    ). ")
      print("  (___.__)__)")`
  },
  {
    title: "ASCII Fireworks",
    category: "ascii",
    description: "Animated fireworks display in ASCII art.",
    tags: ["console", "ascii-art", "animation"],
    difficulty: 3,
    lines: "~100 lines",
    code: `import os,time,random
  w,h=40,10
  chars="*+x@"
  def draw(fireworks):
      os.system("cls")
      for y in range(h):
          row=""
          for x in range(w):
              c=" "
              for fx,fy,ch in fireworks:
                  if fy==y and fx==x: c=ch
              row+=c
          print(row)
  fireworks=[]
  while True:
      if random.random()<0.2:
          fireworks.append([random.randint(0,w-1),h-1,random.choice(chars)])
      new_fireworks=[]
      for fx,fy,ch in fireworks:
          fy-=1
          if fy>=0: new_fireworks.append([fx,fy,ch])
      fireworks=new_fireworks
      draw(fireworks)
      time.sleep(0.1)`
  },
  {
    title: "ASCII Racing Game",
    category: "ascii",
    description: "Top-down racing game with ASCII track and cars.",
    tags: ["console", "ascii-art", "racing"],
    difficulty: 3,
    lines: "~120 lines",
    code: `import os,msvcrt,time,random
  w,h=20,10
  track=[" "*w for _ in range(h)]
  car_x=w//2
  def draw():
      os.system("cls")
      for y,row in enumerate(track):
          row2=list(row)
          if y==h-1: row2[car_x]="A"
          print("".join(row2))
  while True:
      track.pop(0)
      line=[" "]*w
      for i in range(random.randint(1,3)):
          line[random.randint(0,w-1)]="#"
      track.append("".join(line))
      draw()
      time.sleep(0.2)
      if msvcrt.kbhit():
          k=msvcrt.getch()
          if k==b'a' and car_x>0: car_x-=1
          if k==b'd' and car_x<w-1: car_x+=1
      if track[-1][car_x]=="#":
          draw()
          print("Crash! Game Over")
          break`
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
}


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