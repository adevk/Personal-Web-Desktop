/**
 * The main script file of the application.
 *
 * @author // Akram Kadri <ak224hz@student.lnu.se>
 * @version 1.0.0
 */

import './components/bottom-panel'
import './components/memory-game'
import './components/app-window'

let startPosX, startPosY, offsetX, offsetY = 0

const startDragging = (event) => {
  event.preventDefault()
  startPosX = event.clientX
  startPosY = event.clientY
  appWindow.onmousemove = dragWindow
  appWindow.onmouseup = stopDragging
  console.log(`mouse down: x:${startPosX} y:${startPosY}`)
}

const dragWindow = (event) => {
  event.preventDefault()
  offsetX = startPosX - event.clientX
  offsetY = startPosY - event.clientY
  console.log(`mouse drag: x:${offsetX} y:${offsetY}`)
}

const stopDragging = (event) => {
  appWindow.onmousemove = null
  appWindow.onmouseup = null
}

const BottomPanel = document.createElement('bottom-panel')
document.body.appendChild(BottomPanel)

let activeMemoryGames = 0

document.addEventListener('memoryGameClicked', () => {
  const appWindow = document.createElement('app-window')
  appWindow.style.position = 'absolute'
  appWindow.style.top = `${20 + activeMemoryGames * 10}px`;
  appWindow.style.left = `${activeMemoryGames * 10}px`;
  appWindow.style.right = 0;
  appWindow.style.marginRight = 'auto';
  appWindow.style.marginLeft = 'auto';
  const memoryGame = document.createElement('memory-game')
  appWindow.shadowRoot.querySelector('.root').appendChild(memoryGame)
  document.querySelector('main').appendChild(appWindow)
  activeMemoryGames++
})

const appWindow = document.createElement('app-window')
appWindow.style.position = 'absolute'
appWindow.style.top = `${20 + activeMemoryGames * 10}px`;
appWindow.style.left = `${activeMemoryGames * 10}px`;
appWindow.style.right = 0;
appWindow.style.marginRight = 'auto';
appWindow.style.marginLeft = 'auto';
const memoryGame = document.createElement('memory-game')
appWindow.shadowRoot.querySelector('.root').appendChild(memoryGame)
document.querySelector('main').appendChild(appWindow)
activeMemoryGames++

appWindow.onmousedown = startDragging


