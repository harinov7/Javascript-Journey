const kolomLogin = document.getElementById("kolomLogin");
const inputNamaGuru = document.getElementById("inputNamaGuru");
const inputJumlahSiswa = document.getElementById("inputJumlahSiswa");

const kolomNilaiSiswa = document.getElementById("kolomNilaiSiswa");
const inputNilaiSiswa = document.getElementById("inputNilaiSiswa");

const konfirmasiBtn = document.getElementById("konfirmasiBtn");
const tambahNilaiBtn = document.getElementById("tambahNilaiBtn");
const prosesBtn = document.getElementById("prosesBtn");

const lembarHasil = document.getElementById("lembarHasil");


const hanyaHuruf = /^[A-Za-z ]+$/;
let status = "login";
let nilaiParaSiswa = [];
let jumlahSiswa;
let percobaanMasukkanNilai = 0

function bukaKolomTerpilih(kolomTerpilih) {
    kolomLogin.style.display = "none"
    kolomNilaiSiswa.style.display = "none"
    kolomTerpilih.style.display = "block"
}

konfirmasiBtn.onclick = function () {
    if (status == "login") {
        if (inputNamaGuru.value.trim().length === 0) {
            lembarHasil.textContent = `Nama harus terisi`
        }
        else if (!hanyaHuruf.test(inputNamaGuru.value)) {
            lembarHasil.textContent = `Nama tidak valid`
        }
        else if (Number(inputJumlahSiswa.value) <= 0) {
            lembarHasil.textContent = `Jumlah siswa tidak valid`
        }
        else if (isNaN(inputJumlahSiswa.value)) {
            lembarHasil.textContent = `Jumlah siswa harus berupa angka`
        }
        else {
            status = `pendataanNilai`
            jumlahSiswa = Number(inputJumlahSiswa.value)
            bukaKolomTerpilih(kolomNilaiSiswa)
            konfirmasiBtn.style.display = "none"
            tambahNilaiBtn.style.display = "inline"
            prosesBtn.style.display = "inline"
            lembarHasil.textContent = ``
            console.log(status)
            return;
        }
    }
    else if (status == "pendataanNilai") {
        status = "login"
        bukaKolomTerpilih(kolomLogin)
        inputNamaGuru.value = ``
        inputJumlahSiswa.value = ``
        lembarHasil.textContent = ``
        konfirmasiBtn.textContent = `Konfirmasi`
        percobaanMasukkanNilai = 0
        nilaiParaSiswa = []
        console.log(nilaiParaSiswa)
    }
}

tambahNilaiBtn.onclick = function () {
    if (percobaanMasukkanNilai == jumlahSiswa) {
        lembarHasil.textContent = `Semua siswa sudah mendapatkan nilai`
    }
    else if (isNaN(inputNilaiSiswa.value)) {
        lembarHasil.textContent = `Nilai hanya berupa angka`
    }
    else if (Number(inputNilaiSiswa.value) < 0 || Number(inputNilaiSiswa.value) > 100) {
        lembarHasil.textContent = `Nilai hanya boleh antara 0 sampai 100`
    }
    else {
        nilaiParaSiswa.push(Number(inputNilaiSiswa.value))
        percobaanMasukkanNilai++
        inputNilaiSiswa.value = ``
        console.log(jumlahSiswa)
        console.log(percobaanMasukkanNilai)
        console.log(nilaiParaSiswa)
    }
}

prosesBtn.onclick = function () {
    if (percobaanMasukkanNilai < jumlahSiswa) {
        lembarHasil.textContent = `${jumlahSiswa - percobaanMasukkanNilai} siswa lain belum terisi nilai`
    }
    else {
        let nilaiTertinggi = 0
        let nilaiTerendah = 100
        let nilaiTotal = 0
        let siswaLulus = 0
        let daftarNilai = ""
        for (let i = 0; i < nilaiParaSiswa.length; i++) {
            if (nilaiParaSiswa[i] > nilaiTertinggi) {
                nilaiTertinggi = nilaiParaSiswa[i]
            }
            if (nilaiParaSiswa[i] < nilaiTerendah) {
                nilaiTerendah = nilaiParaSiswa[i]
            }
            if (nilaiParaSiswa[i] >= 70) {
                siswaLulus++
            }
            nilaiTotal += nilaiParaSiswa[i]
            daftarNilai += `${i + 1}. ${nilaiParaSiswa[i]}\n`
            console.log(nilaiTotal)
        }
        let nilaiRataRata = nilaiTotal / jumlahSiswa
        let siswaTidakLulus = jumlahSiswa - siswaLulus
        let predikat = nilaiRataRata >= 90 ? "Outstanding" : 
        nilaiRataRata >= 80 ? "Excellent" : 
        nilaiRataRata >= 70 ? "Good" : 
        nilaiRataRata >= 60 ? "Fair" : 
        "Poor"

        konfirmasiBtn.style.display = `inline`
        tambahNilaiBtn.style.display = `none`
        lembarHasil.textContent = `
===== LAPORAN KELAS =====

Guru : ${inputNamaGuru.value}

Jumlah siswa : ${jumlahSiswa}

Daftar Nilai

${daftarNilai}
-----------------------

Total : ${nilaiTotal}

Rata-rata : ${nilaiRataRata.toFixed(2)}

Nilai tertinggi : ${nilaiTertinggi}

Nilai terendah : ${nilaiTerendah}

Lulus : ${siswaLulus} siswa

Tidak lulus : ${siswaTidakLulus} siswa

Predikat : ${predikat}
`
        konfirmasiBtn.textContent = `Kembali ke menu login`
        prosesBtn.style.display = "none"
    }
}