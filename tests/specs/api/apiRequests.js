import { instance } from './instanceAxios';
import { variables } from '../config/config';

export async function successAuthorized(user) {
  const response = await instance.post('Account/v1/Authorized', user);
  return response;
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
export async function deleteUser(user) {
  await instance.post('Account/v1/User', user);
  const [userID, token] = await Promise.all([loginUser(user), generateToken(user)]);
  const data = await instance.delete(`Account/v1/User/${userID}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return data;
}

//Получение информации о пользователе
export async function getUser(user) {
  await instance.post('Account/v1/User', user);
  const [userID, token] = await Promise.all([loginUser(user), generateToken(user)]);
  const data = await instance.get(`Account/v1/User/${userID}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return data;
}

export async function createBook(user) {
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
  return response;
}

export async function updateBook(user) {
  await instance.post('Account/v1/User', user);
  const [userID, token] = await Promise.all([loginUser(user), generateToken(variables.user)]);

  const response = await instance.put(
    `BookStore/v1/Books/${variables.collectionOfIsbns[0].isbn}`,
    {
      userId: userID,
      isbn: variables.isbnToUpdate[0].isbn
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response;
}

export async function getBook(user) {
  await instance.post('Account/v1/User', user);
  const token = await generateToken(variables.user);

  const response = await instance.get(`BookStore/v1/Book?ISBN=${variables.collectionOfIsbns[0].isbn}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response;
}

export async function deleteBook(user) {
  const [userID, token] = await Promise.all([loginUser(user), generateToken(user)]);
  const response = await instance.delete('BookStore/v1/Book', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    data: {
      isbn: variables.isbnToUpdate[0].isbn,
      userId: variables.isbnToUpdate[0].userId
    }
  });
  return response;
}