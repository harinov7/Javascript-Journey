// Data dari API jangan pernah disentuh atau dimutasi untuk display
// Untuk kebutuhan display HARUS memakai array tiruan, jangan data asli

let selectedCategory = "allCategory"
let selectedStock = "allStock"
let selectedPrice = "allPrice"
let filterSortCreateState = ""
let selectedSort = "standardSort"

// Get API
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


// INIT DATA
function inventoryCalculate(products) {
    const totalProduct = products.length
    const totalStock = products.reduce((acc, curr) => {
        return acc + curr.stock
    }, 0)
    const lowStock = products.filter(element => {
        return element.stock <= 30;
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

    const { title, category, price, stock, actions } = formatProductData(products)

    renderProductList(
        title,
        category,
        price,
        stock,
        actions
    )
}


// DETAIL DISPLAY
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
    if (productImg) {
        productImg.src = product.thumbnail || "placeholder-image-url.jpg"
        productImg.style.width = "256px"
    }
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


// FILTER SORT FEATURE
function clickFilterCreateSortButton() {
    const filterSettingsContent = document.getElementById("filterSettingsContent");
    const filterSettings = document.getElementById("filterSettings");
    const sortSettingsContent = document.getElementById("sortSettingsContent");
    const sortSettings = document.getElementById("sortSettings");
    const addProductContent = document.getElementById("addProductContent");
    const addProductSettings = document.getElementById("addProductSettings");
    const containerFilterSortBtn = document.getElementById("containerFilterSortBtn");

    containerFilterSortBtn.addEventListener("click", (event) => {
        const filterBtn = event.target.closest("#filterBtn");
        const sortBtn = event.target.closest("#sortBtn");
        const addProductBtn = event.target.closest("#addProductBtn");

        if (filterBtn) {
            filterSettings.style.display = "block";
            filterSortCreateState = "filterMenu"
            makingSureBtn(filterSettingsContent);
        }
        else if (addProductBtn) {
            addProductSettings.style.display = "block";
            filterSortCreateState = "createProductMenu"
            makingSureBtn(addProductContent)
        }
        else if (sortBtn) {
            sortSettings.style.display = "block";
            filterSortCreateState = "sortMenu"
            makingSureBtn(sortSettingsContent);
        }
    });
}
function openCategoryOptions(display, kindOfFilter) {
    const allFilterCategoryBtn = document.getElementById("allFilterCategoryBtn");
    const allFilterStockBtn = document.getElementById("allFilterStockBtn")
    display.style.display = "none";
    kindOfFilter.addEventListener("click", () => {
        if (display.style.display === "none") {
            display.style.display = "flex";
        }
        else {
            display.style.display = "none";
        }
    });

}
function confirmCancelClick(products) {
    const filterCategoryType = document.getElementById("filterCategoryType");
    const confirmButton = document.getElementById("confirmButton");
    const filterSettings = document.getElementById("filterSettings");
    const sortSettings = document.getElementById("sortSettings");
    const addProductSettings = document.getElementById("addProductSettings");

    const createTitleInput = document.getElementById("createTitleInput");
    const createCategoryInput = document.getElementById("createCategoryInput");
    const createPriceInput = document.getElementById("createPriceInput");
    const createStockInput = document.getElementById("createStockInput");
    const createDescriptionInput = document.getElementById("createDescriptionInput");
    const createBrandInput = document.getElementById("createBrandInput");
    const inputFile = document.getElementById("inputFile");
    const warningAddProduct = document.getElementById("warningAddProduct");
    const successMsg = document.getElementById("successMsg");

    confirmButton.addEventListener("click", (event) => {
        const cancel = event.target.closest("#cancel");
        const confirm = event.target.closest("#confirm");

        if (cancel) {
            filterSettings.style.display = "none";
            sortSettings.style.display = "none";

            addProductSettings.style.display = "none";
            warningAddProduct.style.visibility = "hidden"
            createTitleInput.value = ""
            createCategoryInput.value = ""
            createPriceInput.value = ""
            createStockInput.value = ""
            createDescriptionInput.value = ""
            createBrandInput.value = ""

        }
        else if (confirm) {

            if (filterSortCreateState === "filterMenu" || filterSortCreateState === "sortMenu") {
                filterSettings.style.display = "none";
                sortSettings.style.display = "none";
                const dataSorted = finalFilterSortData(products);
                const data = formatProductData(dataSorted);

                renderProductList(
                    data.title,
                    data.category,
                    data.price,
                    data.stock,
                    data.actions
                )
            }
            else if (filterSortCreateState === "createProductMenu") {
                if (createTitleInput.value === "" ||
                    createCategoryInput.value === "" ||
                    createPriceInput.value === "" ||
                    createStockInput.value === "" ||
                    createDescriptionInput.value === "" ||
                    inputFile.value === ""
                ) {
                    warningAddProduct.style.visibility = "visible";
                } else {
                    acceptData(products)
                    warningAddProduct.style.visibility = "hidden";
                    addProductSettings.style.display = "none";
                    console.log(products)
                    const { title, category, price, stock, actions } = formatProductData(products);

                    renderProductList(
                        title,
                        category,
                        price,
                        stock,
                        actions
                    )
                    createTitleInput.value = ""
                    createCategoryInput.value = ""
                    createPriceInput.value = ""
                    createStockInput.value = ""
                    createDescriptionInput.value = ""
                    createBrandInput.value = ""
                    inputFile.value = ""

                    filterCategoryType.innerHTML = `<button id="allCategoryBtn" value="allCategory">All</button>`
                    renderCategoryFilter(products)

                    successMsg.style.display = "flex";
                    successMsg.style.opacity = "1";
                    setTimeout(() => {
                        successMsg.style.opacity = "0";
                        setTimeout(() => {
                            successMsg.style.display = "none";
                        }, 500);
                    }, 3000);
                }

            }

        }
    });
}
function finalFilterSortData(sourceOfTruthData) {
    let workingProducts = [...sourceOfTruthData]

    workingProducts = workingProducts.filter(product => {
        return categoryRules(product)
            && stockRules(product)
            && priceRules(product);
    })

    switch (selectedSort) {
        case "standardSort":
            return workingProducts;
        case "lowToHighPrice":
            return workingProducts.sort((a, b) => a.price - b.price);
        case "highToLowPrice":
            return workingProducts.sort((a, b) => b.price - a.price);
        case "increaseAlphabet":
            return workingProducts.sort((a, b) => a.title.localeCompare(b.title));
        case "decreaseAlphabet":
            return workingProducts.sort((a, b) => b.title.localeCompare(a.title));
    }
}
function filterSortFeatureClose() {
    const productBar = document.getElementById("productBar");
    const filterSettings = document.getElementById("filterSettings");
    const sortSettings = document.getElementById("sortSettings");
    const addProductSettings = document.getElementById("addProductSettings");

    const createTitleInput = document.getElementById("createTitleInput");
    const createCategoryInput = document.getElementById("createCategoryInput");
    const createPriceInput = document.getElementById("createPriceInput");
    const createStockInput = document.getElementById("createStockInput");
    const createDescriptionInput = document.getElementById("createDescriptionInput");
    const createBrandInput = document.getElementById("createBrandInput");
    const warningAddProduct = document.getElementById("warningAddProduct");

    filterSettings.addEventListener("click", (event) => {
        if (event.target === filterSettings) {
            filterSettings.style.display = "none";
        }
    })
    sortSettings.addEventListener("click", (event) => {
        if (event.target === sortSettings) {
            sortSettings.style.display = "none";
        }
    })
    addProductSettings.addEventListener("click", (event) => {
        if (event.target === addProductSettings) {
            addProductSettings.style.display = "none";
            createTitleInput.value = ""
            createCategoryInput.value = ""
            createPriceInput.value = ""
            createStockInput.value = ""
            createDescriptionInput.value = ""
            createBrandInput.value = ""
            warningAddProduct.style.visibility = "hidden";

        }
    })
}
function renderCategoryFilter(sourceOfTruthData) {
    const filterCategoryType = document.getElementById("filterCategoryType")

    const categories = [... new Set(
        sourceOfTruthData.map(product => product.category)
    )]

    categories.forEach(category => {
        const button = document.createElement("button");
        button.textContent = category;
        button.value = category;

        filterCategoryType.appendChild(button);
    });
}

// FILTER FEATURE WORKS
// CATEGORY FILTER
function categoryActive() {
    const filterCategoryType = document.getElementById("filterCategoryType");
    const allCategoryBtn = document.getElementById("allCategoryBtn");
    const beautyCategoryBtn = document.getElementById("beautyCategoryBtn");
    const fragrancesCategoryBtn = document.getElementById("fragrancesCategoryBtn");
    const furnitureCategoryBtn = document.getElementById("furnitureCategoryBtn");
    const groceriesCategoryBtn = document.getElementById("groceriesCategoryBtn");

    filterCategoryType.addEventListener("click", (event) => {
        selectedCategory = event.target.value

        const categoryButtons =
            filterCategoryType.querySelectorAll("button");

        categoryButtons.forEach(button => {
            button.style.backgroundColor = "hsl(0, 20%, 35%)";
        });

        event.target.style.backgroundColor = "hsl(0, 20%, 25%)";
    })
}
function categoryRules(product) {
    if (selectedCategory === "allCategory") {
        return true;
    }
    return product.category === selectedCategory

}
// STOCK FILTER
function stockActive() {
    const filterStockType = document.getElementById("filterStockType");
    const allStockBtn = document.getElementById("allStockBtn");
    const outOfStockBtn = document.getElementById("outOfStockBtn");
    const lowStockBtn = document.getElementById("lowStockBtn");
    const highStockBtn = document.getElementById("highStockBtn");

    filterStockType.addEventListener("click", (event) => {
        selectedStock = event.target.value

        if (selectedStock === "allStock") {
            allStockBtn.style.backgroundColor = "hsl(0, 20%, 25%)";

            outOfStockBtn.style.backgroundColor = "hsl(0, 20%, 35%)";
            lowStockBtn.style.backgroundColor = "hsl(0, 20%, 35%)";
            highStockBtn.style.backgroundColor = "hsl(0, 20%, 35%)";
        }
        else if (selectedStock === "outOfStock") {
            allStockBtn.style.backgroundColor = "hsl(0, 20%, 35%)";

            outOfStockBtn.style.backgroundColor = "hsl(0, 20%, 25%)";

            lowStockBtn.style.backgroundColor = "hsl(0, 20%, 35%)";
            highStockBtn.style.backgroundColor = "hsl(0, 20%, 35%)";
        }
        else if (selectedStock === "lowStock") {
            allStockBtn.style.backgroundColor = "hsl(0, 20%, 35%)";
            outOfStockBtn.style.backgroundColor = "hsl(0, 20%,35%)";

            lowStockBtn.style.backgroundColor = "hsl(0, 20%, 25%)";

            highStockBtn.style.backgroundColor = "hsl(0, 20%, 35%)";
        }
        else if (selectedStock === "highStock") {
            allStockBtn.style.backgroundColor = "hsl(0, 20%, 35%)";
            outOfStockBtn.style.backgroundColor = "hsl(0, 20%, 35%)";
            lowStockBtn.style.backgroundColor = "hsl(0, 20%, 35%)";

            highStockBtn.style.backgroundColor = "hsl(0, 20%, 25%)";
        }
    })
}
function stockRules(product) {
    switch (selectedStock) {
        case "allStock":
            return true;
        case "outOfStock":
            return product.stock === 0;
        case "lowStock":
            return product.stock <= 30;
        case "highStock":
            return product.stock > 30;
    }
}

// PRICE FILTER
function priceActive() {
    const filterPriceType = document.getElementById("filterPriceType");
    const allPriceBtn = document.getElementById("allPriceBtn");
    const under50Btn = document.getElementById("under50Btn");
    const range50100Btn = document.getElementById("range50100Btn");
    const above100Btn = document.getElementById("above100Btn");

    filterPriceType.addEventListener("click", (event) => {
        selectedPrice = event.target.value

        if (selectedPrice === "allPrice") {
            allPriceBtn.style.backgroundColor = "hsl(0, 20%, 25%)";

            under50Btn.style.backgroundColor = "hsl(0, 20%, 35%)";
            range50100Btn.style.backgroundColor = "hsl(0, 20%, 35%)";
            above100Btn.style.backgroundColor = "hsl(0, 20%, 35%)";
        }
        else if (selectedPrice === "under50") {
            allPriceBtn.style.backgroundColor = "hsl(0, 20%, 35%)";

            under50Btn.style.backgroundColor = "hsl(0, 20%, 25%)";

            range50100Btn.style.backgroundColor = "hsl(0, 20%, 35%)";
            above100Btn.style.backgroundColor = "hsl(0, 20%, 35%)";
        }
        else if (selectedPrice === "50-100") {
            allPriceBtn.style.backgroundColor = "hsl(0, 20%, 35%)";
            under50Btn.style.backgroundColor = "hsl(0, 20%,35%)";

            range50100Btn.style.backgroundColor = "hsl(0, 20%, 25%)";

            above100Btn.style.backgroundColor = "hsl(0, 20%, 35%)";
        }
        else if (selectedPrice === "above100") {
            allPriceBtn.style.backgroundColor = "hsl(0, 20%, 35%)";
            under50Btn.style.backgroundColor = "hsl(0, 20%, 35%)";
            range50100Btn.style.backgroundColor = "hsl(0, 20%, 35%)";

            above100Btn.style.backgroundColor = "hsl(0, 20%, 25%)";
        }
    })
}
function priceRules(product) {
    switch (selectedPrice) {
        case "allPrice":
            return true;
        case "under50":
            return product.price <= 50;
        case "50-100":
            return product.price > 50 && product.price <= 100;
        case "above100":
            return product.price > 100;
    }
}

// PRICE SORT
function sortActive() {
    const sortCompBtn = document.getElementById("sortCompBtn");
    const standardsortBtn = document.getElementById("standardsortBtn");
    const lowToHighPriceBtn = document.getElementById("lowToHighPriceBtn");
    const highToLowPriceBtn = document.getElementById("highToLowPriceBtn");
    const increaseAlphabetBtn = document.getElementById("increaseAlphabetBtn");
    const decreaseAlphabetBtn = document.getElementById("decreaseAlphabetBtn");

    sortCompBtn.addEventListener("click", (event) => {
        selectedSort = event.target.value

        if (selectedSort === "standardSort") {
            standardsortBtn.style.backgroundColor = "hsl(0, 20%, 25%)";

            lowToHighPriceBtn.style.backgroundColor = "hsl(0, 20%, 35%)";
            highToLowPriceBtn.style.backgroundColor = "hsl(0, 20%, 35%)";
            increaseAlphabetBtn.style.backgroundColor = "hsl(0, 20%, 35%)";
            decreaseAlphabetBtn.style.backgroundColor = "hsl(0, 20%, 35%)";
        }
        else if (selectedSort === "lowToHighPrice") {
            standardsortBtn.style.backgroundColor = "hsl(0, 20%, 35%)";

            lowToHighPriceBtn.style.backgroundColor = "hsl(0, 20%, 25%)";

            highToLowPriceBtn.style.backgroundColor = "hsl(0, 20%, 35%)";
            increaseAlphabetBtn.style.backgroundColor = "hsl(0, 20%, 35%)";
            decreaseAlphabetBtn.style.backgroundColor = "hsl(0, 20%, 35%)";
        }
        else if (selectedSort === "highToLowPrice") {
            standardsortBtn.style.backgroundColor = "hsl(0, 20%, 35%)";
            lowToHighPriceBtn.style.backgroundColor = "hsl(0, 20%, 35%)";

            highToLowPriceBtn.style.backgroundColor = "hsl(0, 20%, 25%)";
            increaseAlphabetBtn.style.backgroundColor = "hsl(0, 20%, 35%)";
            decreaseAlphabetBtn.style.backgroundColor = "hsl(0, 20%, 35%)";
        }
        else if (selectedSort === "increaseAlphabet") {
            standardsortBtn.style.backgroundColor = "hsl(0, 20%, 35%)";
            lowToHighPriceBtn.style.backgroundColor = "hsl(0, 20%, 35%)";
            highToLowPriceBtn.style.backgroundColor = "hsl(0, 20%, 35%)";

            increaseAlphabetBtn.style.backgroundColor = "hsl(0, 20%, 25%)";

            decreaseAlphabetBtn.style.backgroundColor = "hsl(0, 20%, 35%)";
        }
        else if (selectedSort === "decreaseAlphabet") {
            standardsortBtn.style.backgroundColor = "hsl(0, 20%, 35%)";
            lowToHighPriceBtn.style.backgroundColor = "hsl(0, 20%, 35%)";
            highToLowPriceBtn.style.backgroundColor = "hsl(0, 20%, 35%)";
            increaseAlphabetBtn.style.backgroundColor = "hsl(0, 20%, 35%)";

            decreaseAlphabetBtn.style.backgroundColor = "hsl(0, 20%, 25%)";
        }
    })
}


// SEARCH FEATURE
function productFilteringSearch(products, keyword) {
    return products.filter(value =>
        value.title.toLowerCase().includes(keyword)
    )
}
function filteredSearchData(products) {
    const searchInput = document.getElementById("searchInput");

    const keyword = searchInput.value.toLowerCase().trim();

    const filteredProducts = productFilteringSearch(products, keyword);
    return formatProductData(filteredProducts)
}
function searchProductRender(products) {
    const submitBtn = document.getElementById("submitBtn");
    submitBtn.addEventListener("click", () => {
        const data = filteredSearchData(products)
        renderProductList(
            data.title,
            data.category,
            data.price,
            data.stock,
            data.actions
        )
    })
}


// CRUD
function acceptData(sourceOfTruthData) {
    const createTitleInput = document.getElementById("createTitleInput");
    const createCategoryInput = document.getElementById("createCategoryInput");
    const createBrandInput = document.getElementById("createBrandInput")
    const createPriceInput = document.getElementById("createPriceInput");
    const createStockInput = document.getElementById("createStockInput");
    const createDescriptionInput = document.getElementById("createDescriptionInput");
    const inputFile = document.getElementById("inputFile");

    const file = inputFile.files[0]
    const thumbnail = URL.createObjectURL(file)
    sourceOfTruthData.push({
        id: generateProductId(sourceOfTruthData),
        title: createTitleInput.value,
        description: createDescriptionInput.value,
        category: createCategoryInput.value,
        price: Number(createPriceInput.value),
        stock: Number(createStockInput.value),
        brand: createBrandInput.value === "" ? "Tidak memiliki brand" : createBrandInput.value,
        thumbnail: thumbnail
    })
}


// TOOLS
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
function makingSureBtn(parent) {
    const confirmButton = document.getElementById("confirmButton");

    if (!parent.contains(confirmButton)) {
        confirmButton.style.display = "flex";
        parent.appendChild(confirmButton);
    }
}
function formatProductData(productsArray) {
    let title = ``
    let category = ``
    let price = ``
    let stock = ``
    let actions = ``

    productsArray.forEach((value, index) => {
        title += `${value.title.trim().split(/\s+/).slice(0, 3).join(' ')}\n`
        category += `${value.category}\n`
        price += `${value.price.toLocaleString('us-US', { style: "currency", currency: "USD" })}\n`
        stock += `${value.stock}\n`
        actions += `<button data-product-id="${value.id}">Detail</button>`
    });

    return { title, category, price, stock, actions };
}
function generateProductId(products) {
    let newId;

    do {
        newId = Math.floor(Math.random() * 1000);
    } while (products.some(product => product.id === newId));

    return newId;
}


// ORKESTRATOR
async function main() {
    const products = await getData();

    const originalProducts = products.products
    const sourceOfTruthData = [...originalProducts]

    const filterCategoryType = document.getElementById("filterCategoryType");
    const allFilterCategoryBtn = document.getElementById("allFilterCategoryBtn");
    const filterStockType = document.getElementById("filterStockType");
    const allFilterStockBtn = document.getElementById("allFilterStockBtn");
    const filterPriceType = document.getElementById("filterPriceType");
    const allFilterPriceBtn = document.getElementById("allFilterPriceBtn");

    renderInitialData(sourceOfTruthData);
    clickDetailButton(sourceOfTruthData)
    modalClose()
    searchProductRender(sourceOfTruthData);
    clickFilterCreateSortButton()
    categoryActive()
    stockActive()
    priceActive()
    confirmCancelClick(sourceOfTruthData)
    openCategoryOptions(filterCategoryType, allFilterCategoryBtn);
    openCategoryOptions(filterStockType, allFilterStockBtn);
    openCategoryOptions(filterPriceType, allFilterPriceBtn);
    sortActive()
    filterSortFeatureClose()
    renderCategoryFilter(sourceOfTruthData)
}

main()