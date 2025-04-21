export const config = {
  baseUrl: 'https://bookstore.demoqa.com/',
  unvalidPasswordMessage: `Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.`
};

export const variables = {
  testUserSuccessAuthorized: {
    userName: 'testuser12355',
    password: 'TestPass123!'
  },
  user: {
    userName: 'test12312e12',
    password: 'Test12asd3New123112e3!'
  },
  testDeleteUser: {
    userName: 'testtoken578',
    password: 'TestPaasdsass123987!'
  },
  collectionOfIsbns: [
    {
      isbn: '9781449325862'
    }
  ]
};
