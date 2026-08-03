// Mirip sama object, ini salah satu cara buat bikin object
// Kapan waktu yang pas untuk menggunakan ini adalah ketika ingin membuat object dengan struktur data
// yang sama persis dan reusable dan agar kode tidak ditulis berulang ulang


// Cara lama, yaitu memakai function

function Car(name, model, year, color) {
    this.name = name
    this.model = model
    this.year = year
    this.color = color
    this.drive = () => console.log(`${this.name} car with ${this.model} model ready to drive`)
};

const car1 = new Car("Ford", "Mustang", 2026, "Red");
const car2 = new Car("Dodge", "Bugatti", 2023, "Yellow");

car1.drive();
car2.drive()


// Cara baru dan lebih modern, yaitu memakai class (ES6 feature)

class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    displayProduct() {
        console.log(`Product: ${this.name}`)
        console.log(`Price: $${this.price.toFixed(2)}`)
    }

    totalPrice(taxes) {
        return this.price + (this.price * taxes)
    }
}

const product1 = new Product("Kiko", 2.5);
const product2 = new Product("Momogi", 5.25);

product2.displayProduct();
console.log(`The total price including taxes would be: $${product2.totalPrice(0.20).toFixed(2)}`);