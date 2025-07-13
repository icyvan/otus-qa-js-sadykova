import { variables } from '../../e2e/config/config';

export function createProductPage(page) {
  const buttonAddToCart = page.locator('button[title="Add to Cart"]');
  const successMessage = page.locator('[data-ui-id="message-success"]');
  const reviewTab = page.locator('[id="tab-label-reviews-title"]');
  const rating = page.locator('#Rating_1_label');
  const nickname = page.locator('input[name="nickname"]');
  const summary = page.locator('input[id="summary_field"]');
  const review = page.locator('[id="review_field"]');
  const submitButton = page.locator('button.action.submit.primary');
  const successSendReview = page.locator('[data-ui-id="message-success"]');

  async function addToCart({ sizeLabel = 'M', colorLabel = 'Blue' } = {}) {
    const size = page.locator(`[option-label="${sizeLabel}"]`);
    const color = page.locator(`[option-label="${colorLabel}"]`);
    await size.click();
    await color.click();
    await buttonAddToCart.click();
  }

  async function writeReview() {
    await reviewTab.click();
    await rating.click();
    await nickname.fill(variables.writeReview.nick);
    await summary.fill(variables.writeReview.summ);
    await review.fill(variables.writeReview.rev);
    await submitButton.click();
  }

  return {
    addToCart,
    successMessage,
    writeReview,
    successSendReview
  };
}
