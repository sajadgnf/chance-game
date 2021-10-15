const $ = document
const roll = $.querySelector(".roll")
const dices = $.querySelectorAll(".dice")
const hold = $.querySelector(".hold")
const player = $.querySelectorAll('.player')
const restartGameBtn = $.querySelector(".restart_game")
const firstPlayer = $.getElementById("player-0")
const secPlayer = $.getElementById("player-1")
const modalForm = $.querySelector(".modal_form")
const cancleBtn = $.querySelector(".cancle_btn")
const finalScore = $.querySelector(".final_score")
let sum = 0
let activePlayer = 0
let finalValue
let finalDice

// Modal
const modal = event => {
    event.preventDefault()
    event.target.parentNode.style.display = "none"
    finalValue = modalForm.children[1].value
    finalScore.innerHTML = finalValue
    modalForm.children[1].value = ""
}

// Roll Dice
const rollDice = () => {
    const players = $.getElementById(`player-${activePlayer}`)

    const firstDice = Math.floor(Math.random() * 6) + 1
    const secDice = Math.floor(Math.random() * 6) + 1
    dices[0].style.display = "inline-block"
    dices[1].style.display = "inline-block"
    dices[0].src = `assets/images/dice-${firstDice}.png`
    dices[1].src = `assets/images/dice-${secDice}.png`

    if (firstDice == 6 && secDice == 6) {
        players.firstElementChild.lastElementChild.innerHTML = 0
        nextPlayer()
    }
    else if (firstDice !== 1 && secDice !== 1) {
        sum += firstDice + secDice
        players.lastElementChild.lastElementChild.innerHTML = sum
    }
    else {
        nextPlayer()
    }
}

// Hold Score
const holdRoll = () => {

    player.forEach(item => {
        if (!item.classList.contains("inactive")) {
            let lastResaul = item.firstElementChild.lastElementChild
            let lastResultNum = parseInt(item.firstElementChild.lastElementChild.innerHTML)
            let currentResultNum = parseInt(item.lastElementChild.lastElementChild.innerHTML)

            lastResaul.innerHTML = currentResultNum + lastResultNum
            if (lastResaul.innerHTML >= parseInt(finalValue)) {
                item.children[1].innerHTML = "WINNER!!!"
                roll.setAttribute("disabled", "true")
                hold.setAttribute("disabled", "true")
                dices[0].style.display = "none"
                dices[1].style.display = "none"
                item.classList.add('win_container')
                // item.style.display = "block"
            }
        }
    })
    nextPlayer()
}

// Next Playerv
const nextPlayer = () => {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0

    firstPlayer.lastElementChild.lastElementChild.innerHTML = 0
    secPlayer.lastElementChild.lastElementChild.innerHTML = 0
    firstPlayer.classList.toggle("inactive")
    secPlayer.classList.toggle("inactive")
    dices[0].style.display = "none"
    dices[1].style.display = "none"
    sum = 0
}

// Restart The Game
const restartGame = () => {
    sum = 0
    activePlayer = 0
    for (let item of player) {
        item.lastElementChild.lastElementChild.innerHTML = 0
        item.firstElementChild.lastElementChild.innerHTML = 0
        item.classList.add("inactive")
        item.children[1].innerHTML = ""
        item.classList.remove('win_container')
    }
    firstPlayer.classList.remove("inactive")
    roll.removeAttribute("disabled")
    hold.removeAttribute("disabled")
    modalForm.parentNode.style.display = "inline-block"
}

// Events
modalForm.addEventListener("submit", modal)
roll.addEventListener("click", rollDice)
hold.addEventListener("click", holdRoll)
restartGameBtn.addEventListener("click", restartGame)
