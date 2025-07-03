import { expect, test } from '@playwright/test';
import { createProductPage } from '../pages/pageObjectProject/productPage';
import { createConsentCookies } from '../pages/pageObjectProject/pageElement/consentCookies';
import { createHomePage } from '../pages/pageObjectProject/homePage';
import { createAccountPage} from '../pages/pageObjectProject/createAccountPage';
import { createSignInPage, cresteSignInPage } from '../pages/pageObjectProject/SignInPage';

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
  await homePage.clickProductItem();
  await productPage.addToCart();
  await expect(productPage.successMessage).toBeVisible();
});

test('Создание аккаунта', async ({ page }) => {
  const createAccount = createAccountPage(page);
  const uniqueEmail = `ladybug${Date.now()}@example.com`;
  await createAccount.createAnAccount();
  await createAccount.fillCreateForm('Lady', 'Bug', uniqueEmail, 'LadyBug123', 'LadyBug123');
  await expect(createAccount.successMessage).toBeVisible();
});

test('Вход в аккаунт', async ({ page }) => {
  const autorization = createSignInPage(page);
  await autorization.goToSignInPage();
  await autorization.signIn('ladybug@gmail.com', 'LadyBug123');
  await expect(autorization.loggedIn).toHaveText('Welcome, Lady Bug!');
});
