# &lt;play-again-hud&gt;
A HUD showing up at game end allowing you to choose to replay game (web component).

## Attributes

### `attempts`
A number attribute. Sets the number of attempts that will be shown in the HUD.

## Events
| Event Name | Fired When |
|------------|------------|
| `playAgain`| Play again is clicked.


## Example
### Javascript
```javascript
    const playAgainHud = document.createElement('play-again-hud')
    this.shadowRoot.appendChild(playAgainHud)
```
