import { PrismaClient } from '@prisma/client';
import { User, userUpdate } from '../../types/user';
import { IUsersRepository } from '../interfaces/IUsersRepository';

export default class UsersRepository implements IUsersRepository {
  private model: PrismaClient;

  constructor() {
    this.model = new PrismaClient();
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.model.users.findUnique({ where: { email } });
    return user;
  }

  async findById(id: number): Promise<User | null> {
    const products = await this.model.users.findUnique({ where: { id } });
    return products;
  }

  async create(newUser: User): Promise<User> {
    const usersCreated = await this.model.users.create({ data: newUser });
    return usersCreated;
  }

  async update(userAtt: userUpdate): Promise<User> {
    const userUpdated = await this.model.users.update({
      where: { id: userAtt.id },
      data: userAtt,
    });
    return userUpdated;
  }

  async deleteById(id: number): Promise<void> {
    await this.model.users.delete({ where: { id } });
  }
}
