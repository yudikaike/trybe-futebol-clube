import * as bcryptjs from 'bcryptjs';

const user = {
  id: 1,
  username: "testUsername",
  role: "testRole",
  email: "test@email.com",
  password: bcryptjs.hashSync('testPassword'),
};

const requestBody = {
  email: "test@email.com",
  password: "testPassword",
};

export { user, requestBody };
