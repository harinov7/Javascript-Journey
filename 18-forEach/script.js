const halamanSatu = document.getElementById("halamanSatu");
const namaKasirInput = document.getElementById("namaKasirInput");

const halamanDua = document.getElementById("halamanDua");
const jumlahBarangInput = document.getElementById("jumlahBarangInput");

const halamanTiga = document.getElementById("halamanTiga");
const dataBarangLabel = document.getElementById("dataBarangLabel");
const namaBarangInput = document.getElementById("namaBarangInput");
const hargaBarangInput = document.getElementById("hargaBarangInput")

const halamanLaporan = document.getElementById("halamanLaporan");
const outputLaporan = document.getElementById("outputLaporan");

const konfirmasiBtn = document.getElementById("konfirmasiBtn");
const prosesBtn = document.getElementById("prosesBtn");
const selesaiBtn = document.getElementById("selesaiBtn")

const pesanError = document.getElementById("pesanError")

let hanyaHuruf = /^[a-zA-Z ]+$/
let status = "register"

let jumlahBarang = 0
let nomorDataBarang = 1

let namaBarangBarang = []
let hargaBarangBarang = []

function bukaHalaman(halamanTepilih) {
    halamanSatu.style.display = "none";
    halamanDua.style.display = "none";
    halamanTiga.style.display = "none";
    halamanLaporan.style.display = "none";
    halamanTepilih.style.display = "inline";
}
function hapusPesanError() {
    pesanError.textContent = ``
}
function mataUangIDR(nominal) {
    return nominal.toLocaleString("id-ID", { style: `currency`, currency: `IDR` })
}
function resetTransaksi() {
    namaBarangBarang = []
    hargaBarangBarang = []
    jumlahBarang = 0
    nomorDataBarang = 1
    jumlahBarangInput.value = ``
    dataBarangLabel.textContent = `DATA BARANG ${nomorDataBarang}`
}
function simpanBarang() {
    namaBarangBarang.push(namaBarangInput.value)
    hargaBarangBarang.push(Number(hargaBarangInput.value))
}
function formatKapital(namaBarang) {
    return namaBarang.charAt(0).toUpperCase() + namaBarang.slice(1).toLowerCase()
}

konfirmasiBtn.onclick = function () {
    if (status === "register") {
        if (namaKasirInput.value.trim().length === 0) {
            pesanError.textContent = `Nama tidak boleh kosong`
        }
        else if (!hanyaHuruf.test(namaKasirInput.value)) {
            pesanError.textContent = `Nama harus berupa huruf`
        }
        else {
            hapusPesanError()
            bukaHalaman(halamanDua)
            status = "jumlahBarang"
        }
    }

    else if (status === "jumlahBarang") {
        if (Number(jumlahBarangInput.value) <= 0) {
            pesanError.textContent = `Jumlah barang tidak valid`
        }
        else {
            jumlahBarang += Number(jumlahBarangInput.value)
            hapusPesanError()
            bukaHalaman(halamanTiga)
            status = "pendataan"
        }
    }

    else if (status === "pendataan") {
        if (nomorDataBarang === jumlahBarang) {
            simpanBarang()
            halamanTiga.style.display = "none"
            konfirmasiBtn.style.display = "none"
            prosesBtn.style.display = "inline"
            halamanLaporan.style.display = "inline"
            namaBarangInput.value = ``
            hargaBarangInput.value = ``
            outputLaporan.textContent = "Semua barang berhasil terdata"
        }
        else if (nomorDataBarang > jumlahBarang) {
            pesanError.textContent = `Semua barang sudah terdata`
        }
        else if (namaBarangInput.value.trim().length === 0) {
            pesanError.textContent = `Nama barang belum terisi`
        }
        else if (Number(hargaBarangInput.value) <= 0) {
            pesanError.textContent = `Harga barang tidak valid`
        }
        else {
            nomorDataBarang++
            dataBarangLabel.textContent = `DATA BARANG ${nomorDataBarang}`
            simpanBarang()
            namaBarangInput.value = ``
            hargaBarangInput.value = ``
        }
    }

    else if (status === "lembarLaporan") {
        status = "jumlahBarang"
        konfirmasiBtn.textContent = `Konfirmasi`
        resetTransaksi()
        outputLaporan.textContent = ``
        bukaHalaman(halamanDua)
    }
}

prosesBtn.onclick = function () {
    let daftarBarang = ""
    let kategoriBarang = ""
    let hargaTertinggi = 0
    let hargaTertinggiTeks = ""
    let hargaTerendah = 99999999
    let hargaTerendahTeks = ""
    let totalBelanja = 0
    namaBarangBarang.forEach((value, index) => {
        daftarBarang += `
${index + 1}. ${formatKapital(value)}
${hargaBarangBarang[index].toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
(${kategoriBarang = hargaBarangBarang[index] < 20000 ? "Murah" :
                hargaBarangBarang[index] <= 50000 ? "Sedang" :
                    "Mahal"})\n\n`

        totalBelanja += hargaBarangBarang[index]
        if (hargaBarangBarang[index] > hargaTertinggi) {
            hargaTertinggi = hargaBarangBarang[index]
            hargaTertinggiTeks = `${mataUangIDR(hargaBarangBarang[index])} - ${formatKapital(value)}`
        }
        if (hargaBarangBarang[index] < hargaTerendah) {
            hargaTerendah = hargaBarangBarang[index]
            hargaTerendahTeks = `${mataUangIDR(hargaBarangBarang[index])} - ${formatKapital(value)}`
        }
    })

    let hargaRataRata = totalBelanja / hargaBarangBarang.length
    outputLaporan.textContent = `
========== TOKO ==========

Kasir : ${namaKasirInput.value}

Daftar Barang
${daftarBarang}
--------------------

Jumlah Barang : ${jumlahBarang}

Total Belanja : ${mataUangIDR(totalBelanja)}

Harga Tertinggi : ${hargaTertinggiTeks}

Harga Terendah : ${hargaTerendahTeks}

Rata-rata Harga : ${mataUangIDR(hargaRataRata)}
`
    prosesBtn.style.display = "none"
    konfirmasiBtn.style.display = "inline"
    selesaiBtn.style.display = "inline"
    konfirmasiBtn.textContent = "Lanjut Transaksi"
    status = "lembarLaporan"
    resetTransaksi()
}

selesaiBtn.onclick = function () {
    status = "register"
    konfirmasiBtn.textContent = `Konfirmasi`
    selesaiBtn.style.display = "none"
    resetTransaksi()
    outputLaporan.textContent = ``
    namaKasirInput.value = ``
    bukaHalaman(halamanSatu)
}