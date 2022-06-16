import errors from 'restify-errors';
import UsersRepository from '../../../../repositories/implementations/usersRepository';
import {
  User,
} from '../../../../types/users';

export default class FindUserUseCase {
  private userRepository: UsersRepository;

  constructor() {
    this.userRepository = new UsersRepository();
  }

  async findAllUsers():Promise<User[]> {
    const users = await this.userRepository.findAll() as User[];
    users.forEach((user) => delete user.password);
    return users;
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findById(id) as User;
    if (!user) {
      throw new errors.NotFoundError('User not found');
    }
    delete user.password;
    return user;
  }
}
