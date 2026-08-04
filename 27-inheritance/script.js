// inheritance yaitu mewariskan property dan/atau method dari parent yang kemudian bisa dipakai di class child
// (parent -> child)
// pakai keyword extends untuk inheritance

class Animal{
    isAlive = true;

    eat(){
        console.log(`This ${this.name} is eating`)
    }
}

class Rabbit extends Animal{
    name = "rabbit"
    // boleh pakai ini tanpa constructor ataupun static.
    // jadi setiap bikin object class Rabbit, nama rabbit otomatis di assign
}

const rabbit = new Rabbit

console.log(rabbit.name)
rabbit.eat()