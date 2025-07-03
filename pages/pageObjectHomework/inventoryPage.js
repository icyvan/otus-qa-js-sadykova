class InventoryPage {
  constructor(page) {
    this.page = page;
    this.productItems = page.locator('.inventory_item');
    this.cartButton = this.page.locator('.shopping_cart_link');
    this.socialTwitter = page.locator('[data-test="social-twitter"]');
  }

  async addFirstItemToCart() {
    const firstItem = this.page.locator('.inventory_item').first();
    await firstItem.getByRole('button', { name: 'Add to cart' }).click();
  }

  async openCart() {
    await this.cartButton.click();
  }

  async twitterLink() {
    return this.socialTwitter;
  }
}

module.exports = { InventoryPage };
