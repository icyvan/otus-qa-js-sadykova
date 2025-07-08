import { generateRandomEmail } from './generateEmail';

export const variables = {
  singIn: {
    email: 'ladybug@gmail.com',
    password: 'LadyBug123'
  },
  createAccount: {
    firstName: 'Lady',
    lastName: 'Bug',
    email: generateRandomEmail,
    password: 'LadyBug123',
    confirmPassword: 'LadyBug123'
  },
  writeReview: {
    nick: 'Lady',
    summ: 'Nice t-shirt!',
    rev: 'The T-shirt fits perfectly.'
  },
  orderCheckout: {
    email: 'test@gmail.com',
    firstname: 'Lady',
    lastname: 'Bug',
    streetaddress: ['123 Main St', 'Building 5', 'Apartment 42'],
    cityname: 'Grand Island',
    statename: 'Nebraska',
    zipcode: '68801',
    countryname: 'United States',
    telephone: '+1234567890',
    shippingmethod: 'flatrate_flatrate'
  }
};
