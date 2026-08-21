import { generateProductId } from "../../utils/generate_id.js";

export function acceptData(productList) {
    const createTitleInput = document.getElementById("createTitleInput");
    const createCategoryInput = document.getElementById("createCategoryInput");
    const createBrandInput = document.getElementById("createBrandInput")
    const createPriceInput = document.getElementById("createPriceInput");
    const createStockInput = document.getElementById("createStockInput");
    const createDescriptionInput = document.getElementById("createDescriptionInput");
    const inputFile = document.getElementById("inputFile");

    const file = inputFile.files[0]
    const thumbnail = URL.createObjectURL(file)
    productList.push({
        id: generateProductId(productList),
        title: createTitleInput.value,
        description: createDescriptionInput.value,
        category: createCategoryInput.value,
        price: Number(createPriceInput.value),
        stock: Number(createStockInput.value),
        brand: createBrandInput.value === "" ? "Tidak memiliki brand" : createBrandInput.value,
        thumbnail: thumbnail
    })
}