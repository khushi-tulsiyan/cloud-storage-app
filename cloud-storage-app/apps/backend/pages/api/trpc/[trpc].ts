import * as trpcNext from '@trpc/server/adapters/next';
import { appRouter } from '../../../src/trpc/router';
import { initTRPC } from '@trpc/server';
import { createHTTPHandler } from '@trpc/server/adapters/standalone';
import { z } from 'zod';

// Initialize TRPC
const t = initTRPC.create();

// Create the TRPCRouter type
export const createTRPCRouter = t.router;

// Create a public procedure that doesn't require authentication
export const publicProcedure = t.procedure;

// Define your TRPC middleware if needed, e.g., for authentication
export const middleware = t.middleware;

// Example of using the middleware
export const protectedProcedure = t.procedure.use(middleware(async ({ ctx, next }) => {
  // Implement your authentication logic here
  return next();
}));

// Optionally, set up your API handler for Next.js
export const handler = createHTTPHandler({
  router: createTRPCRouter({}), // This will be defined in your routers
  createContext: () => ({}), // Define context if needed, such as user sessions
});

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});

