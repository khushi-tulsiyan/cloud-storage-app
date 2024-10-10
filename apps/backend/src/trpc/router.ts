
import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { db } from '../../drizzle';
import { User } from '../../models/user';
import { Note } from '../../models/note';
import { eq } from 'drizzle-orm'; // Make sure to import 'eq'

const t = initTRPC.create();

export const appRouter = t.router({
  getUser: t.procedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      // Use your User model to find a user by id
      const user = await db
        .select()
        .from(User)
        .where(eq(User.id, input.id))
        .execute(); // Use execute() if your library requires it
      return user;
    }),

  createNote: t.procedure
    .input(z.object({ userId: z.string(), content: z.string() }))
    .mutation(async ({ input }) => {
      // Insert a new note using your Note model
      const newNote = await db
        .insert(Note)
        .values({
          userId: input.userId,
          content: input.content,
          createdAt: new Date(),
        })
        .returning(); // Adjust according to your setup
      return newNote;
    }),
});

export type AppRouter = typeof appRouter;
