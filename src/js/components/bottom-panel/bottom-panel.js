/**
 * A bottom-panel web component for a PWD application.
 *
 * @author Akram Kadri <ak224hz@student.lnu.se>
 * @version 1.0.0
 */

import { MemoryGameIconClickedEvent, ChatAppIconClickedEvent } from "./lib/events"

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
      background-color: brown;
      box-shadow: 0 0 8px black;
      padding: 16px 0;
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

      margin-left: 10px;

      height: 50px;
      width: 50px;
    }
  </style>

  <div class="root">
    <button id="btn-memory-game">M</button>
    <button id="btn-chat-app">C</button>
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
    #btn
    /**
     * Creates an instance of the current type.
     */
    constructor() {
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
    #initialize() {
      this.#btn = document.querySelector('#btn')
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback() {
      this.shadowRoot.addEventListener('click', (event) => {
        if (event.target.id === 'btn-memory-game') {
          this.dispatchEvent(new MemoryGameIconClickedEvent())
        }
        if (event.target.id === 'btn-chat-app') {
          this.dispatchEvent(new ChatAppIconClickedEvent())
        }
      })
    }
  }
)
