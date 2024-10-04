import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { db } from '../../drizzle';

const t = initTRPC.create();

export const appRouter = t.router({
  getUser: t.procedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const user = await db.query('SELECT * FROM User WHERE id = ?', [input.id]);
      return user;
    }),

  createNote: t.procedure
    .input(z.object({ userId: z.string(), content: z.string() }))
    .mutation(async ({ input }) => {
      const newNote = await db.query(
        `INSERT INTO Note (userId, content, createdAt) VALUES (?, ?, ?)`,
        [input.userId, input.content, new Date()]
      );
      return newNote;
    }),
});

export type AppRouter = typeof appRouter;
