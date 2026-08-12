const myButton = document.getElementById("myButton");

// .add("className") -> buat nambah/assign sebuah class
myButton.classList.add("button")

// .remove("className") -> buat menghapus class
myButton.classList.remove("button")

myButton.classList.add("enabled")

// .replace("old class name", "new class name") -> untuk mengganti class
myButton.classList.replace("enabled", "disabled")

// .toggle("className") -> buat on kalo lagi off, dan off kalo lagi on
myButton.addEventListener("mouseover", event => {
    event.target.classList.toggle("hover");
})

myButton.addEventListener("mouseout", event => {
    event.target.classList.toggle("hover");
    event.target.classList.remove("upSize");
    event.target.textContent = "Button"
})

// .contains("className") -> mengembalikan true dan false

myButton.addEventListener("click", event => {
    if (event.target.classList.contains("upSize")) {
        myButton.textContent += "😫"
    }
    else {
        myButton.classList.add("upSize")
    }
})