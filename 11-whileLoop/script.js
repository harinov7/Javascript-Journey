let minNum = 1
let maxNum = 100
let jawaban = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;

let tebakan;
let percobaan = 0

while (percobaan < 3) {
    tebakan = window.prompt("Tebak angka dari 1 - 100")


    if (isNaN(tebakan)) {
        window.alert("masukan angka")
    }
    else if (tebakan.trim().length === 0) {
        window.alert("jawaban tidak boleh kosong")
    }
    else if (tebakan > maxNum || tebakan < minNum) {
        window.alert("angka harus sekitar 1-100")
    }
    else {
        percobaan++;
        if (tebakan > jawaban) {
            window.alert("lebih besar daripada jawaban")
            if (percobaan == 3) {
                window.alert("coba lagi nanti")
            }
        }
        else if (tebakan < jawaban) {
            window.alert("lebih kecil daripada jawaban")
            if (percobaan == 3) {
                window.alert("coba lagi nanti")
            }
        }
        else {
            window.alert("selamat jawabanmu benar")
            break;
        }
    }
}