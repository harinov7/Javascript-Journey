const judul = document.getElementById("judul");
const kolomRegister = document.getElementById("kolomRegister")
const inputNama = document.getElementById("userName");
const inputpin = document.getElementById("pin");
const kolomPilihanMenu = document.getElementById("kolomPilihanMenu");
const cekSaldoRadio = document.getElementById("cekSaldoRadio");
const storTunaiRadio = document.getElementById("storTunaiRadio");
const tarikTunaiRadio = document.getElementById("tarikTunaiRadio");
const kolomLanjutTransaksi = document.getElementById("kolomLanjutTransaksi");
const outputStruk = document.getElementById("struk");
const lanjutTransaksiRadio = document.getElementById("lanjutTransaksiRadio");
const selesaiTransaksiRadio = document.getElementById("selesaiTransaksiRadio");
const kolomStor = document.getElementById("kolomStor");
const inputStor = document.getElementById("inputStor");
const kolomTarik = document.getElementById("kolomTarik");
const inputTarik = document.getElementById("inputTarik");

const testHuruf = /^[A-Za-z]+$/;

let status = "register"
let saldo = 0

let nominalTarikTunai = Number(inputTarik.value)

function register() {
    let nama = inputNama.value
    let pin = inputpin.value
    let correctPin = 1234
    if (nama.trim().length === 0) {
        outputStruk.textContent = `Nama tidak boleh kosong`
    }
    else if (!testHuruf.test(nama)) {
        outputStruk.textContent = `Nama hanya berisi huruf`
    }
    else {
        if (pin.trim().length === 0) {
            outputStruk.textContent = `Pin tidak boleh kosong`
        }
        else if (pin != correctPin) {
            outputStruk.textContent = `Pin salah`
        }
        else {
            outputStruk.textContent = ""
            status = "menu"
            judul.textContent = "Menu"
            kolomRegister.style.display = "none"
            kolomPilihanMenu.style.display = "block"
            console.log(status)
            return;
        }
    }
}

function menu() {
    if (cekSaldoRadio.checked) {
        status = "cekSaldo"
        kolomPilihanMenu.style.display = "none"
        kolomLanjutTransaksi.style.display = "block"
        cekSaldoRadio.checked = false
        judul.textContent = "Cek Saldo"
        console.log(status)
    }
    else if (storTunaiRadio.checked) {
        status = "storTunai"
        kolomPilihanMenu.style.display = "none"
        kolomStor.style.display = "block"
        storTunaiRadio.checked = false
        judul.textContent = "Stor Tunai"
        console.log(status)
        return;
    }
    else if (tarikTunaiRadio.checked) {
        status = "tarikTunai"
        kolomPilihanMenu.style.display = "none"
        kolomTarik.style.display = "block"
        judul.textContent = "Tarik Tunai"
        console.log(status)
        return;
    }
    else {
        outputStruk.textContent = `Silahkan pilih salah satu`
    }
}

function cekSaldo() {
    let nama = inputNama.value
    kolomPilihanMenu.style.display = "none"
    kolomLanjutTransaksi.style.display = "block"
    outputStruk.textContent = `
===== ATM =====
Nama : ${nama}
Saldo : ${saldo.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
`
    status = "lanjutTransaksi"
}

function storTunai() {
    if (nominalStorTunai <= 0) {
        outputStruk.textContent = "Harap isi nominal"
    }
    else if (isNaN(nominalStorTunai)) {
        outputStruk.textContent = "Nominal harus berupa angka"
    }
    else {
        kolomLanjutTransaksi.style.display = "block"
        kolomStor.style.display = "none"
        inputStor.value = ""
        saldo = saldo + nominalStorTunai
        outputStruk.textContent = `
Saldo awal: ${saldoAwal.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
Nominal setor: ${nominalStorTunai.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
Saldo sekarang: ${saldo.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
`
        status = "lanjutTransaksi"
    }
}

function lanjutTransaksi() {
    if (lanjutTransaksiRadio.checked) {
        status = "menu"
        kolomLanjutTransaksi.style.display = "none"
        kolomPilihanMenu.style.display = "block"
        outputStruk.textContent = ""
        lanjutTransaksiRadio.checked = false
        judul.textContent = "Menu"
        inputNama.value = ""
        inputpin.value = ""
        console.log(status)
    }
    else if (selesaiTransaksiRadio.checked) {
        status = "register"
        kolomLanjutTransaksi.style.display = "none"
        kolomRegister.style.display = "block"
        outputStruk.textContent = ""
        selesaiTransaksiRadio.checked = false
        judul.textContent = "Register"
        inputNama.value = ""
        inputpin.value = ""
        console.log(status)
    }
}

function tarikTunai() {
    outputStruk.textContent = ""
    if (isNaN(nominalTarikTunai)) {
        outputStruk.textContent = "Nominal harus berupa angka"
    }
    else if (nominalTarikTunai <= 0) {
        outputStruk.textContent = "Nominal tidak valid"
    }
    else if (nominalTarikTunai > saldo) {
        outputStruk.textContent = `
Saldo tidak cukup
Saldo: ${saldo.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
`
    }
    else {
        kolomLanjutTransaksi.style.display = "block"
        kolomTarik.style.display = "none"
        inputStor.value = ""
        saldo = saldo - nominalTarikTunai
        outputStruk.textContent = `
Saldo awal: ${saldoAwal.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
Tarik: ${nominalTarikTunai.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
Saldo sekarang: ${saldo.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
`
        status = "lanjutTransaksi"
    }
}

document.getElementById("myKonfirmasi").onclick = function () {
    let nominalStorTunai = Number(inputStor.value)
    let saldoAwal = saldo
    if (status == "register") {
        register()
    }

    if (status == "menu") {
        menu()
    }

    if (status == "cekSaldo") {
        cekSaldo()
    }

    if (status == "storTunai") {
        storTunai()
    }

    if (status == "lanjutTransaksi") {
        lanjutTransaksi()
    }

    if (status == "tarikTunai") {
        tarikTunai()
    }
}
