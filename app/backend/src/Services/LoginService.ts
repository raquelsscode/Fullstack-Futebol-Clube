import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import IUser from '../interfaces/IUser';
import UserModel from '../database/models/UserModel';
import IToken from '../interfaces/IToken';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

export default class UserService {
  public model = UserModel;

  public login = async (email: string, password: string): Promise<unknown> => {
    const Userdata = await this.model.findOne({ where: { email }, raw: true }) as unknown as IUser;

    if (!Userdata) {
      return null as unknown as null;
    }

    if (!bcrypt.compareSync(password, Userdata.password)) {
      return null as unknown as null;
    }

    const token = jwt.sign({ id: Userdata.id }, JWT_SECRET, { expiresIn: '1d' });

    return token as unknown as IToken;
  };
}
