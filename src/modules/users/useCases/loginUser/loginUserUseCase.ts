import errors from 'restify-errors';
import Bcrypt from '../../../../helpers/bcrypt';
import Token from '../../../../helpers/jwt.auth';
import UsersRepository from '../../../../repositories/implementations/usersRepository';
import { login } from '../../../../types/users';

export default class LoginUserUseCase {
  private userRepository: UsersRepository;

  constructor() {
    this.userRepository = new UsersRepository();
  }

  async login({ email, password }: login): Promise<object> {
    const user = await this.userRepository.findByEmail(email);
    const passwordUser = user ? user.password : '';
    const passwordValidate = await Bcrypt.validate(password, passwordUser);
    if (!user || !passwordValidate) {
      throw new errors.UnauthorizedError('Incorrect email or password');
    }
    const {
      first_name: firstName, last_name: lastName, id, role,
    } = user;
    const token = Token.generate({
      id, firstName, lastName, role,
    });

    return {
      user: {
        id, firstName, lastName, email, role,
      },
      token,
    };
  }
}
