import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export function createStrategyUserDecorator<T>() {
  return createParamDecorator(
    (data: keyof T | undefined, ctx: ExecutionContext) => {
      const user = ctx.switchToHttp().getRequest<Request & { user: T }>().user;
      return data ? user?.[data] : user;
    },
  );
}
