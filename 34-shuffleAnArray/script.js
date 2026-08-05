let pocker = ["A", 1, 2, 3, 4, 5, 6, 7, 8, 9, "J", "Q", "K"]

shuffeArray(pocker);

console.log(pocker)

// Function shuffle dengan cara yang paling benar: 

function shuffeArray(card) {
    for (let i = card.length-1; i > 0; i--) {
        const random = Math.floor(Math.random() * (i - 1));
        [card[i], card[random]] = [card[random], card[i]]
    } 
}