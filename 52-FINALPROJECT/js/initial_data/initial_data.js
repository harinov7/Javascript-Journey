import { inventoryCalculate } from "../utils/inventory_calculate.js";
import { formatProductData } from "../utils/format_data.js";
import { renderProductList } from "../utils/render_product.js";

export function renderInitialData(productList) {
    const totalProductDisplay = document.querySelector("#totalProduk p");
    const totalStockDisplay = document.querySelector("#totalStock p");
    const lowStockDisplay = document.querySelector("#lowStock p");

    const emptyData = document.getElementById("emptyData");

    const productBar = document.getElementById("productBar");

    const [totalProduct, totalStock, lowStock] = inventoryCalculate(productList)
    totalProductDisplay.textContent = totalProduct
    totalStockDisplay.textContent = totalStock
    lowStockDisplay.textContent = lowStock.length

    if (productList.length === 0) {
        emptyData.style.display = "block";
    }
    else {
        emptyData.style.display = "none";
        const { title, category, price, stock, actions } = formatProductData(productList)

        renderProductList(
            title,
            category,
            price,
            stock,
            actions
        )
    }

}