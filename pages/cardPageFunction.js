export function createCardPage(page) {
  const removeButton = page.locator('button:has-text("Remove")');
  const checkoutButton = page.locator('button[name="checkout"]');
  const cardItem = page.locator('.cart_item');

  async function removeItem() {
    await removeButton.click();
  }

  async function checkoutItem() {
    await checkoutButton.click();
  }

  return {
    removeItem,
    checkoutItem,
    cardItem
  };
}
