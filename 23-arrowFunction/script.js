// Meringkaskan suatu function, tapi ingat, tidak semua function bisa menggunakan arrow function

// (parameters) => some code

// Contoh kode pakai function biasa

const nomor = [1, 2, 3, 4, 5, 6]
let nomorPangkatDua = nomor.map(function (element) {
    return Math.pow(element, 2) 
})

// Contoh kode pakai arrow function. tidak perlu return kalau cuma satu baris kodenya 
let nomorPangkatTiga = nomor.map((element) => Math.pow(element, 3))

console.log(nomorPangkatDua)
console.log(nomorPangkatTiga)