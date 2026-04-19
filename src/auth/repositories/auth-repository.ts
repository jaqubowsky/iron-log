import { CreateRefreshTokenInput } from '../interfaces/create-refresh-token-input';
import { ValidateRefreshTokenOutput } from '../interfaces/validate-refresh-token-output';

export abstract class AuthRepository {
  abstract createRefreshToken(data: CreateRefreshTokenInput): Promise<void>;
  abstract validateRefreshToken(
    tokenHash: string,
  ): Promise<ValidateRefreshTokenOutput>;
  abstract revokeRefreshToken(
    userId: string,
    tokenHash: string,
  ): Promise<boolean>;
}
