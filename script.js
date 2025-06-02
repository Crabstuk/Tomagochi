let hunger = localStorage.getItem("hunger") == undefined? 5 : localStorage.getItem("hunger")
 let thirst = parseInt(localStorage.getItem("thirst"))||5
let fun = parseInt(localStorage.getItem("fun"))||5;console.log(fun);
 var emotion = null
 var pongTime = 0
 const nameLol = localStorage.getItem("tamagotchiName")? localStorage.getItem("tamagotchiName"): "tamagotchi" 
 const PlayButton = document.querySelector("#play")
 PlayButton.innerText = `Pobaw się z ${nameLol}!`
const pong = document.querySelector("#pong")
let lastGotFood = localStorage.getItem("lastGotFood")|| new Date().toISOString()
let lastGotWater = localStorage.getItem("lastGotWater")|| new Date().toISOString()
let lastGotFun = localStorage.getItem("lastGotFun")|| new Date().toISOString()
const feedTamagotchiBtn = document.querySelector("#feedTamagotchiBtn")
const hungerDisplay = document.getElementById("hungerDisplay")
const giveTamagotchiWaterBtn = document.getElementById("giveTamagotchiWaterBtn")
const thirstDisplay = document.getElementById("thirstDisplay")
const tamagotchiDisplay = document.querySelector("#tamagotchiDisplay")
hungerDisplay.innerText = `${hunger}/10`
thirstDisplay.innerText = `${thirst}/10`
const funDisplay = document.querySelector("#funDisplay")
funDisplay.innerText = `${fun}/10`
const showMinigame = () => {
    pong.style.display = "block"
    resetBall()
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
    console.log("im drinking watah")
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
let tamagotchiName = localStorage.getItem("tamagotchiName")||""
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
    tamagotchiName = document.getElementById("name").value
    if (tamagotchiName == ""){
        document.getElementById("displayName").innerText = "Proszę wpisać jakieś imię!"
        return;
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
/*
1: Happy(najedzony + napity)
2: Głodny (głodny + napity)
3: Spragniony (najedzony + spragniony)
4: Ded( cokolwiek jest 0)
5: Zły ( oba poniżej 3)
6: Bez różnicy (oba powyżej 3 lecz poniżej 5)
*/
