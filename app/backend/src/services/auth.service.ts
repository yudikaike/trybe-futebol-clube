import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import 'dotenv/config';
import IUser from '../interfaces/IUser';

class AuthServices {
  static password(password: string, loginPassword: string) {
    return bcrypt.compareSync(password, loginPassword);
  }

  static encode(payload: IUser) {
    const { password, ...restOfUser } = payload;
    const token = jwt.sign({ data: restOfUser }, process.env.JWT_SECRET || 'MySecret', {
      expiresIn: '15m',
      algorithm: 'HS256',
    });
    return token;
  }
}

export default AuthServices;
