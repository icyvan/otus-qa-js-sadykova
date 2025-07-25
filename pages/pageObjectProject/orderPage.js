export function createOrderPage(page) {
  const emailAddress = page.locator('._with-tooltip [type="email"]');
  const firstName = page.locator('input[name="firstname"]');
  const lastName = page.locator('input[name="lastname"]');
  const streetAddress1 = page.locator('input[name="street[0]"]');
  const streetAddress2 = page.locator('input[name="street[1]"]');
  const streetAddress3 = page.locator('input[name="street[2]"]');
  const city = page.locator('input[name="city"]');
  const state = page.locator('select[name="region_id"]');
  const zipCode = page.locator('input[name="postcode"]');
  const country = page.locator('select[name="country_id"]');
  const phoneNumber = page.locator('input[name="telephone"]');
  const shippingMethod = page.locator('input[type="radio"][value="flatrate_flatrate"]');
  const buttonNext = page.locator('button:has-text("Next")');
  const placeOrderButton = page.locator('button:has-text("Place Order")');
  const successCheckout = page.locator('span.base[data-ui-id="page-title-wrapper"]');

  async function fillOrderPage(variables) {
    await emailAddress.fill(variables.orderCheckout.email);
    await firstName.fill(variables.orderCheckout.firstname);
    await lastName.fill(variables.orderCheckout.lastname);
    await streetAddress1.fill(variables.orderCheckout.streetaddress[0]);
    await streetAddress2.fill(variables.orderCheckout.streetaddress[1]);
    await streetAddress3.fill(variables.orderCheckout.streetaddress[2]);
    await city.fill(variables.orderCheckout.cityname);
    await state.selectOption(variables.orderCheckout.statename);
    await zipCode.fill(variables.orderCheckout.zipcode);
    await country.selectOption(variables.orderCheckout.countryname);
    await phoneNumber.fill(variables.orderCheckout.telephone);
    await shippingMethod.check(variables.orderCheckout.hippingmethod);
    await buttonNext.click();
    await placeOrderButton.click();
  }

  return {
    fillOrderPage,
    successCheckout
  };
}
