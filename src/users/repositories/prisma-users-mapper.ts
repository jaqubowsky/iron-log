import { Prisma } from 'prisma/generated/prisma/client';
import { User } from '../interfaces/user';

type PrismaUserWithoutPassword = Prisma.UserGetPayload<{
  omit: { password: true };
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
}
