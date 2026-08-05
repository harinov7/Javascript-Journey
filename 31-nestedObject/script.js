class Person {
    constructor(name, age, ...hobbies) {
        this.name = name
        this.age = age
        this.hobbies = hobbies // Kode ini akan menghasilkan array
    }
}

const person1 = new Person("Fadhil", 30, "Basketball", "Swimming", "Reading")

console.log(person1.hobbies[2]) // cara mengakses array didalam object

class Product {
    constructor(name, exp, ...flavour) {
        this.name = name
        this.exp = exp
        this.flavour = new Flavour(...flavour) // Kode ini memanggil class lain dan menghasilkan object dalam object
    }
}

class Flavour { 
    // child object dari object product
    // 3 object terakhir di class product itu isinya dibawah ini:
    constructor(variant1, variant2, variant3) {
        this.variant1 = variant1
        this.variant2 = variant2
        this.variant3 = variant3
    }
}

const product1 = new Product("HariSnack", "30-1-2026", "Chocolate", "Strawberry", "Matcha")

console.log(product1.name)
console.log(product1.flavour.variant2) // Cara mengakses value di object yang ada didalam object