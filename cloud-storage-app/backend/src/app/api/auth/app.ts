import { createTRPCRouter } from '../trpc';
import { userRouter } from './user';
import { fileRouter } from './file';
import { noteRouter } from './note';

export const appRouter = createTRPCRouter({
  user: userRouter,
  file: fileRouter,
  note: noteRouter,
});

export type AppRouter = typeof appRouter;