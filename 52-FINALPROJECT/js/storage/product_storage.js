export function saveLocalData(productList) {
    try {
        localStorage.setItem('products', JSON.stringify(productList))
    }
    catch (error) {
        console.error("Failed to save products to local storage.", error)
    }
}
export function getLocalData() {
    const dataMentah = localStorage.getItem('products')

    try {
        const data = JSON.parse(dataMentah);

        if (!Array.isArray(data)) {
            return null;
        }

        return data;
    }
    catch (error) {
        console.error("Invalid local storage data", error);
        return null
    }

}
export function clearAllLocalData() {
    localStorage.clear()
}