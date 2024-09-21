import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { createContext } from '../trpc';

// Initialize tRPC
const t = initTRPC.create();

// Create file router
export const fileRouter = t.router({
  // Upload a new file
  upload: t.procedure
    .input(z.object({
      filename: z.string(),
      fileUrl: z.string(),
      size: z.number(),
    }))
    .mutation(async ({ input, ctx }) => {
      // Ensure ctx.db and ctx.session exist
      if (!ctx.db || !ctx.session?.user) {
        throw new Error('Missing database connection or session.');
      }

      return await ctx.db.file.create({
        data: {
          filename: input.filename,
          fileUrl: input.fileUrl,
          size: input.size,
          userId: ctx.session.user.id, // Ensure ctx.session.user exists
        },
      });
    }),

  // Fetch all files for the current user
  getAll: t.procedure.query(async ({ ctx }) => {
    // Ensure ctx.db and ctx.session exist
    if (!ctx.db || !ctx.session?.user) {
      throw new Error('Missing database connection or session.');
    }

    return await ctx.db.file.findMany({
      where: { userId: ctx.session.user.id },
    });
  }),
});
