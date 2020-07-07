let startButton = document.querySelector("#start-button")
let startGameModal = document.querySelector("#start-game-modal")
let wordForm = document.querySelector("#word-form")
let wordBlank = document.querySelector("#word-blank")
let boardGrid = document.querySelector("#board-grid")
let guessForm = document.querySelector("#guess-form")


let word = []

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

//GUESS LOGIC