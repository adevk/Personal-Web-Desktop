/**
 * A play-again-hud web component for a memory game.
 *
 * @author Akram Kadri <ak224hz@student.lnu.se>
 * @version 1.0.0
 */

import { PlayAgainEvent } from './lib/events'

/**
 * Define template.
 */
const template = document.createElement('template')
template.innerHTML = `
  <style>
    :host {
      position: absolute;
      left: 0;
      right: 0;
      top: 20px;
    }

    .root {
      background-color: white;
      border-radius: 4px;
      box-shadow: 0 0 8px black;

      display: flex;
      flex-direction: column;

      margin: 0 auto;
      padding: 0 16px;

      width: fit-content;
    }

    span {
      font-size: 24px;
      font-weight: bold;
      margin: .5em 0;
      text-align: center;
    }

    label {
      font-size: 16px;
    }

    button {
      background-color: white;
      border: solid 2px #35cd31;
      border-radius: 4px;
      color: #185815;

      font-size: 16px;
      font-weight: bold;

      margin: .1em auto;
      padding: .2em 1.4em;
    }
  </style>

  <div class="root">
    <span id="play-again-label">Game Over</span>
    <button id="btn-play-again">Play again?</button>
    <span id="attempts-label"></span>
    <span id="play-time-label"></span>
  </div>
  `

/**
 * Define custom element.
 */
customElements.define('play-again-hud',
  /**
   * The choice-hud component.
   */
  class PlayAgainHud extends HTMLElement {
    #playAgainButton
    #attempts = 0
    #playTime = 0
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))

      this.#initialize()
    }

    /**
     * Initalizes the component during construction.
     */
    #initialize () {
      this.#playAgainButton = this.shadowRoot.querySelector('#btn-play-again')
    }

    /**
     * Attributes to monitor for changes.
     *
     * @returns {string[]} A string array of attributes to monitor.
     */
    static get observedAttributes () {
      return ['attempts', 'play-time']
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      this.#playAgainButton.addEventListener('click', (event) => {
        this.dispatchEvent(new PlayAgainEvent())
      })
    }

    /**
     * Called when observed attribute(s) changes.
     *
     * @param {string} name - The attribute's name.
     * @param {*} oldValue - The old value.
     * @param {*} newValue - The new value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'attempts') {
        this.#attempts = newValue
        const attemptsLabel = this.shadowRoot.querySelector('#attempts-label')
        attemptsLabel.textContent = `Total attempts: ${this.#attempts}`
      }
      if (name === 'play-time') {
        this.#playTime = newValue
        const playTimeLabel = this.shadowRoot.querySelector('#play-time-label')
        playTimeLabel.textContent = `Total play time: ${this.#playTime} seconds`
      }
    }
  }
)
