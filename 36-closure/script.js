function test() {
    let angka = 10;
    
    function increment(){
        angka++;
        console.log(angka)
        return
    }
    return increment; // Belum dijalankan, artinya hanya return 'mesinnya' saja
}

let show = test()

show() // Jalankannya disini
show()

// Closure adalah 

// Closure adalah kemampuan sebuah function untuk tetap mengakses variabel dari scope tempat ia dibuat, 
// meskipun outer function sudah selesai dijalankan. Hal ini terjadi karena inner function masih 
// mereferensikan variabel tersebut, sehingga JavaScript mempertahankannya di memory. Variabel tersebut
// juga dapat berperan sebagai private variable(dulu konsep closure sebagai private variable sering dipakai), 
// karena tidak bisa diakses langsung dari luar dan hanya dapat diubah melalui function yang memiliki closure.