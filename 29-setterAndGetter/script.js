// setter itu mengatur apa yang bisa masuk ke object class
// SEBALIKNYA
// getter itu mengatur apa yang bisa keluar dari object class

// Contoh kode:

class Person {
    constructor(name, age) {
        this.name = name;
        this._age = age;
    }
    
    // Mengatur kalau age diisi negatif, maka hasilnya tidak valid
    set age(value) {
        if (value < 0) {
            console.log("Umur tidak valid");
            return;
        }

        this._age = value; // ada prefix "_" itu memberitahu bahwa "ini adalah private property. jangan disentuh"
    }

    // Setelah pengisian age diatur, maka keluarnya pun harus diatur agar tidak undefined
    get age() {
        return this._age;
    }
}