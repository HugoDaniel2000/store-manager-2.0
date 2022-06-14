import bcrypt from 'bcryptjs';

export default class Bcrypt {
  public static async encrypt(value: string) {
    return bcrypt.hash(value, 10);
  }

  public static async validate(value: string, hash: string) {
    return bcrypt.compare(value, hash);
  }
}
