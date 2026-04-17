import { Prisma, User as PrismaUser } from 'prisma/generated/prisma/client';
import { User, UserWithPassword } from '../interfaces/user';

type PrismaUserWithoutPassword = Prisma.UserGetPayload<{
  omit: { passwordHash: true };
}>;

export class PrismaUsersMapper {
  static toUser(raw: PrismaUserWithoutPassword) {
    return {
      id: raw.id,
      email: raw.email,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    } satisfies User;
  }

  static toUserWithPassword(raw: PrismaUser) {
    return {
      id: raw.id,
      email: raw.email,
      passwordHash: raw.passwordHash,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    } satisfies UserWithPassword;
  }
}
