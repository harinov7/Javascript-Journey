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

function inventoryCalculate(products) {
    const totalProduct = products.length
    const totalStock = products.reduce((acc, curr) => {
        return acc + curr.stock
    }, 0)
    const lowStock = products.filter(element => {
        return element.stock <= 5
    })

    return [totalProduct, totalStock, lowStock]
}

function renderInitialData(products) {
    const totalProductDisplay = document.querySelector("#totalProduk p");
    const totalStockDisplay = document.querySelector("#totalStock p");
    const lowStockDisplay = document.querySelector("#lowStock p");

    const [totalProduct, totalStock, lowStock] = inventoryCalculate(products)
    totalProductDisplay.textContent = totalProduct
    totalStockDisplay.textContent = totalStock
    lowStockDisplay.textContent = lowStock.length

    const { daftarProduct, category, price, stock, actions } = formatProductData(products)

    renderProductList(
        daftarProduct,
        category,
        price,
        stock,
        actions
    )
}

function modalOpen(product) {
    const modalTitle = document.getElementById("modalTitle");
    const modalCategory = document.getElementById("modalCategory");
    const modalBrand = document.getElementById("modalBrand");
    const modalPrice = document.getElementById("modalPrice");
    const modalStock = document.getElementById("modalStock");
    const modalDescription = document.getElementById("modalDescription");
    const productImg = document.getElementById("productImg");

    modalTitle.textContent = product.title
    modalCategory.textContent = `Category: ${product.category}`
    modalBrand.textContent = `Brand: ${product.brand !== undefined ? product.brand : "Tidak memiliki brand"}`
    modalPrice.textContent = `Price: ${product.price.toLocaleString("us-US", {
        style: "currency",
        currency: "USD"
    })}`
    modalStock.textContent = `Stock Available: ${product.stock}`
    modalDescription.textContent = `Description: ${product.description}`
    productImg.src = product.thumbnail
}

function modalClose() {
    const modalDisplay = document.getElementById("modalDisplay");
    const modalCloseBtn = document.getElementById("modalCloseBtn");

    modalCloseBtn.addEventListener("click", () => {
        modalDisplay.style.display = "none";
    })
    modalDisplay.addEventListener("click", (event) => {
        if (event.target === modalDisplay) {
            modalDisplay.style.display = "none";
        }
    })
}

function clickDetailButton(productsArray) {
    const modalDisplay = document.getElementById("modalDisplay");
    const compBtn = document.getElementById("compBtn");
    compBtn.addEventListener("click", (event) => {
        if (!event.target.matches("button")) return;
        const productId = Number(event.target.dataset.productId);

        modalDisplay.style.display = "block";
        const product = productsArray.find(value => value.id === productId);

        modalOpen(product)
    })
}

function clickFilterSortButton() {
    const filterSettingsContent = document.getElementById("filterSettingsContent");
    const filterSettings = document.getElementById("filterSettings");
    const sortSettingsContent = document.getElementById("sortSettingsContent");
    const sortSettings = document.getElementById("sortSettings");
    const containerFilterSortBtn = document.getElementById("containerFilterSortBtn");

    containerFilterSortBtn.addEventListener("click", (event) => {
        const filterBtn = event.target.closest("#filterBtn");
        const sortBtn = event.target.closest("#sortBtn");

        if (filterBtn) {
            filterSettings.style.display = "block";
            makingSureBtn(filterSettingsContent);
        }
        else if (sortBtn) {
            sortSettings.style.display = "block";
            makingSureBtn(sortSettingsContent);
        }
    });
}

function makingSureBtn(parent) {
    const confirmButton = document.getElementById("confirmButton");

    if (!parent.contains(confirmButton)) {
        confirmButton.style.display = "flex";
        parent.appendChild(confirmButton);
    }
}

function confirmCancelClick() {
    const confirmButton = document.getElementById("confirmButton");
    const filterSettings = document.getElementById("filterSettings");
    const sortSettings = document.getElementById("sortSettings");

    confirmButton.addEventListener("click", (event) => {
        const cancel = event.target.closest("#cancel");
        const confirm = event.target.closest("#confirm");

        if (cancel) {
            filterSettings.style.display = "none";
            sortSettings.style.display = "none";
        }
        else if (confirm) {
            return;
        }
    });
}

function productFiltering(products) {
    const searchInput = document.getElementById("searchInput");

    const keyword = searchInput.value.toLowerCase().trim();

    return products.filter(value =>
        value.title.toLowerCase().includes(keyword)
    )
}

function filteredData(products) {
    const filteredProducts = productFiltering(products);
    return formatProductData(filteredProducts)
}

function searchProduct(products) {
    const submitBtn = document.getElementById("submitBtn");
    submitBtn.addEventListener("click", () => {
        const data = filteredData(products)
        renderProductList(
            data.daftarProduct,
            data.category,
            data.price,
            data.stock,
            data.actions
        )
    })
}

function renderProductList(products, category, price, stock, action) {
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

async function main() {
    const products = await getData();
    renderInitialData(products.products);
    clickDetailButton(products.products)
    modalClose()
    searchProduct(products.products);
    clickFilterSortButton()
    confirmCancelClick()
}

main()