# &lt;choice-hud&gt;
A HUD for choosing board size (web component).

## Events
| Event Name | Fired When |
|------------|------------|
| `board16Chosen`| Board size of 4x4 is chosen.
| `card8Chosen`| Board size of 2x4 is chosen.
| `card4Chosen`| Board size of 2x2 is chosen.


## Example
### Javascript
```javascript
    const choiceHud = document.createElement('choice-hud')
    this.shadowRoot.appendChild(choiceHud)
```
