import { PrismaService } from 'src/db/prisma.service';
import { CreateRefreshTokenInput } from '../interfaces/create-refresh-token-input';
import { AuhtRepository } from './auth-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaAuthRepository implements AuhtRepository {
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
}
