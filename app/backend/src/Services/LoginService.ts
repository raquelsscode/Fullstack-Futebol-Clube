import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import IUser from '../interfaces/IUser';
import UserModel from '../database/models/UserModel';
import IToken from '../interfaces/IToken';
import 'dotenv/config';
import CustomError from '../errors/CustomError';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

export default class UserService {
  public model = UserModel;

  public login = async (email: string, password: string): Promise<unknown> => {
    const Userdata = await this.model.findOne({ where: { email }, raw: true }) as unknown as IUser;

    if (!Userdata) throw new CustomError(401, 'Incorrect email or password');

    if (!bcrypt.compareSync(password, Userdata.password)) {
      throw new CustomError(401, 'Incorrect email or password');
    }

    const token = jwt.sign(
      { id: Userdata.id },
      JWT_SECRET,
      { expiresIn: '1d' },
    );

    return token as unknown as IToken;
  };

  public validateLogin = async (token: string): Promise<unknown> => {
    const newToken = jwt.verify(token, JWT_SECRET) as IToken;
    const user = await this.model
      .findOne({ where: { id: newToken.id }, raw: true }) as unknown as IUser;

    return user.role as unknown as IUser;
  };
}
