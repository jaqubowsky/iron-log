import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDTO } from './dto/register-user-dto';
import { type User } from 'src/users/interfaces/user';
import { LocalAuthGuard } from './guards/local-auth-guard';
import { LocalUser } from './decorators/local-user.decorator';
import { Public } from './decorators/public.decorator';
import { type Response } from 'express';
import { LoginUserResponseDTO } from './dto/login-user-response-dto';
import { JWTUser } from './decorators/jwt-user.decorator';
import { type JWTUserResponse } from './interfaces/jwt-user-response';
import { Cookie } from './decorators/cookie.decorator';
import { RefreshTokenGuard } from './guards/refresh-token-guard';
import { RefreshTokensResponseDTO } from './dto/refresh-tokens-response-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  private setRefreshTokenCookie(
    response: Response,
    refreshToken: string,
    expiresAt: Date,
  ) {
    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: expiresAt,
    });
  }

  @Public()
  @Post('/register')
  register(@Body() data: RegisterUserDTO): Promise<User> {
    return this.authService.register(data);
  }

  @Post('/logout')
  @HttpCode(204)
  async logout(
    @JWTUser('id') userId: JWTUserResponse['id'],
    @Cookie('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    if (!refreshToken) return;

    await this.authService.logout(userId, refreshToken);
    response.clearCookie('refreshToken');
  }

  @Get('/me')
  getMe(@JWTUser('id') userId: JWTUserResponse['id']): Promise<User | null> {
    return this.authService.getMe(userId);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @LocalUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ): Promise<LoginUserResponseDTO> {
    const jwtResponse = await this.authService.createAuthTokens(user);

    this.setRefreshTokenCookie(
      response,
      jwtResponse.refreshToken,
      jwtResponse.refreshExpiresAt,
    );

    return { accessToken: jwtResponse.accessToken };
  }

  @Public()
  @HttpCode(200)
  @UseGuards(RefreshTokenGuard)
  @Post('/refresh/token')
  async refreshToken(
    @JWTUser('id') userId: JWTUserResponse['id'],
    @Cookie('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<RefreshTokensResponseDTO> {
    const jwtResponse = await this.authService.refreshAuthTokens({
      userId,
      refreshToken,
    });

    this.setRefreshTokenCookie(
      response,
      jwtResponse.refreshToken,
      jwtResponse.refreshExpiresAt,
    );

    return { accessToken: jwtResponse.accessToken };
  }
}
