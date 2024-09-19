import { initTRPC } from '@trpc/server';
import { userRouter } from './auth/user';
import { fileRouter } from './auth/file';
import { noteRouter } from './auth/note';

// Initialize tRPC
const t = initTRPC.create();

// Create the main router using `t.router()`
export const appRouter = t.router({
  user: userRouter,
  file: fileRouter,
  note: noteRouter,
});

// Export the AppRouter type
export type AppRouter = typeof appRouter;
