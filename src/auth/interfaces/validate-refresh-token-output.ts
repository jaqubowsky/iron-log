import { JWTUserResponse } from './jwt-user-response';

export type ValidateRefreshTokenOutput =
  | {
      valid: true;
      user: JWTUserResponse;
    }
  | {
      valid: false;
    };
