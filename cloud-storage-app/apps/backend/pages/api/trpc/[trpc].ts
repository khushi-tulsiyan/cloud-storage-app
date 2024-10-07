import { initTRPC } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { Context, createContext } from '../../../src/context';

const t = initTRPC.context<Context>().create();

export const createTRPCRouter = t.router;
export const router = t.router;
export const publicProcedure = t.procedure;

// Middleware Example (can use the user from context)
export const middleware = t.middleware;

export const protectedProcedure = t.procedure.use(middleware(async ({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new Error('Unauthorized');
  }
  return next();
}));

// Use this context in the Next.js API handler
export default trpcNext.createNextApiHandler({
  router: createTRPCRouter({}), // Replace with your actual router
  createContext,
});
