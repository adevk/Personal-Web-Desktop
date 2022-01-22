/**
 * Event that gets dispatched when the icon for the memory game is clicked.
 *
 * @class MemoryGameClicked
 * @augments {CustomEvent}
 */
class MemoryGameIconClickedEvent extends CustomEvent {
  /**
   * Constructs the event.
   */
  constructor() {
    super('memoryGameIconClicked', {
      bubbles: true
    })
  }
}

class ChatAppIconClickedEvent extends CustomEvent {
  /**
   * Constructs the event.
   */
  constructor() {
    super('chatAppIconClicked', {
      bubbles: true
    })
  }
}

export { MemoryGameIconClickedEvent, ChatAppIconClickedEvent }
