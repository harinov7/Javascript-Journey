import { appState } from "../../../state/app_state.js";

export function priceActive() {
    const filterPriceType = document.getElementById("filterPriceType");

    filterPriceType.addEventListener("click", (event) => {
        appState.selectedPrice = event.target.value
        const priceButtons = filterPriceType.querySelectorAll("button");
        priceButtons.forEach(button => {
            button.style.backgroundColor = "hsl(0, 20%, 35%)";
        })
        if (!event.target.matches("button")) return;
        event.target.style.backgroundColor = "hsl(0, 20%, 25%)";
    })
}
export function priceRules(product) {
    switch (appState.selectedPrice) {
        case "allPrice":
            return true;
        case "under50":
            return product.price <= 50;
        case "50-100":
            return product.price > 50 && product.price <= 100;
        case "above100":
            return product.price > 100;
    }
}