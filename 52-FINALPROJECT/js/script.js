const productKolom = document.querySelector("#productKolom pre");
const categoryKolom = document.querySelector("#categoryKolom pre");
const priceKolom = document.querySelector("#priceKolom pre");
const stockKolom = document.querySelector("#stockKolom pre");
const searchInput = document.getElementById("searchInput");
const submitBtn = document.getElementById("submitBtn");
const actionKolom = document.getElementById("actionKolom");
const compBtn = document.getElementById("compBtn");
const modalDisplay = document.getElementById("modalDisplay");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalBrand = document.getElementById("modalBrand");
const modalPrice = document.getElementById("modalPrice");
const modalStock = document.getElementById("modalStock");
const modalDescription = document.getElementById("modalDescription");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const productImg = document.getElementById("productImg");

async function getData() {
    const loadingPage = document.getElementById("loadingPage")
    const inventoryManagementSystem = document.getElementById("inventoryManagementSystem");

    loadingPage.style.display = "flex";
    loadingPage.style.justifyContent = "center";
    loadingPage.style.alignItems = "center";
    inventoryManagementSystem.style.display = "none";

    try {
        const response = await fetch(`https://dummyjson.com/products`)

        if (!response.ok) {
            throw new Error(`Failed to load products.
Please try again.`)
        }
        const data = await response.json()
        inventoryManagementSystem.style.display = "block"

        return data
    } catch (error) {
        console.error(error)
    } finally {
        loadingPage.style.display = "none";
    }
}

function formatProductData(productsArray) {
    let daftarProduct = ``
    let category = ``
    let price = ``
    let stock = ``
    let actions = ``

    productsArray.forEach((value, index) => {
        daftarProduct += `${value.title.trim().split(/\s+/).slice(0, 3).join(' ')}\n`
        category += `${value.category}\n`
        price += `${value.price.toLocaleString('us-US', { style: "currency", currency: "USD" })}\n`
        stock += `${value.stock}\n`
        actions += `<button data-product-id="${value.id}">Detail</button>`
    });

    return { daftarProduct, category, price, stock, actions };
}

function renderInitialData(products) {
    const totalProductDisplay = document.querySelector("#totalProduk p");
    const totalStockDisplay = document.querySelector("#totalStock p");
    const lowStockDisplay = document.querySelector("#lowStock p");

    const totalProduct = products.length
    const totalStock = products.reduce((acc, curr) => {
        return acc + curr.stock
    }, 0)
    const lowStock = products.filter(element => {
        return element.stock <= 5
    })

    totalProductDisplay.textContent = totalProduct
    totalStockDisplay.textContent = totalStock
    lowStockDisplay.textContent = lowStock.length

    const { daftarProduct, category, price, stock, actions } = formatProductData(products)

    changeProductList(
        daftarProduct,
        category,
        price,
        stock,
        actions
    )
}

function modalClose() {
    modalCloseBtn.addEventListener("click", () => {
        modalDisplay.style.display = "none";
    })
    modalDisplay.addEventListener("click", (event) => {
        if (event.target === modalDisplay) {
            modalDisplay.style.display = "none";
        }
    })
}

function modal(productsArray) {
        compBtn.addEventListener("click", (event) => {
            if (!event.target.matches("button")) return;
            const productId = Number(event.target.dataset.productId);

            modalDisplay.style.display = "block";
            const product = productsArray.find(value => value.id === productId);

            modalTitle.textContent = product.title
            modalCategory.textContent = product.category
            modalBrand.textContent = `${product.brand !== undefined ? product.brand : "Tidak memiliki brand"}`
            modalPrice.textContent = product.price.toLocaleString("us-US", {
                style: "currency",
                currency: "USD"
            })
            modalStock.textContent = product.stock
            modalDescription.textContent = product.description
            productImg.src = product.thumbnail
        })
    modalClose()
}

function productFiltering(products) {
    const keyword = searchInput.value.toLowerCase().trim();

    return products.filter(value =>
            value.title.toLowerCase().includes(keyword)
        )
}
function searchProduct(products) {
    submitBtn.addEventListener("click", () => {
        const filteredProducts = productFiltering(products);

        const data = formatProductData(filteredProducts)
            
        changeProductList(
            data.daftarProduct,
            data.category,
            data.price,
            data.stock,
            data.actions
        )
    })
}

function changeProductList(products, category, price, stock, action) {
    productKolom.textContent = products;
    categoryKolom.textContent = category;
    priceKolom.textContent = price;
    stockKolom.textContent = stock;
    compBtn.innerHTML = action;
}

async function main() {
    const products = await getData();
    renderInitialData(products.products);
    modal(products.products);
    searchProduct(products.products);
}

main()

// Belum membuat modal