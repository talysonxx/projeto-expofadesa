import game from "./game.js";

import {
  LerDados,
  Send,
  verifyUser,
  auth
} from "../../../scripts/firebase.js";

let idJogo = "jogo2"; // defina de antemão o id do jogo aqui
 // define a data caso o usuário não possua dads=os ou caso o usuário não esteja logado	(sem conta)
let data;
let wingame = false
let logged = false;
data = {
  usuario: "usuario sem nome",
  bestScore: localStorage.getItem(`${idJogo}-bestScore`) || 0, // caso tenha dados no localstorage, pega, caso não, pega 0
};

async function lerDB() { // pega os dados do bd
  try {
    data = await LerDados(idJogo); // id do jogo da cobrinha: jogo1
    return data; 
  } catch (error) {
    console.log(error);
  }
}


const FRONT = 'card-front'
const BACK = 'card-back'
const CARD = 'card'
const ICON = 'icon'

startGame()

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
    this.updateDisplay();
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

var timer = new Timer();
const profile = document.getElementById("profile");
const bestScoreElm = document.getElementById("bestScore");
async function startGame() {
  logged = await verifyUser(); // verifica se o usuário esta logado
  if (logged) {
    await lerDB(); // soobrescreve a data caso o usuário tenha dados
    profile.src = auth.currentUser.photoURL
  }
  bestScoreElm.innerHTML = `Melhor tempo: ${data.bestScore/1000} segundos`
  game.createCardsFromTechs()
  initializeCards()
  document.getElementById('game-board').addEventListener('click', () => {timer.startTimer()})
  
}
document.getElementById('restart').addEventListener('click', () => {restart()})


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
    cardElementFace.innerHTML = '<img style="width: 150px;" src="assets/images/logo jabu.png">'
  }

  element.appendChild(cardElementFace)
}
function flipCard() {
  if (game.setCard(this.id)) {
    this.classList.add('flip')
    if (game.secondCard) {
      if (game.checkMath()) {
        game.clearCards()
        if (game.checkGameOver() || wingame) {
          
          endGame();
          
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

function endGame() {
  let divGameOver = document.getElementById('game-over');
  divGameOver.style.display = 'flex';
  document.getElementById('game-board').addEventListener('click', () => { timer.stopTimer(); });
  if (timer.milliseconds < data.bestScore || data.bestScore == undefined || data.bestScore == null || data.bestScore == "0") {
    data.bestScore = timer.milliseconds;
    if (logged) {
      try {
        Send("jogo2", timer.milliseconds);
      } catch (error) {
        console.log(error);
      }
    } else {
      localStorage.setItem(`${idJogo}-bestScore`, timer.milliseconds);
    }
  }
  document.getElementById('bestScore').innerHTML = `Melhor tempo: ${data.bestScore / 1000} segundos`;
}

function restart() {
  game.clearCards()
  let divGameOver = document.getElementById('game-over')
  divGameOver.style.display = 'none'
  timer.stopTimer()
  timer.resetTimer()
  startGame()
} 


function winGame() {
  endGame();
}


window.addEventListener('keydown', (e) => {
  if (e.key === 'w' && e.altKey) {
    winGame()
  }
})
