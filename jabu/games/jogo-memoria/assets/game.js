let game = {
  lockMode: false,
  firstCard: null,
  secondCard: null,
  timeLeft: 60, // Tempo restante
  techs: [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10'
  ],
  cards: null,

  setCard: function(id) {
    let card = this.cards.filter(card => card.id == id)[0];

    if (card.flipped || this.lockMode) return false;
    if (!this.firstCard) {
      this.firstCard = card;
      this.firstCard.flipped = true;

      return true;
    } else {
      this.secondCard = card;
      this.secondCard.flipped = true;
      this.lockMode = true;

      return true;
    }
  },
  
  checkMath: function() {
    if (!this.firstCard || !this.secondCard) return false;

    return this.firstCard.icon === this.secondCard.icon;
  },
  
  clearCards: function() {
    this.firstCard = null;
    this.secondCard = null;
    this.lockMode = false;
  },
  
  unflipCards: function() {
    this.firstCard.flipped = false;
    this.secondCard.flipped = false;
    this.clearCards();
  },
  
  checkGameOver: function() {
    return this.cards.filter(card => !card.flipped).length == 0;
  },
  
  createCardsFromTechs: function() {
    this.cards = [];

    this.techs.map(tech => {
      this.cards.push(this.createPairFromTech(tech));
    });

    // Embaralha as cartas
    this.cards = this.cards.flatMap(pair => pair);
    this.shuffleCards();
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
    }];
  },
  
  createIdWithTech: function(tech) {
    return tech + parseInt(Math.random() * 1000);
  },
  
  shuffleCards: function() {
    let currentIndex = this.cards.length;
    let randomIndex = 0;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
    }
  }
};

// Variável para o timer
let timer; 
const TIME_LIMIT = 60; // Limite de tempo em segundos

function startTimer() {
  game.timeLeft = TIME_LIMIT; // Reinicia o tempo
  document.getElementById('time-left').innerText = game.timeLeft;

  timer = setInterval(() => {
    game.timeLeft--;
    document.getElementById('time-left').innerText = game.timeLeft;

    if (game.timeLeft <= 0) {
      clearInterval(timer);
      let divGameOver = document.getElementById('game-over');
      divGameOver.style.display = 'flex';
    }
  }, 1000);
}

function startGame() {
  game.createCardsFromTechs();
  initializeCards();
  startTimer(); // Inicia o cronômetro ao começar o jogo
}

function restart() {
  game.clearCards();
  clearInterval(timer); // Para o cronômetro
  let divGameOver = document.getElementById('game-over');
  divGameOver.style.display = 'none';
  startGame(); // Reinicia o jogo e o cronômetro
}
