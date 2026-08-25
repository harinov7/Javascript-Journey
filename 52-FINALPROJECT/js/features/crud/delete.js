import { appState } from "../../state/app_state.js";
import { saveLocalData } from "../../storage/product_storage.js";
import { formatProductData } from "../../utils/format_data.js";
import { inventoryCalculate } from "../../utils/inventory_calculate.js";
import { renderProductList } from "../../utils/render_product.js";
import { renderCategoryFilter } from "../filter-sort/filter/category_filter.js";

export function deleteProduct(productList) {
    const totalProductDisplay = document.querySelector("#totalProduk p");
    const totalStockDisplay = document.querySelector("#totalStock p");
    const lowStockDisplay = document.querySelector("#lowStock p");

    const deleteBtn = document.getElementById("deleteBtn");
    const modalDisplay = document.getElementById("modalDisplay");
    const successMsg = document.getElementById("successMsg");

    const emptyData = document.getElementById("emptyData");

    deleteBtn.addEventListener("click", (e) => {
        const productIndex = productList.findIndex(
            product => product.id === appState.activeProductId
        )
        appState.activeProductId = null;

        if (productIndex === -1) return;
        productList.splice(productIndex, 1)
        renderCategoryFilter(productList)
        if (productList.length === 0) {
            emptyData.style.display = "block";
        }
        const { title, category, price, stock, actions } = formatProductData(productList);

        renderProductList(
            title,
            category,
            price,
            stock,
            actions
        )

        const [totalProduct, totalStock, lowStock] = inventoryCalculate(productList)
        totalProductDisplay.textContent = totalProduct
        totalStockDisplay.textContent = totalStock
        lowStockDisplay.textContent = lowStock.length

        modalDisplay.style.display = "none";

        successMsg.textContent = `Delete product success!`;
        successMsg.style.display = "flex";
        successMsg.style.opacity = "1";
        setTimeout(() => {
            successMsg.style.opacity = "0";
            setTimeout(() => {
                successMsg.style.display = "none";
            }, 500);
        }, 3000);

        saveLocalData(productList)
    })
}