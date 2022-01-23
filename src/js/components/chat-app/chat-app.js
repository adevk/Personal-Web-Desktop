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
        background-color: white;
        display: block;
        position: relative; /* Make positioning context for children */
        
        width: 400px;
        height: 400px;
      }

      form {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      form * {
        text-align: center;
        margin: 2px auto;
      }

      .root {
        width: 100%;
        height: 100%;
      }

      .screen {
        height: 70%;
        border: 1px solid black;
        margin: 2px;
        margin-bottom: 12px;
      }

      #submit {

      }
   </style>

<div class="root">
  <section class="screen"></section>
  <!-- Form which will send a POST request to the current URL -->
  <form method="post">
    <label>Please enter your username:
    </label>
    <input name="submitted-name" autocomplete="name">
    <input id="btnSubmit" type="submit" value="Login">
  </form>

</div>
 `

/**
 * Define custom element.
 */
customElements.define('chat-app',
  /**
   * The main class of the chat-app component.
   */
  class ChatApp extends HTMLElement {
    #btnSubmit
    #screen

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
      this.#btnSubmit = this.shadowRoot.querySelector('#btnSubmit')
      this.#screen = this.shadowRoot.querySelector('.screen')
      //this.#startWebSocket()
    }

    #startWebSocket() {
      const socket = new WebSocket('wss://courselab.lnu.se/message-app/socket')
      socket.addEventListener('open', (event) => {
        console.log('Socket open!')
      })
      socket.addEventListener('message', (event) => {
        const serverPacket = JSON.parse(event.data)
        if (serverPacket.type == 'notification') {
          console.log(`${serverPacket.username}: ${serverPacket.data}`)
        }
        //console.log('Message from server ', serverPacket);
      })
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback() {
      this.#startWebSocket()
      this.shadowRoot.addEventListener('submit', (event) => {
        event.preventDefault()
        console.log('Submitted username!')
        const message = {
          "type": "message",
          "data": "Ake logged in",
          "username": "Ake",
          "channel": "akramstestchatt",
          "key": "eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd"
        }

        json = JSON.stringify(message)
        socket.send(json);
      })
    }
  }
)
