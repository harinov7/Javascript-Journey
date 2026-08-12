// JSON -> (Javascript Object Notaion) format pertukaran data
//         buat pertukaran data antara server dan web
//         JSON file biasanya berisi: {key;value} atau [value1, value2, value3]

//         JSON.stringify() = buat convert dari js object ke json string
//         JSON.parse() = convert dari json string ke js object

// Contoh penggunaan JSON.stringify()
const jsonPeople = [{
    "nama": "Fadhil",
    "umur": 20,
    "status": "Menganggur"
},
{
    "nama": "Revan",
    "umur": 21,
    "status": "Bekerja"
}]

const peoplestringify = JSON.stringify(jsonPeople) // Mengubah object jadi string

console.log(peoplestringify)

// Contoh JSON.parse()
const jsonPerson = `{"nama":"Fadhil","umur":20,"status":"Menganggur","hobi":["Membaca","Mempelajari hal baru","Mencoba"]}`

console.log(JSON.parse(jsonPerson)) // Mengubah string jadi object

// Contoh sedikit fetch

// const people = fetch("people.json") // SALAH

// console.log(people) // Gak bisa langsung, karna fetch mengembalikan promise

// Ini contoh yang benar untuk fetch
fetch("people.json")
    .then(response => response.json())
    .then(value => console.log(value))
    .catch(error => console.error(error))