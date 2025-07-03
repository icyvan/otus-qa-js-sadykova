export function createAccountPage(page) {
  const createAccount = page.getByRole('link', { name: 'Create an Account' });
  const firstNameInput = page.locator('[id="firstname"]');
  const lastNameInput = page.locator('[id="lastname"]');
  const emailInput = page.locator('[id="email_address"]');
  const passwordInput = page.locator('[id="password"]');
  const confirmPasswordInput = page.locator('[id="password-confirmation"]');
  const createAccountButton = page.locator('button[title="Create an Account"]');
  const successMessage = page.getByText('Thank you for registering with Main Website Store.');

  async function createAnAccount() {
    await createAccount.click();
  }

  async function fillCreateForm(firstName, lastName, email, password, confirmPassword){
    await firstNameInput.fill(firstName);
    await lastNameInput.fill(lastName);
    await emailInput.fill(email);
    await passwordInput.fill(password);
    await confirmPasswordInput.fill(confirmPassword);
    await createAccountButton.click();
  }

  return {
    createAnAccount,
    fillCreateForm,
    successMessage
  };
}
