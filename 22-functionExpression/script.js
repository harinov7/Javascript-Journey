// function declaration itu seperti function sebelum sebelumnya yaitu harus dideklarasikan dulu
// tujuannya agar bisa dipakai lebih dari sekali

// tapi, function expression itu beda. dia ga butuh di deklarasikan dulu
// dia langsung ada didalam variabel itu
// tujuannya agar gak nyampah di variabel global dan lebih simpel aja

// Contoh perbedaan:

// Ini function declaration
function hello() {
    console.log("Hello")
}

hello()

// ini function expression
const goodbye = function() {
    console.log("Goodbye")
}

goodbye()

// Contoh lain dari function expression
setTimeout(function() {
    console.log("Ini udah 3 detik")
}, 3000)