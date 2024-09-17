import { router } from './trpc';
import { fileRouter } from './fileRouter';

export const appRouter = router({
  file: fileRouter,
});

// Export type of appRouter
export type AppRouter = typeof appRouter;
