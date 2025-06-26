export function createInventoryPage(page) {
  const productItems = page.locator('.inventory_item');
  const cartButton = page.locator('.shopping_cart_link');
  const socialTwitter = page.locator('[data-test="social-twitter"]');

  async function addFirstItemToCart() {
    const firstItem = productItems.first();
    await firstItem.getByRole('button', { name: 'Add to cart' }).click();
  }

  async function openCart() {
    await cartButton.click();
  }

  return {
    productItems,
    addFirstItemToCart,
    openCart,
    socialTwitter
  };
}
