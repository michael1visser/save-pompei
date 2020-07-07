let startButton = document.querySelector("#start-button")
let startGameModal = document.querySelector("#start-game-modal")
let wordForm = document.querySelector("#word-form")
let wordBlank = document.querySelector("#word-blank")
let boardGrid = document.querySelector("#board-grid")
let guessForm = document.querySelector("#guess-form")
let guessBlank = document.querySelector("#guess-blank")
let guessButton = document.querySelector("#guess-button")


let word = []
let currentGuess = "a"

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
    
    word = wordBlank.value.toLowerCase().split("")

    createBoard()
}
wordForm.addEventListener("submit", setWord)

//CREATE GAME BOARD FROM WORD

function createBoard(){

    wordForm.style.display = "none"

    word.forEach(n => {

        let blank = document.createElement("div")
        blank.classList.add("letter-blank")
        //blank.innerHTML = n
        boardGrid.appendChild(blank)

        guessForm.style.display = "block"
    })
}

//ON-SCREEN KEYBOARD PICKUP
function typeKey(e){
    if (e.target.classList.contains("letter")){
    guessBlank.value = e.target.dataset.key
    console.log(guessBlank.value)
    }
}
board.addEventListener("click", typeKey)


//SUBMIT GUESS
function submitGuess(e){
    e.preventDefault()
    currentGuess = guessBlank.value.toLowerCase()
    console.log(currentGuess)
}
guessForm.addEventListener("submit", submitGuess)
//GUESS LOGIC

