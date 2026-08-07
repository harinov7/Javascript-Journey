let number = 0

function count() {
    number++
    console.log(number)
    if (number === 10) {
        clearInterval(interval)
    }
}

let interval = setInterval(count, 1000) // Outputnya adalah menghitung dari 1 sampai 10 
//                                         dengan perbedaan waktu 1000 milidetik (atau 1 detik)

setTimeout(() => {
    console.log("halo")
}, 11000); // Show halo setelah 11 ribu milidetik (atau 11 detik)