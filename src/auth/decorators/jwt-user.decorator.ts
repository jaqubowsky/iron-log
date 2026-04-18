import { JWTUserResponse } from '../interfaces/jwt-user-response';
import { createStrategyUserDecorator } from './strategy-user.decorator';

export const JWTUser = createStrategyUserDecorator<JWTUserResponse>();
