// try { } -> berisi kode yang 'kayanya' ini bakal eror deh
// catch { } -> berisi kode yang kalo kode didalam try { } itu eror, kode didalam ini bakal di eksekusi

// finally { } -> (opsional), eror ga eror pun kode didalam ini tetap di eksekusi.

// try catch biasanya dipakai untuk kebutuhan eror yang gabisa di prediksi kapan datangnya
// bukan eror karena kesalahan kode
// Jadi try catch digunakan untuk menangani eror, agar kode dibawahnya bisa tetap jalan 
// tanpa terhambat error dari kode diatas

try {
    console.log("Hi")
}

catch (error){
    console.log(error) // untuk developer

    console.log("Gagal menyapa, coba lagi.") // untuk ditampilkan ke user
}

finally {
    console.log("This will execute anyway")
}