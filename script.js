let startButton = document.querySelector("#start-button")
let startGameModal = document.querySelector("#start-game-modal")
let winnerModal = document.querySelector("#winner-modal")
let loserModal = document.querySelector("#loser-modal")
let wordForm = document.querySelector("#word-form")
let wordBlank = document.querySelector("#word-blank")
let timeBlank = document.querySelector("#time-blank")
let chanceBlank = document.querySelector("#chance-blank")
let boardGrid = document.querySelector("#board-grid")
let guessForm = document.querySelector("#guess-form")
let guessBlank = document.querySelector("#guess-blank")
let guessButton = document.querySelector("#guess-button")
let incorrectGuessList = document.querySelector("#incorrect-guess-list")
let chancesRemaining = document.querySelector("#chances-remaining")
let timeRemaining = document.querySelector("#time-remaining")
let footer = document.querySelector("footer")
let pompeii = document.querySelector("#pompeii")


let word = []
let chances = 0
let time = null
let currentGuess = ""
let correctGuesses = []
let incorrectGuesses = []
let letterBlanks = ""

let smoke = document.querySelector("#smoke") 
let lava = document.querySelector("#lava")
let smokeWidth = 1
let lavaWidth = 30
let smokeInterval = 0
let lavaInterval = 0

// START THE GAME
function startGame() {

    wordForm.style.display = "flex"

    startGameModal.style.display = "none"
}

startGameModal.addEventListener("click", e => {
    if (e.target.classList == "button"){
        startGame(e)

        wordBlank.focus()
    }
})



//CAPTURE ENTERED WORD AS ARRAY
function setWord(e) {
    e.preventDefault()
    
    wordString = wordBlank.value

    if (wordString.length == 0){
        alert("Please enter a word to begin")
    }
    else{
    word = wordBlank.value.toLowerCase().split("")

    if (chanceBlank.value.length == 0){
        chances = null
    }
    else {
    chances = chanceBlank.value
    chancesRemaining.innerText = chances
    }

    if (timeBlank.value.length != 0){
        time = timeBlank.value
        timeRemaining.innerText = `${time}s`
    }
    
    lavaInterval = 60/chances
    smokeInterval = 80/chances

    createBoard()
    }
}
wordForm.addEventListener("submit", setWord)

//CREATE GAME BOARD FROM WORD

function createBoard(){

    wordForm.style.display = "none"

    word.forEach((n,i) => {

        let blank = document.createElement("div")
        blank.classList.add("letter-blank")
        blank.dataset.position = i
        
        if (word.length > 9){
            blank.style.height = "50%"
            blank.style.fontSize = "45px"
        }
        
        boardGrid.appendChild(blank)
    })
    letterBlanks = document.querySelectorAll(".letter-blank")

    board.style.display = "flex"
    guessForm.addEventListener("submit", submitGuess)

    if (time != null){
    let timer = setInterval(countDown, 1000)
   
        //COUNTDOWN TIMER
        function countDown(){
        if (time <= 0 || correctGuesses.length == word.length || chances == 0){
            clearInterval(timer)
            console.log(timer)
        }
        else{
        time--
        }
        timeRemaining.innerText = `${time}s`
        }
    }

    guessBlank.focus()
}




//ON-SCREEN KEYBOARD PICKUP
function typeKey(e){
    if (e.target.classList.contains("letter")){
    guessBlank.value = e.target.dataset.key
    }
}
board.addEventListener("click", typeKey)


//SUBMIT GUESS
function submitGuess(e){
    e.preventDefault()
    
    let alreadyGuessed = 0

    correctGuesses.forEach(n =>{
        if (guessBlank.value == n){
            alreadyGuessed++
        }
    })

    incorrectGuesses.forEach(n =>{
        if (guessBlank.value == n){
            alreadyGuessed++
        }
    })

    if (alreadyGuessed > 0){
        
        alert("You've already guessed that letter, please choose another.")
    }
    else {
        currentGuess = guessBlank.value.toLowerCase()
        checkGuess(currentGuess)
        guessBlank.value = ""
        guessBlank.focus()
    }
}


//CHECK GUESS AGAINST WORD ARRAY

function checkGuess(guess){
    let correct = 0

    word.forEach((n,i) => {
        console.log("checking")
        if (currentGuess == n ){
            letterBlanks[i].innerText = n
            correct++
        }
    })
    
    if (correct > 0){
        for (let j=0; j<correct; j++){
            correctGuesses.push(guess)
        }
    }
    else {
        incorrectGuesses.push(guess)
        logIncorrect(guess)

        lavaWidth = lavaWidth + lavaInterval
        smokeWidth = smokeWidth + smokeInterval
        lava.style.width = `${lavaWidth}%`
        smoke.style.width = `${smokeWidth}%`

        if (chances != null){
        chances--
        chancesRemaining.innerText = chances
        }

    }
    checkForWinner()
}

//ADD INCORRECT GUESSES TO THE DISPLAY
function logIncorrect(guess){
    let add = document.createElement("li")
    add.innerText = guess
    incorrectGuessList.appendChild(add)

}

//CHECK FOR WINNER
function checkForWinner(){

    if(correctGuesses.length == word.length){
        winnerModal.style.display = "flex"
        guessForm.removeEventListener("submit", submitGuess)
    }
    else if ((correctGuesses.length < word.length && chances == 0) || (correctGuesses.length < word.length && time == 0)){
        let message = document.querySelector("#loss-message")
        message.innerText = wordString

        loserModal.style.display = "flex"
        guessForm.removeEventListener("submit", submitGuess)

        pompeii.style.backgroundImage = "url(/images/pompeii-after.png)"
    }

    document.addEventListener("click", (e,) => {
        if (e.target.classList.contains("play-again")){
            let winnerLoser = e.target.parentElement
            resetGame(winnerLoser)
        }
    })
}

//RESET GAME
function resetGame(winnerLoser) {
    
    let activeModal = winnerLoser

    word = []
    chances = 0
    time = null
    currentGuess = ""
    correctGuesses = []
    incorrectGuesses = []
    
    wordBlank.value = ""
    chanceBlank.value = ""
    timeBlank.value = ""
    incorrectGuessList.innerText = ""
    chancesRemaining.innerText = ""
    timeRemaining.innerText = ""
    boardGrid.innerHTML = ""
    
    lavaWidth = 30
    lava.style.width = `${lavaWidth}%`
    smokeWidth = 0
    smoke.style.width = `${smokeWidth}%`
    pompeii.style.backgroundImage = "url(/images/pompeii-before.png)"
    board.style.display = "none"
    activeModal.style.display = "none"
    startGame()
}
