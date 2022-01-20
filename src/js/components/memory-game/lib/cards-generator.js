
/**
 * Class responsible for generating cards for the board of the memory game.
 *
 * @class CardsGenerator
 */
class CardsGenerator {
  #imageFileNames

  /**
   * Creates an instance of CardsGenerator.
   */
  constructor () {
    this.#imageFileNames = this.#generateImageFileNames()
    this.#imageFileNames = this.#shuffle(this.#imageFileNames)
  }

  /**
   * Generates a fragment containing grid items of cards to be used in an element functioning as a grid (css).
   *
   * @param {string} imagesPath - Path to the images for the cards.
   * @param {number} boardSize - The total number of cards for the board (rows * columns).
   *
   * @returns {DocumentFragment} Fragment containing grid items of cards to be used in an element functioning as a grid (css).
   */
  generateCardGridItemsFragment (imagesPath, boardSize) {
    const imageVariants = boardSize / 2
    const gridItemsFragment = document.createDocumentFragment()

    let images = []
    for (let i = 0; i < imageVariants; i++) {
      const fileName = this.#imageFileNames[i]
      const img = this.#createImageElement(imagesPath, fileName)
      const imgCopy = img.cloneNode(true)
      images.push(img)
      images.push(imgCopy)
    }

    images = this.#shuffle(images)

    images.forEach((img) => {
      const card = this.#createMemoryCard(img)
      const gridItem = this.#createGridItem(card)
      gridItemsFragment.appendChild(gridItem)
    })

    return gridItemsFragment
  }

  /**
   * Generates a list of all the card filenames.
   *
   * @returns {string[]} List of all the card filenames.
   */
  #generateImageFileNames () {
    const fileNames = []
    const numberOfImages = 8
    for (let i = 1; i <= numberOfImages; i++) {
      fileNames.push(`${i}.png`)
    }
    return fileNames
  }

  /**
   * Creates an image element using the passed in image filename.
   *
   * @param {string} imagesPath - Path to the image.
   * @param {string} filename - The filename of the image.
   *
   * @returns {HTMLImageElement} The image element created from the image file.
   */
  #createImageElement (imagesPath, filename) {
    const img = document.createElement('img')
    img.setAttribute('src', imagesPath + '/' + filename)
    return img
  }

  /**
   * Creates a memory-card component.
   *
   * @param {HTMLImageElement} img - The image element to be used for the front of the card.
   * @returns {HTMLElement} The created memory-card component.
   */
  #createMemoryCard (img) {
    const memoryCard = document.createElement('memory-card')
    memoryCard.appendChild(img)
    return memoryCard
  }

  /**
   * Creates a grid item for the board, containing a memory-card component.
   *
   * @param {HTMLElement} memoryCard - The memory-card component to be inserted in the grid item.
   *
   * @returns {HTMLElement} The created grid item.
   */
  #createGridItem (memoryCard) {
    const gridItem = document.createElement('div')
    gridItem.className = 'grid-item'
    gridItem.appendChild(memoryCard)
    return gridItem
  }

  /**
   * Shuffles the array.
   *
   * @param {Array} arr - The array to be shuffled.
   * @returns {Array} The shuffled array.
   */
  #shuffle (arr) {
    return arr.sort(() => Math.random() - 0.5)
  }
}

export default CardsGenerator
