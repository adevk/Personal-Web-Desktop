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

let liveAppInstances = []

const BottomPanel = document.createElement('bottom-panel')
document.body.appendChild(BottomPanel)

let activeMemoryGames = 0
let activeChatApps = 0
let activeTranslatorApps = 0

document.addEventListener('memoryGameIconClicked', () => {
  addMemoryApp()
})

document.addEventListener('chatAppIconClicked', () => {
  addChatApp()
})

document.addEventListener('translatorAppIconClicked', () => {
  addTranslatorApp()
})

const addChatApp = () => {
  const appWindow = document.createElement('app-window')
  appWindow.style.position = 'absolute'
  appWindow.style.top = `${20 + activeChatApps * 10}px`;
  appWindow.style.left = `${activeChatApps * 10}px`;
  const chatApp = document.createElement('chat-app')
  appWindow.shadowRoot.querySelector('.root').appendChild(chatApp)
  document.querySelector('main').appendChild(appWindow)
  liveAppInstances.push(appWindow)
  appWindow.giveFocus()
  activeChatApps++
}

const addMemoryApp = () => {
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

const addTranslatorApp = () => {
  const appWindow = document.createElement('app-window')
  appWindow.style.position = 'absolute'
  appWindow.style.top = `${20 + activeMemoryGames * 10}px`;
  appWindow.style.left = `${activeMemoryGames * 10}px`;
  const translatorApp = document.createElement('translator-app')
  appWindow.shadowRoot.querySelector('.root').appendChild(translatorApp)
  document.querySelector('main').appendChild(appWindow)
  liveAppInstances.push(appWindow)
  appWindow.giveFocus()
  activeTranslatorApps++
}

addTranslatorApp()