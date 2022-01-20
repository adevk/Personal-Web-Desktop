/**
 * Event that gets dispatched when a Play Again is pressed.
 *
 * @class PlayAgainEvent
 * @augments {CustomEvent}
 */
class PlayAgainEvent extends CustomEvent {
  /**
   * Constructs the event.
   */
  constructor () {
    super('playAgain', {
      bubbles: true
    })
  }
}

export { PlayAgainEvent }
