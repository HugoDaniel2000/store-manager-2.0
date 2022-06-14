import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

const jwtConfig: object = {
  expiresIn: '2d',
  algorithm: 'HS256',
};

export default class Token {
  public static generate = (payload: object) => {
    const token = jwt.sign(payload, process.env.SECRET_KEY as string, jwtConfig);
    return token;
  };

  public static validate = (token: string) => {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY as string);

      return decoded;
    } catch (error) {
      return null;
    }
  };
}
