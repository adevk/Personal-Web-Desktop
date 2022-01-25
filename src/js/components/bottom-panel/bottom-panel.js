/**
 * A bottom-panel web component for a PWD application.
 *
 * @author Akram Kadri <ak224hz@student.lnu.se>
 * @version 1.0.0
 */

import { MemoryGameIconClickedEvent, ChatAppIconClickedEvent, TranslatorAppIconClickedEvent } from './lib/events'

/**
 * Define template.
 */
const template = document.createElement('template')
template.innerHTML = `
  <style>
    :host {
      position: absolute;
      bottom: 0;
      width: 100%;
    }

    .root {
      background: transparent;
      display: flex;
      justify-content: center;
      padding: 16px 0;
      margin-bottom: 30px;
    }

    span {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: .5em;
    }

    button {
      background-color: blue;
      border-color: black;
      border-radius: 50%;

      font-size: 16px;
      font-weight: bold;

      margin: 0 10px;

      height: 50px;
      width: 50px;
    }
  </style>

  <div class="root">
    <button id="btn-memory-game">M</button>
    <button id="btn-chat-app">C</button>
    <button id="btn-translator-app">T</button>
  </div>
  `

/**
 * Define custom element.
 */
customElements.define('bottom-panel',
  /**
   * The bottom-panel component.
   */
  class BottomPanel extends HTMLElement {
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
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      this.shadowRoot.addEventListener('click', (event) => {
        if (event.target.id === 'btn-memory-game') {
          this.dispatchEvent(new MemoryGameIconClickedEvent())
        }
        if (event.target.id === 'btn-chat-app') {
          this.dispatchEvent(new ChatAppIconClickedEvent())
        }
        if (event.target.id === 'btn-translator-app') {
          this.dispatchEvent(new TranslatorAppIconClickedEvent())
        }
      })
    }
  }
)
