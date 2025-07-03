export function createConsentCookies(page) {
  const consentButton = page.locator('button.fc-cta-consent');

  async function clickConsent() {
    await consentButton.click();
  }

  return {
    clickConsent
  };
}
