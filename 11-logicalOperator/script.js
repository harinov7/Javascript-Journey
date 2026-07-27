const namaMahasiswa = document.getElementById("namaMahasiswa");
const nilaiAkademik = document.getElementById("nilaiAkademik");
const penghasilanOrangTua = document.getElementById("penghasilanOrangTua");
const semester = document.getElementById("semester");
const statusAktif = document.getElementById("statusAktif");
const statusCuti = document.getElementById("statusCuti");
const lembarHasil = document.getElementById("lembarHasil");

document.getElementById("mySubmit").onclick = function () {
    if (namaMahasiswa.value.trim().length === 0) {
        lembarHasil.textContent = `Nama tidak boleh kosong`
    }
    else {
        let namaLengkap = namaMahasiswa.value.trim().charAt(0).toUpperCase() + namaMahasiswa.value.trim().slice(1).toLowerCase()
        let nilai = Number(nilaiAkademik.value)
        if (nilaiAkademik.value.trim().length === 0) {
            lembarHasil.textContent = `Nilai belum terisi`
        }
        else if (nilai < 0 || nilai > 100) {
            lembarHasil.textContent = `Nilai harus berada pada rentang 0 sampai 100`
        }
        else {
            let penghasilan = Number(penghasilanOrangTua.value)
            console.log(penghasilan)
            if (penghasilanOrangTua.value.length === 0) {
                lembarHasil.textContent = `Penghasilan belum terisi`
            }
            else if (penghasilan < 0) {
                lembarHasil.textContent = `Penghasilan tidak boleh bernilai negatif`
            }
            else {

                let semesterSekarang = Number(semester.value)
                if (semester.value.trim().length === 0) {
                    lembarHasil.textContent = `Semester harus berada pada rentang 1 sampai 14`
                }
                else if (semesterSekarang < 1 || semesterSekarang > 14) {
                    lembarHasil.textContent = `Semester harus berada pada rentang 1 sampai 14`
                }
                else {
                    
                    let status;
                    if (statusAktif.checked) {
                        status = `Aktif`
                    }
                    else if (statusCuti.checked) {
                        status = `Cuti`
                    }
                    
                    let predikat;
                    if (nilai >= 95) {
                        predikat = `Outstanding`
                    }
                    else if (nilai >= 90) {
                        predikat = `Excellent`
                    }
                    else if (nilai >= 85) {
                        predikat = `Very Good`
                    }
                    else {
                        predikat = `Not Eligible`
                    }

                    let keputusan;
                    if (nilai >= 85 && penghasilan <= 4000000 && semesterSekarang >= 2 && semesterSekarang <= 8 && status == 'Aktif') {
                        keputusan = `DITERIMA`
                    }
                    else {
                        keputusan = `DITOLAK`
                    }
                    lembarHasil.textContent = `
===== HASIL SELEKSI =====

Nama : ${namaLengkap}

Nilai : ${nilai}

Semester : ${semesterSekarang}

Status : ${status}

Penghasilan : ${penghasilan.toLocaleString("id-ID", { style: `currency`, currency: `IDR` })}

Predikat : ${predikat}

Keputusan : ${keputusan}

    `
                }
            }
        }
    }
}