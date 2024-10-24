// classes
import { game} from "./game.js";
import {
  LerDados,
  Send,
  verifyUser
} from "../../../scripts/firebase.js";


var logged = await verifyUser();
let data;
data = {
  usuario: "usuario sem nome",
  bestScore: localStorage.getItem("bestscore2") || 0,
};

const bestscoreP = document.getElementById("bestScore");
async function lerDB() {
  try {
    data = await LerDados("jogo2");
    console.log(data);
    var bestScoreInSec = Math.floor(data.bestScore / 1000);
    var bestScoreInMilisec = data.bestScore % 1000;
    bestscoreP.innerText = `Melhor tempo:  ${bestScoreInSec}.${bestScoreInMilisec.toString().padStart(3, "0")}`
    return data;
  } catch (error) {
    console.log(error);
  }
}


class Timer {
  constructor() {
    this.milliseconds = 0;
    this.isRunning = false;
    this.appendTime = document.getElementById("tens");
    this.interval = null;
  }

  startTimer() {
    if (this.isRunning) {
      console.warn("Timer is already running.");
      return;
    }

    this.isRunning = true;
    this.interval = setInterval(() => {
      this.milliseconds += 10;
      this.updateDisplay();
    }, 10);

    console.log("Timer started.");
  }

  stopTimer() {
    if (!this.isRunning) {
      console.warn("Timer is not running.");
      return;
    }

    clearInterval(this.interval);
    this.interval = null;
    this.isRunning = false;

    console.log("Timer stopped. Total milliseconds:", this.milliseconds);
  }

  resetTimer() {
    this.stopTimer();
    this.milliseconds = 0;
    this.updateDisplay();
    console.log("Timer reset.");
  }

  updateDisplay() {
    const seconds = Math.floor(this.milliseconds / 1000);
    const tens = Math.floor((this.milliseconds % 1000) / 10);
    this.appendTime.innerHTML = `${seconds < 10 ? "0" + seconds : seconds}:${tens < 10 ? "0" + tens : tens}`;
  }
}

const timer = new Timer();

let finalScore;
const FRONT = 'card-front';
const BACK = 'card-back';
const CARD = 'card';
const ICON = 'icon';

startGame();

async function startGame() {
  game.createCardsFromTechs();
  initializeCards();
  timer.resetTimer();
  timer.startTimer();
  await lerDB();
}

function initializeCards() {
  let gameBoard = document.querySelector('#game-board');
  gameBoard.innerHTML = '';
  game.cards.map(card => {
    let cardElement = document.createElement('div');
    cardElement.id = card.id;
    cardElement.classList.add(CARD);
    cardElement.dataset.icon = card.icon;

    createCardContent(card, cardElement);
    cardElement.addEventListener('click', flipCard);
    gameBoard.appendChild(cardElement);
  });
}

function createCardContent(card, cardElement) {
  createCardFace(FRONT, card, cardElement);
  createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card, element) {
  let cardElementFace = document.createElement('div');
  cardElementFace.classList.add(face);
  if (face === FRONT) {
    let iconElement = document.createElement('img');
    iconElement.classList.add(ICON);
    iconElement.src = './assets/images/' + card.icon + '.png';
    cardElementFace.appendChild(iconElement);
  } else {
    cardElementFace.innerHTML = '<img style="width: 150px;" src="assets/images/logo jabu.png">';
  }

  element.appendChild(cardElementFace);
}

function flipCard() {
  if (game.setCard(this.id)) {
    this.classList.add('flip');
    if (game.secondCard) {
      if (game.checkMath()) {
        game.clearCards();
        if (game.checkGameOver()) {
          timer.stopTimer(); 
          finalScore = timer.milliseconds;
          let divGameOver = document.getElementById('game-over');
          divGameOver.style.display = 'flex';
          console.log("Game Over! Final score:", finalScore);
          if (finalScore < data.bestScore || data.bestScore == undefined || data.bestScore == null) {
            data.bestScore = finalScore;
            if (logged) {
              Send("jogo2", finalScore);
            } else {
              localStorage.setItem("bestscore2", finalScore);
            }
          }
        }
      } else {
        setTimeout(() => {
          let firstCardView = document.getElementById(game.firstCard.id);
          let secondCardView = document.getElementById(game.secondCard.id);

          firstCardView.classList.remove('flip');
          secondCardView.classList.remove('flip');
          game.unflipCards();
        }, 1000);
      }
    }
  }
}

function restart() {
  console.log("Restarting game...");
  timer.resetTimer();
  game.clearCards();
  let divGameOver = document.getElementById('game-over');
  divGameOver.style.display = 'none';
  startGame(); 
}

document.getElementById('restart').addEventListener('click', restart);
