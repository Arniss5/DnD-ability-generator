const rerollBtn = document.getElementById('reroll-btn')
const rollBtn = document.getElementById('roll-btn')

//VARIABLES
let current_dice = []
let total
let previousTotals = []

//EVENT LISTENERS
rollBtn.addEventListener('click', roll)
rerollBtn.addEventListener('click', reroll)



//FUNCTIONS

function roll() {
    current_dice = []
    getRandomRoll()
    getRollsArray()
    renderDiceHtml()
    getTotal()
    checkForOnes()
}

function reroll() {
    current_dice.forEach((die, i) => {
        if (die === 1) {
            current_dice[i] = getRandomRoll()
        }
    })
    renderDiceHtml()
    getTotal()
    checkForOnes()
}


function getRandomRoll() {
    return Math.ceil(Math.random() * 6)
}

function getRollsArray() {
    //add 4 random rolls to currentDice
    for(let i = 0; i < 4; i++) {
        current_dice.push(getRandomRoll())
    }
}

function renderDiceHtml() {
    let diceHtml = ''

    for(let die of current_dice) {
        diceHtml += `<div class="dice">${die}</div>`
    }
    document.getElementById('dice-container').innerHTML = diceHtml
    
    //add .lowest class to only FIRST lowest roll
    for (let div of Array(...document.getElementsByClassName('dice'))) {
        if(div.textContent == Math.min(...current_dice)){
            div.classList.add('lowest')
            break
        } 
    }
    
}

function checkForOnes() {
    if(current_dice.includes(1)) {
        rerollBtn.classList.remove('hidden')
        rollBtn.classList.add('hidden')
    } else {
        rerollBtn.classList.add('hidden')
        rollBtn.classList.remove('hidden')
        getPrevious()
    }
}

function getTotal() {
    total = current_dice.reduce((a, b) => a + b, 0) - Math.min(...current_dice)
    document.getElementById('total-score').textContent = `Total: ${total}`
}

function getPrevious() {
    previousTotals.push(total)
    document.getElementById('previous-totals-span').textContent = previousTotals.join(', ')
}

// getRollsArray()

// renderDiceHtml()
// checkForOnes()
// getTotal()





//if(rollsArray.includes(1)) {
//     rerollBtn.classList.remove('hidden')
//     rollBtn.classList.add('hidden')
// } else {
//     totalScore = rollsArray.reduce((a, b) => a + b, 0)
//     console.log(totalScore)
// }
