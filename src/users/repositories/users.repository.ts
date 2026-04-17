import { CreateUserInput } from '../interfaces/create-user-input';
import { User, UserWithPassword } from '../interfaces/user';

export abstract class UsersRepository {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findByEmailWithPassword(
    email: string,
  ): Promise<UserWithPassword | null>;
  abstract create(data: CreateUserInput): Promise<User>;
}
