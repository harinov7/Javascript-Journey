import { appState } from '../../state/app_state.js';
import { confirmCreate } from '../crud/add.js';
import { confirmFilterSort } from '../filter-sort/confirm_filter_sort.js';

export function confirmCancelClick(productList) {
    const confirmButton = document.getElementById("confirmButton");
    const filterSettings = document.getElementById("filterSettings");
    const sortSettings = document.getElementById("sortSettings");
    const filterCategoryType = document.getElementById("filterCategoryType");
    const filterStockType = document.getElementById("filterStockType");
    const filterPriceType = document.getElementById("filterPriceType");
    const addProductSettings = document.getElementById("addProductSettings");

    const createTitleInput = document.getElementById("createTitleInput");
    const createCategoryInput = document.getElementById("createCategoryInput");
    const createPriceInput = document.getElementById("createPriceInput");
    const createStockInput = document.getElementById("createStockInput");
    const createDescriptionInput = document.getElementById("createDescriptionInput");
    const createBrandInput = document.getElementById("createBrandInput");
    const warningAddProduct = document.getElementById("warningAddProduct");

    confirmButton.addEventListener("click", async (event) => {
        const cancel = event.target.closest("#cancel");
        const confirm = event.target.closest("#confirm");

        filterCategoryType.style.display = "none";
        filterStockType.style.display = "none";
        filterPriceType.style.display = "none";
        
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
            if (appState.filterSortCreateState === "filterMenu" || appState.filterSortCreateState === "sortMenu") {
                confirmFilterSort(productList)
            }
            else if (appState.filterSortCreateState === "createProductMenu") {
                await confirmCreate(productList)
            }
        }
    });
}