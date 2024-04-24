import { User, UserRole } from "@prisma/client"
import NextAuth, { type DefaultSession } from "next-auth"

export type ExtendedUser = DefaultSession["user"] & {
    role: UserRole;
    id: User.id ;
    isTwoFactorEnabled: boolean;
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser
  }
}

