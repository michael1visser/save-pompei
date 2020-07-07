let startButton = document.querySelector("#start-button")
let startGameModal = document.querySelector("#start-game-modal")
let winnerModal = document.querySelector("#winner-modal")
let loserModal = document.querySelector("#loser-modal")
let wordForm = document.querySelector("#word-form")
let wordBlank = document.querySelector("#word-blank")
let chanceBlank = document.querySelector("#chance-blank")
let boardGrid = document.querySelector("#board-grid")
let guessForm = document.querySelector("#guess-form")
let guessBlank = document.querySelector("#guess-blank")
let guessButton = document.querySelector("#guess-button")
let incorrectGuessList = document.querySelector("#incorrect-guess-list")
let remaining = document.querySelector("#remaining")
let footer = document.querySelector("footer")


let letterBlanks = ""


let word = []
let chances = 0
let currentGuess = ""
let correctGuesses = []
let incorrectGuesses = []

let lava = document.querySelector("#lava")
let lavaWidth = 20
let increaseInterval = 0

// START THE GAME
function startGame() {
    //e.preventDefault()

    wordForm.style.display = "block"

    startGameModal.style.display = "none"
}

startGameModal.addEventListener("click", e => {
    if (e.target.classList = "button"){
        startGame(e)
    }
})
startGame()

//CAPTURE ENTERED WORD AS ARRAY
function setWord(e) {
    e.preventDefault()
    
    wordString = wordBlank.value
    word = wordBlank.value.toLowerCase().split("")
    chances = chanceBlank.value
    remaining.innerText = chances
    increaseInterval = 70/chances

    createBoard()
}
wordForm.addEventListener("submit", setWord)

//CREATE GAME BOARD FROM WORD

function createBoard(){

    wordForm.style.display = "none"

    word.forEach((n,i) => {

        let blank = document.createElement("div")
        blank.classList.add("letter-blank")
        blank.dataset.position = i
        boardGrid.appendChild(blank)
    })
    letterBlanks = document.querySelectorAll(".letter-blank")

    board.style.display = "flex"
}

//ON-SCREEN KEYBOARD PICKUP
function typeKey(e){
    if (e.target.classList.contains("letter")){
    guessBlank.value = e.target.dataset.key
    //console.log(guessBlank.value)
    }
}
board.addEventListener("click", typeKey)


//SUBMIT GUESS
function submitGuess(e){
    e.preventDefault()
    currentGuess = guessBlank.value.toLowerCase()
    //console.log(currentGuess)
    checkGuess(currentGuess)
}
guessForm.addEventListener("submit", submitGuess)

//GUESS LOGIC

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
        for (let i=0; i<correct; i++){
            correctGuesses.push(guess)
        }
            console.log(`Correct: ${correctGuesses}`)
    }
    else {
        incorrectGuesses.push(guess)
        console.log(`Incorrect: ${incorrectGuesses}`)
        logIncorrect(guess)

        lavaWidth = lavaWidth + increaseInterval
        lava.style.width = `${lavaWidth}%`
        console.log(lavaWidth)
        chances--

    }
    
    remaining.innerText = chances

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
        winnerModal.style.display = "block"
        guessForm.removeEventListener("submit", submitGuess)
    }
    else if (correctGuesses.length < word.length && chances == 0){
        let message = document.querySelector("#loss-message")
        message.innerText = wordString
        loserModal.style.display = "block"
        guessForm.removeEventListener("submit", submitGuess)
        footer.style.backgroundImage = "url(/images/pompeii-after.png)"
    }
}

//RESET GAME
