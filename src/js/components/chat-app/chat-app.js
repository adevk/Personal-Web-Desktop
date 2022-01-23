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
        border: 1px solid black;
        margin: 2px;
        margin-bottom: 12px;
        padding: 6px;
        height: 70%;
      }

      #submit {

      }
   </style>

<div class="root">
  <section class="screen"></section>
  <section class="input-section"></section>
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
    #inputSection
    #inputUsername
    #screen
    #webSocket

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
      this.#btnSubmit = this.shadowRoot.querySelector('#btn-submit')
      this.#screen = this.shadowRoot.querySelector('.screen')
      this.#inputSection = this.shadowRoot.querySelector('.input-section')

      const username = localStorage.getItem('chatAppUsername')
      if (!username) {
        const loginForm = this.#createLoginForm()
        this.#inputSection.appendChild(loginForm)
        this.#inputUsername = this.shadowRoot.querySelector('#input-username')
      } else {
        //this.#sendLoginConfirmation()
      }
    }

    #createMessageForm() {
      const messageFormTemplate = document.createElement('template')
      messageFormTemplate.innerHTML = `
        <form method="post">
          <label>Please enter your username:</label>
          <input id="input-username" name="submitted-name" autocomplete="name" type="text">
          <input id="btnSubmit" type="submit" value="Login">
        </form>
      `
      return messageFormTemplate.content.cloneNode(true)
    }

    #createLoginForm() {
      const loginFormTemplate = document.createElement('template')
      loginFormTemplate.innerHTML = `
        <form method="post">
          <label>Please enter your username:</label>
          <input id="input-username" name="submitted-name" autocomplete="name" type="text">
          <input id="btnSubmit" type="submit" value="Login">
        </form>
      `
      return loginFormTemplate.content.cloneNode(true)
    }

    #startWebSocket() {
      this.#webSocket = new WebSocket('wss://courselab.lnu.se/message-app/socket')
      this.#webSocket.addEventListener('open', (event) => {
        console.log('Socket open!')
      })
      this.#webSocket.addEventListener('message', (event) => {
        const serverPacket = JSON.parse(event.data)
        if (serverPacket.type == 'notification' || serverPacket.type == 'message') {
          console.log(`${serverPacket.username}: ${serverPacket.data}`)
          const msgElement = document.createElement('p')
          msgElement.textContent = `${serverPacket.username}: ${serverPacket.data}`
          this.#screen.appendChild(msgElement)
        }
      })
    }

    #sendLoginConfirmation() {
      const message = {
        "type": "message",
        "data": "You are logged in! Start chatting...",
        "username": "The Chat",
        "channel": "akramstestchatt",
        "key": "eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd"
      }
      const json = JSON.stringify(message)
      this.#webSocket.send(json)
    }
    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback() {
      this.#startWebSocket()
      this.shadowRoot.addEventListener('submit', (event) => {
        event.preventDefault()
        const username = this.#inputUsername.value
        localStorage.setItem('chatAppUsername', username)
        this.#sendLoginConfirmation()
      })
    }
  }
)
