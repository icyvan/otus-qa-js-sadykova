export function createLoginPage(page) {
  const usernameInput = page.locator('input[id="user-name"]');
  const passwordInput = page.locator('input[id="password"]');
  const loginButton = page.locator('input[data-test="login-button"]');

  async function fillLoginForm(username, password) {
    await usernameInput.fill(username);
    await passwordInput.fill(password);
    await loginButton.click();
  }

  return {
    fillLoginForm
  };
}
