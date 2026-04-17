import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDTO } from './dto/register-user-dto';
import { User } from 'src/users/interfaces/user';
import { LocalAuthGuard } from './guards/local-auth-guard';
import { JwtResponse } from './interfaces/jwt-response';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  register(@Body() data: RegisterUserDTO): Promise<User> {
    return this.authService.register(data);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req): Promise<JwtResponse> {
    return this.authService.login(req.user);
  }
}
