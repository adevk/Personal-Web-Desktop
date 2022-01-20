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
      bottom: 0;
      width: 100%;
    }

    .root {
      background-color: brown;
      box-shadow: 0 0 8px black;
      padding: 16px;
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

      height: 50px;
      width: 50px;
    }
  </style>

  <div class="root">
    <button>M</button>
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
