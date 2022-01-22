/**
 * Event that gets dispatched when an app receives focus.
 *
 * @class MemoryGameClicked
 * @augments {CustomEvent}
 */
class ReceivedFocusEvent extends CustomEvent {
  /**
   * Constructs the event.
   */
  constructor(app) {
    super('receivedFocus', {
      bubbles: true,
      detail: app
    })
  }
}


export { ReceivedFocusEvent }
