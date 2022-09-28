import IUser from '../interfaces/IUserService';
import UserModel from '../database/models/UserModel';

export default class UserService {
  model = UserModel;

  public async create(user: IUser): Promise<IUser> {
    return this.model.create(user);
  }
}
