import { test, expect } from '@playwright/test';

const url = 'https://somovhotel.ru/';

test('Заголовок "Бутик-отель Сомов" загружается', async ({ page }) => {
  await page.goto(url);
  await expect(page.locator('h1.page-banner__title')).toHaveText('Бутик-отель Сомов');
});

test('Переход на страницу из меню', async ({ page }) => {
  await page.goto(url);
  await page.locator('.header__burger-span').click();
  await page.locator('.menu.menu_visible a[href="/about"]').click();
  await expect(page.locator('h1.page-banner__title')).toHaveText('Об отеле');
});

test('Проверка всплывающего окна с обратной связью', async ({ page }) => {
  await page.goto(url);
  await page.getByText('Обратная связь').click();
  await expect(page.locator('.popup__title')).toHaveText('Напишите нам');
});

test('Переход на страницу бронирования номеров', async ({ page }) => {
  await page.goto(url);
  await page.locator('header .js-open-booking').click();
  await page.getByRole('button', { name: 'Смотреть номера' }).click();
  await expect(page.locator('h1.page-title__title')).toHaveText('Бронирование номеров');
});

test('Проверка всплывающего окна со скидкой', async ({ page }) => {
  await page.goto(url);
  const promoTitle = page.locator('.popup-promocode__title');
  await expect(promoTitle).toBeVisible();
  await expect(promoTitle).toHaveText('-10% на путешествие в историю');
});
