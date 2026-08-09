const myH1 = document.getElementById("myH1")

myH1.style.border = "1px solid"
myH1.style.margin = "0px"

document.addEventListener("keydown", (event) => {
    console.log(event)
    if (event.key === "a") {
        myH1.style.backgroundColor = "yellow"
    }
})

const myBox = document.getElementById("myBox")

myBox.textContent = "😊"
myBox.style.display = "flex"
myBox.style.justifyContent = "center"
myBox.style.alignItems = "center"
myBox.style.fontSize = "2rem"
myBox.style.backgroundColor = "yellow"
myBox.style.height = "125px"
myBox.style.width = "125px"
myBox.style.position = "relative"

const moveAmount = 10
let left = 0
let up = 0

console.log(window.getComputedStyle(myBox).top)

document.addEventListener("keydown", (event) => {

    if (event.key.startsWith("Arrow")) {
        console.log(moveAmount)
        switch (event.key) {
            case "ArrowRight":
                if (left === 430) {
                    console.log("You're just reach the corner")
                    break;
                }
                else {
                    left += moveAmount
                    break;
                }
            case "ArrowLeft":
                if (left === 0) {
                    console.log("You're just reach the corner");
                    break;
                }
                else {
                    left -= moveAmount
                    break;
                }
            case "ArrowUp":
                if (up === 0) {
                    console.log("You're just reach the corner");
                    break;
                }
                else {
                    up -= moveAmount
                    break;
                }
            case "ArrowDown":
                if (up === 490) {
                    console.log("You're just reach the corner");
                    break;
                }
                else {
                    up += moveAmount
                    break;
                }
        }
        console.log(left)
        console.log(up)
        myBox.style.left = `${left}px`
        myBox.style.top = `${up}px`
    }
})