import { PrismaClient } from '@prisma/client';
import { User, userCreate, userUpdate } from '../../types/users';
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
    const users = await this.model.users
      .findUnique({ where: { id }, include: { Sales_Products: true } });
    return users;
  }

  async create(newUser: userCreate): Promise<User> {
    const userCreated = await this.model.users.create({ data: newUser });
    return userCreated;
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
