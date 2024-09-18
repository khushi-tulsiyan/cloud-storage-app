import { initTRPC } from '@trpc/server';
import { z } from 'zod';

// Initialize tRPC
const t = initTRPC.create();

// Create user router
export const userRouter = t.router({
  // Fetch current user details
  me: t.procedure.query(async ({ ctx }) => {
    return ctx.session.user;
  }),

  // Fetch user by ID
  getById: t.procedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.user.findUnique({ where: { id: input.id } });
    }),
});
