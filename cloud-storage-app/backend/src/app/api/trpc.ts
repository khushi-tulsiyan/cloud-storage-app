import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import { type CreateNextContextOptions } from '@trpc/server/adapters/next';
import { getSession } from 'next-auth/react'; // Adjusted import
import { prisma } from '../db/db';
import { authOptions } from '../api/auth/options';
import { fileRouter } from '../api/auth/file';
import { userRouter } from './auth/user';
import { noteRouter } from './auth/note';

// Initialize tRPC
const t = initTRPC.create();

export const createContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;
  const session = await getSession({ req }); // Adjusted for next-auth
  return {
    db: prisma,
    session,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;

export const appRouter = t.router({
  // Include routers here
  file: fileRouter,
  note: noteRouter,
  user: userRouter,
});

// Export type definition of API
export type AppRouter = typeof appRouter;
