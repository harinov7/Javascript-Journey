// async/await -> Salah satu pola asynchronous dan paling banyak dipakai
//                Karena tujuannya untuk asynchronous tapi menulis kode nya persis seperti synchronous kode
//                async dan await selalu sepaket, yaitu async func namaFungsi() {kasih await didalamnya (baris nomor 53)}
//                dan async/await bisa try catch, jadi lebih mudah untuk error handling


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

async function awaliHari() {
    try {
        console.log(await bangunTidur()) // bisa kaya gini bentuknya

        const beresinKamarHasil = await beresinKamar()
        console.log(beresinKamarHasil) //Bisa juga kaya gini, kalau semisal mau dipakai berkali kali

        console.log(await mandi())
    }
    catch (error){
        console.error(error)
    }
}

awaliHari()