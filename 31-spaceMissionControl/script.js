class SpaceCraft {

    static agency = "Hari Space Agency"

    constructor(name, mission, fuel, ...destination) {
        this.name = name
        this.mission = mission
        this.fuel = fuel
        this.destination = new Destination(...destination)
    }

    showInfo() {
        console.log(`Name: ${this.name}\nMission: ${this.mission}\nfuel: ${this.fuel}\n`)
    }
}

class Destination {
    constructor(planet, distance) {
        this.planet = planet
        this.distance = distance
    }
}

class Rocket extends SpaceCraft {
    constructor(name, mission, fuel, thrust, ...destination) {
        super(name, mission, fuel, ...destination)
        this.thrust = thrust
    }

    launch() {
        console.log(`${this.name} launches with ${this.thrust} kN of thrust`)
    }
}


class Satellite extends SpaceCraft {
    constructor(name, mission, fuel, orbitHeight, ...destination) {
        super(name, mission, fuel, ...destination)
        this.orbitHeight = orbitHeight
    }

    transmit() {
        console.log(`${this.name} transmits from ${this.orbitHeight} km orbit`)
    }
}

class Rover extends SpaceCraft {
    constructor(name, mission, fuel, wheelCount, ...destination) {
        super(name, mission, fuel, ...destination)
        this.wheelCount = wheelCount
    }

    explore() {
        console.log(`${this.name} explores using ${this.wheelCount} wheels`)
    }
}

const rocket1 = new Rocket("Zeus", "Explore space", 20, 67, "Saturn", 4000)
const rocket2 = new Rocket("Athena", "Explore galaxy", 12, 120, "Galaxy", 10000)
const satellite1 = new Satellite("Explorer 1", "Internet", 4, 90, "Earth atmosphere", 300)
const satellite2 = new Satellite("ISS", "Living in the space", 15, 80, "Mars", 1800)
const rover1 = new Rover("SpaceX", "To the moon", 60, 10, "Moon", 1200)
const rover2 = new Rover("HariSpace", "To the moon of jupiter", 30, 20, "Europe", 1400)

const spaceCraft = [
    rocket1,
    rocket2,
    satellite1,
    satellite2,
    rover1,
    rover2
]

const craftName = spaceCraft.map((value) => {
    return value.name.toUpperCase()
})

const heavyFuel = spaceCraft.filter((element) => {
    return element.fuel > 10
})

const longWay = spaceCraft.filter((element) => {
    return element.destination.distance > 1500
})

const totalFuel = spaceCraft.reduce((previous, next) => {
    return previous + next.fuel
}, 0)

const averageFuel = totalFuel / spaceCraft.length

let spaceCraftist = ``
let heaviestFuel = 0
let heaviestFuelText = ``
let smallestFuel = 99999999
let smallestFuelText = ``

spaceCraft.forEach(({ name, mission, fuel, destination: { planet, distance } }, index) => {
    spaceCraftist += `
${index + 1}. 
Name :
${name}

Mission :
${mission}

Fuel :
${fuel}

Destination :
${planet}

Distance :
${distance}
`
    if (fuel > heaviestFuel) {
        heaviestFuel = fuel
        heaviestFuelText = `${name} with its fuel ${fuel}`
    }

    if (fuel < smallestFuel) {
        smallestFuel = fuel
        smallestFuelText = `${name} with its fuel ${fuel}`
    }

})

const countRocket = spaceCraft.filter((element) => element instanceof Rocket)
const countSatellite = spaceCraft.filter((element) => element instanceof Satellite)
const countRover = spaceCraft.filter((element) => element instanceof Rover)

let missionReport = `
========== SPACE MISSION CONTROL ==========
Agency: ${SpaceCraft.agency}
Total Fuel: ${totalFuel}
Average Fuel: ${averageFuel}
Heaviest Fuel: ${heaviestFuelText}
Smallest Fuel: ${smallestFuelText}
Rocket Count: ${countRocket.length}
Satellite Count: ${countSatellite.length}
Rover Count: ${countRover.length}

${spaceCraftist}
`

console.log(missionReport)