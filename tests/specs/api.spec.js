import apiHandler from './api/apiHandler';
import { users, config } from './config/config';

describe('apiHandler', () => {
  test('Success exists', () => userPost());
  test('Incorrect password', () => userPassword());
  test('Success create user', () => createUser());
  test('Token error', () => tokenError());
  test('Token success', () => tokenSuccess());
});

async function userPost() {
  const { data, response } = await apiHandler('POST', users.user, 'Account/v1/User');
  expect(data.message).toBe('User exists!');
  expect(response.status).toEqual(406);
}

async function userPassword() {
  const { data, response } = await apiHandler('POST', users.user2, 'Account/v1/User');
  expect(data.message).toBe(config.unvalidPasswordMessage);
  expect(response.status).toEqual(400);
}

async function createUser() {
  const { data, response } = await apiHandler('POST', users.user3, 'Account/v1/User');
  if (data.message) {
    expect(data.message).toBe('User create!');
  }
  expect(response.status).toEqual(201);
}

async function tokenError() {
  const { data, response } = await apiHandler('POST', users.user4, 'Account/v1/GenerateToken');
  expect(data.result).toBe('User authorization failed.');
  expect(response.status).toEqual(200);
}

async function tokenSuccess() {
  await apiHandler('POST', users.user5, 'Account/v1/User');
  const { data, response } = await apiHandler('POST', users.user5, 'Account/v1/GenerateToken');
  expect(data.result).toBe('User authorized successfully.');
  expect(response.status).toEqual(200);
}
