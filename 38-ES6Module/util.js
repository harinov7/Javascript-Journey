export const PI = 3.14159

export function greet() {
    console.log("Halo")
}

export function introduction(nameInput, ageInput) {
    console.log(`Hi, my name is ${nameInput}, and this year i will turn into ${ageInput} years old`)
}

// Element yang ingin di import ke file js lain, harus diawali 'export'