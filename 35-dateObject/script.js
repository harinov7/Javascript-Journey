const date = new Date(2025, 0, 1, 2, 3, 4, 5); // Ouput menjadi 2024-12-31T19:03:04.005Z

console.log(date.toLocaleString()) // .toLocaleString Mengubah output agar sesuai sama input yang dimasukkan

// Date(year, month, date, hours, minutes, seconds, ms)

const year = date.getFullYear()
const month = date.getMonth()
const day = date.getDate()
const hours = date.getHours()
const minutes = date.getMinutes()
const seconds = date.getSeconds()

console.log(year)
console.log(month)
console.log(day)
console.log(hours)
console.log(minutes)
console.log(seconds)

const date2 = new Date();

date2.setFullYear(2007);
date2.setMonth(11);
date2.setDate(27);
date2.setHours(4);
date2.setMinutes(30);
date2.setSeconds(20);

console.log(date2.toLocaleString())

const oldYear = new Date("2024-12-31")
const newYear = new Date("2025-01-01")

if (newYear > oldYear) {
    console.log("HAPPY NEW YEAR")
}