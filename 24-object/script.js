// object = biasanya isinya ada variabel dan/atau function.
// bisa membuat objek kayak didunia nyata kayak misal orang, tempat, benda, produk, dsb
// key:value

// Contoh kode

const orang1 = {
    namaDepan: "Spongebob", 
    namaBelakang: "Squarepants",
    umur: 25,
    menyapa: function() {console.log(`Halo, dari ${this.namaDepan} umurku ${orang1.umur}`)},
    // bisa pake arrow function
    lapar: () => {console.log(`aku ${orang1.namaDepan} ${orang1.namaBelakang} dan aku ingin makan`)}
}

console.log(orang1.namaBelakang) // akses pake keynya
orang1.menyapa() // akses functionnya
orang1.lapar()

// Sekalian disini aja dah. ada this keyword. digunakan ketika context nya pasti.
// contohnya kayak di baris 11. bagian this.namaDepan itu artinya orang1.namaDepan. karena konteknya udah pasti orang1