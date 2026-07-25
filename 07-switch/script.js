document.getElementById("mySubmit").onclick = function () {
    const namaPelanggan = document.getElementById("namaPelanggan");
    const paketPilihan = document.getElementById("paketPilihan");
    const lamaBulan = document.getElementById("lamaBulan");

    let kosongan = ""
    let errorMessage = document.getElementById("errorMessage");
    let struk = document.getElementById("struk");
    
    errorMessage.textContent = kosongan
    struk.textContent = kosongan

    let nama = namaPelanggan.value;
    let namaPaket;
    let pilihan = Number(paketPilihan.value)
    let harga;
    let durasi = Number(lamaBulan.value);
    let diskon = 0;
    let total;

    if (Number.isNaN(pilihan)) {
        errorMessage.textContent = "Masukkan angka untuk paket"
    }
    else {
        switch (pilihan) {
            case 1:
                namaPaket = "Basic"
                harga = 50000
                break;
            case 2:
                namaPaket = "Standard"
                harga = 75000
                break;
            case 3:
                namaPaket = "Premium"
                harga = 100000
                break;
            default:
                errorMessage.textContent = "paket tidak tersedia"
                break;
        }
        if (nama.trim().length === 0) {
            struk.textContent = "Nama harus diisi dengan benar"
        }
        else {
            if (Number.isFinite(harga)) {
                if (durasi <= 0) {
                    errorMessage.textContent = "durasi tidak valid"
                }
                else {
                    total = harga * durasi;
                    if (durasi >= 12) {
                        diskon = 10 * total / 100
                    }

                    let totalKeseluruhan = total - diskon;

                    struk.textContent = `
===== PEMBAYARAN =====
Nama : ${nama}
Paket : ${namaPaket}
Harga : ${harga.toLocaleString("id-ID", { style: `currency`, currency: `IDR` })}
Diskon : ${diskon.toLocaleString("id-ID", { style: `currency`, currency: `IDR` })}
Total : ${totalKeseluruhan.toLocaleString("id-ID", { style: `currency`, currency: `IDR` })}
`
                }
            }
            else {
                struk.textContent = "Coba lagi"

            }
        }
    }
}