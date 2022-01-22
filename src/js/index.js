/**
 * The main script file of the application.
 *
 * @author // Akram Kadri <ak224hz@student.lnu.se>
 * @version 1.0.0
 */

import './components/bottom-panel'
import './components/memory-game'
import './components/app-window'

let liveAppInstances = []

const BottomPanel = document.createElement('bottom-panel')
document.body.appendChild(BottomPanel)

let activeMemoryGames = 0

document.addEventListener('memoryGameIconClicked', () => {
  addApp()
})


const addApp = () => {
  const appWindow = document.createElement('app-window')
  appWindow.style.position = 'absolute'
  appWindow.style.top = `${20 + activeMemoryGames * 10}px`;
  appWindow.style.left = `${activeMemoryGames * 10}px`;
  const memoryGame = document.createElement('memory-game')
  appWindow.shadowRoot.querySelector('.root').appendChild(memoryGame)
  document.querySelector('main').appendChild(appWindow)
  liveAppInstances.push(appWindow)
  appWindow.giveFocus()
  activeMemoryGames++
}

addApp()

