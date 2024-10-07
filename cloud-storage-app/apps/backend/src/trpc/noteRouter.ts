import { z } from 'zod';
import { router, publicProcedure } from '../../pages/api/trpc/[trpc]';
import { Note } from '../../models/note'; // Assuming the `note` schema is defined in the specified path

export const noteRouter = router({
  createNote: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        content: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { db } = ctx;

      // Insert a new note using Drizzle's `insert` method
      const newNote = await db.insert(Note).values({
        userId: input.userId,
        content: input.content,
      });

      return newNote;
    }),
});
