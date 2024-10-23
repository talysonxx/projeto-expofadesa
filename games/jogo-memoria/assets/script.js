// classes
const FRONT = 'card-front'
const BACK = 'card-back'
const CARD = 'card'
const ICON = 'icon'

startGame()

function startGame() {
  game.createCardsFromTechs()

  initializeCards()
}
function initializeCards() {
  let gameBoard = document.querySelector('#game-board')
  gameBoard.innerHTML = ''
  game.cards.map(card => {
    let cardElement = document.createElement('div')
    cardElement.id = card.id
    cardElement.classList.add(CARD)
    cardElement.dataset.icon = card.icon

    createCardContent(card, cardElement)
    cardElement.addEventListener('click', flipCard)
    gameBoard.appendChild(cardElement)
  })
}
function createCardContent(card, cardElement) {
  createCardFace(FRONT, card, cardElement)
  createCardFace(BACK, card, cardElement)
}
function createCardFace(face, card, element) {
  let cardElementFace = document.createElement('div')
  cardElementFace.classList.add(face)
  if (face === FRONT) {
    let iconElement = document.createElement('img')
    iconElement.classList.add(ICON)
    iconElement.src = './assets/images/' + card.icon + '.png'
    cardElementFace.appendChild(iconElement)
  } else {
    cardElementFace.innerHTML = '&lt/&gt'
  }

  element.appendChild(cardElementFace)
}
function flipCard() {
  if (game.setCard(this.id)) {
    this.classList.add('flip')
    if (game.secondCard) {
      if (game.checkMath()) {
        game.clearCards()
        if (game.checkGameOver()) {
          let divGameOver = document.getElementById('game-over')
          divGameOver.style.display = 'flex'
        }
      } else {
        setTimeout(() => {
          let firstCardView = document.getElementById(game.firstCard.id)
          let secondCardView = document.getElementById(game.secondCard.id)
     
          firstCardView.classList.remove('flip')
          secondCardView.classList.remove('flip')

          game.unflipCards()
        }, 1000)
      }
    }
  }
}
function restart() {
  game.clearCards()
  let divGameOver = document.getElementById('game-over')
  divGameOver.style.display = 'none'
  startGame()
}
