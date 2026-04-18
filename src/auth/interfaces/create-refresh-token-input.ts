export interface CreateRefreshTokenInput {
  userId: string;
  tokenHash: string;
  expiration: Date;
}
