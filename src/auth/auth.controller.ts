import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDTO } from './dto/register-user-dto';
import { type User } from 'src/users/interfaces/user';
import { LocalAuthGuard } from './guards/local-auth-guard';
import { LocalUser } from './decorators/local-user.decorator';
import { Public } from './decorators/public.decorator';
import { type Response } from 'express';
import { LoginUserResponseDTO } from './dto/login-user-response-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/register')
  register(@Body() data: RegisterUserDTO): Promise<User> {
    return this.authService.register(data);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @LocalUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ): Promise<LoginUserResponseDTO> {
    const jwtResponse = await this.authService.createAuthTokens(user);

    response.cookie('refreshToken', jwtResponse.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: jwtResponse.refreshExpiresAt,
    });

    return { accessToken: jwtResponse.accessToken };
  }
}
