const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

const paddleWidth = 10, paddleHeight = 100;
const player = { x: 10, y: canvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight, color: "white", dy: 5 };
const ai = { x: canvas.width - paddleWidth - 10, y: canvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight, color: "white", dy: 4 };
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 8,
  speed: 5,
  velocityX: 5,
  velocityY: 5,
  color: "white"
};

function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.fill();
}

function drawNet() {
  for (let i = 0; i < canvas.height; i += 15) {
    drawRect(canvas.width / 2 - 1, i, 2, 10, "white");
  }
}

function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.velocityX = -ball.velocityX;
  ball.speed = 5;
}

function collision(b, p) {
  return b.x < p.x + p.width && b.x + b.radius > p.x && b.y < p.y + p.height && b.y + b.radius > p.y;
}

function update() {
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;
}
  // AI paddle movement
  ai.y += ((ball.y - (ai.y + ai.height / 2))) * 0.09;

 if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.velocityY = -ball.velocityY;
  }
   if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    resetBall();
    
  }

 
  let playerOrAI = (ball.x < canvas.width / 2) ? player : ai;

  if (collision(ball, playerOrAI)) {
    let collidePoint = (ball.y - (playerOrAI.y + playerOrAI.height / 2));
    collidePoint = collidePoint / (playerOrAI.height / 2);

    let angleRad = collidePoint * (Math.PI / 4);
    let direction = (ball.x < canvas.width / 2) ? 1 : -1;
    ball.velocityX = direction * ball.speed * Math.cos(angleRad);
    ball.velocityY = ball.speed * Math.sin(angleRad);
    ball.speed += 0.2;
  }
  
  if(document.querySelector("#pong").style.display == "block"){
  // Player lost
  if (ball.x - ball.radius < 0) {
    resetBall();
  }
  // Player won
  if(ball.x + ball.radius > canvas.width){
    resetBall();
  }
}

function render() {
  drawRect(0, 0, canvas.width, canvas.height, "black");
  drawNet();
  drawRect(player.x, player.y, player.width, player.height, player.color);
  drawRect(ai.x, ai.y, ai.width, ai.height, ai.color);
  drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

function game() {
  update();
  render();
}

setInterval(game, 1000 / 60);

// Player controls
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") player.y -= player.dy;
  else if (e.key === "ArrowDown") player.y += player.dy;

  // Keep paddle in bounds
  if (player.y < 0) player.y = 0;
  if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
}); 