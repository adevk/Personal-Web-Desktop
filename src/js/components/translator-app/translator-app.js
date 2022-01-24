/**
 * The translator-app web component module.
 *
 * @author Akram Kadri <ak224hz@student.lnu.se>
 * @version 1.0.0
 */

import axios from "axios"
import qs from "qs"

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
  <textarea id="input"></textarea>
  <button>Translate</button>
  <span>Swedish translation:</span>
  <p id="output"></p>
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
    #btnTranslate
    #engInput
    #sweOutput

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
      this.#btnTranslate = this.shadowRoot.querySelector('button')
      this.#engInput = this.shadowRoot.querySelector('#input')
      this.#sweOutput = this.shadowRoot.querySelector('#output')
    }



    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback() {
      this.#btnTranslate.addEventListener('click', () => {
        const input = this.#engInput.value

        const options = {
          method: 'POST',
          url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'x-rapidapi-host': 'google-translate1.p.rapidapi.com',
            'x-rapidapi-key': '8b7fc66c22msh413c2e12dfa0e26p19983ajsn1c1c02bfce74'
          },
          data: qs.stringify({ source: 'en', target: 'sv', q: input })
        }

        axios.request(options).then( (response) => {
          const translation = response.data.data.translations[0].translatedText
          this.#sweOutput.textContent = translation
        }).catch(function (error) {
          console.error(error)
        })
      })
    }
  }
)
