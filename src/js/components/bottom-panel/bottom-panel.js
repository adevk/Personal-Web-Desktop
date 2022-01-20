/**
 * A bottom-panel web component for a PWD application.
 *
 * @author Akram Kadri <ak224hz@student.lnu.se>
 * @version 1.0.0
 */

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
      padding: 16px;

      width: fit-content;
    }

    span {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: .5em;
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
    <!-- <span>Choose a board size</span>
    <button id="btn16">4x4</button>
    <button id="btn8">2x4</button>
    <button id="btn4">2x2</button> -->
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
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback() {
      /* this.#btn16.addEventListener('click', (event) => {
        this.dispatchEvent(new Board16ChosenEvent())
      }) */
    }
  }
)
