class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.locator('input[id="first-name"]');
    this.lastName = page.locator('input[id="last-name"]');
    this.postalCode = page.locator('input[id="postal-code"]');
    this.continueButton = this.page.locator('input[id="continue"]');
    this.finishButton = this.page.locator('button[data-test="finish"]');
    this.successCheckout = page.locator('.complete-header');
  }

  async fillPersonalData(firstname, lastname, postalcode) {
    await this.firstName.fill(firstname);
    await this.lastName.fill(lastname);
    await this.postalCode.fill(postalcode);
    await this.continueButton.click();
  }

  async finishCheckout() {
    await this.finishButton.click();
  }

  async successHeader() {
    return this.successCheckout;
  }
}

module.exports = { CheckoutPage };
