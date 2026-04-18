import { CreateRefreshTokenInput } from '../interfaces/create-refresh-token-input';

export abstract class AuhtRepository {
  abstract createRefreshToken(data: CreateRefreshTokenInput): Promise<void>;
}
