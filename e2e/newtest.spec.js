import { expect, test } from '@playwright/test';

test('Проверить title Installing Playwright', async ({ page }) => {
  await page.goto('https://playwright.dev/docs/intro');
  await expect(page.getByTestId('installing-playwright')).toBeVisible();
});
