// let fullName = "Fadhil Ibnu";

// // let firstName = fullName.slice(0, 6);
// // let lastName = fullName.slice(7);

// let firstName = fullName.slice(0, fullName.indexOf(" "))
// let lastName = fullName.slice(fullName.indexOf(" ") + 1)

// console.log(firstName)
// console.log(lastName)

const email = "fadil1234@gmail.com"

let username = email.slice(0, email.indexOf("@"))
let extension = email.slice(email.indexOf("@"))

console.log(username)
console.log(extension)