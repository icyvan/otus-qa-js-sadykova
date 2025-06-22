export function createCheckoutPage(page) {
  const firstName = page.locator('input[id="first-name"]');
  const lastName = page.locator('input[id="last-name"]');
  const postalCode = page.locator('input[id="postal-code"]');
  const continueButton = page.locator('input[id="continue"]');
  const finishButton = page.locator('button[data-test="finish"]');
  const successCheckout = page.locator('.complete-header');

  async function fillPersonalData(firstname, lastname, postalcode) {
    await firstName.fill(firstname);
    await lastName.fill(lastname);
    await postalCode.fill(postalcode);
    await continueButton.click();
  }

  async function finishCheckout() {
    await finishButton.click();
  }

  return {
    fillPersonalData,
    finishCheckout,
    successCheckout
  };
}
