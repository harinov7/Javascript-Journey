// materi
let student = 30;

student += 1;
student -= 1;
student *= 1;
student /= 1;
student **= 1;
student %= 1;

// latihan 1
let harga = 12500;
let jumlah = 4;

let total = harga * jumlah;

document.getElementById("pArithmetic1").textContent = `Harga barang: ${harga.toLocaleString('id-ID')}`
document.getElementById("pArithmetic2").textContent = `Jumlah barang: ${jumlah.toLocaleString('id-ID')}`
document.getElementById("pArithmetic3").textContent = `Total: ${total.toLocaleString('id-ID')}`
// toLocaleString untuk membuat angka menjadi dipisah ribuannya

// latihan 2
let gajiPokok = 5000000;
let bonus = 0.15 * gajiPokok;
let pajak = 0.05;

let gajiBersih = gajiPokok + bonus - (gajiPokok * pajak)

document.getElementById("pArithmetic4").textContent = `Gaji pokok: ${gajiPokok.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})}`
document.getElementById("pArithmetic5").textContent = `Bonus: ${bonus.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})}`
document.getElementById("pArithmetic6").textContent = `Gaji bersih: ${gajiBersih.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})}`
// bisa juga diperjelas, agar ada Rp nya

// latihan 3
let tarifNormal = 6000;
let diskon = 0.20;
let tarifDiskon = tarifNormal - (tarifNormal * diskon)
let lamaBermain = 7;
let jamNormal = 5;
let jamDiskon = lamaBermain - 5;

let totalHarga = tarifNormal * jamNormal + tarifDiskon * jamDiskon

document.getElementById("pArithmetic7").textContent = `Total harga warnet: ${totalHarga.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})}`

//  belum ada if statement