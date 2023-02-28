import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from "../../../env/server.mjs";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  jwt: {
    secret: "secret",
    maxAge: 3000,
  },
  session: {
    strategy: "jwt",
    maxAge: 3000,
  },
  secret: "secret",
  // Include user.id on session
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user = {
          id: token.id as string,
          name: session.user.name,
          email: session.user.email,
          image: session.user.image,
        };
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        if (credentials) {
          if (credentials?.password?.length < 8) {
            throw new Error("Şifre en az 8 karakter olmalıdır.");
          }
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        if (!user) {
          throw new Error("Veritabanımızda böyle bir kullanıcı bulunamadı.");
        } else {
          // If you return null or false then the credentials will be rejected
          const isValid = bcrypt.compareSync(
            credentials?.password as string,
            user.password as string
          );
          if (isValid) {
            return user;
          } else {
            throw new Error("Lütfen şifrenizi kontrol edin");
          }
          // You can also Reject this callback with an Error or with a URL:
          // throw new Error('error message') // Redirect to error page
          // throw '/path/to/redirect'        // Redirect to a URL
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
};

export default NextAuth(authOptions);
