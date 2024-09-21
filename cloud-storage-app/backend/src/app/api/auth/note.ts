import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { Context} from '../trpc'; // Import the context type

// Initialize tRPC
const t = initTRPC.create<Context>(); // Provide context type

// Create note router
export const noteRouter = t.router({
  // Create a new note
  create: t.procedure
    .input(z.object({ title: z.string(), content: z.string() }))
    .mutation(async ({ input, ctx }) => {
      // Ensure ctx.db and ctx.session exist
      if (!ctx.db || !ctx.session?.user) {
        throw new Error('Missing database connection or session.');
      }

      return await ctx.db.note.create({
        data: {
          title: input.title,
          content: input.content,
          userId: ctx.session.user.id, // Ensure ctx.session.user exists
        },
      });
    }),

  // Edit an existing note
  edit: t.procedure
    .input(z.object({ id: z.string(), title: z.string(), content: z.string() }))
    .mutation(async ({ input, ctx }) => {
      // Ensure ctx.db exists
      if (!ctx.db) {
        throw new Error('Missing database connection.');
      }

      return await ctx.db.note.update({
        where: { id: input.id },
        data: { title: input.title, content: input.content },
      });
    }),

  // Fetch all notes for the current user
  getAll: t.procedure.query(async ({ ctx }) => {
    // Ensure ctx.db and ctx.session exist
    if (!ctx.db || !ctx.session?.user) {
      throw new Error('Missing database connection or session.');
    }

    return await ctx.db.note.findMany({
      where: { userId: ctx.session.user.id },
    });
  }),
});
