import { Injectable } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { CreateUserDTO } from './dtos/create-user-dto';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}

  async findByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);
    return user;
  }

  async create(data: CreateUserDTO) {
    const user = await this.userRepository.create(data);
    return user;
  }
}
