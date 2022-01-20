/**
 * Event that gets dispatched when the icon for the memory game is clicked.
 *
 * @class MemoryGameClicked
 * @augments {CustomEvent}
 */
class MemoryGameClickedEvent extends CustomEvent {
  /**
   * Constructs the event.
   */
  constructor() {
    super('memoryGameClicked', {
      bubbles: true
    })
  }
}


export { MemoryGameClickedEvent }
