/**
 * The main script file of the application.
 *
 * @author // Akram Kadri <ak224hz@student.lnu.se>
 * @version 1.0.0
 */

import './components/bottom-panel'

const BottomPanel = document.createElement('bottom-panel')
document.body.appendChild(BottomPanel)

document.addEventListener('memoryGameClicked', () => {
  console.log('from main script')
})