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

  async function fillCreateForm(variables){
    await firstNameInput.fill(variables.createAccount.firstName);
    await lastNameInput.fill(variables.createAccount.lastName);
    await emailInput.fill(variables.createAccount.email());
    await passwordInput.fill(variables.createAccount.password);
    await confirmPasswordInput.fill(variables.createAccount.confirmPassword);
    await createAccountButton.click();
  }

  return {
    createAnAccount,
    fillCreateForm,
    successMessage
  };
}
