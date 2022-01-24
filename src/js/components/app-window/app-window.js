/**
 * An app-window web component for a PWD application.
 *
 * @author Akram Kadri <ak224hz@student.lnu.se>
 * @version 1.0.0
 */

const BTN_ICON_URL = new URL('images/cross_scaled.png', import.meta.url).href

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
      z-index: 100;
    }

    .root {
      width: 100%;
      height: 100%;
    }

    .top-bar {
      background-color: blue;
      cursor: move;

      display: flex;
      justify-content: right;
      align-items: center;

      height: 30px;
      padding: 2px 6px;
    }

    .btn-close {
      padding: 5px;
      width: 20px;
      height: 20px;
      background-clip: padding-box;
      background-color: white;
      background-image: url(${BTN_ICON_URL});
      background-size: contain;
    }

  </style>
  <div class="top-bar">
    <button class="btn-close"></button>
  </div>
  <div class="root"></div>
  `

/**
 * Define custom element.
 */
customElements.define('app-window',
  /**
   * The app-window component.
   */
  class AppWindow extends HTMLElement {
    #btnClose
    #topBar

    #startPosX
    #startPosY
    #offsetX
    #offsetY

    static openedInstances = []

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
      this.#btnClose = this.shadowRoot.querySelector('.btn-close')
      this.#topBar = this.shadowRoot.querySelector('.top-bar')

      this.#startPosX = 0
      this.#startPosY = 0
      this.#offsetX = 0
      this.#offsetY = 0

      AppWindow.openedInstances.push(this)
    }

    /**
     * Gets called when the app-window top-bar is clicked.
     *
     * @param {MouseEvent} event - onmousedown event.
     */
    #startDragging (event) {
      event.preventDefault()
      this.#startPosX = event.clientX
      this.#startPosY = event.clientY
      /**
       * Setting handler for onmouseup events.
       *
       * @param {MouseEvent} event - onmouseup event.
       * @returns {any} Is not supposed to return anything (Required by lint).
       */
      document.onmouseup = (event) => this.#stopDragging(event)
      /**
       * Setting handler for onmousemove events.
       *
       * @param {MouseEvent} event - onmousemove event.
       * @returns {any} Is not supposed to return anything (Required by lint).
       */
      document.onmousemove = (event) => this.#dragWindow(event)
      this.#giveFocus()
    }

    /**
     * Is continually called while the window is dragged.
     *
     * @param {MouseEvent} event - onmousedown event.
     */
    #dragWindow (event) {
      event.preventDefault()

      this.#offsetX = this.#startPosX - event.clientX
      this.#offsetY = this.#startPosY - event.clientY
      this.#startPosX = event.clientX
      this.#startPosY = event.clientY

      const newTop = this.offsetTop - this.#offsetY // The new top value (coordinate) for the css top attribute.
      const newLeft = this.offsetLeft - this.#offsetX // The new left value (coordinate) for the css left attribute.

      // If the new top coordinate is inside the viewport, move the app.
      if (newTop > 0 && newTop < (window.innerHeight - this.getBoundingClientRect().height)) {
        this.style.top = (newTop) + 'px'
      }
      // If the new left coordinate is inside the viewport, move the app.
      if (newLeft > 0 && newLeft < (window.innerWidth - this.getBoundingClientRect().width)) {
        this.style.left = newLeft + 'px'
      }
    }

    /**
     * Called when the dragging of the window stops.
     *
     * @param {MouseEvent} event - onmouseup event.
     */
    #stopDragging (event) {
      event.preventDefault()
      document.onmousemove = null
      document.onmouseup = null
    }

    /**
     * Gives focus (puts on top of other) to the instance.
     */
    #giveFocus () {
      AppWindow.unFocusAllApps()
      this.style.setProperty('z-index', 1000)
    }

    /**
     * Removes focus from all opened instances of the app.
     */
     static unFocusAllApps () {
      AppWindow.openedInstances.forEach((app) => {
        if (app) {
          app.#removeFocus()
        }
      })
    }

    /**
     * Removes focus from the instance.
     */
    #removeFocus () {
      this.style.removeProperty('z-index')
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      this.addEventListener('click', () => this.#giveFocus())
      this.#btnClose.addEventListener('click', () => this.remove())

      /**
       * Setting handler for onmousedown events.
       *
       * @param {MouseEvent} event - onmousedown event.
       * @returns {any} Is not supposed to return anything (Required by lint).
       */
      this.#topBar.onmousedown = (event) => this.#startDragging(event)

      /**
       * Setting handler for onmouseup events.
       *
       * @param {MouseEvent} event - onmouseup event.
       * @returns {any} Is not supposed to return anything (Required by lint).
       */
      document.onmouseup = (event) => this.#stopDragging(event)
      this.#giveFocus()
    }
  }
)
