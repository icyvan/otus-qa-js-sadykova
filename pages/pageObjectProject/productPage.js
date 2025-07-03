export function createProductPage(page) {
  const productItem = page.locator('.product-item-info');
  const size = page.locator('[option-label="M"]');
  const color = page.locator('[option-label="Blue"]');
  const buttonAddToCart = page.locator('button[title="Add to Cart"]');
  const successMessage = page.locator('[data-ui-id="message-success"]');

  async function addToCart() {
    await size.click();
    await color.click();
    await buttonAddToCart.click();
  }

  async function clickProductItem() {
    await productItem.first().click();
  }

  return {
    addToCart,
    clickProductItem,
    successMessage
  };
}
