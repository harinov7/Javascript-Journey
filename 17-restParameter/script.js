// rest parameter = ...args

// membuat suatu argumen menjadi tak terhingga sesuai kebutuhan

function sum (...numbers) {
    let result = 0
    for (let i = 0; i < numbers.length; i++) {
        result += numbers[i]
    }
    return result
}

console.log(sum(1, 2, 3, 4))



// bisa juga digunakan untuk menggabungkan beberapa variabel menjadi suatu array

function namaMakanan(...banyakMakanan) {
    return banyakMakanan
}

const makanan1 = "burger"
const makanan2 = "chicken"
const makanan3 = "nasi padang"
const makanan4 = "soto babat"
const makanan5 = "lauk teri"

let kulkas = namaMakanan(makanan1, makanan2, makanan3, makanan4, makanan5)

console.log(kulkas)