// Promise -> Salah satu pola asynchronous
//            new Promise((resolve, reject) => {asynchronous code})
//            resolve biasanya kayak positifnya, reject itu biasanya untuk bentuk negatifnya
//            Biasa dipakai untuk debug dan kode cepat untuk kode asynchronous
//            Kode yang sudah jadi dan final biasanya pakai async/await karna lebih rapi

// CONTOH 1

// function buangSampah() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve("Buang sampah udah selesai");
//         }, 1000);
//     })
// }

// function cuciTangan() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve("Tangan selesai dicuci, udah bersih");
//         }, 5000);
//     })
// }

// function mulaiMakan() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve("Makan udah selesai");
//         }, 3000);
//     })
// }

// buangSampah().then(value => { console.log(value); return cuciTangan() }) // then ini punya nya buangSampah
//     .then(value => { console.log(value); return mulaiMakan() }) // then ini punya nya cuciTangan()
//     .then(value => { console.log(value); console.log("Sudah selesai semua, tinggal tidur") }) // then ini punya nya mulaiMakan()

// CONTOH 2

function bangunTidur() {
    return new Promise((resolve, reject) => {
        const tidur = true
        if (tidur) {
            setTimeout(() => {
                resolve("Udah linglungnya");
            }, 2000);
        }

        else {
            reject("bray lu kaga bangun tidur")
        }
    })
}

function beresinKamar() {
    return new Promise((resolve, reject) => {

        const beresin = true
        if (beresin) {
            setTimeout(() => {
                resolve("Selesai beresin kamar, mo mandi ah")
            }, 4000);
        }

        else {
            reject("lu kaga beresin kamar")
        }
    })
}

function mandi() {
    return new Promise((resolve, reject) => {
        const mandi = false
        if (mandi) {
            setTimeout(() => {
                resolve("Udah ah mandinya jan lama lama")
            }, 1000);
        }

        else {
            reject("lu kaga mandi juga ah")
        }
    })
}

bangunTidur().then(value => { console.log(value); return beresinKamar() })
    .then(value => { console.log(value); return mandi() })
    .then(value => { console.log(value); console.log("Waktunya beraktivitas") })