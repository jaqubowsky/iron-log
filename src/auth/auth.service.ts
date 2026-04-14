import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDTO } from './dto/register-user-dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/interfaces/user';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async register(data: RegisterUserDTO): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.usersService.create({
      email: data.email,
      hashedPassword,
    });
  }
}
