import { CreateUserDTO } from '../dtos/create-user-dto';
import { User } from '../interfaces/user';

export abstract class UsersRepository {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract create(data: CreateUserDTO): Promise<User>;
}
