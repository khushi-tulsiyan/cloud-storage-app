import { z } from 'zod';
import { router, publicProcedure } from '../../pages/api/trpc/[trpc]';

export const noteRouter = router({
  createNote: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        content: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const newNote = await ctx.db.note.create({
        data: {
          userId: input.userId,
          content: input.content,
        },
      });
      return newNote;
    }),
});
