import { CreateUserInput } from '../interfaces/create-user-input';
import { User } from '../interfaces/user';

export abstract class UsersRepository {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract create(data: CreateUserInput): Promise<User>;
}
