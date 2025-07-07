export function createCartPage(page) {
  const cartButton = page.locator('a.action.showcart');
  const removeButton = page.locator('a.action.delete');
  const confirmRemove = page.getByRole('button', { name: 'OK' });
  const successRemove = page.locator('strong.subtitle.empty');

  async function removeItemFromCart() {
    await page.waitForTimeout(5000);
    await cartButton.click();
    await removeButton.click();
    await confirmRemove.click();
    await page.waitForTimeout(2000);
  }

  return {
    removeItemFromCart,
    successRemove
  };
}
