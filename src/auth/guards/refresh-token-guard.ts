import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Request } from 'express';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest<Request>();

    const refreshToken = request.cookies?.['refreshToken'] as
      | string
      | undefined;

    if (!refreshToken) throw new UnauthorizedException();

    const response = await this.authService.validateRefreshToken({
      refreshToken,
    });
    if (!response.valid) throw new UnauthorizedException();

    request.user = response.user;

    return true;
  }
}
