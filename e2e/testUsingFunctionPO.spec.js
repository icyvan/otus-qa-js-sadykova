import { expect, test } from '@playwright/test';
import { createLoginPage } from '../pages/pageObjectHomework/loginPageFunction';
import { createInventoryPage } from '../pages/pageObjectHomework/inventoryPageFunction';
import { createCardPage } from '../pages/pageObjectHomework/cardPageFunction';
import { createCheckoutPage } from '../pages/pageObjectHomework/checkoutPageFunction';

test.beforeEach(async ({ page }) => {
  const loginPage = createLoginPage(page);
  await page.goto('https://www.saucedemo.com');
  await loginPage.fillLoginForm('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/.inventory\.html/);
});

test('Вход на сайт', async ({ page }) => {
  await expect(page).toHaveURL(/.inventory\.html/);
});

test('Проверка количества товаров в каталоге', async ({ page }) => {
  const inventoryPage = createInventoryPage(page);
  await expect(inventoryPage.productItems).toHaveCount(6);
});

test('Проверка ссылки на Твиттер в футтере', async ({ page }) => {
  const inventoryPage = createInventoryPage(page);
  await expect(await inventoryPage.socialTwitter).toHaveText('Twitter');
});

test('Добавление и удаление товара из корзины', async ({ page }) => {
  const inventoryPage = createInventoryPage(page);
  await inventoryPage.addFirstItemToCart();
  await inventoryPage.openCart();
  const cardPage = createCardPage(page);
  await cardPage.removeItem();
  await expect(cardPage.cardItem).toHaveCount(0);
});

test('Успешное оформление заказа', async ({ page }) => {
  const inventoryPage = createInventoryPage(page);
  await inventoryPage.addFirstItemToCart();
  await inventoryPage.openCart();
  const cardPage = createCardPage(page);
  await cardPage.checkoutItem();
  const checkoutPage = createCheckoutPage(page);
  await checkoutPage.fillPersonalData('Lady', 'Bag', '123456');
  await checkoutPage.finishCheckout();
  await expect(await checkoutPage.successCheckout).toHaveText('Thank you for your order!');
});
