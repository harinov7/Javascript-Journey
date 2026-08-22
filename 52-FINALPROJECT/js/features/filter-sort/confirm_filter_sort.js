import { appState } from "../../state/app_state.js";
import { categoryRules } from '../filter-sort/filter/category_filter.js';
import { stockRules } from '../filter-sort/filter/stock_filter.js';
import { priceRules } from '../filter-sort/filter/price_filter.js';
import { formatProductData } from "../../utils/format_data.js";
import { renderProductList } from '../../utils/render_product.js';

function finalFilterSortData(productList) {
    let workingProducts = [...productList]

    workingProducts = workingProducts.filter(product => {
        return categoryRules(product)
            && stockRules(product)
            && priceRules(product);
    })

    switch (appState.selectedSort) {
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

export function confirmFilterSort(productList) {
    const filterSettings = document.getElementById("filterSettings");
    const sortSettings = document.getElementById("sortSettings");
    filterSettings.style.display = "none";
    sortSettings.style.display = "none";
    const dataSorted = finalFilterSortData(productList);
    const data = formatProductData(dataSorted);

    renderProductList(
        data.title,
        data.category,
        data.price,
        data.stock,
        data.actions
    )
}