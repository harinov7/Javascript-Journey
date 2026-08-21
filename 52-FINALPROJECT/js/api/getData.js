// Data dari API jangan pernah disentuh atau dimutasi untuk display
// Untuk kebutuhan display HARUS memakai array tiruan, jangan data asli

export async function getData() {
    const loadingPage = document.getElementById("loadingPage")
    const inventoryManagementSystem = document.getElementById("inventoryManagementSystem");

    loadingPage.style.display = "flex";
    loadingPage.style.justifyContent = "center";
    loadingPage.style.alignItems = "center";
    inventoryManagementSystem.style.display = "none";

    try {
        const response = await fetch(`https://dummyjson.com/products`)

        if (!response.ok) {
            throw new Error(`Failed to load products.
Please try again.`)
        }
        const data = await response.json()
        inventoryManagementSystem.style.display = "block"

        return data
    } catch (error) {
        console.error(error)
        return null;
    } finally {
        loadingPage.style.display = "none";
    }
}