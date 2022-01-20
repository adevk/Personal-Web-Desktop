/**
 * The memory card web component module.
 *
 * @author Akram Kadri <ak224hz@student.lnu.se>
 * @version 1.0.0
 */

import { CardFlippedEvent } from './lib/events'
const BACK_IMG_URL = new URL('images/question-mark.png', import.meta.url).href
/**
 * Define template.
 */
const template = document.createElement('template')
template.innerHTML = `
  <style>
    :host {
      display: block;

      perspective: 1000px;
      position: relative;

      width: 80px;
      height: 80px;
    }

    #card {
      background-color: #fff;
      border: solid 2px #35cd31;
      border-radius: 10px;

      display: inline-block;

      outline: none;
      padding: 2px;

      /* flipping */
      transform-style: preserve-3d;
      transition: 1s;

      width: 100%;
      height: 100%;
    }
    
    #card:focus {
      box-shadow: 0px 0 10px #35cd31;
    }
    
    #front,
    #back {
      background-color: white;
      border-radius: 8px;
      
      width: 100%;
      height: 100%;

      /* flipping */
      position: absolute;
      top:0;
      left:0;
      backface-visibility: hidden
    }
    
    /* Card face up */
    :host([face-up]) #card {
      transform: rotateY(180deg);
    }

    /* Card face down */
    #front {
      /* flipping */
      transform: rotateY(180deg);
    }
    
    #back {
      background: no-repeat center/40% url('${BACK_IMG_URL}');
    }
    
    /* Card hidden */
    :host([hidden]) #card {
      box-shadow: none;
      border-style: dotted;
      border-color: #858585;

      cursor: default;
      pointer-events: none;
    }
    
    :host([hidden]) #card >* {
      visibility: hidden;
    }
    
    /* Card disabled */
    :host([disabled]) #card {
      box-shadow: none;

      cursor: default;
      pointer-events: none;
    }
    
    /* Slot related */
    slot {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 100%;
      height: 100%;
    }
    
    ::slotted(img) {
      max-width: 80%;
      max-height: 80%;
    }
  </style>
  
  <button id="card" part="card">
    <div id="front" part="front">
      <slot></slot>
    </div>
    <div id="back" part="back"></div>
  </button>
`

/**
 * Define custom element.
 */
customElements.define('memory-card',
  /**
   * The main class of the memory-card component.
   */
  class MemoryCard extends HTMLElement {
    // The root element of the component.
    #card

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      this.#card = this.shadowRoot.querySelector('#card')
    }

    /**
     * Attributes to monitor for changes.
     *
     * @returns {string[]} A string array of attributes to monitor.
     */
    static get observedAttributes () {
      return ['face-up', 'disabled', 'hidden']
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      this.addEventListener('click', this.#onClick)
    }

    /**
     * Called when observed attribute(s) changes.
     *
     * @param {string} name - The attribute's name.
     * @param {*} oldValue - The old value.
     * @param {*} newValue - The new value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'disabled') {
        if (oldValue === null) {
          this.#card.setAttribute('disabled', '')
        }
        if (oldValue === '') {
          this.#card.removeAttribute('disabled')
        }
      }
    }

    /**
     * Called when card is clicked on.
     */
    #onClick () {
      // If card is disabled or hidden, do nothing.
      if (this.hasAttribute('disabled') ||
        this.hasAttribute('hidden')) {
        return
      }

      // Toggle face-up attribute and flip card in css.
      if (!this.hasAttribute('face-up')) {
        this.setAttribute('face-up', '')
        this.dispatchEvent(new CardFlippedEvent(this))
      }
    }
  }
)
