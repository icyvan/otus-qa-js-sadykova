export function createCatalogPage(page) {
  const nextPage = page.locator('a.action.next');
  const paginationItems = page.locator('#toolbar-amount').first();
  const materialFilter = page.locator('.filter-options-title:has-text("Material")');
  const selectMaterial = page.locator('a:has-text("Fleece")');
  const productItems = page.locator('.item.product.product-item');

  async function clickPagination() {
    await nextPage.last().click();
  }

  async function selectFilters() {
    await page.waitForTimeout(500);
    await materialFilter.click();
    await selectMaterial.click();
  }

  async function countProducts() {
    return await productItems.count();
  }

  return {
    clickPagination,
    paginationItems,
    selectFilters,
    countProducts
  };
}
