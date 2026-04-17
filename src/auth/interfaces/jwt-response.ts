export interface JwtResponse {
  accessToken: string;
  refreshToken: string;
  refreshExpiresAt: Date;
}
