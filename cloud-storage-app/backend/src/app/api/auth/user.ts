import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc'; // Ensure path to trpc is correct
import { db } from '../../db/db'; // Ensure path to db is correct and `db` is properly exported

export const userRouter = createTRPCRouter({
  // Create user
  create: publicProcedure
    .input(z.object({ name: z.string(), email: z.string() })) // Zod will infer types here
    .mutation(async ({ input }: { input: { name: string, email: string } }) => { // Add explicit types
      const newUser = await db.insert('users').values(input).returning('*');
      return newUser;
    }),

  // Read user by ID
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }: { input: { id: string } }) => {
      const user = await db.select('users').where({ id: input.id }).first();
      return user;
    }),

  // Update user
  update: publicProcedure
    .input(z.object({ id: z.string(), name: z.string().optional(), email: z.string().optional() }))
    .mutation(async ({ input }: { input: { id: string, name?: string, email?: string } }) => {
      const updatedUser = await db.update('users').set(input).where({ id: input.id }).returning('*');
      return updatedUser;
    }),

  // Delete user
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }: { input: { id: string } }) => {
      await db.delete('users').where({ id: input.id });
      return { success: true };
    }),
});
