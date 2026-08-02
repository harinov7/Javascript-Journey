// forEach method = digunakan untuk looping array untuk mengeluarkan/menampilkan value nya satu persatu

// array.forEach(callback function)
// element, index, dan array disediakan


// Data daftar belanjaan di keranjang
const keranjangBelanja = [
    { nama: "Buku Tulis", harga: 5000 },
    { nama: "Pulpen", harga: 3000 },
    { nama: "Penghapus", harga: 2000 }
];

let totalHarga = 0;

// Menggunakan forEach untuk menjumlahkan harga
keranjangBelanja.forEach((barang) => {
    totalHarga += barang.harga;
    console.log(`Beli: ${barang.nama} - Harga: Rp${barang.harga}`);
});

console.log(`Total yang harus dibayar: Rp${totalHarga}`);