import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDTO } from './dto/register-user-dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/interfaces/user';
import { ValidateUserInput } from './interfaces/validate-user-input';
import { JwtService } from '@nestjs/jwt';
import { LoginUserInput } from './interfaces/login-user-input';
import { ConfigService } from '@nestjs/config';
import { JwtResponse } from './interfaces/jwt-response';
import { createHash, randomUUID } from 'node:crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterUserDTO): Promise<User> {
    const passwordHash = await bcrypt.hash(data.password, 10);

    return this.usersService.create({
      email: data.email,
      passwordHash,
    });
  }

  async login(data: LoginUserInput): Promise<JwtResponse> {
    const accessToken = await this.jwtService.signAsync({
      sub: data.id,
      email: data.email,
    });

    const refreshToken = createHash('sha256')
      .update(randomUUID())
      .digest('hex');

    const refreshExpiresAt = new Date(
      Date.now() +
        this.configService.getOrThrow<number>('JWT_REFRESH_EXPIRES_IN_MS'),
    );

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
}
