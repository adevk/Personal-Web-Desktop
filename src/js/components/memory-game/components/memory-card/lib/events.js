/**
 * Event that gets dispatched when a card is flipped.
 *
 * @class CardFlippedEvent
 * @augments {CustomEvent}
 */
class CardFlippedEvent extends CustomEvent {
  /**
   * Constructs the event.
   *
   * @param {HTMLElement} memoryCard - The card that was flipped.
   */
  constructor (memoryCard) {
    super('cardFlipped', {
      bubbles: true,
      detail: { memoryCard }
    })
  }
}

export { CardFlippedEvent }
