import NextAuth from 'next-auth';
import { NextAuthOptions } from 'next-auth';

const authOptions: NextAuthOptions = {
  providers: [
    // Add your authentication providers here
    // For now, we'll use a simple credentials provider for demo
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async session({ session, token }) {
      return session;
    },
    async jwt({ token, user }) {
      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
