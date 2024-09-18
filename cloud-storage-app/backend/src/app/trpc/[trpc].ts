import { initTRPC } from '@trpc/server';
import { trpc } from '/Users/INDIA/cloud-storage-app/cloud-storage-app/backend/src/app/api/trpc';

const t = initTRPC.create();

// Create the appRouter using t.router and include your sub-routers
export const appRouter = t.router({
  trpc, // Import your other routers here
});

// Export the type definition of the API
export type AppRouter = typeof appRouter;
