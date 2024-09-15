let canvas = document.querySelector('canvas#snake');
let context = canvas.getContext('2d');
let box = 32;
let snake = [];
snake.push({ x: 8 * box, y: 8 * box });
let direction = 'right';

let comida = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
};

let currentScore = 0;
let bestScore = localStorage.getItem('bestScore') || 0;
const playerName = 'Nome do Jogador'; // Você pode modificar este valor conforme necessário

function criarBackground() {
    context.fillStyle = 'lightgreen';
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobra() {
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = 'green';
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function desenharComida() {
    context.fillStyle = 'red';
    context.fillRect(comida.x, comida.y, box, box);
}

function updateScoreboard() {
    document.getElementById('name').textContent = playerName;
    document.getElementById('currentScore').textContent = `Pontuação Atual: ${currentScore}`;
    document.getElementById('bestScore').textContent = `Melhor Pontuação: ${bestScore}`;
}

function update(event) {
    if (event.keyCode == 37 && direction != 'right') direction = 'left';
    if (event.keyCode == 38 && direction != 'down') direction = 'up';
    if (event.keyCode == 39 && direction != 'left') direction = 'right';
    if (event.keyCode == 40 && direction != 'up') direction = 'down';
}

function finalizarJogo() {
    clearInterval(jogo);
    if (currentScore > bestScore) {
        bestScore = currentScore;
        localStorage.setItem('bestScore', bestScore);
    }
    updateScoreboard();
    alert('GAME OVER, a página será recarregada automaticamente');
    location.reload();
}

function iniciarJogo() {
    if (snake[0].x > 15 * box && direction == 'right') snake[0].x = 0;
    if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == 'down') snake[0].y = 0;
    if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

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

    if (direction == 'right') snakeX += box;
    if (direction == 'left') snakeX -= box;
    if (direction == 'up') snakeY -= box;
    if (direction == 'down') snakeY += box;

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

document.addEventListener('keydown', update);

let jogo = setInterval(iniciarJogo, 100);
