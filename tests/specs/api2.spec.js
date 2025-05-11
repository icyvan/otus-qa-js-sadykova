import { variables } from './config/config';
import {successAuthorized, deleteUser, getUser, createBook, updateBook, getBook, deleteBook} from './api/apiRequests';

describe('apiHandler', () => {
  test('User success authorized', async () => {
    const response = await successAuthorized(variables.user);
    expect(response.data).toBe(true);
    expect(response.status).toEqual(200);
  });
  test('Delete user', async () => {
    const data = await deleteUser(variables.testDeleteUser)
    expect(data.data).toBe('');
    expect(data.status).toEqual(204);
  });
  test('Get user', async () => {
    const data = await getUser(variables.user)
    expect(data.statusText).toBe('OK');
    expect(data.status).toEqual(200);
  });
  test('Create book', async () => {
    const response = await createBook(variables.user)
    expect(response.status).toEqual(201);
    expect(response.message).toBe(undefined);
    expect(Array.isArray(response.data.books)).toBe(true);
  });
  test('Update book', async () => {
    const response = await updateBook(variables.user)
    expect(response.data.books[0].isbn).toBe(variables.isbnToUpdate[0].isbn);
    expect(response.status).toEqual(200);
  });
  test('Get book', async () => {
    const response = await getBook(variables.user)
    expect(response.statusText).toBe('OK');
    expect(response.status).toEqual(200);
  });
  test('Delete book', async () => {
    const response = await deleteBook(variables.user)
    expect(response.status).toEqual(204);
  });
});