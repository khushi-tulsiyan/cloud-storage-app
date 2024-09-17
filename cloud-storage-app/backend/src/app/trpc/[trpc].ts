import { initTRPC } from '@trpc/server';
import { appRouter } from '../../../api';

const t = initTRPC.create();
export const appRouter = t.router(appRouter);

// Export the type definition of the API
export type AppRouter = typeof appRouter;
