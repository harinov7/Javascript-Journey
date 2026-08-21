export function formatProductData(productList) {
    let title = ``
    let category = ``
    let price = ``
    let stock = ``
    let actions = ``

    productList.forEach((value) => {
        title += `${value.title.trim().split(/\s+/).slice(0, 3).join(' ')}\n`
        category += `${value.category}\n`
        price += `${value.price.toLocaleString('us-US', { style: "currency", currency: "USD" })}\n`
        stock += `${value.stock}\n`
        actions += `<button data-product-id="${value.id}">Detail</button>`
    });

    return { title, category, price, stock, actions };
}