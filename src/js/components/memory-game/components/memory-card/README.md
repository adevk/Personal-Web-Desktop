# &lt;memory-card&gt;
A flippable memory-card web component.

## Attributes

### `disabled`
A boolean attribute. By setting the attribute, the card gets disabled.

### `hidden`
A boolean attribute. By setting the attribute, the card content gets hidden.

### `face-up`
A boolean attribute. When the attribute is set, the front of the card is visible; otherwise, the backside is visible per default.


## Events
| Event Name | Fired When |
|------------|------------|
| `cardFlipped`| The card is clicked and gets flipped.


## Slots
The card has a default slot for the front image **&lt;img&gt;**.


## Example
### HTML
```html
   <memory-card face-up>
      <img src="images/octopus.png" alt="An octopus">
   </memory-card>
```
### Javascript
```js
    const img = document.createElement('img')
    img.setAttribute('src', 'image.png')

    const memoryCard = document.createElement('memory-card')
    memoryCard.appendChild(img)
```