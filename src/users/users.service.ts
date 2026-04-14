import { Injectable } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { CreateUserInput } from './interfaces/create-user-input';
import { User } from './interfaces/user';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);
    return user;
  }

  async create(data: CreateUserInput): Promise<User> {
    const user = await this.userRepository.create(data);
    return user;
  }
}
