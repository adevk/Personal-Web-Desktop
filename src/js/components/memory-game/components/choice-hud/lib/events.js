/**
 * Event that gets dispatched when a 4x4 board is chosen.
 *
 * @class Board16ChosenEvent
 * @augments {CustomEvent}
 */
class Board16ChosenEvent extends CustomEvent {
  /**
   * Constructs the event.
   */
  constructor () {
    super('board16Chosen', {
      bubbles: true
    })
  }
}

/**
 * Event that gets dispatched when a 2x4 board is chosen.
 *
 * @class Board8ChosenEvent
 * @augments {CustomEvent}
 */
class Board8ChosenEvent extends CustomEvent {
  /**
   * Constructs the event.
   */
  constructor () {
    super('board8Chosen', {
      bubbles: true
    })
  }
}

/**
 * Event that gets dispatched when a 2x2 board is chosen.
 *
 * @class Board4ChosenEvent
 * @augments {CustomEvent}
 */
class Board4ChosenEvent extends CustomEvent {
  /**
   * Constructs the event.
   */
  constructor () {
    super('board4Chosen', {
      bubbles: true
    })
  }
}

export { Board16ChosenEvent, Board8ChosenEvent, Board4ChosenEvent }
