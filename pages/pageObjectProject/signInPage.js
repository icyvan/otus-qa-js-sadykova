export function createSignInPage(page) {
  const signInPage = page.getByRole('link', { name: 'Sign In' });
  const emailInput = page.locator('[id="email"]');
  const passwordInput = page.locator('[id="pass"]');
  const signInButton = page.getByRole('button', { name: 'Sign In' });
  const loggedIn = page.locator('.logged-in').first();

  async function goToSignInPage() {
    await signInPage.click();
  }

  async function signIn(variables) {
    await emailInput.fill(variables.singIn.email);
    await passwordInput.fill(variables.singIn.password);
    await signInButton.click();
  }
  return {
    goToSignInPage,
    signIn,
    loggedIn
  };
}
