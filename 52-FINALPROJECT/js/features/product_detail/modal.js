import { appState } from '../../state/app_state.js'

export function clickDetailButton(productList) {
    const modalDisplay = document.getElementById("modalDisplay");
    const compBtn = document.getElementById("compBtn");
    compBtn.addEventListener("click", (event) => {
        if (!event.target.matches("button")) return;
        const productId = Number(event.target.dataset.productId);
        appState.activeProductId = productId

        modalDisplay.style.display = "block";
        const product = productList.find(value => value.id === productId);

        modalOpen(product)
    })
}
export function modalOpen(productList) {
    const modalTitle = document.getElementById("modalTitle");
    const modalCategory = document.getElementById("modalCategory");
    const modalBrand = document.getElementById("modalBrand");
    const modalPrice = document.getElementById("modalPrice");
    const modalStock = document.getElementById("modalStock");
    const modalDescription = document.getElementById("modalDescription");
    const productImg = document.getElementById("productImg");

    modalTitle.textContent = productList.title
    modalCategory.textContent = `Category: ${productList.category}`
    modalBrand.textContent = `Brand: ${productList.brand !== undefined ? productList.brand : "Tidak memiliki brand"}`
    modalPrice.textContent = `Price: ${productList.price.toLocaleString("us-US", {
        style: "currency",
        currency: "USD"
    })}`
    modalStock.textContent = `Stock Available: ${productList.stock}`
    modalDescription.textContent = `Description: ${productList.description}`
    if (productImg) {
        productImg.src = productList.thumbnail || "placeholder-image-url.jpg"
        productImg.style.width = "256px"
    }
}
export function modalClose(productList) {
    const modalDisplay = document.getElementById("modalDisplay");
    const modalCloseBtn = document.getElementById("modalCloseBtn");
    const editInput = document.querySelectorAll(".editInput");
    const editDeleteComp = document.getElementById("editDeleteComp");
    const saveCancelBtn = document.getElementById("saveCancelBtn");
    const productImg = document.getElementById("productImg");
    const imageURL = document.getElementById("imageURL");

    modalCloseBtn.addEventListener("click", () => {
        modalDisplay.style.display = "none";
    })
    modalDisplay.addEventListener("click", (event) => {
        if (event.target === modalDisplay) {
            modalDisplay.style.display = "none";
            if (appState.activeProductId !== null) {
                editInput.forEach(e => {
                    e.style.display = "none";
                });
                editDeleteComp.style.display = "flex";
                saveCancelBtn.style.display = "none";
                productImg.style.display = "block";
                imageURL.style.display = "none";
                modalCloseBtn.style.display = "block";
                const product = productList.find(value => value.id === appState.activeProductId);
                modalOpen(product)
            }
        }
    })
}