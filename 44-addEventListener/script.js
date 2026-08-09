// .addEventListener -> membuat web page jadi interaktif dengan suatu interaksi
//                      biasanya ada -> click, mouseover, mouseout, mousedown, dan banyak lagi
//                      .addEventLlistener(event, callback)


const box1 = document.getElementById("box1");

function changeColor(event) {
    event.target.style.backgroundColor = "lightgreen"
}

function changeText(event) {
    event.target.textContent = `No..`
}

box1.addEventListener("click", changeColor)
box1.addEventListener("mouseout", changeText)