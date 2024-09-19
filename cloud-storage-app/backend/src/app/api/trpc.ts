import { fileRouter } from './auth/file';
import { noteRouter } from './auth/note';
import { userRouter } from './auth/user';
import { initTRPC } from '@trpc/server';
import { CreateNextContextOptions, getServerSession } from '@trpc/server/adapters/next';
import { prisma } from '../db/db';
import { authOptions } from '../api/auth/options';

const t = initTRPC.create();

export const createContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;
  const session = await getServerSession(req, res, authOptions);
  return {
    db: prisma,
    session,
  };
};

export type Context = ReturnType<typeof createContext>;

export const appRouter = t.router({
  file: fileRouter,
  note: noteRouter,
  user: userRouter,
});

// Export type definition of API
export type AppRouter = typeof appRouter;
