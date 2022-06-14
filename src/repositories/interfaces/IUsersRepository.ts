export interface IUsersRepository {
  findByEmail(email: string): Promise<object | null>;
  findById(id: number): Promise<object | null>;
  create(newUser: object): Promise<object>;
  update(userAtt: object): Promise<object>;
  deleteById(id: number): Promise<void>
}
