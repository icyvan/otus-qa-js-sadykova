export function createHomePage(page) {
  const title = page.locator('[data-ui-id="page-title-wrapper"]');
  const banner = page.locator('img[src*="home-main.jpg"]');
  const productItem = page.locator('.product-item-info');
  const dropdown = page.locator('[id="ui-id-4"]');
  const dropdownItem = page.locator('[id="ui-id-9"]');


  async function openFirstProduct() {
    await productItem.first().click();
  }

  async function goToCatalog() {
    await dropdown.hover();
    await dropdownItem.click();
  }

  return {
    title,
    banner,
    openFirstProduct,
    goToCatalog
  };
}
