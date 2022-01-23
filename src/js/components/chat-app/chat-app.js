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

      .input-section {
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
    #btnLogin
    #btnSendMsg
    #inputSection
    #inputForm
    #inputUsername
    #textarea
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
      this.#screen = this.shadowRoot.querySelector('.screen')
      this.#inputSection = this.shadowRoot.querySelector('.input-section')

      if (!this.#isLoggedIn()) {
        this.#createAndInitializeLoginForm()
      } else {
        this.#createAndInitalizeMessageForm()
      }
    }

    #isLoggedIn() {
      return localStorage.getItem('chatAppUsername')
    }

    #createAndInitializeLoginForm() {
      const loginForm = this.#createLoginForm()
      this.#inputSection.appendChild(loginForm)
      this.#btnLogin = this.shadowRoot.querySelector('#btn-login')
      this.#inputUsername = this.shadowRoot.querySelector('#input-username')
      this.#inputForm = this.shadowRoot.querySelector('#input-form')
    }

    #createAndInitalizeMessageForm() {
      const messageForm = this.#createMessageForm()
      this.#inputSection.appendChild(messageForm)
      this.#textarea = this.shadowRoot.querySelector('#textarea')
      this.#inputForm = this.shadowRoot.querySelector('#input-form')
      this.#btnSendMsg = this.shadowRoot.querySelector('#btn-send-msg')

      this.#initializeMessaging()
    }

    #initializeMessaging() {
      this.#btnSendMsg.addEventListener('click', (event) => {
        event.preventDefault()
        const username = localStorage.getItem('chatAppUsername')
        const message = this.#textarea.value
        const objToSend = {
          "type": "message",
          "data": message,
          "username": username,
          "channel": "akramstestchatt",
          "key": "eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd"
        }
        const json = JSON.stringify(objToSend)
        this.#webSocket.send(json)
      })
    }

    #createMessageForm() {
      const messageFormTemplate = document.createElement('template')
      messageFormTemplate.innerHTML = `
        <div id="input-form">
          <textarea id="textarea"></textarea>
          <button id="btn-send-msg">Send</button>
        </div>
      `
      return messageFormTemplate.content.cloneNode(true)
    }

    #createLoginForm() {
      const loginFormTemplate = document.createElement('template')
      loginFormTemplate.innerHTML = `
        <div id="input-form">
          <label>Please enter your username:</label>
          <input id="input-username" type="text">
          <button id="btn-login">Submit</button>
        </div>
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

    #loginUser(username) {
      localStorage.setItem('chatAppUsername', username)
      this.#sendLoginConfirmation()
    }

    #removePreviousInputForm() {
      this.#inputForm.remove()
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback() {
      this.#startWebSocket()
      if (!this.#isLoggedIn()) {
        this.#btnLogin.addEventListener('click', (event) => {
          event.preventDefault()
          const username = this.#inputUsername.value
          if (username) {
            this.#loginUser(username)
            this.#removePreviousInputForm()
            this.#createAndInitalizeMessageForm()
          }
        })
      }
    }
  }
)
