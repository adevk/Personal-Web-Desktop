/**
 * An app-window web component for a PWD application.
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
      background-color: white;
      border: 2px solid gray;
      box-shadow: 0 0 2px black;
      padding: 16px;
      
      position: absolute;
      width: fit-content;
      height: fit-content;
    }

    .root {
      width: 100%;
      height: 100%;
    }

    .top-bar {
      background-color: blue;
      cursor: move;
      height: 30px;
    }

  </style>
  <div class="top-bar"></div>
  <div class="root"></div>
  `

/**
 * Define custom element.
 */
customElements.define('app-window',
  /**
   * The bottom-panel component.
   */
  class AppWindow extends HTMLElement {
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

    }
  }
)
