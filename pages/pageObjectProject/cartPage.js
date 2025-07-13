export function createCartPage(page) {
  const cartButton = page.locator('a.action.showcart');
  const removeButton = page.locator('a.action.delete');
  const confirmRemove = page.getByRole('button', { name: 'OK' });
  const successRemove = page.locator('strong.subtitle.empty');
  const checkoutButton = page.locator('[id="top-cart-btn-checkout"]');

  async function removeItemFromCart() {
    await page.waitForTimeout(5000);
    await cartButton.click();
    await removeButton.click();
    await confirmRemove.click();
    await page.waitForTimeout(2000);
  }

  async function clickCheckout() {
    await page.waitForTimeout(5000);
    await cartButton.click();
    await checkoutButton.click();
  }

  return {
    removeItemFromCart,
    successRemove,
    clickCheckout
  };
}
