import { appState } from "../../state/app_state.js";

export function sortActive() {
    const sortCompBtn = document.getElementById("sortCompBtn");


    sortCompBtn.addEventListener("click", (event) => {
        appState.selectedSort = event.target.value
        const sortButtons = sortCompBtn.querySelectorAll("button");
        sortButtons.forEach(button => {
            button.style.backgroundColor = "hsl(0, 20%, 35%)";
        })
        if (!event.target.matches("button")) return;
        event.target.style.backgroundColor = "hsl(0, 20%, 25%)";
    })
}