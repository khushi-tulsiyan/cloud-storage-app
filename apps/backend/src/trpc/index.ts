// apps/backend/src/trpc/index.ts

import { createTRPCRouter } from '../../pages/api/trpc/[trpc]';
import { fileRouter } from './fileRouter';
import { noteRouter } from './noteRouter';

export const appRouter = createTRPCRouter({
  file: fileRouter,
  note:  noteRouter
  // Add other routers here
});

// Export type definition of API
export type AppRouter = typeof appRouter;
