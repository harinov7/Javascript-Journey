import { generateProductId } from "../../utils/generate_id.js";
import { formatProductData } from "../../utils/format_data.js";
import { renderProductList } from "../../utils/render_product.js";
import { renderCategoryFilter } from "../filter-sort/filter/category_filter.js";
import { inventoryCalculate } from "../../utils/inventory_calculate.js";
import { saveLocalData } from "../../storage/product_storage.js";
import { fileToBase64 } from "../../utils/file_to_base64.js";

export async function acceptData(productList) {
    const createTitleInput = document.getElementById("createTitleInput");
    const createCategoryInput = document.getElementById("createCategoryInput");
    const createBrandInput = document.getElementById("createBrandInput")
    const createPriceInput = document.getElementById("createPriceInput");
    const createStockInput = document.getElementById("createStockInput");
    const createDescriptionInput = document.getElementById("createDescriptionInput");
    const inputFile = document.getElementById("inputFile");

    const file = inputFile.files[0]
    const base64 = await fileToBase64(file)

    productList.push({
        id: generateProductId(productList),
        title: createTitleInput.value,
        description: createDescriptionInput.value,
        category: createCategoryInput.value,
        price: Number(createPriceInput.value),
        stock: Number(createStockInput.value),
        brand: createBrandInput.value === "" ? "Tidak memiliki brand" : createBrandInput.value,
        thumbnail: base64
    })
}
export async function confirmCreate(productList) {
    const totalProductDisplay = document.querySelector("#totalProduk p");
    const totalStockDisplay = document.querySelector("#totalStock p");
    const lowStockDisplay = document.querySelector("#lowStock p");

    const filterCategoryType = document.getElementById("filterCategoryType");

    const addProductSettings = document.getElementById("addProductSettings");

    const createTitleInput = document.getElementById("createTitleInput");
    const createCategoryInput = document.getElementById("createCategoryInput");
    const createPriceInput = document.getElementById("createPriceInput");
    const createStockInput = document.getElementById("createStockInput");
    const createDescriptionInput = document.getElementById("createDescriptionInput");
    const createBrandInput = document.getElementById("createBrandInput");
    const warningAddProduct = document.getElementById("warningAddProduct");
    const inputFile = document.getElementById("inputFile");
    const successMsg = document.getElementById("successMsg");
    
    const emptyData = document.getElementById("emptyData");

    if (createTitleInput.value === "" ||
        createCategoryInput.value === "" ||
        createPriceInput.value === "" ||
        createStockInput.value === "" ||
        createDescriptionInput.value === "" ||
        inputFile.value === ""
    ) {
        warningAddProduct.style.visibility = "visible";
        warningAddProduct.textContent =`Fill the require input and must be fit to the input`;
    }
    else if (createTitleInput.value.length > 30) {
        warningAddProduct.style.visibility = "visible";
        warningAddProduct.textContent = `Title max input is 30`;
    }
    else {
        await acceptData(productList)
        warningAddProduct.style.visibility = "hidden";
        addProductSettings.style.display = "none";
        const { title, category, price, stock, actions } = formatProductData(productList);

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
        renderCategoryFilter(productList)

        successMsg.textContent = `Add product success!`
        successMsg.style.display = "flex";
        successMsg.style.opacity = "1";
        setTimeout(() => {
            successMsg.style.opacity = "0";
            setTimeout(() => {
                successMsg.style.display = "none";
            }, 500);
        }, 3000);

        const [totalProduct, totalStock, lowStock] = inventoryCalculate(productList)
        totalProductDisplay.textContent = totalProduct
        totalStockDisplay.textContent = totalStock
        lowStockDisplay.textContent = lowStock.length
        emptyData.style.display = "none";

        saveLocalData(productList)
    }
}