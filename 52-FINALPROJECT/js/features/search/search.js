import { formatProductData } from "../../utils/format_data.js";
import { renderProductList } from "../../utils/render_product.js";

function productFilteringSearch(productList, keyword) {
    return productList.filter(value =>
        value.title.toLowerCase().includes(keyword)
    )
}
function filteredSearchData(productList) {
    const searchInput = document.getElementById("searchInput");

    const keyword = searchInput.value.toLowerCase().trim();

    const filteredProducts = productFilteringSearch(productList, keyword);
    return formatProductData(filteredProducts)
}
export function searchProductRender(productList) {
    const submitBtn = document.getElementById("submitBtn");
    submitBtn.addEventListener("click", () => {
        const data = filteredSearchData(productList)
        renderProductList(
            data.title,
            data.category,
            data.price,
            data.stock,
            data.actions
        )
    })
}