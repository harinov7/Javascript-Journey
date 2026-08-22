export function saveLocalData(productList) {
    localStorage.setItem('products', JSON.stringify(productList))
}
export function getLocalData() {
    const dataMentah = localStorage.getItem('products')
    return JSON.parse(dataMentah)
}
export function clearAllLocalData() {
    localStorage.clear()
}