import { expect, test } from '@playwright/test';
import { variables } from './config/config';
import { createProductPage } from '../pages/pageObjectProject/productPage';
import { createConsentCookies } from '../pages/pageObjectProject/pageElement/consentCookies';
import { createHomePage } from '../pages/pageObjectProject/homePage';
import { createAccountPage } from '../pages/pageObjectProject/createAccountPage';
import { createSignInPage } from '../pages/pageObjectProject/SignInPage';
import { searchBar } from '../pages/pageObjectProject/pageElement/searchBar';
import { createCartPage } from '../pages/pageObjectProject/cartPage';
import { createOrderPage } from '../pages/pageObjectProject/orderPage';
import { createCatalogPage } from '../pages/pageObjectProject/catalogPage';

test.beforeEach(async ({ page }) => {
  await page.goto('https://magento.softwaretestingboard.com/');
  const consentCookies = createConsentCookies(page);
  await consentCookies.clickConsent();
});

test('Заголовок и баннер на главной странице', async ({ page }) => {
  const homePage = createHomePage(page);
  await expect(homePage.title).toBeVisible();
  await expect(homePage.banner).toBeVisible();
});

test('Добавление товара корзину', async ({ page }) => {
  const productPage = createProductPage(page);
  const homePage = createHomePage(page);
  await homePage.openFirstProduct();
  await productPage.addToCart();
  await expect(productPage.successMessage).toBeVisible();
});

test('Написать отзыв', async ({ page }) => {
  const homePage = createHomePage(page);
  const productPage = createProductPage(page);
  await homePage.openFirstProduct();
  await productPage.writeReview();
  await productPage.successSendReview.waitFor({ state: 'visible', timeout: 10000 });
  await expect(productPage.successSendReview).toBeVisible();
});

test('Создание аккаунта', async ({ page }) => {
  const createAccount = createAccountPage(page);
  await createAccount.createAnAccount();
  await createAccount.fillCreateForm(variables);
  await expect(createAccount.successMessage).toBeVisible();
});

test('Вход в аккаунт', async ({ page }) => {
  const autorization = createSignInPage(page);
  await autorization.goToSignInPage();
  await autorization.signIn(variables);
  await expect(autorization.loggedIn).toHaveText('Welcome, Lady Bug!');
});

test('Поиск товаров', async ({ page }) => {
  const searchElement = searchBar(page);
  await searchElement.goToSearch('jacket');
  await expect(searchElement.searchResults).toHaveCount(12);
});

test('Проверка пагинации в каталоге товаров', async ({page}) => {
  const homePage = createHomePage(page);
  const catalogPage = createCatalogPage(page);
  await homePage.goToCatalog();
  await catalogPage.clickPagination();
  await expect(catalogPage.paginationItems).toContainText('13-24');
});

test('Проверка фильтров в каталоге товаров', async ({ page}) => {
  const homePage = createHomePage(page);
  const catalogPage = createCatalogPage(page);
  await homePage.goToCatalog();
  await catalogPage.selectFilters();
  const countProducts = await catalogPage.countProducts();
  await expect(countProducts).toBeLessThan(8);
});

test('Удаление товара из корзины', async ({ page }) => {
  const productPage = createProductPage(page);
  const homePage = createHomePage(page);
  const myCart = createCartPage(page);
  await homePage.openFirstProduct();
  await productPage.addToCart();
  await myCart.removeItemFromCart();
  await expect(myCart.successRemove).toBeVisible();
});

test('Оформление заказа', async ({ page }) => {
  const productPage = createProductPage(page);
  const homePage = createHomePage(page);
  const myCart = createCartPage(page);
  await homePage.openFirstProduct();
  await productPage.addToCart();
  await myCart.clickCheckout();
  const orderPage = createOrderPage(page);
  await orderPage.fillOrderPage(variables);
  await expect(orderPage.successCheckout).toHaveText('Thank you for your purchase!');
});
