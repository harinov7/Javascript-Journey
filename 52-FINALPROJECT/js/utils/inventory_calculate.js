export function inventoryCalculate(productList) {
    const totalProduct = productList.length
    const totalStock = productList.reduce((acc, curr) => {
        return acc + curr.stock
    }, 0)
    const lowStock = productList.filter(element => {
        return element.stock <= 30;
    })

    return [totalProduct, totalStock, lowStock]
}