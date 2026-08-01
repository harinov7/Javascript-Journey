let banyakBuah = ["Apel", "Pisang", "Mangga"];

banyakBuah[3] = "Markisa";

// Method untuk menambahkan value dipaling belakang
banyakBuah.push("Kelengkeng");

// Method untuk mengeluarkan/menghapus suatu value diurutan paling belakang
banyakBuah.pop();

// Menambahkan value dipaling depan
banyakBuah.unshift("Duku")

// Menghapus value dipaling depan
banyakBuah.shift();

console.log(banyakBuah[0]);
console.log(banyakBuah[banyakBuah.length - 1])
console.log(banyakBuah)

// Untuk mengurutkan value didalam array berdasarkan huruf depan
banyakBuah.sort()

// shortcut atau cara simpel untuk show value array (disini contoh yang udah di urutkan sesuai abjad)
for (let buah of banyakBuah) {
    console.log(buah)
}