import { appState } from "../../../state/app_state.js";

export function categoryActive() {
    const filterCategoryType = document.getElementById("filterCategoryType");
    filterCategoryType.addEventListener("click", (event) => {
        if (!event.target.matches("button")) return;
        appState.selectedCategory = event.target.value
        const categoryButtons = filterCategoryType.querySelectorAll("button");
        categoryButtons.forEach(button => {
            button.style.backgroundColor = "hsl(0, 20%, 35%)";
        });
        event.target.style.backgroundColor = "hsl(0, 20%, 25%)";
    })
}
export function categoryRules(product) {
    if (appState.selectedCategory === "allCategory") {
        return true;
    }
    return product.category === appState.selectedCategory

}
export function renderCategoryFilter(sourceOfTruthData) {
    const filterCategoryType = document.getElementById("filterCategoryType")

    filterCategoryType.replaceChildren();
    const categories = [... new Set(
        sourceOfTruthData.map(product => product.category)
    )]

    categories.forEach(category => {
        const button = document.createElement("button");
        button.textContent = category;
        button.value = category;

        filterCategoryType.appendChild(button);
    });
}