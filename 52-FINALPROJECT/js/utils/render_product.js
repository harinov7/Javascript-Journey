export function renderProductList(products, category, price, stock, action) {
    const compBtn = document.getElementById("compBtn");
    const productKolom = document.querySelector("#productKolom pre");
    const categoryKolom = document.querySelector("#categoryKolom pre");
    const priceKolom = document.querySelector("#priceKolom pre");
    const stockKolom = document.querySelector("#stockKolom pre");

    productKolom.textContent = products;
    categoryKolom.textContent = category;
    priceKolom.textContent = price;
    stockKolom.textContent = stock;
    compBtn.innerHTML = action;
}