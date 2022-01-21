/**
 * An app-window web component for a PWD application.
 *
 * @author Akram Kadri <ak224hz@student.lnu.se>
 * @version 1.0.0
 */

import { TilingSprite } from "pixi.js"


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
    }

    .root {
      width: 100%;
      height: 100%;
    }

    .top-bar {
      background-color: blue;
      cursor: move;
      height: 30px;
    }

  </style>
  <div class="top-bar"></div>
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
    #topBar

    #startPosX
    #startPosY
    #offsetX
    #offsetY
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


    #startDragging(event) {
      event.preventDefault()
      this.#startPosX = event.clientX
      this.#startPosY = event.clientY
      document.onmouseup = (event) => this.#stopDragging(event)
      document.onmousemove = (event) => this.#dragWindow(event)
      //console.log(`mouse down: startPosX:${startPosX} startPosY:${startPosY} offsetX:${offsetX} offsetY:${offsetY}`)
    }

    #dragWindow(event) {
      event.preventDefault()
      this.#offsetX = this.#startPosX - event.clientX
      this.#offsetY = this.#startPosY - event.clientY
      this.#startPosX = event.clientX
      this.#startPosY = event.clientY
      this.style.top = (this.offsetTop - this.#offsetY) + "px";
      this.style.left = (this.offsetLeft - this.#offsetX) + "px";
      //console.log(`mouse drag: startPosX:${startPosX} startPosY:${startPosY} offsetX:${offsetX} offsetY:${offsetY}`)
    }

    #stopDragging(event) {
      event.preventDefault()
      document.onmousemove = null
      document.onmouseup = null
    }

    /**
     * Initalizes the component during construction.
     */
    #initialize() {
      this.#topBar = this.shadowRoot.querySelector('.top-bar')

      this.#startPosX = 0
      this.#startPosY = 0
      this.#offsetX = 0
      this.#offsetY = 0
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback() {
      this.#topBar.onmousedown = (event) => this.#startDragging(event)
      document.onmouseup = (event) => this.#stopDragging(event)
    }
  }
)
