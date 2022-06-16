import errors from 'restify-errors';
import Bcrypt from '../../../../helpers/bcrypt';
import UsersRepository from '../../../../repositories/implementations/usersRepository';
import {
  User,
  userCreate, userCreated, userUpdate,
} from '../../../../types/users';

export default class UserUseCase {
  private userRepository: UsersRepository;

  constructor() {
    this.userRepository = new UsersRepository();
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findById(id) as User;
    if (!user) {
      throw new errors.NotFoundError('User not found');
    }
    delete user.password;
    return user;
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

  async updateUser(user: userUpdate) : Promise<userCreated> {
    const userAtt = user;
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

  async deleteUser(id: number): Promise<object> {
    await this.userRepository.deleteById(id);
    return { message: 'User successfully deleted' };
  }
}
