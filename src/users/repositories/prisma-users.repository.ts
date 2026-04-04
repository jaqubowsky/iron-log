import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { PrismaService } from 'src/db/prisma.service';
import { User } from '../interfaces/user';
import { CreateUserDTO } from '../dtos/create-user-dto';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prismaService: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: { email },
      include: {
        tokens: true,
      },
    });
  }

  async create(data: CreateUserDTO): Promise<User> {
    return await this.prismaService.user.create({
      data,
      include: {
        tokens: true,
      },
    });
  }
}
