import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDTO } from './dto/register-user-dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/interfaces/user';
import { ValidateUserInput } from './interfaces/validate-user-input';
import { JwtService } from '@nestjs/jwt';
import { LoginUserInput } from './interfaces/login-user-input';
import { ConfigService } from '@nestjs/config';
import { JwtResponse } from './interfaces/jwt-response';
import { AuthRepository } from './repositories/auth-repository';
import { createHash, randomUUID } from 'node:crypto';
import { ValidateRefreshTokenInput } from './interfaces/validate-refresh-token-input';
import { RefreshTokensInput } from './interfaces/refresh-tokens-input';
import { ValidateRefreshTokenOutput } from './interfaces/validate-refresh-token-output';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
    private jwtService: JwtService,
    private authRepository: AuthRepository,
  ) {}

  private hashRefreshToken(rawRefreshToken: string): string {
    const refreshTokenHash = createHash('sha256')
      .update(rawRefreshToken)
      .digest('hex');

    return refreshTokenHash;
  }

  async register(data: RegisterUserDTO): Promise<User> {
    const passwordHash = await bcrypt.hash(data.password, 10);

    return this.usersService.create({
      email: data.email,
      passwordHash,
    });
  }

  async logout(userId: string, rawRefreshToken: string): Promise<void> {
    const refreshTokenHash = this.hashRefreshToken(rawRefreshToken);
    await this.authRepository.revokeRefreshToken(userId, refreshTokenHash);
  }

  async getMe(userId: string): Promise<User | null> {
    return this.usersService.findById(userId);
  }

  async createAuthTokens(data: LoginUserInput): Promise<JwtResponse> {
    const accessToken = await this.jwtService.signAsync({
      sub: data.id,
      email: data.email,
    });

    const refreshToken = randomUUID();
    const refreshTokenHash = this.hashRefreshToken(refreshToken);

    const refreshExpiresAt = new Date(
      Date.now() +
        this.configService.getOrThrow<number>('REFRESH_EXPIRES_IN_MS'),
    );

    await this.authRepository.createRefreshToken({
      userId: data.id,
      tokenHash: refreshTokenHash,
      expiration: refreshExpiresAt,
    });

    return { accessToken, refreshToken, refreshExpiresAt };
  }

  async validateUser(data: ValidateUserInput): Promise<User | null> {
    const user = await this.usersService.findByEmailWithPassword(data.email);
    if (!user) return null;

    const isMatch = await bcrypt.compare(data.password, user.passwordHash);
    if (!isMatch) return null;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async validateRefreshToken(
    data: ValidateRefreshTokenInput,
  ): Promise<ValidateRefreshTokenOutput> {
    const refreshTokenHash = this.hashRefreshToken(data.refreshToken);
    const response =
      await this.authRepository.validateRefreshToken(refreshTokenHash);

    return response;
  }

  async refreshAuthTokens(data: RefreshTokensInput): Promise<JwtResponse> {
    const user = await this.usersService.findById(data.userId);
    if (!user) throw new UnauthorizedException('User not found');

    const tokenHash = this.hashRefreshToken(data.refreshToken);
    const revoked = await this.authRepository.revokeRefreshToken(
      data.userId,
      tokenHash,
    );
    if (!revoked) throw new UnauthorizedException('Invalid refresh token');

    return this.createAuthTokens({ id: user.id, email: user.email });
  }
}
