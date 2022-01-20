/**
 * The main script file of the application.
 *
 * @author // Akram Kadri <ak224hz@student.lnu.se>
 * @version 1.0.0
 */

import './components/bottom-panel'
import './components/memory-game'

const BottomPanel = document.createElement('bottom-panel')
document.body.appendChild(BottomPanel)

let activeMemoryGames = 0

document.addEventListener('memoryGameClicked', () => {
  const memoryGame = document.createElement('memory-game')
  memoryGame.style.position = 'absolute'
  memoryGame.style.top = `${20 + activeMemoryGames * 10}px`;
  memoryGame.style.left = `${activeMemoryGames * 10}px`;
  memoryGame.style.right = 0;
  memoryGame.style.marginRight = 'auto';
  memoryGame.style.marginLeft = 'auto';
  document.querySelector('main').appendChild(memoryGame)
  activeMemoryGames++
})