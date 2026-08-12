// Nodelist -> Collection dari html element by(id/class/element)
//             Dibuat pake querySelectorAll()
//             Mirip kaya array, tapi ga ada map, filter, reduce
//             ga update otomatis kaloa ada perubahan dibawahnya

let buttons = document.querySelectorAll(".myButtons")

let newButton = document.createElement("button")

newButton.classList = `myButtons`
newButton.textContent = `Button 5`
document.body.append(newButton)

buttons = document.querySelectorAll(".myButtons")

buttons.forEach(button => {
    button.addEventListener("mouseover", event => {
        button.style.backgroundColor = "hsl(180, 50%, 40%)"
        button.style.fontSize = "2.2rem"
    })

    button.addEventListener("mouseout", event => {
        button.style.backgroundColor = "hsl(180, 50%, 60%)"
        button.style.fontSize = "2rem"
    })

    button.addEventListener("click", event => {
        event.target.remove();
        buttons = document.querySelectorAll(".myButtons") // biar nodelistnya ke update
        console.log(buttons)
    })
})