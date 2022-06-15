import errors from 'restify-errors';
import Bcrypt from '../../../../helpers/bcrypt';
import UsersRepository from '../../../../repositories/implementations/usersRepository';
import { userCreate, userCreated, userUpdate } from '../../../../types/users';

export default class UserUseCase {
  private userRepository: UsersRepository;

  constructor() {
    this.userRepository = new UsersRepository();
  }

  async createUser(newUser: userCreate): Promise<userCreated> {
    const userExist = await this.userRepository.findByEmail(newUser.email);
    if (userExist) {
      throw new errors.ConflictError('Email is already being used');
    }
    const passwordEncrypted = await Bcrypt.encrypt(newUser.password);
    const user = newUser;
    user.password = passwordEncrypted;
    const {
      id, last_name: lastName, first_name: firstName, email, role,
    } = await this.userRepository.create(user);
    return {
      id, lastName, firstName, email, role,
    };
  }

  async updateUser(user: userUpdate, loggedUser: userCreated): Promise<userCreated> {
    const userAtt = user;
    if (loggedUser.id !== user.id && loggedUser.role !== 'admin') {
      throw new errors.UnauthorizedError('You do not have permission to update this user');
    }
    if (userAtt.password) {
      const passwordEncrypted = await Bcrypt.encrypt(userAtt.password);
      userAtt.password = passwordEncrypted;
    }
    const {
      id, last_name: lastName, first_name: firstName, email, role,
    } = await this.userRepository.update(userAtt);
    return {
      id, lastName, firstName, email, role,
    };
  }
}
