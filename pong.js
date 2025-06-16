    import { addFun, fun } from "./script.js";
    const canvas = document.getElementById("pong");
    const ctx = canvas.getContext("2d");
    let playerScore = 0;
    let AIScore = 0;
    const paddleWidth = 10, paddleHeight = 100;
    const player = {
      x: 10,
      y: canvas.height / 2 - paddleHeight / 2,
      width: paddleWidth,
      height: paddleHeight,
      color: "white",
      dy: 5
    };

    const ai = {
      x: canvas.width - paddleWidth - 10,
      y: canvas.height / 2 - paddleHeight / 2,
      width: paddleWidth,
      height: paddleHeight,
      color: "white",
      dy: 4
    };

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
      return (
        b.x - b.radius < p.x + p.width &&
        b.x + b.radius > p.x &&
        b.y - b.radius < p.y + p.height &&
        b.y + b.radius > p.y
      );
    }

    function update() {
      // Move the ball
      ball.x += ball.velocityX;
      ball.y += ball.velocityY;

      // Move the AI paddle
      ai.y += (ball.y - (ai.y + ai.height / 2)) * 0.09;

      // Ball collision with top/bottom
      if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.velocityY = -ball.velocityY;
      }

      // Paddle collision
      let playerOrAI = ball.x < canvas.width / 2 ? player : ai;

      if (collision(ball, playerOrAI)) {
        let collidePoint = ball.y - (playerOrAI.y + playerOrAI.height / 2);
        collidePoint = collidePoint / (playerOrAI.height / 2);
        let angleRad = collidePoint * (Math.PI / 4);

        let direction = ball.x < canvas.width / 2 ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);
        ball.speed += 0.2;
      }

      // Reset if ball goes out of bounds
        if (ball.x - ball.radius < 0 ) {
        AIScore += 1;
        resetBall();
        }else if(ball.x + ball.radius > canvas.width){
        playerScore += 1;
        resetBall();
        }
        if(playerScore >= 3 || AIScore == 3){
        playerScore = 0;
        AIScore = 0;
        let gameCheck  = () =>{
          if (canvas.style.display == "none"){
            return false;
          }else {
            return true;
          }
        }
        var gameIsRunning = gameCheck()
        if(gameIsRunning == true){
            addFun();
        }
        canvas.style.display = "none" 
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

      // Clamp to canvas
      if (player.y < 0) player.y = 0;
      if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
      }
    });