import { PrismaService } from 'src/db/prisma.service';
import { CreateRefreshTokenInput } from '../interfaces/create-refresh-token-input';
import { AuthRepository } from './auth-repository';
import { Injectable } from '@nestjs/common';
import { ValidateRefreshTokenOutput } from '../interfaces/validate-refresh-token-output';

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

  async validateRefreshToken(
    tokenHash: string,
  ): Promise<ValidateRefreshTokenOutput> {
    const refreshToken = await this.prismaService.refreshToken.findFirst({
      where: {
        tokenHash,
        valid: true,
        expiration: {
          gt: new Date(),
        },
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });
    if (!refreshToken) return { valid: false };

    return {
      user: { id: refreshToken.userId, email: refreshToken.user.email },
      valid: true,
    };
  }

  async revokeRefreshToken(
    userId: string,
    tokenHash: string,
  ): Promise<boolean> {
    const result = await this.prismaService.refreshToken.updateMany({
      where: {
        userId,
        tokenHash,
        valid: true,
      },
      data: {
        valid: false,
      },
    });

    return result.count > 0;
  }
}
