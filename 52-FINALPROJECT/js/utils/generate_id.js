export function generateProductId(products) {
    let newId;

    do {
        newId = Math.floor(Math.random() * 1000);
    } while (products.some(product => product.id === newId));

    return newId;
}