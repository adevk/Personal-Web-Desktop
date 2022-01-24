/**
 * The translator-app web component module.
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
        display: block;
        position: relative; /* Make positioning context for children */
        
        width: 400px;
      }

      .root {
        display: flex;
        flex-direction: column;

        width: 100%;
        height: 100%;
      }

      .root * {
        margin: 5px;
      }

      p {
        border: 1px solid black;
        height: 100px;
      }

      textarea {
        height: 100px;
      }

   </style>

<div class="root">
  <span>English text:</span>
  <textarea></textarea>
  <button>Translate</button>
  <span>Swedish translation:</span>
  <p></p>
</div>
 `
/**
 * Define custom element.
 */
customElements.define('translator-app',
  /**
   * The main class of the chat-app component.
   */
  class TranslatorApp extends HTMLElement {

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
