# &lt;app-window&gt;
An app window for containing an app (web component).

## Example
### Javascript
```javascript
    const memoryGame = document.createElement('memory-game')
    const appWindow = document.createElement('app-window')
    appWindow.shadowRoot.querySelector('.root').appendChild(memoryGame)
    document.querySelector('main').appendChild(appWindow)
```
