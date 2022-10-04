import * as bcrypt from 'bcryptjs';
import * as Jwt from 'jsonwebtoken';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

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

const Role = {
  role: 'Jogador Caro',
};

const Token = {
  token: Jwt.sign(
    BodyReqUser,
    JWT_SECRET,
    { expiresIn: '1d' },
  ),
};

export { validUserCrypto, BodyReqUser, InvalidUser, Role, Token };
