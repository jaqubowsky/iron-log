import { createStrategyUserDecorator } from './strategy-user.decorator';
import { JWTUserResponse } from '../interfaces/jwt-user-response';

export const RefreshUser = createStrategyUserDecorator<JWTUserResponse>();
