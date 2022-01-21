/**
 * The main script file of the application.
 *
 * @author // Akram Kadri <ak224hz@student.lnu.se>
 * @version 1.0.0
 */

import './components/bottom-panel'
import './components/memory-game'
import './components/app-window'

let startPosX = 0
let startPosY = 0
let offsetX = 0
let offsetY = 0

const startDragging = (event) => {
  event.preventDefault()
  startPosX = event.clientX
  startPosY = event.clientY
  document.onmouseup = stopDragging
  document.onmousemove = dragWindow
  console.log(`mouse down: startPosX:${startPosX} startPosY:${startPosY} offsetX:${offsetX} offsetY:${offsetY}`)
}

const dragWindow = (event) => {
  event.preventDefault()
  offsetX = startPosX - event.clientX
  offsetY = startPosY - event.clientY
  startPosX = event.clientX
  startPosY = event.clientY
  appWindow.style.top = (appWindow.offsetTop - offsetY) + "px";
  appWindow.style.left = (appWindow.offsetLeft - offsetX) + "px";
  console.log(`mouse drag: startPosX:${startPosX} startPosY:${startPosY} offsetX:${offsetX} offsetY:${offsetY}`)
}

const stopDragging = (event) => {
  event.preventDefault()
  document.onmousemove = null
  document.onmouseup = null
}

const BottomPanel = document.createElement('bottom-panel')
document.body.appendChild(BottomPanel)

let activeMemoryGames = 0



const appWindow = document.createElement('app-window')
appWindow.style.position = 'absolute'
appWindow.style.top = `${20 + activeMemoryGames * 10}px`;
appWindow.style.left = `${activeMemoryGames * 10}px`;
const memoryGame = document.createElement('memory-game')
appWindow.shadowRoot.querySelector('.root').appendChild(memoryGame)
document.querySelector('main').appendChild(appWindow)
activeMemoryGames++

document.addEventListener('memoryGameClicked', () => {
  const appWindow = document.createElement('app-window')
  appWindow.style.position = 'absolute'
  appWindow.style.top = `${20 + activeMemoryGames * 10}px`;
  appWindow.style.left = `${activeMemoryGames * 10}px`;
  const memoryGame = document.createElement('memory-game')
  appWindow.shadowRoot.querySelector('.root').appendChild(memoryGame)
  document.querySelector('main').appendChild(appWindow)
  activeMemoryGames++
})

appWindow.onmousedown = startDragging


