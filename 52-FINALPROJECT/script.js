// Data dari API jangan pernah disentuh atau dimutasi untuk display
// Untuk kebutuhan display HARUS memakai array tiruan, jangan data asli

import { getData } from './js/api/getData.js';
import { categoryActive, categoryRules, renderCategoryFilter } from './js/features/filter/category_filter.js';
import { stockActive, stockRules } from './js/features/filter/stock_filter.js';
import { priceActive, priceRules } from './js/features/filter/price_filter.js';
import { renderInitialData } from './js/initial_data/initial_data.js';
import { modalClose, clickDetailButton } from './js/features/product_detail/modal.js';
import { deleteProduct } from './js/features/crud/delete.js';
import { acceptData } from './js/features/crud/add.js';
import { formatProductData } from './js/utils/format_data.js';
import { renderProductList } from './js/utils/render_product.js';
import { inventoryCalculate } from './js/utils/inventory_calculate.js';
import { editProduct, saveCancelEdit } from './js/features/crud/edit.js';
import { sortActive } from './js/features/sort/sort_active.js';

let filterSortCreateState = ""
let selectedSort = "standardSort"

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
    const totalProductDisplay = document.querySelector("#totalProduk p");
    const totalStockDisplay = document.querySelector("#totalStock p");
    const lowStockDisplay = document.querySelector("#lowStock p");

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

                    const [totalProduct, totalStock, lowStock] = inventoryCalculate(products)
                    totalProductDisplay.textContent = totalProduct
                    totalStockDisplay.textContent = totalStock
                    lowStockDisplay.textContent = lowStock.length

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

// TOOLS
function makingSureBtn(parent) {
    const confirmButton = document.getElementById("confirmButton");

    if (!parent.contains(confirmButton)) {
        confirmButton.style.display = "flex";
        parent.appendChild(confirmButton);
    }
}

// ORKESTRATOR
async function main() {
    const products = await getData();

    if (!products) return;

    const originalProducts = products.products
    const sourceOfTruthData = structuredClone(originalProducts)

    const filterCategoryType = document.getElementById("filterCategoryType");
    const allFilterCategoryBtn = document.getElementById("allFilterCategoryBtn");
    const filterStockType = document.getElementById("filterStockType");
    const allFilterStockBtn = document.getElementById("allFilterStockBtn");
    const filterPriceType = document.getElementById("filterPriceType");
    const allFilterPriceBtn = document.getElementById("allFilterPriceBtn");

    renderInitialData(sourceOfTruthData);
    clickDetailButton(sourceOfTruthData)
    modalClose(sourceOfTruthData)
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
    deleteProduct(sourceOfTruthData)
    editProduct(sourceOfTruthData)
    saveCancelEdit(sourceOfTruthData)
}

main()