// Console utilities for ASCII games
export function clearScreen() {
  if (typeof process !== 'undefined' && process.stdout) {
    process.stdout.write('\x1Bc');
  } else {
    console.clear();
  }
}

export function createGameContainer(title) {
  const container = document.createElement('div');
  container.className = 'game-container';
  container.innerHTML = `
    <div class="game-wrapper">
      <h1>${title}</h1>
      <div class="game-content"></div>
    </div>
  `;
  return container;
}
