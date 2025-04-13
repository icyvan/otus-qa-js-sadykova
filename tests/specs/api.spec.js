const baseUrl = 'https://bookstore.demoqa.com/';
const unvalidPasswordMessage = `Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.`;

const user = {
  userName: 'testuser123',
  password: 'TestPass123!'
};

const user2 = {
  userName: 'testuser123',
  password: 'TestPass123'
};

const user3 = {
  userName: 'test123',
  password: 'TestPass123!'
};

const user4 = {
  userName: 'testtokenerror',
  password: 'TestPass123!'
};

const user5 = {
  userName: 'testtoken',
  password: 'TestPass123!'
};

async function apiHandler(method, body, url) {
  const response = await fetch(`${baseUrl}${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  const data = await response.json();
  return { data, response };
}
describe('apiHandler', () => {
  test('Success exists', () => userPost());
  test('Incorrect password', () => userPassword());
  test('Success create user', () => createUser());
  test('Token error', () => tokenError());
  test('Token success', () => tokenSuccess());
});

async function userPost() {
  const { data, response } = await apiHandler('POST', user, 'Account/v1/User');
  expect(data.message).toBe('User exists!');
  expect(response.status).toEqual(406);
}

async function userPassword() {
  const { data, response } = await apiHandler('POST', user2, 'Account/v1/User');
  expect(data.message).toBe(unvalidPasswordMessage);
  expect(response.status).toEqual(400);
}

async function createUser() {
  const { data, response } = await apiHandler('POST', user3, 'Account/v1/User');
  if (data.message) {
    expect(data.message).toBe('User create!');
  }
  expect(response.status).toEqual(201);
}

async function tokenError() {
  const { data, response } = await apiHandler('POST', user4, 'Account/v1/GenerateToken');
  expect(data.result).toBe('User authorization failed.');
  expect(response.status).toEqual(200);
}

async function tokenSuccess() {
  await apiHandler('POST', user5, 'Account/v1/User');
  const { data, response } = await apiHandler('POST', user5, 'Account/v1/GenerateToken');
  expect(data.result).toBe('User authorized successfully.');
  expect(response.status).toEqual(200);
}