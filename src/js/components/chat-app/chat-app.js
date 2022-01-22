/**
 * The chat-app web component module.
 *
 * @author Akram Kadri <ak224hz@student.lnu.se>
 * @version 1.0.0
 */

//const BACK_IMG_URL = new URL('images/beach_640.jpg', import.meta.url).href

/**
 * Define template.
 */
const template = document.createElement('template')
template.innerHTML = `
   <style>
     :host {
     }
     
   </style>

<div></div>
 `

/**
 * Define custom element.
 */
customElements.define('chat-app',
  /**
   * The main class of the chap-app component.
   */
  class ChatApp extends HTMLElement {


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

    }
  }
)
