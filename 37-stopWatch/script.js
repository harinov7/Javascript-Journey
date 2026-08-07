const displayClock = document.getElementById("displayClock");

let isRuning = false;
let startInterval;
let seconds = 0
let minutes = 0
let miliseconds = 0
let totalMiliseconds = 0

function start() {
    if (isRuning === false) {
        isRuning = true;
        startInterval = setInterval(update, 10)
    }
}

function pause() {
    if (isRuning === true) {
        isRuning = false;
        clearInterval(startInterval)
    }
}

function reset() {
    isRuning = false
    clearInterval(startInterval)
    totalMiliseconds = 0
    displayClock.textContent = `00:00:00`
}

function update() {
    totalMiliseconds ++;
    miliseconds = totalMiliseconds % 100
    seconds = Math.floor(totalMiliseconds / 100) % 60
    minutes = Math.floor(totalMiliseconds / 6000)

    displayClock.textContent = `${toTwoDigits(minutes)}:${toTwoDigits(seconds)}:${toTwoDigits(miliseconds)}`
}

function toTwoDigits (digit) {
    return String(digit).padStart(2, "0")
}