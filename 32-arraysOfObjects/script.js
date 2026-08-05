const fruits = [{name: "Banana", color: "Yellow", calories: 89},
                {name: "Coconut", color: "Green", calories: 354},
                {name: "Pineapple", color: "Yellow", calories: 50},
                {name: "Apple", color: "Red", calories: 123}, 
]

// ---------    forEach()    ------------
// fruits.forEach((fruit) => console.log(fruit.name))


// ---------    filter()    ------------
let lowCalFruit = fruits.filter((element) => {
    return element.calories < 100
})

// ---------    map()    ------------

let upperName = fruits.map((element) => {
    return element.name.toUpperCase()
})

// ---------    reduce()    ------------

let totalCal = fruits.reduce((acc, curr) => {
    return acc + curr.calories
}, 0)

let maxCal = fruits.reduce((curr, max) => {
    return max.calories > curr ? max.calories : curr
}, 0)

console.log(maxCal)