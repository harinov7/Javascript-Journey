import { appState } from "../../state/app_state.js";
import { formatProductData } from "../../utils/format_data.js";
import { renderProductList } from "../../utils/render_product.js";
import { inventoryCalculate } from "../../utils/inventory_calculate.js";
import { modalOpen } from "../product_detail/modal.js";

export function editProduct(productList) {
    const editDeleteComp = document.getElementById("editDeleteComp");
    const saveCancelBtn = document.getElementById("saveCancelBtn");

    const editBtn = document.getElementById("editBtn");
    const editInput = document.querySelectorAll(".editInput");
    const editTitleInput = document.getElementById("editTitleInput");
    const editCategoryInput = document.getElementById("editCategoryInput");
    const editBrandInput = document.getElementById("editBrandInput");
    const editPriceInput = document.getElementById("editPriceInput");
    const editStockInput = document.getElementById("editStockInput");
    const editDescriptionInput = document.getElementById("editDescriptionInput");
    const imageURL = document.getElementById("imageURL");
    const modalCloseBtn = document.getElementById("modalCloseBtn");

    const modalTitle = document.getElementById("modalTitle");
    const modalCategory = document.getElementById("modalCategory");
    const modalBrand = document.getElementById("modalBrand");
    const modalPrice = document.getElementById("modalPrice");
    const modalStock = document.getElementById("modalStock");
    const modalDescription = document.getElementById("modalDescription");
    const productImg = document.getElementById("productImg");


    editBtn.addEventListener("click", () => {
        const productIndex = productList.findIndex(
            product => product.id === appState.activeProductId
        )

        if (productIndex === -1) return;

        editInput.forEach(e => {
            e.style.display = "block";
        })
        modalCloseBtn.style.display = "none";
        editDeleteComp.style.display = "none";
        saveCancelBtn.style.display = "flex";
        imageURL.style.display = "block";
        productImg.style.display = "none";

        editTitleInput.value = productList[productIndex].title
        editCategoryInput.value = productList[productIndex].category
        editBrandInput.value = productList[productIndex].brand
        editPriceInput.value = productList[productIndex].price
        editStockInput.value = productList[productIndex].stock
        editDescriptionInput.value = productList[productIndex].description

        modalTitle.style.display = "none";
        modalCategory.textContent = `Category:`
        modalBrand.textContent = `Brand:`
        modalPrice.textContent = `Price:`
        modalStock.textContent = `Stock Available:`
        modalDescription.textContent = `Description:`
    })
}
export function saveCancelEdit(productList) {
    const totalProductDisplay = document.querySelector("#totalProduk p");
    const totalStockDisplay = document.querySelector("#totalStock p");
    const lowStockDisplay = document.querySelector("#lowStock p");

    const saveCancelBtn = document.getElementById("saveCancelBtn");
    const editInput = document.querySelectorAll(".editInput");
    const productImg = document.getElementById("productImg");
    const imageURL = document.getElementById("imageURL");
    const editDeleteComp = document.getElementById("editDeleteComp");
    const modalCloseBtn = document.getElementById("modalCloseBtn");
    const modalDisplay = document.getElementById("modalDisplay");
    const modalTitle = document.getElementById("modalTitle");

    const editTitleInput = document.getElementById("editTitleInput");
    const editCategoryInput = document.getElementById("editCategoryInput");
    const editBrandInput = document.getElementById("editBrandInput");
    const editPriceInput = document.getElementById("editPriceInput");
    const editStockInput = document.getElementById("editStockInput");
    const editDescriptionInput = document.getElementById("editDescriptionInput");
    const editImgInput = document.getElementById("editImgInput");

    saveCancelBtn.addEventListener("click", (event) => {
        const productIndex = productList.findIndex(
            product => product.id === appState.activeProductId
        )

        if (productIndex === -1) return;
        const saveBtn = event.target.closest("#saveBtn");
        const cancelBtn = event.target.closest("#cancelBtn");

        modalCloseBtn.style.display = "block";
        editDeleteComp.style.display = "flex";
        saveCancelBtn.style.display = "none";
        productImg.style.display = "block";
        imageURL.style.display = "none";

        editInput.forEach(e => {
            e.style.display = "none";
        });

        if (saveBtn) {
            productList[productIndex].title = editTitleInput.value
            productList[productIndex].category = editCategoryInput.value
            productList[productIndex].brand = editBrandInput.value
            productList[productIndex].price = Number(editPriceInput.value)
            productList[productIndex].stock = Number(editStockInput.value)
            productList[productIndex].description = editDescriptionInput.value

            modalDisplay.style.display = "none";

            const { title, category, price, stock, actions } = formatProductData(productList);

            renderProductList(
                title,
                category,
                price,
                stock,
                actions
            )
            renderCategoryFilter(productList)
            const [totalProduct, totalStock, lowStock] = inventoryCalculate(productList)
            totalProductDisplay.textContent = totalProduct
            totalStockDisplay.textContent = totalStock
            lowStockDisplay.textContent = lowStock.length

            appState.activeProductId = null;

            const file = editImgInput.files[0];

            if (file) {
                productList[productIndex].thumbnail =
                    URL.createObjectURL(file);
            }
        }
        else if (cancelBtn) {
            modalTitle.style.display = "block";
            const product = productList.find(value => value.id === appState.activeProductId);
            modalOpen(product)
        }
    })
}