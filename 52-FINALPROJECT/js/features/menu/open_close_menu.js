import { appState } from "../../state/app_state.js";

export function clickFilterCreateSortButton() {
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
            appState.filterSortCreateState = "filterMenu"
            makingSureBtn(filterSettingsContent);
        }
        else if (addProductBtn) {
            addProductSettings.style.display = "block";
            appState.filterSortCreateState = "createProductMenu"
            makingSureBtn(addProductContent)
        }
        else if (sortBtn) {
            sortSettings.style.display = "block";
            appState.filterSortCreateState = "sortMenu"
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
export function filterSortCreateFeatureClose() {
    const filterSettings = document.getElementById("filterSettings");
    const sortSettings = document.getElementById("sortSettings");
    const addProductSettings = document.getElementById("addProductSettings");
    const filterCategoryType = document.getElementById("filterCategoryType");
    const filterStockType = document.getElementById("filterStockType");
    const filterPriceType = document.getElementById("filterPriceType");

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
            filterCategoryType.style.display = "none";
            filterStockType.style.display = "none";
            filterPriceType.style.display = "none";
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