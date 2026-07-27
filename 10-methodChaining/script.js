let userName = window.prompt("What is your name?: ")

userName = userName.trim().charAt(0).toUpperCase() + userName.trim().slice(1).toLowerCase();

console.log(userName)

// Method Chaining itu kayak menggunakan method setelah method lain, jadi kaya combo method gitu dan itu sah.