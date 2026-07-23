// Variable = Container that stores a value

// 1. Declare = menamai atau membuat variabel
// 2. Assign = memberi sebuah value pada suatu variabel

// Dipisah:
let firstName;
firstName = "Fadhil";

// Disatu:
let middleName = "Ibnu";

// Diubah:
let lastName = "Ibnu Adhari";
lastName = "Adhari";

document.getElementById("p1").textContent = firstName
document.getElementById("p2").textContent = (`Nama lengkap: ${firstName} ${middleName} ${lastName}`)