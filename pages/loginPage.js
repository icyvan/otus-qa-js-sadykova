class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('input[id="user-name"]');
    this.passwordInput = page.locator('input[id="password"]');
    this.loginButton = page.locator('input[data-test="login-button"]');
  }

  async fillLoginForm(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

module.exports = { LoginPage };
