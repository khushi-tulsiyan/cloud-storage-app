import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from './trpc';
import { db } from '../db'; // Assuming `db` is the Drizzle ORM instance

export const userRouter = createTRPCRouter({
  // Create user
  create: publicProcedure
    .input(z.object({ name: z.string(), email: z.string() }))
    .mutation(async ({ input }) => {
      const newUser = await db.insert('users').values(input).returning('*');
      return newUser;
    }),

  // Read user by ID
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const user = await db.select('users').where({ id: input.id }).first();
      return user;
    }),

  // Update user
  update: publicProcedure
    .input(z.object({ id: z.string(), name: z.string().optional(), email: z.string().optional() }))
    .mutation(async ({ input }) => {
      const updatedUser = await db.update('users').set(input).where({ id: input.id }).returning('*');
      return updatedUser;
    }),

  // Delete user
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await db.delete('users').where({ id: input.id });
      return { success: true };
    }),
});
