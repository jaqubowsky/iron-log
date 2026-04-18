import { PrismaService } from 'src/db/prisma.service';
import { CreateRefreshTokenInput } from '../interfaces/create-refresh-token-input';
import { AuthRepository } from './auth-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaAuthRepository implements AuthRepository {
  constructor(private prismaService: PrismaService) {}

  async createRefreshToken(data: CreateRefreshTokenInput): Promise<void> {
    await this.prismaService.refreshToken.create({
      data: {
        userId: data.userId,
        tokenHash: data.tokenHash,
        expiration: data.expiration,
      },
    });
  }

  async revokeRefreshToken(userId: string, tokenHash: string): Promise<void> {
    await this.prismaService.refreshToken.updateMany({
      where: {
        userId,
        tokenHash,
        valid: true,
      },
      data: {
        valid: false,
      },
    });
  }
}
