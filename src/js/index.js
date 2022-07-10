/**
 * The main script file of the application.
 *
 * @author // Akram Kadri <ak224hz@student.lnu.se>
 * @version 1.0.0
 */

import './components/bottom-panel'
import './components/memory-game'
import './components/app-window'
import './components/chat-app'
import './components/translator-app'

let liveSubAppInstances = 0

const BottomPanel = document.createElement('bottom-panel')
document.body.appendChild(BottomPanel)

document.addEventListener('memoryGameIconClicked', () => {
  addSubApp('memory-game')
  liveSubAppInstances++
})

document.addEventListener('chatAppIconClicked', () => {
  addSubApp('chat-app')
  liveSubAppInstances++
})

document.addEventListener('translatorAppIconClicked', () => {
  addSubApp('translator-app')
  liveSubAppInstances++
})

/**
 * Adds a sub-app to the main application.
 */
const addSubApp = (componentName) => {
  const appWindow = document.createElement('app-window')
  appWindow.style.position = 'absolute'
  appWindow.style.top = `${20 + liveSubAppInstances * 10}px`
  appWindow.style.left = `${liveSubAppInstances * 10}px`
  const subApp = document.createElement(componentName)
  appWindow.shadowRoot.querySelector('.root').appendChild(subApp)
  document.querySelector('main').appendChild(appWindow)
}
