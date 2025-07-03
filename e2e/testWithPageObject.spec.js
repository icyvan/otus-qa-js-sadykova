const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/pageObjectHomework/loginPage');
const { InventoryPage } = require('../pages/pageObjectHomework/inventoryPage');
const { CheckoutPage } = require('../pages/pageObjectHomework/checkoutPage');
const { CardPage } = require('../pages/pageObjectHomework/cardPage');

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('https://www.saucedemo.com');
  await loginPage.fillLoginForm('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/.inventory\.html/);
});

test('Вход на сайт', async ({ page }) => {
  await expect(page).toHaveURL(/.inventory\.html/);
});

test('Проверка количества товаров в каталоге', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await expect(inventoryPage.productItems).toHaveCount(6);
});

test('Проверка ссылки на Твиттер в футтере', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await expect(await inventoryPage.twitterLink()).toHaveText('Twitter');
});

test('Добавление и удаление товара из корзины', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.addFirstItemToCart();
  await inventoryPage.openCart();
  const cardPage = new CardPage(page);
  await cardPage.removeItem();
  await expect(cardPage.cardItem).toHaveCount(0);
});

test('Успешное оформление заказа', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.addFirstItemToCart();
  await inventoryPage.openCart();
  const cardPage = new CardPage(page);
  await cardPage.checkoutItem();
  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.fillPersonalData('Lady', 'Bag', '123456');
  await checkoutPage.finishCheckout();
  await expect(await checkoutPage.successHeader()).toHaveText('Thank you for your order!');
});
