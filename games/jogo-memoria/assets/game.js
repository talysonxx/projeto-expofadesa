let game = {
  lockMode: false,
  firstCard: null,
  secondCard: null,
  setCard: function(id) {
    let card = this.cards.filter(card => card.id == id)[0] 

    if (card.flipped || this.lockMode) return false
    if (!this.firstCard) {
      this.firstCard = card
      this.firstCard.flipped = true

      return true
    } else {
      this.secondCard = card
      this.secondCard.flipped = true
      this.lockMode = true

      return true
    }
  },
  checkMath: function() {
    // if (!this.firstCard || !this.secondCard) return false

    let check = this.firstCard.icon === this.secondCard.icon
    return check
  },
  clearCards: function() {
    this.firstCard = null
    this.secondCard = null
    this.lockMode = false
  },
  unflipCards() {
    this.firstCard.flipped = false
    this.secondCard.flipped = false
    this.clearCards()
  },
  checkGameOver() {
    let gameOver = this.cards.filter(card => !card.flipped).length == 0

    return gameOver
  },
  techs: [
    'css',
    'git',
    'github',
    'html',
    'js',
    'node',
    'npm',
    'reactjs',
    'ubuntu',
    'vscode'
    ],
  cards: null,
  createCardsFromTechs: function() {
    this.cards = []
  
    this.techs.map(tech => {
        this.cards.push(this.createPairFromTech(tech))
      })
  
      // if each pair of cards is an array, fletmap breaks it apart
      this.cards = this.cards.flatMap(pair => pair)
      this.shuffleCards()
  },
  createPairFromTech: function(tech) {
    return [{
      id: this.createIdWithTech(tech),
      icon: tech,
      flipped: false
    }, {
      id: this.createIdWithTech(tech),
      icon: tech,
      flipped: false
    }]
  },
  createIdWithTech: function(tech) {
    return tech + parseInt(Math.random() * 1000)
  },
  shuffleCards: function() {
    let currentIndex = this.cards.length
    let randomIndex = 0
  
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--
  
      [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
    }
  }
}
