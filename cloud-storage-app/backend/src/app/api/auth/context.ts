import { inferAsyncReturnType } from '@trpc/server';
import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react'; // Assuming you're using next-auth

// Initialize Prisma Client
const prisma = new PrismaClient();

// Define your context creation function
export async function createContext({ req, res }: { req: any, res: any }) {
  // Get the session for the user
  const session = await getSession({ req });

  return {
    db: prisma, // Add Prisma Client
    session,    // Add user session data
  };
}

// Export type for context
export type Context = inferAsyncReturnType<typeof createContext>;
