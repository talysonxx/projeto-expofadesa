import {
  auth,
  db,
  login,
  signOut,
  setDoc,
  doc,
  getDoc,
  userUid,
  LerDados,
  Send,
  onAuthStateChanged,
  verifyUser
} from "../../../scripts/firebase.js";

let idJogo = "jogo1"; // defina de antemão o id do jogo aqui
 // define a data caso o usuário não possua dads=os ou caso o usuário não esteja logado	(sem conta)
let data;
data = {
  usuario: "usuario sem nome",
  bestScore: localStorage.getItem("jogo1-bestScore") || 0, // caso tenha dados no localstorage, pega, caso não, pega 0
};



async function lerDB() { // pega os dados do bd
  try {
    data = await LerDados(idJogo); // id do jogo da cobrinha: jogo1
    return data; 
  } catch (error) {
    console.log(error);
  }
}

async function main() {
 var logged = await verifyUser(); // verifica se o usuário esta logado
  if (logged) {
    await lerDB(); // soobrescreve a data caso o usuário tenha dados
  }

  let canvas = document.querySelector("canvas#snake");
  let context = canvas.getContext("2d");
  let box = 32;
  let snake = [];
  snake.push({ x: 8 * box, y: 8 * box });
  let direction = "right";

  let comida = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box,
  };

  let currentScore = 0;
  let bestScore = data.bestScore;

  const playerName = logged ? logged : data.usuario; // condição ? se verdadeiro : se falso
  
  function criarBackground() {
    context.fillStyle = "#3C038C";
    context.fillRect(0, 0, 16 * box, 16 * box);
  }

  function criarCobra() {
    for (let i = 0; i < snake.length; i++) {
      context.fillStyle = "#160340";
      context.fillRect(snake[i].x, snake[i].y, box, box);
    }
  }

  function desenharComida() {
    context.fillStyle = "#BFA59B";
    context.fillRect(comida.x, comida.y, box, box);
  }

  function updateScoreboard() {
    document.getElementById("name").textContent = playerName;
    document.getElementById(
      "currentScore"
    ).textContent = `Pontuação Atual: ${currentScore}`;
    document.getElementById(
      "bestScore"
    ).textContent = `Melhor Pontuação: ${bestScore ? bestScore : 0}`;
  }

  function update(event) {
    if (event.keyCode == 37 || (event.key == "a" && direction != "right"))
      direction = "left";
    if (event.keyCode == 38 || (event.key == "w" && direction != "down"))
      direction = "up";
    if (event.keyCode == 39 || (event.key == "d" && direction != "left"))
      direction = "right";
    if (event.keyCode == 40 || (event.key == "s" && direction != "up"))
      direction = "down";
  }

  async function finalizarJogo() {
    clearInterval(jogo);
    if (currentScore > bestScore || bestScore == undefined || bestScore == null) {
      bestScore = currentScore;
      if (logged) {
        await Send(idJogo, bestScore); // se logado, salva no bd
      } else {
        localStorage.setItem('jogo1-bestScore', bestScore); // se não logado, salva no localstorage
      }
    }
    alert("GAME OVER, pontuação final: " + currentScore);
    location.reload();
  }

  function iniciarJogo() {
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    for (let i = 1; i < snake.length; i++) {
      if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
        finalizarJogo();
        return; // Evita a execução do código abaixo após o jogo terminar
      }
    }

    criarBackground();
    criarCobra();
    desenharComida();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if (snakeX != comida.x || snakeY != comida.y) {
      snake.pop();
    } else {
      comida.x = Math.floor(Math.random() * 15 + 1) * box;
      comida.y = Math.floor(Math.random() * 15 + 1) * box;
      currentScore++;
    }

    let novaCabeca = { x: snakeX, y: snakeY };
    snake.unshift(novaCabeca);

    updateScoreboard();
  }

  document.addEventListener("keydown", update);

  let jogo = setInterval(iniciarJogo, 100);
}
main();
