/**
 * The memory-game web component module.
 *
 * @author Akram Kadri <ak224hz@student.lnu.se>
 * @version 1.0.0
 */

import './components/memory-card'
import './components/choice-hud'
import './components/play-again-hud'
import { CardFlippedEvent } from './components/memory-card/lib/events'
import CardsGenerator from './lib/cards-generator'

const BACK_IMG_URL = new URL('images/beach_640.jpg', import.meta.url).href

/**
 * Define template.
 */
const template = document.createElement('template')
template.innerHTML = `
   <style>
     :host {
        background-image: url('${BACK_IMG_URL}');
        background-size: contain;
        background-repeat: repeat-x;

        display: block;
        position: relative; /* Make positioning context for children */
        
        width: 400px;
        height: 400px;
     }
     
     .grid-container {
        display: grid;

        grid-template-rows: repeat(2, 1fr);
        grid-template-columns: repeat(2, 1fr);

        width: 100%;
        height: 100%;
     }

     .grid-item {
        display: flex;

        align-items: center;
        justify-content: center;
     }
   </style>

<div class="grid-container"></div>
 `

/**
 * Define custom element.
 */
customElements.define('memory-game',
  /**
   * The main class of the memory-game component.
   */
  class MemoryGame extends HTMLElement {
    #imagesPath = new URL('images', import.meta.url).href // Path of the card images.

    #generator // Responsible for generating cards for the board.

    #choiceHud // HUD for choosing board size at game start.
    #playAgainHud // HUD showing up at end of game.

    #board // The "board" that contains all the cards.
    #boardCards // Array containing all the cards in the board
    #defaultBoardSize = 0 // Default number of cards in the board.

    #cardsFacedUp // Number of cards currently shown.
    #attemptsAtMatching // Number of attempts att flipping two matching cards.
    #totalCardsMatched // Number of cards that has been matched and disabled.

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
      this.#generator = new CardsGenerator()
      this.#board = this.shadowRoot.querySelector('.grid-container')

      this.#startNewGameRound()
    }

    /**
     * Gets called when the board size is chosen.
     *
     * @param {CustomEvent} event - Event for when a card gets flipped.
     */
    #onBoardSizeChosen (event) {
      const boardSize = Number(this.#extractBoardSizeFromEventType(event.type))
      this.#generateBoardContent(boardSize)
      this.#boardCards = [...this.#board.children].map((child) => child.firstElementChild)
      this.#hideChoiceHud()
    }

    /**
     * Generates the cards for the board.
     *
     * @param {number} boardSize - The size of the board in total number of cards (rows * columns).
     */
    #generateBoardContent (boardSize) {
      if (boardSize !== 4 && boardSize !== 8 && boardSize !== 16) {
        boardSize = this.#defaultBoardSize
      }
      if (boardSize === 16) {
        this.#setBoardDimensions(4, 4)
      }
      if (boardSize === 8) {
        this.#setBoardDimensions(2, 4)
      }
      if (boardSize === 4) {
        this.#setBoardDimensions(2, 2)
      }
      const fragment = this.#generator.generateCardGridItemsFragment(this.#imagesPath, boardSize)
      this.#board.appendChild(fragment)
    }

    /**
     * Sets the rows and columns of the game board.
     *
     * @param {number} rows - The number of card rows for the board.
     * @param {number} columns - The number of card columns for the board.
     */
    #setBoardDimensions (rows, columns) {
      this.#board.style.gridTemplateRows = `repeat(${rows}, 1fr)`
      this.#board.style.gridTemplateColumns = `repeat(${columns}, 1fr)`
    }

    /**
     * Gets called when a card is flipped.
     *
     * @param {CardFlippedEvent} event - Event for when a card gets flipped.
     */
    #onCardFlipped (event) {
      event.stopPropagation()
      const flippedCard = event.detail.memoryCard
      if (flippedCard.hasAttribute('face-up')) {
        this.#cardsFacedUp.push(flippedCard)
      }

      if (this.#cardsFacedUp.length === 2) {
        this.#attemptsAtMatching++
        // Make the board unclickable.
        this.#disableBoard()

        setTimeout(() => {
          if (this.#isFacedUpCardsMatching()) {
            this.#totalCardsMatched += 2
            this.#hideMatchedCards()
          }
          this.#flipAllCardsDown()
          if (this.#hasAllCardsBeenMatched()) {
            this.#endGameRound()
          }
        }, 1000)
      }
    }

    /**
     * Disables all the cards in the board (makes them unclickable).
     */
    #disableBoard () {
      this.#boardCards.forEach((card) => {
        card.setAttribute('disabled', '')
      })
    }

    /**
     * Checks if faced up cards are matching.
     *
     * @returns {boolean} True if cards match; otherwise, false.
     */
    #isFacedUpCardsMatching () {
      return this.#cardsFacedUp[0].isEqualNode(this.#cardsFacedUp[1])
    }

    /**
     * Hides the cards that were matching.
     */
    #hideMatchedCards () {
      this.#cardsFacedUp[0].setAttribute('hidden', '')
      this.#cardsFacedUp[1].setAttribute('hidden', '')
    }

    /**
     * Reverts cards to their default state (face down and clickable).
     */
    #flipAllCardsDown () {
      this.#boardCards.forEach((card) => {
        card.removeAttribute('disabled')
        card.removeAttribute('face-up')
        this.#cardsFacedUp = []
      })
    }

    /**
     * Checks if all cards in the board has been matched.
     *
     * @returns {boolean} True if all cards have been matched; otherwise, false.
     */
    #hasAllCardsBeenMatched () {
      return this.#totalCardsMatched === this.#boardCards.length
    }

    /**
     * Ends game round.
     */
    #endGameRound () {
      this.#showPlayAgainHud()
    }

    /**
     * Shows a HUD for end of game.
     */
    #showPlayAgainHud () {
      this.#playAgainHud = document.createElement('play-again-hud')
      this.#playAgainHud.setAttribute('attempts', this.#attemptsAtMatching)
      this.shadowRoot.appendChild(this.#playAgainHud)
    }

    /**
     * Gets called when play again is chosen.
     */
    #onPlayAgain () {
      this.#startNewGameRound()
    }

    /**
     * Starts a new game round.
     */
    #startNewGameRound () {
      if (this.#playAgainHud) { this.#hidePlayAgainHud() }

      if (this.#board.hasChildNodes()) { this.#emptyBoard() }

      if (this.#choiceHud) { this.#hideChoiceHud() }

      this.#resetGameState()
      this.#showChoiceHud()
    }

    /**
     * Hides HUD for end of game.
     */
    #hidePlayAgainHud () {
      this.#playAgainHud.remove()
    }

    /**
     * Empties the board.
     */
    #emptyBoard () {
      while (this.#board.firstChild) {
        this.#board.removeChild(this.#board.firstChild)
      }
    }

    /**
     * Resets the component's state.
     */
    #resetGameState () {
      this.#cardsFacedUp = []
      this.#attemptsAtMatching = 0
      this.#totalCardsMatched = 0
    }

    /**
     * Hides HUD choosing board size.
     */
    #hideChoiceHud () {
      this.#choiceHud.remove()
    }

    /**
     * Shows a HUD for choosing board size.
     */
    #showChoiceHud () {
      this.#choiceHud = document.createElement('choice-hud')
      this.shadowRoot.appendChild(this.#choiceHud)
    }

    /**
     * Extracts the board size from an event type (string).
     *
     * @param {string} eventType - The event type to extract the board size from.
     *
     * @returns {number} The extracted board size.
     */
    #extractBoardSizeFromEventType (eventType) {
      const boardSize = eventType.match(/\d+/)[0]
      return boardSize
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      this.shadowRoot.addEventListener('cardFlipped', (event) => this.#onCardFlipped(event))
      this.shadowRoot.addEventListener('playAgain', (event) => this.#onPlayAgain(event))

      this.shadowRoot.addEventListener('board16Chosen', (event) => this.#onBoardSizeChosen(event))
      this.shadowRoot.addEventListener('board8Chosen', (event) => this.#onBoardSizeChosen(event))
      this.shadowRoot.addEventListener('board4Chosen', (event) => this.#onBoardSizeChosen(event))
    }
  }
)
