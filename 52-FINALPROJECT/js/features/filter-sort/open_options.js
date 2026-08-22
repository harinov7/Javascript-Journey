export function openFilterOptions(display, kindOfFilter) {
    display.style.display = "none";
    kindOfFilter.addEventListener("click", () => {
        if (display.style.display === "none") {
            display.style.display = "flex";
        }
        else {
            display.style.display = "none";
        }
    });

}