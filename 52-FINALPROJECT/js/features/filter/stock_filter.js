import { appState } from "../../state/app_state.js";

export function stockActive() {
    const filterStockType = document.getElementById("filterStockType");
    filterStockType.addEventListener("click", (event) => {
        appState.selectedStock = event.target.value
        const stockButtons = filterStockType.querySelectorAll("button")
        stockButtons.forEach(button => {
            button.style.backgroundColor = "hsl(0, 20%, 35%)";
        });
        if (!event.target.matches("button")) return;
        event.target.style.backgroundColor = "hsl(0, 20%, 25%)";
    });
}
export function stockRules(product) {
    switch (appState.selectedStock) {
        case "allStock":
            return true;
        case "outOfStock":
            return product.stock === 0;
        case "lowStock":
            return product.stock <= 30;
        case "highStock":
            return product.stock > 30;
    }
}