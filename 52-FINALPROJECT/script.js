// Get Data Products From API
import { getData } from './js/api/getData.js';

// Filter Feature
import { categoryActive, renderCategoryFilter } from './js/features/filter-sort/filter/category_filter.js';
import { stockActive } from './js/features/filter-sort/filter/stock_filter.js';
import { priceActive } from './js/features/filter-sort/filter/price_filter.js';

// Initial Info
import { renderInitialData } from './js/initial_data/initial_data.js';

// Modal Logic
import { modalClose, clickDetailButton } from './js/features/product_detail/modal.js';

// CRUD
import { editProduct, saveCancelEdit } from './js/features/crud/edit.js';
import { deleteProduct } from './js/features/crud/delete.js';

// Sort Feature
import { sortActive } from './js/features/filter-sort/sort/sort_active.js';

// Filter-sort Utils
import { openFilterOptions } from './js/features/filter-sort/open_options.js';

// + Create
import { clickFilterCreateSortButton, filterSortCreateFeatureClose } from './js/features/menu/open_close_menu.js';
import { confirmCancelClick } from './js/features/menu/confirm_cancel.js';

// Search Feature
import { searchProductRender } from './js/features/search/search.js';

// Local Storage
import { getLocalData, saveLocalData } from './js/storage/product_storage.js';

// ORKESTRATOR
async function main() {
    // Data dari API jangan pernah disentuh atau dimutasi untuk display
    // Untuk kebutuhan display HARUS memakai array tiruan, jangan data asli
    let products;
    const localData = getLocalData()
    if (localData === null) {
        products = await getData();
        if (!products) return;
        products = products.products
    }
    else {
        products = localData
    }

    const sourceOfTruthData = structuredClone(products)

    const filterCategoryType = document.getElementById("filterCategoryType");
    const allFilterCategoryBtn = document.getElementById("allFilterCategoryBtn");
    const filterStockType = document.getElementById("filterStockType");
    const allFilterStockBtn = document.getElementById("allFilterStockBtn");
    const filterPriceType = document.getElementById("filterPriceType");
    const allFilterPriceBtn = document.getElementById("allFilterPriceBtn");

    renderInitialData(sourceOfTruthData);
    clickDetailButton(sourceOfTruthData)
    modalClose(sourceOfTruthData)
    searchProductRender(sourceOfTruthData);
    clickFilterCreateSortButton()
    categoryActive()
    stockActive()
    priceActive()
    confirmCancelClick(sourceOfTruthData)
    openFilterOptions(filterCategoryType, allFilterCategoryBtn);
    openFilterOptions(filterStockType, allFilterStockBtn);
    openFilterOptions(filterPriceType, allFilterPriceBtn);
    sortActive()
    filterSortCreateFeatureClose()
    renderCategoryFilter(sourceOfTruthData)
    deleteProduct(sourceOfTruthData)
    editProduct(sourceOfTruthData)
    saveCancelEdit(sourceOfTruthData)
}

main()