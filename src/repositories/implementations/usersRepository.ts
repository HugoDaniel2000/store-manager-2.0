import { PrismaClient, Users } from '@prisma/client';
import { userCreate, userUpdate } from '../../types/users';
import { IUsersRepository } from '../interfaces/IUsersRepository';

export default class UsersRepository implements IUsersRepository {
  private model: PrismaClient;

  constructor() {
    this.model = new PrismaClient();
  }

  async findByEmail(email: string): Promise<Users | null> {
    const user = await this.model.users.findUnique({ where: { email } });
    return user;
  }

  async findById(id: number): Promise<Users | null> {
    const users = await this.model.users
      .findUnique({ where: { id }, include: { Sales_Products: true } });
    return users;
  }

  async create(newUser: userCreate): Promise<Users> {
    const userCreated = await this.model.users.create({ data: newUser });
    return userCreated;
  }

  async update(user: userUpdate): Promise<Users> {
    const userUpdated = await this.model.users.update({
      where: { id: user.id },
      data: user,
    });
    return userUpdated;
  }

  async deleteById(id: number): Promise<void> {
    await this.model.users.delete({ where: { id } });
  }
}
