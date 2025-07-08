export function createHomePage(page) {
  const title = page.locator('[data-ui-id="page-title-wrapper"]');
  const banner = page.locator('img[src*="home-main.jpg"]');
  const productItem = page.locator('.product-item-info');

  async function openFirstProduct() {
    await productItem.first().click();
  }

  return {
    title,
    banner,
    openFirstProduct
  };
}
