import { CreateRefreshTokenInput } from '../interfaces/create-refresh-token-input';

export abstract class AuthRepository {
  abstract createRefreshToken(data: CreateRefreshTokenInput): Promise<void>;
  abstract revokeRefreshToken(
    userId: string,
    rawRefreshToken: string,
  ): Promise<void>;
}
