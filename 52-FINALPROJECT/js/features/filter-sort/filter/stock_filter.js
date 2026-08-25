import { appState } from "../../../state/app_state.js";

export function stockActive() {
    const filterStockType = document.getElementById("filterStockType");
    filterStockType.addEventListener("click", (event) => {
        const stockButtons = filterStockType.querySelectorAll("button")
        if (!event.target.matches("button")) {
            appState.selectedStock = "allStock";
            stockButtons.forEach(button => {
                button.style.backgroundColor = "hsl(0, 20%, 35%)";
            });
            return;
        }
        appState.selectedStock = event.target.value
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