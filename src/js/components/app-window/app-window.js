/**
 * An app-window web component for a PWD application.
 *
 * @author Akram Kadri <ak224hz@student.lnu.se>
 * @version 1.0.0
 */

import { ReceivedFocusEvent } from "./lib/events"

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

    .close-btn {
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
    <button class="close-btn"></button>
  </div>
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
    #closeBtn
    #topBar

    #startPosX
    #startPosY
    #offsetX
    #offsetY

    static openedInstances = []

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
      this.#closeBtn = this.shadowRoot.querySelector('.close-btn')
      this.#topBar = this.shadowRoot.querySelector('.top-bar')

      this.#startPosX = 0
      this.#startPosY = 0
      this.#offsetX = 0
      this.#offsetY = 0

      AppWindow.openedInstances.push(this)
    }

    static unFocusAllApps() {
      AppWindow.openedInstances.forEach((app) => {
        if (app) app.removeFocus()
      })
    }

    #startDragging(event) {
      event.preventDefault()
      this.#startPosX = event.clientX
      this.#startPosY = event.clientY
      document.onmouseup = (event) => this.#stopDragging(event)
      document.onmousemove = (event) => this.#dragWindow(event)
      this.giveFocus()
    }

    #dragWindow(event) {
      event.preventDefault()

      this.#offsetX = this.#startPosX - event.clientX
      this.#offsetY = this.#startPosY - event.clientY
      this.#startPosX = event.clientX
      this.#startPosY = event.clientY

      const newTop = this.offsetTop - this.#offsetY
      const newLeft = this.offsetLeft - this.#offsetX
      //console.log(`new top: ${newTop}`)
      if (newTop > 0 && newTop < (window.innerHeight - this.getBoundingClientRect().height)) {
        this.style.top = (newTop) + "px"
      }
      if (newLeft > 0 && newLeft < (window.innerWidth - this.getBoundingClientRect().width)) {
        this.style.left = newLeft + "px"
      }

     /*  console.log('top: ' + this.style.top)
      console.log('left: ' + this.style.left)
      const rect = this.getBoundingClientRect()
      console.log(`x: ${rect.x}, y: ${rect.y}, top: ${rect.top}, left: ${rect.left}, bottom: ${rect.bottom}, right: ${rect.right}`)
      console.log(`Window - width: ${window.innerWidth}, height: ${window.innerHeight}`) */
    }

    #isTopCollision() {
      const top = Number(this.style.top.match(/\d+/)[0])
      console.log('top: ' + top)
      if (top === 0)
        return true
    }

    #stopDragging(event) {
      event.preventDefault()
      document.onmousemove = null
      document.onmouseup = null
    }

    removeFocus() {
      this.style.removeProperty('z-index')
    }

    giveFocus() {
      AppWindow.unFocusAllApps()
      this.style.setProperty('z-index', 1000)
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback() {
      this.addEventListener('click', () => this.giveFocus())
      this.#topBar.onmousedown = (event) => this.#startDragging(event)
      this.#closeBtn.addEventListener('click', () => this.remove())
      document.onmouseup = (event) => this.#stopDragging(event)
    }
  }
)
