import { options } from '../../constants/writeReview';

export function createProductPage(page) {
  const productItem = page.locator('.product-item-info');
  const size = page.locator('[option-label="M"]');
  const color = page.locator('[option-label="Blue"]');
  const buttonAddToCart = page.locator('button[title="Add to Cart"]');
  const successMessage = page.locator('[data-ui-id="message-success"]');
  const reviewTab = page.locator('[id="tab-label-reviews-title"]');
  const rating = page.locator('#Rating_1_label');
  const nickname = page.locator('input[name="nickname"]');
  const summary = page.locator('input[id="summary_field"]');
  const review = page.locator('[id="review_field"]');
  const submitButton = page.locator('button.action.submit.primary');
  const successSendReview = page.locator('[data-ui-id="message-success"]');

  async function addToCart() {
    await size.click();
    await color.click();
    await buttonAddToCart.click();
  }

  async function clickProductItem() {
    await productItem.first().click();
  }

  async function writeReview() {
    await reviewTab.click();
    await rating.click();
    await nickname.fill(options.nick);
    await summary.fill(options.summ);
    await review.fill(options.rev);
    await submitButton.click();
  }

  return {
    addToCart,
    clickProductItem,
    successMessage,
    writeReview,
    successSendReview
  };
}
