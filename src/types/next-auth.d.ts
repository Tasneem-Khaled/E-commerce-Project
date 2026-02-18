import { UserInterface } from "@/interfaces/authInterfaces"
import NextAuth , { DefaultSession, User} from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSession {
    user: UserInterface
    accessToken: string
  }

  interface User {
    apiToken: string,
    apiUser: UserInterface
  }
}
import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends User {
  }
}