import erros from 'restify-errors';
import Bcrypt from '../../../../helpers/bcrypt';
import UsersRepository from '../../../../repositories/implementations/usersRepository';
import { userCreate, userCreated } from '../../../../types/users';

export default class UserUseCase {
  private userRepository: UsersRepository;

  constructor() {
    this.userRepository = new UsersRepository();
  }

  async createUser(newUser: userCreate): Promise<userCreated> {
    const userExist = await this.userRepository.findByEmail(newUser.email);
    if (userExist) {
      throw new erros.ConflictError('Email is already being used');
    }
    const passwordEncrypted = await Bcrypt.encrypt(newUser.password);
    const user = newUser;
    user.password = passwordEncrypted;
    const {
      id, last_name: lastName, first_name: firstName, email,
    } = await this.userRepository.create(user);
    return {
      id, lastName, firstName, email,
    };
  }
}
