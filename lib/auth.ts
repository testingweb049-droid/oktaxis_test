import { getServerSession } from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

import { db } from "@/db/drizzle";
import { admins } from "@/db/schema";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const [admin] = await db
          .select()
          .from(admins)
          .where(eq(admins.email, credentials.email.toLowerCase()));

        if (!admin) {
          return null;
        }

        const passwordMatches = await bcrypt.compare(
          credentials.password,
          admin.password,
        );

        if (!passwordMatches) {
          return null;
        }

        return {
          id: String(admin.id),
          name: admin.name,
          email: admin.email,
          role: admin.role ?? "admin",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: any;
      user?: any;
    }) {
      if (user) {
        (token as any).role = (user as any).role ?? "admin";
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: any;
      token: any;
    }) {
      if (session.user) {
        (session.user as any).id = token.sub;
        (session.user as any).role = (token as any).role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

type AdminSession = {
  user?: {
    id?: string;
    role?: string;
    [key: string]: any;
  };
  [key: string]: any;
};

export async function getAdminServerSession() {
  const session = (await getServerSession(authOptions)) as AdminSession | null;
  if (!session || session.user?.role !== "admin") {
    return null;
  }
  return session;
}

export async function requireAdmin() {
  const session = await getAdminServerSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}

