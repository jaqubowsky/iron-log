import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { PrismaService } from 'src/db/prisma.service';
import { User } from '../interfaces/user';
import { PrismaUsersMapper } from './prisma-users-mapper';
import { CreateUserInput } from '../interfaces/create-user-input';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prismaService: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
      omit: { password: true },
    });
    if (!user) return null;

    return PrismaUsersMapper.toUser(user);
  }

  async create(data: CreateUserInput): Promise<User> {
    const user = await this.prismaService.user.create({
      data: {
        email: data.email,
        password: data.hashedPassword,
      },
      omit: { password: true },
    });

    return PrismaUsersMapper.toUser(user);
  }
}
