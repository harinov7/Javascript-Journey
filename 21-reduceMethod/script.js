// Mengolah value array dan mengubahnya menjadi satu value di variabel baru

// Contoh kode

const nomor = [20, 34, 12, 30, 45, 10]

let nomorTertinggi = nomor.reduce(ambilTertinggi)
let nomorTerendah = nomor.reduce(ambilTerendah)

console.log(nomorTertinggi)
console.log(nomorTerendah)

function ambilTertinggi(previous, next) {
    return Math.max(previous, next)
}

function ambilTerendah(previous, next) {
    return Math.min(previous, next)
}