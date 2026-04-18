import { Injectable } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { CreateUserInput } from './interfaces/create-user-input';
import { User, UserWithPassword } from './interfaces/user';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}

  async findById(id: string): Promise<User | null> {
    const user = await this.userRepository.findById(id);
    return user;
  }

  async findByEmailWithPassword(
    email: string,
  ): Promise<UserWithPassword | null> {
    const user = await this.userRepository.findByEmailWithPassword(email);
    return user;
  }

  async create(data: CreateUserInput): Promise<User> {
    const user = await this.userRepository.create(data);
    return user;
  }
}
