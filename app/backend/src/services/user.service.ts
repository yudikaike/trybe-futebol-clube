import UserModel from '../database/models/user.model';
import { User } from '../interfaces';

export default class UserService {
  static async find(email: string): Promise<User | null> {
    return UserModel.findOne({ raw: true, where: { email } });
  }
}
