import { NextAuthOptions } from 'next-auth';
import GoogleP
import { prisma } from '../db/db'; // Assuming you're using Prisma for the database

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    // You can add more providers here (GitHub, Facebook, etc.)
  ],
  session: {
    strategy: 'jwt', // Using JWT sessions (can change to 'database' if you want sessions stored in DB)
  },
  callbacks: {
    // Called whenever a user signs in
    async signIn({ user, account, profile, email, credentials }) {
      // Logic to control if the sign-in is allowed
      return true; // Allow all sign-ins for now
    },
    // Control what is returned in the session object
    async session({ session, token, user }) {
      // Append custom session data here, for example, user ID
      if (session?.user) {
        session.user.id = token.sub; // Use token's sub (user ID)
      }
      return session;
    },
    // Attach user information to JWT
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.sub = user.id; // Include user ID in the token
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure you have this in your .env
  database: process.env.DATABASE_URL, // If you're using Prisma, ensure this is in your .env
};
