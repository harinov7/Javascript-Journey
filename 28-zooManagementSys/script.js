class Animal {
    static zooName = `Hari Zoo`

    constructor(name, age, weight) {
        this.name = name
        this.age = age
        this.weight = weight
    }

    showInfo() {
        console.log(`${this.name}\nAge: ${this.age}\nWeight: ${this.weight}`)
    }

    move() {
        console.log(`${this.name} can run`)
    }
}

class Lion extends Animal {
    constructor(name, age, weight, power) {
        super(name, age, weight)
        this.power = power
    }

    roarPower() {
        console.log(`${this.name} roars with power ${this.power}`)
        super.move()
    }
}

class Elephant extends Animal {
    constructor(name, age, weight, power) {
        super(name, age, weight)
        this.power = power
    }

    trunkLength() {
        console.log(`${this.name} sprays ${this.power} meter of water`)
        super.move()
    }
}

class Monkey extends Animal {
    constructor(name, age, weight, power) {
        super(name, age, weight)
        this.power = power
    }

    jumpHeight() {
        console.log(`${this.name} jumps ${this.power} meter`)
        super.move()
    }
}

const lion1 = new Lion("Simba", 5, 20, 50);
const lion2 = new Lion("Mufasa", 8, 35, 75);
const elephant1 = new Elephant("Dumbo", 3, 130, 20);
const elephant2 = new Elephant("Babar", 7, 160, 40);
const monkey1 = new Monkey("George", 25, 55, 80);
const monkey2 = new Monkey("Coco", 11, 29, 60);

// lion1.showInfo()
// lion2.roarPower()

// elephant1.showInfo()
// elephant1.trunkLength()

// monkey1.showInfo()
// monkey2.jumpHeight()

const animals = [
    lion1,
    lion2,
    elephant1,
    elephant2,
    monkey1,
    monkey2
]

// console.log(animals)

let animalList = ``
let heaviestWeight = 0;
let heaviestAnimalName = ``;

animals.forEach(({ name, age, weight, power }, index) => {
    animalList += `
${index + 1}.
Name: ${name}
Age: ${age}
Weight: ${weight}
`
    if (weight > heaviestWeight) {
        heaviestWeight = weight
        heaviestAnimalName = name
    }
})

// console.log(heaviestAnimalName)

let laporan = `
======== ZOO ========
${animalList}
`
// console.log(laporan)

const animalsName = animals.map((element) => {
    return element.name
})

// console.log(animalsName)

const heavyAnimals = animals.filter((element) => {
    return element.weight > 100
})

// console.log(heavyAnimals)

const heavyTotal = animals.reduce((previous, next) => {
    return previous + next.weight
}, 0)

// console.log(heavyTotal)

const averageHeavy = (heavyTotal / animals.length).toFixed(2)

console.log(averageHeavy)