import * as jwt from 'jsonwebtoken';

export interface TokenData {
  email: string,
  password: string
}

const SECRET = process.env.JWT_SECRET || 'jwt_secret';

export const createJWT = (user: TokenData): string => {
  const token = jwt.sign({ data: user }, SECRET, { expiresIn: '1d', algorithm: 'HS256' });
  return token;
};
