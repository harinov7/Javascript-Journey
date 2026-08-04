// destructuring = mengeluarkan value dari array atau object
//                 lalu memasukannya kedalam variabel terpisah
//                 dengan cara yang cepat dan ringkas

// Contoh 1
// Swap the value of two variables

let a = 1;
let b = 2;

[a, b] = [b, a];

console.log(a);

// Contoh 2
// Swap two elements in an array

let colors = ["red", "green", "blue", "black", "white"];

console.log(colors);

[colors[0], colors[4]] = [colors[4], colors[0]];

console.log(colors);

// Contoh 3
// Assign array element to variables

let [firtsColor, secondColor, thirdColor, ...extraColors] = colors;

console.log(firtsColor);
console.log(secondColor);
console.log(thirdColor);
console.log(extraColors)

// Contoh 4
// Extract value from object

let person1 = {
    name: "Fadhil",
    age: 20,
    job: false,
    status: "Relatioship"
}

let person2 = {
    name: "Hari",
    age: 25,
    job: true,
}

const {name, age, job, status="Married"} = person2; // Value tambahan dibagian status 
//                                                     karena object person2 gapunya 
//                                                     key value status, dan assign dengan
//                                                     cara ini biasa disebut Default Value

console.log(name)
console.log(age)
console.log(job)
console.log(status)

// Contoh 5
// Desctructuring in function parameters

function displayProduct({type, flavour, texture="rough"}) {
    console.log(type, flavour, texture)
}

let product1 = {
    type: "Food",
    flavour: "Sweet",
    texture: "smooth"
}

let product2 = {
    type: "drink",
    flavour: "sour"
}

displayProduct(product1) // Dibagian texture akan mengikuti value di object
displayProduct(product2) // Di object karena texture tidak ada, maka mengikuti default value di functionnya