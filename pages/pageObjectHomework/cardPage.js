class CardPage {
  constructor(page) {
    this.page = page;
    this.removeButton = this.page.locator('button:has-text("Remove")');
    this.checkoutButton = this.page.locator('button[name="checkout"]');
    this.cardItem = this.page.locator('.cart_item');
  }

  async removeItem() {
    await this.removeButton.click();
  }

  async checkoutItem() {
    await this.checkoutButton.click();
  }
}

module.exports = { CardPage };
