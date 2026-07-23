// Simple way

// let name = window.prompt("What is your name?");

// document.getElementById("myH2").textContent = name

// Professional way

document.getElementById('mySubmit').onclick = function () {
    let name = document.getElementById("myInput").value;
    document.getElementById("myH2").textContent = `Welcome`
    document.getElementById("p1").textContent = `HELLO ${name}`
}