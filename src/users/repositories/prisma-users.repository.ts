import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { PrismaService } from 'src/db/prisma.service';
import { User, UserWithPassword } from '../interfaces/user';
import { PrismaUsersMapper } from './prisma-users-mapper';
import { CreateUserInput } from '../interfaces/create-user-input';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prismaService: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      omit: { passwordHash: true },
    });
    if (!user) return null;

    return PrismaUsersMapper.toUser(user);
  }

  async findByEmailWithPassword(
    email: string,
  ): Promise<UserWithPassword | null> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (!user) return null;

    return PrismaUsersMapper.toUserWithPassword(user);
  }

  async create(data: CreateUserInput): Promise<User> {
    const user = await this.prismaService.user.create({
      data: {
        email: data.email,
        passwordHash: data.passwordHash,
      },
      omit: { passwordHash: true },
    });

    return PrismaUsersMapper.toUser(user);
  }
}
