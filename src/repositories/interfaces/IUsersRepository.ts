import { Users } from '@prisma/client';

export interface IUsersRepository {
  findAll(): Promise<Users[]>
  findByEmail(email: string): Promise<Users | null>;
  findById(id: number): Promise<Users | null>;
  create(newUser: object): Promise<Users>;
  update(userAtt: object): Promise<Users>;
  deleteById(id: number): Promise<void>
}
