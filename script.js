let startButton = document.querySelector("#start-button")
let startGameModal = document.querySelector("#start-game-modal")
let wordForm = document.querySelector("#word-form")
let wordBlank = document.querySelector("#word-blank")

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
}
wordForm.addEventListener("submit", setWord)

