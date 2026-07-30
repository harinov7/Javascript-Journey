const judul = document.getElementById("judul");

const kolomRegister = document.getElementById("kolomRegister")
const inputNama = document.getElementById("userName");
const inputPin = document.getElementById("pin");

const kolomPilihanMenu = document.getElementById("kolomPilihanMenu");
const cekSaldoRadio = document.getElementById("cekSaldoRadio");
const storTunaiRadio = document.getElementById("storTunaiRadio");
const tarikTunaiRadio = document.getElementById("tarikTunaiRadio");

const kolomLanjutTransaksi = document.getElementById("kolomLanjutTransaksi");
const lanjutTransaksiRadio = document.getElementById("lanjutTransaksiRadio");
const selesaiTransaksiRadio = document.getElementById("selesaiTransaksiRadio");

const kolomStor = document.getElementById("kolomStor");
const inputStor = document.getElementById("inputStor");

const kolomTarik = document.getElementById("kolomTarik");
const inputTarik = document.getElementById("inputTarik");

const outputStruk = document.getElementById("struk");


let status = "register"
let pinBenar = 123
let saldo = 0

function kosongkanInputRadio() {
    cekSaldoRadio.checked = false
    storTunaiRadio.checked = false
    tarikTunaiRadio.checked = false
    lanjutTransaksiRadio.checked = false
    selesaiTransaksiRadio.checked = false
}
function kosongkanInputText() {
    inputNama.value = ""
    inputPin.value = ""
}
function kosongkanStruk() {
    outputStruk.textContent = ""
}
function mataUangIDR(nominal) {
    nominal.toLocaleString("id-ID", { style: `currency`, currency: `IDR` })
}
function bukaKolomTerpilih(kolomTerpilih) {
    kolomRegister.style.display = "none"
    kolomPilihanMenu.style.display = "none"
    kolomLanjutTransaksi.style.display = "none"
    kolomStor.style.display = "none"
    kolomTarik.style.display = "none"
    kolomTerpilih.style.display = "block"
}
function gantiJudul(namaJudul) {
    judul.textContent = namaJudul
}
function bagianLanjutTransaksi() {
    if (lanjutTransaksiRadio.checked) {
        status = "menu"
        bukaKolomTerpilih(kolomPilihanMenu)
        gantiJudul("Menu")
        kosongkanInputRadio()
        kosongkanStruk()
        console.log(status)
        return;
    }
    else if (selesaiTransaksiRadio.checked) {
        status = "register"
        bukaKolomTerpilih(kolomRegister)
        gantiJudul("Register")
        kosongkanInputRadio()
        kosongkanInputText()
        kosongkanStruk()
        console.log(status)
        return;
    }
}


document.getElementById("myKonfirmasi").onclick = function () {

    if (status == "register") {
        if (inputNama.value.trim().length == 0) {
            outputStruk.textContent = `Masukkan nama`
        }
        else if (inputPin.value.trim().length == 0)
            outputStruk.textContent = `Masukkan PIN`
        else if (isNaN(inputPin.value)) {
            outputStruk.textContent = `Pin harus berupa angka`
        }
        else if (Number(inputPin.value) !== pinBenar) {
            outputStruk.textContent = `Pin salah`
        }
        else {
            status = "menu"
            bukaKolomTerpilih(kolomPilihanMenu)
            gantiJudul("Menu")
            kosongkanStruk()
            console.log(status)
            return;
        }
    }

    else if (status == "menu") {
        if (cekSaldoRadio.checked) {
            status = "cekSaldo"
            bukaKolomTerpilih(kolomLanjutTransaksi)
            gantiJudul("Cek Saldo")
            outputStruk.textContent = `
Nama: ${inputNama.value}
Saldo: ${saldo}
            `
            console.log(status)
            return;
        }
        else if (storTunaiRadio.checked) {
            status = "storTunai"
            bukaKolomTerpilih(kolomStor)
            gantiJudul("Stor Tunai")
            kosongkanStruk()
            console.log(status)
        }
    }

    else if (status == "cekSaldo") {
        bagianLanjutTransaksi()
    }

    else if (status == "storTunai") {
        if (isNaN(inputStor.value)) {
            outputStruk.textContent = `Nominal harus berupa angka`
        }
        else {
            let nominalStor = 0
            nominalStor = Number(inputStor.value)
            saldo = saldo + nominalStor
            outputStruk.textContent = `
Nominal stor: ${nominalStor}
Saldo akhir: ${saldo}
`
            bukaKolomTerpilih(kolomLanjutTransaksi)
            bagianLanjutTransaksi()
            return;
        }
    }
}

// masih di menu dan ceksaldo dan register