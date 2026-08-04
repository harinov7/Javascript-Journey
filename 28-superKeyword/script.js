class Animal {
    constructor(name, age) {
        this.name = name
        this.age = age
    }

    move(speed) {
        console.log(`The ${this.name} moves at a speed of ${speed}mph`)
    }
}

class Rabbit extends Animal {
    constructor(name, age, runSpeed) {
        super(name, age)
        this.runSpeed = runSpeed
    }

    run() {
        console.log(`This ${this.name} can run`)
        super.move(this.runSpeed)
    }
}

class Fish extends Animal {
    constructor(name, age, swimSpeed) {
        super(name, age)
        this.swimSpeed = swimSpeed
    }

    swim() {
        console.log(`This ${this.name} can swim`)
        super.move(this.swimSpeed)
    }
}

class Hawk extends Animal {
    constructor(name, age, flySpeed) {
        super(name, age)
        this.flySpeed = flySpeed
    }

    fly() {
        console.log(`This ${this.name} can fly`)
        super.move(this.flySpeed)
    }
}

const rabbit1 = new Rabbit("rabbit", 1, 19);
const fish1 = new Fish("fish", 2, 14);
const hawk1 = new Hawk("hawk", 4, 36);

console.log(rabbit1.name)
rabbit1.run()
fish1.swim()