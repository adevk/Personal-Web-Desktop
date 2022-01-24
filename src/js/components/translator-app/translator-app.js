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
        height: 400px;
      }

     /*  .input-section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 2px;
      }

      .input-section * {
        text-align: center;
        margin: 2px auto;
      }

      .root {
        width: 100%;
        height: 100%;
      }

      .screen {
        border: 1px solid black;
        margin: 2px;
        margin-bottom: 12px;
        overflow: scroll;
        padding: 6px;
        height: 70%;
      }

      textarea {
        width: 100%;
        height: 100%;
      } */
   </style>

<div class="root">

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
