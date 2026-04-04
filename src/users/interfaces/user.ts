class RefreshToken {
  id: string;
  valid: boolean;
  userId: string;
  expiration: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  id: string;
  email: string;
  password: string;
  tokens: RefreshToken[];
  createdAt: Date;
  updatedAt: Date;
}
