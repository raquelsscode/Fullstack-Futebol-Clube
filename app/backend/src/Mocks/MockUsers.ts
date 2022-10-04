import * as bcrypt from 'bcryptjs';

const validUserCrypto = {
  email: 'teste@teste.com',
  password: bcrypt.hashSync('12345678'),
};

const BodyReqUser = {
  email: 'teste@teste.com',
  password: '12345678',
};

const InvalidUser = {
  email: 'teste.com',
  password: '123478',
};

export { validUserCrypto, BodyReqUser, InvalidUser };
