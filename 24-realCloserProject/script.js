const halamanSatu = document.getElementById("halamanSatu");
const namaAdminInput = document.getElementById("namaAdminInput");

const halamanDua = document.getElementById("halamanDua");
const jumlahBarangInput = document.getElementById("jumlahBarangInput");

const halamanTiga = document.getElementById("halamanTiga");
const dataBarangLabel = document.getElementById("dataBarangLabel");
const namaBarangInput = document.getElementById("namaBarangInput");
const hargaBarangInput = document.getElementById("hargaBarangInput");
const stokBarangInput = document.getElementById("stokBarangInput")

const halamanLaporan = document.getElementById("halamanLaporan");
const outputLaporan = document.getElementById("outputLaporan");

const konfirmasiBtn = document.getElementById("konfirmasiBtn");
const selanjutnyaBtn = document.getElementById("selanjutnyaBtn");
const prosesBtn = document.getElementById("prosesBtn");
const selesaiBtn = document.getElementById("selesaiBtn");

const pesanError = document.getElementById("pesanError");

const hanyaHuruf = /^[a-zA-Z ]+$/
let status = "register"

let jumlahBarang = 0
let nomorDataBarang = 1

let dataBarang = []

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

konfirmasiBtn.onclick = () => {
    if (status === "register") {
        if (namaAdminInput.value.trim().length === 0) {
            pesanError.textContent = `Nama tidak boleh kosong`
        }
        else if (!hanyaHuruf.test(namaAdminInput.value)) {
            pesanError.textContent = `Nama harus berupa huruf`
        }
        else {
            status = "jumlahBarang"
            hapusPesanError()
            bukaHalaman(halamanDua)
        }
    }

    else if (status === "jumlahBarang") {
        if (Number(jumlahBarangInput.value) <= 0) {
            pesanError.textContent = `Jumlah barang tidak valid`
        }
        else if (Number(jumlahBarangInput.value) % 1 !== 0) {
            pesanError.textContent = `Jumlah barang tidak bisa desimal`
        }
        else {
            jumlahBarang += Number(jumlahBarangInput.value)
            hapusPesanError()
            bukaHalaman(halamanTiga)
            status = "pendataan"
        }
    }

    else if (status === "pendataan") {
        if (namaBarangInput.value.trim().length === 0) {
            pesanError.textContent = `Nama barang belum terisi`
        }
        else if (Number(hargaBarangInput.value) <= 0) {
            pesanError.textContent = `Harga barang tidak valid`
        }
        else if (Number(stokBarangInput.value) <= 0) {
            pesanError.textContent = `Stok barang tidak valid`
        }
        else if (nomorDataBarang === jumlahBarang) {
            halamanTiga.style.display = "none"
            konfirmasiBtn.style.display = "none"
            prosesBtn.style.display = "inline"
            halamanLaporan.style.display = "inline"
            outputLaporan.textContent = "Semua barang berhasil terdata"
            dataBarang.push({
                nama: namaBarangInput.value,
                harga: Number(hargaBarangInput.value),
                stok: Number(stokBarangInput.value)
            })
            pesanError.textContent = ``
            console.log(dataBarang)
        }
        else {
            status = "barangSelanjutnya"
            nomorDataBarang++
            selanjutnyaBtn.style.display = "inline"
            dataBarang.push({
                nama: namaBarangInput.value,
                harga: Number(hargaBarangInput.value),
                stok: Number(stokBarangInput.value)
            })
            pesanError.textContent = ``
            console.log(nomorDataBarang)
        }
    }
}



selanjutnyaBtn.onclick = () => {
    if (status === "barangSelanjutnya") {
        status = "pendataan"
        dataBarangLabel.textContent = `DATA BARANG ${nomorDataBarang}`
        namaBarangInput.value = ``
        hargaBarangInput.value = ``
        stokBarangInput.value = ``
        selanjutnyaBtn.style.display = "none"
        console.log(dataBarang)
    }
}



prosesBtn.onclick = () => {
    namaBarangInput.value = ``
    hargaBarangInput.value = ``
    stokBarangInput.value = ``
    const namaKapital = dataBarang.map((element) => {
        return element.nama.charAt(0).toUpperCase() + element.nama.slice(1).toLowerCase()
    })
    let daftarBarang = ``
    let hargaTertinggi = 0
    let hargaTertinggiTeks = ``
    let hargaTerendah = 9999999
    let hargaTerendahTeks = ``
    const daftarBarangHampirHabis = dataBarang.filter((element) => element.stok <= 5)
    const barangHampirHabis = daftarBarangHampirHabis.length
    const daftarBarangAman = dataBarang.filter((element) => element.stok > 5)
    const barangAman = daftarBarangAman.length
    const totalNilaiInventory = dataBarang.reduce((previous, next) => {
        return previous + (next.harga * next.stok)
    }, 0)
    dataBarang.forEach(({ nama, harga, stok }, index) => {
        daftarBarang += `
${index + 1}. ${namaKapital[index]}
   Harga: ${mataUangIDR(harga)}
   Stok: ${stok}
   Status: ${stok <= 5 ? "Hampir habis" : "Aman"}
`
        if (harga > hargaTertinggi) {
            hargaTertinggi = harga
            hargaTertinggiTeks = nama
        }
        if (harga < hargaTerendah) {
            hargaTerendah = harga
            hargaTerendahTeks = nama
        }
    })
    const rataRata = totalNilaiInventory / dataBarang.length
    outputLaporan.textContent = `
========== INVENTORY ==========

Admin : ${namaAdminInput.value.charAt(0).toUpperCase() + namaAdminInput.value.slice(1).toLowerCase()}

==============================
${daftarBarang}
------------------------------

Jumlah Barang :
${jumlahBarang}

Total Nilai Inventory :
${mataUangIDR(totalNilaiInventory)}

Harga Tertinggi :
${hargaTertinggiTeks}

Harga Terendah :
${hargaTerendahTeks}

Rata-rata Harga :
${mataUangIDR(rataRata.toFixed(2))}

Barang Hampir Habis :
${barangHampirHabis}

Barang Aman :
${barangAman}
`

    prosesBtn.style.display = "none"
}