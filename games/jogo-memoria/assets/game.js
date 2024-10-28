import {
  auth,
  LerDados,
  verifyUser
} from "../../../scripts/firebase.js";

const profilePIC = document.getElementById("profilePIC");

var logged = await verifyUser();
if (logged) {
  profilePIC.src = auth.currentUser.photoURL;
}

let game = {
  lockMode: false,
  firstCard: null,
  secondCard: null,
  timerStarted: false, // flag para verificar se o tempo começou
  startTime: null, // variável para armazenar o início do tempo
  setCard: function (id) {
    let card = this.cards.filter(card => card.id == id)[0];

    if (card.flipped || this.lockMode) return false;

    if (!this.firstCard) {
      this.firstCard = card;
      this.firstCard.flipped = true;

      // Inicia o cronômetro quando a primeira carta é virada
      if (!this.timerStarted) {
        this.startTimer();
        this.timerStarted = true;
      }

      return true;
    } else {
      this.secondCard = card;
      this.secondCard.flipped = true;
      this.lockMode = true;

      return true;
    }
  },
  startTimer: function () {
    this.startTime = Date.now(); // armazena o tempo de início
    console.log("O cronômetro começou!");
  },
  stopTimer: function () {
    let elapsedTime = Date.now() - this.startTime; // calcula o tempo decorrido
    console.log(`O tempo decorrido foi: ${elapsedTime / 1000} segundos`);
  },
  checkMath: function () {
    let check = this.firstCard.icon === this.secondCard.icon;
    return check;
  },
  clearCards: function () {
    this.firstCard = null;
    this.secondCard = null;
    this.lockMode = false;
  },
  unflipCards: function () {
    this.firstCard.flipped = false;
    this.secondCard.flipped = false;
    this.clearCards();
  },
  checkGameOver: function () {
    let gameOver = this.cards.filter(card => !card.flipped).length == 0;
    if (gameOver) {
      this.stopTimer(); // Para o cronômetro quando o jogo termina
    }
    return gameOver;
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
  createCardsFromTechs: function () {
    this.cards = [];

    this.techs.map(tech => {
      this.cards.push(this.createPairFromTech(tech));
    });

    this.cards = this.cards.flatMap(pair => pair);
    this.shuffleCards();
  },
  createPairFromTech: function (tech) {
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
  createIdWithTech: function (tech) {
    return tech + parseInt(Math.random() * 1000);
  },
  shuffleCards: function () {
    let currentIndex = this.cards.length;
    let randomIndex = 0;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
    }
  }
};

export { game };
