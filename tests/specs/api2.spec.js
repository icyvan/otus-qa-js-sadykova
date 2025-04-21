import { instance } from './api/instanceAxios';
import { users } from './config/config';

describe('apiHandler', () => {
  test('User success authorized', () => successAuthorized());
  test('Delete user', () => deleteUser(users.user5));
  test('Get user', () => getUser(users.user3));
});

async function successAuthorized() {
  const response = await instance.post('Account/v1/Authorized', users.user);
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
