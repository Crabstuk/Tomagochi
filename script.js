let hunger = localStorage.getItem("hunger") == undefined? 5 : localStorage.getItem("hunger")
 let thirst = parseInt(localStorage.getItem("thirst"))||5
 let fun = parseInt(localStorage.getItem("fun"))||5;console.log(fun);
 var emotion = null
 var pongTime = 0
let tamagotchiName = localStorage.getItem("tamagotchiName")? localStorage.getItem("tamagotchiName"): null  
 const PlayButton = document.querySelector("#play")
const pong = document.querySelector("#pong")
const screenContent = document.getElementById("screenContent");
let lastGotFood = localStorage.getItem("lastGotFood")|| new Date().toISOString()
let lastGotWater = localStorage.getItem("lastGotWater")|| new Date().toISOString()
let lastGotFun = localStorage.getItem("lastGotFun")|| new Date().toISOString()
const feedTamagotchiBtn = document.querySelector("#feedTamagotchiBtn")
const hungerDisplay = document.getElementById("hungerDisplay")
const giveTamagotchiWaterBtn = document.getElementById("giveTamagotchiWaterBtn")
const thirstDisplay = document.getElementById("thirstDisplay")
const tamagotchiDisplay = document.querySelector("#tamagotchiDisplay")
const theWholeThing = document.querySelector("#theWholeThing")
var isScreenOn = false
hungerDisplay.innerText = `${hunger}/10`
thirstDisplay.innerText = `${thirst}/10`
const funDisplay = document.querySelector("#funDisplay")
const NamingThing = document.querySelector("#NamingThing")
funDisplay.innerText = `${fun}/10`
const ChangeScreenStatus = () => {
  console.log("aaa")
  if(isScreenOn === false){
    isScreenOn = true;
    screenContent.classList.add("animate__flash");
    setTimeout(() => {
      screenContent.style.backgroundColor = "greenyellow";
      screenContent.classList.remove("animate__flash");
    }, 775)
  }else{
    isScreenOn = false
    screenContent.classList.add("animate__fadeOut");
        setTimeout(() => {
      screenContent.style.backgroundColor = "black";
      screenContent.classList.remove("animate__fadeOut");
    }, 350)
  }
}
const hideNaming = () => {
  if (tamagotchiName){
    NamingThing.style.display = "none";
    theWholeThing.style.justifyContent = "space-between"

  } 
}
hideNaming()
const showMinigame = () => {
    if(pong.style.display == "block"){
        pong.style.display = "none"
    }else{
        pong.style.display = "block"
    }
}
 const addFun = () => {
    fun++
    if(fun >= 10){
        fun = 10
        funDisplay.innerText = `${fun}/10`
        return;
    }
    localStorage.setItem("fun",fun)
      localStorage.setItem("lastGotFun", new Date().toISOString())
    funDisplay.innerText = `${fun}/10`
    ChangeDisplay()
}
setInterval(() => {
    if(pong.style.display == "block"  && pongTime < 20){
        pongTime += 1
        console.log(pongTime)
    }else if(pong.style.display != "block"){
        return;
    }else if(pong.style.display == "block" && pongTime >= 21){
        addFun()
        pongTime = 1
    }
    
}, 1000);
PlayButton.addEventListener("click", () => {
    showMinigame()
})
document.getElementById("displayName").innerText = tamagotchiName
const Emotions = {
    happy: "happy",
    hungry: "hungry",
    thirsty: "thirsty",
    dead: "dead",
    angry: "angry",
    inDifferent: "inDifferent"
}


const CheckWhatEmotion =  () =>{
    if(hunger == 0 || thirst == 0){
        return Emotions.dead
}else if(hunger >= 3 && thirst < 3 ){
   return Emotions.thirsty
}else if(hunger < 3 && thirst  >= 3){
   return Emotions.hungry
}else if(hunger >= 7 && thirst >= 7){
    return Emotions.happy    
}else if(hunger >= 3 && thirst >= 3){
   return Emotions.inDifferent
} else if(hunger < 3 && thirst < 3 ){
    return Emotions.angry
}
}


const ChangeDisplay = () => {
    emotion = CheckWhatEmotion()
tamagotchiDisplay.src = `./Obrazy/${emotion}.png`
}


const giveTamagotchiWater = () => {
    if(thirst >= 10){
        thirst = 10
        thirstDisplay.innerText = `${thirst}/10`
        return;
    }
    thirst++
    localStorage.setItem("thirst",thirst)
    localStorage.setItem("lastGotWater", new Date().toISOString())
    thirstDisplay.innerText = `${thirst}/10`
    console.log("im drinking watah")
    ChangeDisplay()
}

const feedTamagotchi = () => {
    if( hunger >= 10){
        hunger = 10
        hungerDisplay.innerText = `${hunger}/10`
        return;
    }
    hunger++
    localStorage.setItem("hunger",hunger)
    localStorage.setItem("lastGotFood", new Date().toISOString())
    hungerDisplay.innerText = `${hunger}/10`
    ChangeDisplay()
}

const saveName = () => {
    if (tamagotchiName == ""){
        document.getElementById("displayName").innerText = "Proszę wpisać jakieś imię!"
        return;
    }else{
      tamagotchiName = document.getElementById("name").value
      hideNaming()
    }
    localStorage.setItem("tamagotchiName",tamagotchiName)
    document.getElementById("displayName").innerText = tamagotchiName
}

const CheckHunger = () => {
    let TodaysDate = new Date().setHours(0,0,0,0)
    let lastGotFed = new Date(lastGotFood).setHours(0,0,0,0)
    let dateDifference = (TodaysDate - lastGotFed) / (1000 * 60 * 60 * 24)
    console.log(dateDifference )
    if (dateDifference > 0){
    hunger = hunger - dateDifference
    }else if(dateDifference > hunger){
        hunger = hunger - dateDifference
    }
    hunger = Math.floor(hunger)
    hunger = hunger < 0? 0:hunger 
    hungerDisplay.innerText = `${hunger}/10`
    ChangeDisplay()
}

const CheckThirst = () => {
    let TodaysDate2 = new Date().setHours(0,0,0,0)
    let lastGotWater2 = new Date(lastGotWater).setHours(0,0,0,0)
    let dateDifference2 = (TodaysDate2 - lastGotWater2) / (1000 * 60 * 60 * 24)
    console.log(dateDifference2 )
    if (dateDifference2 > 0){
    thirst = thirst - dateDifference2
    }else if(dateDifference2 > thirst){
        thirst = thirst - dateDifference2
    }
    if (thirst > 10){
        thirst = 10
        localStorage.setItem("thirst",10)
    }
    thirst = Math.floor(thirst)
    thirst = thirst < 0? 0:thirst
    thirstDisplay.innerText = `${thirst}/10`
    ChangeDisplay()
}

const CheckFun = () => {
     let TodaysDate3 = new Date().setHours(0,0,0,0)
    let lastGotFun2 = new Date(lastGotFun).setHours(0,0,0,0)
    let dateDifference3 = (TodaysDate3 - lastGotFun2) / (1000 * 60 * 60 * 24)
    console.log(dateDifference3)
    if (dateDifference3 > 0){
    fun = fun - dateDifference3
    }else if(dateDifference3 > fun){
        fun = fun - dateDifference3
    }

    if(fun > 10){
        fun = 10
        localStorage.setItem("fun", 10)
        console.log("jsajasjjasjasjasjasjas")
    }
    console.log(fun)
    fun = Math.floor(fun)
    fun = fun < 0? 0:fun
    funDisplay.innerText = `${fun}/10`
    ChangeDisplay()
}
CheckFun()
const checkAllThree = () => {
    CheckFun()
    CheckHunger()
    CheckThirst()
}
checkAllThree()

let Test = "trararara"


const ThingsToExport = {
    Emotions: Emotions,
    Test: Test
}
 


console.log(emotion)
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
/*
1: Happy(najedzony + napity)
2: Głodny (głodny + napity)
3: Spragniony (najedzony + spragniony)
4: Ded( cokolwiek jest 0)
5: Zły ( oba poniżej 3)
6: Bez różnicy (oba powyżej 3 lecz poniżej 5)
*/
