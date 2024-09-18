import { initTRPC } from '@trpc/server';
import { z } from 'zod';

// Initialize tRPC
const t = initTRPC.create();

// Create note router
export const noteRouter = t.router({
  // Create a new note
  create: t.procedure
    .input(z.object({ title: z.string(), content: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.note.create({
        data: {
          title: input.title,
          content: input.content,
          userId: ctx.session.user.id,
        },
      });
    }),

  // Edit an existing note
  edit: t.procedure
    .input(z.object({ id: z.string(), title: z.string(), content: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.note.update({
        where: { id: input.id },
        data: { title: input.title, content: input.content },
      });
    }),

  // Fetch all notes for the current user
  getAll: t.procedure.query(async ({ ctx }) => {
    return await ctx.db.note.findMany({
      where: { userId: ctx.session.user.id },
    });
  }),
});
