const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Variáveis do jogo
const carWidth = 30;
const carHeight = 60;
let carX = canvas.width / 2 - carWidth / 2;
const carY = canvas.height - carHeight - 10;
let carSpeed = 5;

let obstacles = [];
let obstacleSpeed = 2;
let score = 0;
let gameOver = false;

// Controle do carro
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' && carX > 0) {
    carX -= carSpeed;
  }
  if (e.key === 'ArrowRight' && carX < canvas.width - carWidth) {
    carX += carSpeed;
  }
});

// Função para criar obstáculos
function createObstacle() {
  const obstacleWidth = Math.random() * 40 + 20;
  const obstacleX = Math.random() * (canvas.width - obstacleWidth);
  obstacles.push({ x: obstacleX, y: -50, width: obstacleWidth, height: 20 });
}

// Função para desenhar o carro
function drawCar() {
  ctx.fillStyle = 'blue';
  ctx.fillRect(carX, carY, carWidth, carHeight);
}

// Função para desenhar obstáculos
function drawObstacles() {
  ctx.fillStyle = 'red';
  obstacles.forEach(obstacle => {
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  });
}

// Função para atualizar a posição dos obstáculos
function updateObstacles() {
  obstacles.forEach(obstacle => {
    obstacle.y += obstacleSpeed;
  });

  // Remover obstáculos que saem da tela e aumentar a pontuação
  obstacles = obstacles.filter(obstacle => obstacle.y < canvas.height);

  if (obstacles.length === 0 || obstacles[obstacles.length - 1].y > 100) {
    createObstacle();
  }
}

// Função para detectar colisões
function checkCollision() {
  for (let obstacle of obstacles) {
    if (
      carX < obstacle.x + obstacle.width &&
      carX + carWidth > obstacle.x &&
      carY < obstacle.y + obstacle.height &&
      carY + carHeight > obstacle.y
    ) {
      gameOver = true;
    }
  }
}

// Função para atualizar o jogo
function updateGame() {
  if (!gameOver) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawCar();
    drawObstacles();
    updateObstacles();
    checkCollision();

    score++;
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Pontuação: ${score}`, 10, 30);

    requestAnimationFrame(updateGame);
  } else {
    ctx.fillStyle = 'black';
    ctx.font = '30px Arial';
    ctx.fillText('Game Over', canvas.width / 2 - 70, canvas.height / 2);
  }
}

// Iniciar o jogo
updateGame();
