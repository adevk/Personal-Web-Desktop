/**
 * The chat-app web component module.
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

      #message-form {
        display: flex;
        flex-direction: column;
        text-align: center;
      }

      #message-form * {
        text-align: center;
        margin: 2px auto;
      }

      #login-form {
        display: flex;
        flex-direction: column;
        text-align: center;
      }

      #login-form * {
        margin: 2px auto;
      }

      #input-delayed {
        width: 40px;
      }
      .root {
        background-color: #34495e;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
      }

      .screen {
        background-color: white;
        border: 1px solid black;
        margin: 2px;
        overflow: scroll;
        padding: 6px;
        height: 70%;
      }

      .input-section {
        padding: 6px;
      }

      textarea {
        box-sizing: border-box;
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
    #btnSendDelayed
    #inputDelay
    #inputSection
    #inputForm
    #inputUsername
    #textarea
    #screen
    #webSocket

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
      this.#screen = this.shadowRoot.querySelector('.screen')
      this.#inputSection = this.shadowRoot.querySelector('.input-section')

      if (!this.#isLoggedIn()) {
        this.#createAndInitializeLoginForm()
      } else {
        this.#createAndInitalizeMessageForm()
      }
    }

    /**
     * Checks if user is logged in.
     *
     * @returns {string} The username (truthful value) if logged in.
     */
    #isLoggedIn () {
      return localStorage.getItem('chatAppUsername')
    }

    /**
     * Creates and initializes the login form.
     */
    #createAndInitializeLoginForm () {
      const loginForm = this.#createLoginForm()
      this.#inputSection.appendChild(loginForm)
      this.#btnLogin = this.shadowRoot.querySelector('#btn-login')
      this.#inputUsername = this.shadowRoot.querySelector('#input-username')
      this.#inputForm = this.shadowRoot.querySelector('#login-form')
    }

    /**
     * Creates and initalizes the messaging form.
     */
    #createAndInitalizeMessageForm () {
      const messageForm = this.#createMessageForm()
      this.#inputSection.appendChild(messageForm)
      this.#textarea = this.shadowRoot.querySelector('#textarea')
      this.#inputForm = this.shadowRoot.querySelector('#message-form')
      this.#btnSendMsg = this.shadowRoot.querySelector('#btn-send-msg')
      this.#btnSendDelayed = this.shadowRoot.querySelector('#btn-send-delayed')
      this.#inputDelay = this.shadowRoot.querySelector('#input-delay')
      this.#initializeMessaging()
    }

    /**
     * Sends the inputted message to the websocket server.
     */
    #sendMessage () {
      const username = localStorage.getItem('chatAppUsername')
      const message = this.#textarea.value
      const objToSend = {
        type: 'message',
        data: message,
        username: username,
        channel: 'akramstestchatt',
        key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
      }
      const json = JSON.stringify(objToSend)
      this.#webSocket.send(json)
    }

    /**
     * Initializes messaging functionality.
     */
    #initializeMessaging () {
      // Initializes normal messaging button.
      this.#btnSendMsg.addEventListener('click', (event) => {
        event.preventDefault()
        this.#sendMessage()
      })
      // Initializes delayed messaging button.
      this.#btnSendDelayed.addEventListener('click', (event) => {
        event.preventDefault()
        const secondsDelay = this.#inputDelay.value
        setTimeout(() => {
          this.#sendMessage()
        }, secondsDelay * 1000)
      })
    }

    /**
     * Creates form for messaging.
     *
     * @returns {HTMLElement} The messaging form.
     */
    #createMessageForm () {
      const messageFormTemplate = document.createElement('template')
      messageFormTemplate.innerHTML = `
        <div id="message-form">
          <textarea id="textarea"></textarea>
          <button id="btn-send-msg">Send message</button>
          <div id="delayed-form">
            <button id="btn-send-delayed">Send delayed</button>
            <input id="input-delayed" type="number" name="seconds" min="1">
          </div>
        </div>
      `
      return messageFormTemplate.content.cloneNode(true)
    }

    /**
     * Creates login form.
     *
     * @returns {HTMLElement} The login form.
     */
    #createLoginForm () {
      const loginFormTemplate = document.createElement('template')
      loginFormTemplate.innerHTML = `
        <div id="login-form">
          <label>Please enter your username:</label>
          <input id="input-username" type="text">
          <button id="btn-login">Submit</button>
        </div>
      `
      return loginFormTemplate.content.cloneNode(true)
    }

    /**
     * Starts up the websocket connection.
     */
    #startWebSocket () {
      this.#webSocket = new WebSocket('wss://courselab.lnu.se/message-app/socket')
      this.#webSocket.addEventListener('open', (event) => {
        console.log('Socket open!')
      })
      this.#webSocket.addEventListener('message', (event) => {
        const serverPacket = JSON.parse(event.data)
        if (serverPacket.type === 'notification' || serverPacket.type === 'message') {
          const msgElement = document.createElement('p')
          msgElement.textContent = `${serverPacket.username}: ${serverPacket.data}`
          this.#screen.appendChild(msgElement)
        }
      })
    }

    /**
     * Sends confirmation message at succesful login.
     */
    #sendLoginConfirmation () {
      const message = {
        type: 'message',
        data: 'You are logged in! Start chatting...',
        username: 'The Chat',
        channel: 'akramstestchatt',
        key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
      }
      const json = JSON.stringify(message)
      this.#webSocket.send(json)
    }

    /**
     * Logs in user.
     *
     * @param {string} username - The username of the user.
     */
    #loginUser (username) {
      localStorage.setItem('chatAppUsername', username)
      this.#sendLoginConfirmation()
    }

    /**
     * Removes the current input form.
     */
    #removePreviousInputForm () {
      this.#inputForm.remove()
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
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
