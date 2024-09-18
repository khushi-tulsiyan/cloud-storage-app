// backend/src/api/trpc.ts
import { initTRPC } from '@trpc/server';
import { fileRouter } from './auth/file';
import { noteRouter } from './auth/note';
import { userRouter } from './auth/user';

const t = initTRPC.create();

export const appRouter = t.router({
  file: fileRouter,
  note: noteRouter,
  user: userRouter,
});

// Export type definition of API
export type AppRouter = typeof appRouter;
