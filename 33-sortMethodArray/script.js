let people = [{name: "Sasuke", age: 26, skill: "Chidori"},
            {name: "Kakashi", age: 39, skill: "Raikiri"},
            {name: "Jiraiya", age: 67, skill: "Kuchiyose"},
            {name: "Naruto", age: 25, skill: "Kagebunshin"}
]

// people.sort((a, b) => a.age - b.age) // Mengurutkan umur(angka) yang lebih muda ke tua

// people.sort((a, b) => b.age - a.age) // Mengurutkan umur(angka) yang lebih tua ke muda (dibalik aja a dan b nya)

// people.sort((a, b) => a.name.localeCompare(b.name)) // Mengurutkan nama berdasarkan alphabet dari a ke z

people.sort((a, b) => b.name.localeCompare(a.name)) // Mengurutkan nama berdasarkan alphabet dari z ke a (dibalik aja)

console.log(people)