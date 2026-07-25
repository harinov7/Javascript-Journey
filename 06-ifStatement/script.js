document.getElementById("mySubmit").onclick = function () {
    const namaSiswa = document.getElementById("namaSiswa");
    const nilaiTugas = document.getElementById("nilaiTugas");
    const nilaiUTS = document.getElementById("nilaiUTS");
    const nilaiUAS = document.getElementById("nilaiUAS");
    let hasilSiswa = document.getElementById("hasilSiswa");

    let lembarHasilSiswa;

    let tugas = Number(nilaiTugas.value);
    let UTS = Number(nilaiUTS.value);
    let UAS = Number(nilaiUAS.value);

    // Memastikan input sesuai
    if (namaSiswa.value.length === 0){
        lembarHasilSiswa = `Nama tidak boleh dikosongkan`
    }
    else if (tugas < 0 || tugas > 100 || Number.isNaN(tugas)) {
        lembarHasilSiswa = `Nilai tidak valid\nMasukkan angka 0 - 100 1`
    }
    else if (UTS < 0 || UTS > 100 || Number.isNaN(UTS)) {
        lembarHasilSiswa = `Nilai tidak valid\nMasukkan angka 0 - 100 2`
    }
    else if (UAS < 0 || UAS > 100 || Number.isNaN(UAS)) {
        lembarHasilSiswa = `Nilai tidak valid\nMasukkan angka 0 - 100 3`
    }
    else {
        let nilaiAkhirTugas = (20 * tugas / 100);
        let nilaiAkhirUTS = (30 * UTS / 100);
        let nilaiAkhirUAS =(50 * UAS / 100);

        let nilaiAkhirKeseluruhan = nilaiAkhirTugas + nilaiAkhirUTS + nilaiAkhirUAS

        let predikatSiswa;
        let status;
        // Menentukan predikat siswa
        if (nilaiAkhirKeseluruhan >= 90 && nilaiAkhirKeseluruhan <= 100) {
            predikatSiswa = "A"
        }
        else if (nilaiAkhirKeseluruhan >= 80 && nilaiAkhirKeseluruhan < 90) {
            predikatSiswa = "B"
        }
        else if (nilaiAkhirKeseluruhan >= 70 && nilaiAkhirKeseluruhan < 80) {
            predikatSiswa = "C"
        }
        else if (nilaiAkhirKeseluruhan >= 60 && nilaiAkhirKeseluruhan < 70) {
            predikatSiswa = "D"
        }
        else {
            predikatSiswa = "E"
        }
        // Mengubah status
        if (nilaiAkhirKeseluruhan >= 75) {
            status = "LULUS"
        }
        else {
            status = "TIDAK LULUS"
        }

        console.log(tugas)
        console.log(UTS)
        console.log(UAS)
        lembarHasilSiswa = `===== HASIL PENILAIAN =====\nNama : ${namaSiswa.value}\nNilai Akhir : ${nilaiAkhirKeseluruhan.toFixed(2)}\n\nPredikat : ${predikatSiswa}\nStatus : ${status}`

    }
    hasilSiswa.textContent = lembarHasilSiswa
}