import { instance } from './api/instanceAxios';
import { variables } from './config/config';

describe('apiHandler', () => {
  test('User success authorized', () => successAuthorized());
  test('Delete user', () => deleteUser(variables.testDeleteUser));
  test('Get user', () => getUser(variables.user));
  test('Create book', () => createBook(variables.user));
  test('Update book', () => updateBook(variables.user));
  test('Get book', () => getBook(variables.user));
  test('Delete book', () => deleteBook(variables.user));
});

async function successAuthorized() {
  const response = await instance.post('Account/v1/Authorized', variables.testUserSuccessAuthorized);
  expect(response.data).toBe(true);
  expect(response.status).toEqual(200);
}

//Создание пользователя, получение токена, получение id пользователя, удаление пользователя
async function generateToken(user) {
  const response = await instance.post('Account/v1/GenerateToken', user);
  return response.data.token;
}
async function loginUser(user) {
  const authUser = await instance.post('Account/v1/Login', user);
  return authUser.data.userId;
}
async function deleteUser(user) {
  await instance.post('Account/v1/User', user);
  const [userID, token] = await Promise.all([loginUser(user), generateToken(user)]);
  const data = await instance.delete(`Account/v1/User/${userID}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  expect(data.data).toBe('');
  expect(data.status).toEqual(204);
}

//Получение информации о пользователе
async function getUser(user) {
  await instance.post('Account/v1/User', user);
  const [userID, token] = await Promise.all([loginUser(user), generateToken(user)]);
  const data = await instance.get(`Account/v1/User/${userID}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  expect(data.statusText).toBe('OK');
  expect(data.status).toEqual(200);
}

async function createBook(user) {
  await instance.post('Account/v1/User', user);
  const [userID, token] = await Promise.all([loginUser(user), generateToken(variables.user)]);

  const response = await instance.post(
    'BookStore/v1/Books',
    {
      userId: userID,
      collectionOfIsbns: variables.collectionOfIsbns
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  expect(response.status).toEqual(201);
  expect(response.message).toBe(undefined);
  expect(Array.isArray(response.data.books)).toBe(true);
}

async function updateBook(user) {
  await instance.post('Account/v1/User', user);
  const [userID, token] = await Promise.all([loginUser(user), generateToken(variables.user)]);

  const response = await instance.put(
    `BookStore/v1/Books/${variables.collectionOfIsbns[0].isbn}`,
    {
      userId: userID,
      isbn: '9781449331818'
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  expect(response.data.books[0].isbn).toBe('9781449331818');
  expect(response.status).toEqual(200);
}

async function getBook(user) {
  await instance.post('Account/v1/User', user);
  const token = await generateToken(variables.user);

  const response = await instance.get(`BookStore/v1/Book?ISBN=${variables.collectionOfIsbns[0].isbn}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  expect(response.statusText).toBe('OK');
  expect(response.status).toEqual(200);
}

async function deleteBook(user) {
  const [userID, token] = await Promise.all([loginUser(user), generateToken(user)]);
  const response = await instance.delete('BookStore/v1/Book', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    data: {
      isbn: '9781449325862',
      userId: '23365272-f285-48d5-ba6e-5f8f161bd8a6'
    }
  });
  console.log('delete:', response);
  expect(response.status).toEqual(204);
}
