import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from './trpc';
import { db } from '../db';

export const fileRouter = createTRPCRouter({
  // Create file (store metadata)
  create: publicProcedure
    .input(z.object({ filename: z.string(), size: z.number(), userId: z.string() }))
    .mutation(async ({ input }) => {
      const newFile = await db.insert('files').values(input).returning('*');
      return newFile;
    }),

  // Read file by ID
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const file = await db.select('files').where({ id: input.id }).first();
      return file;
    }),

  // Delete file
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await db.delete('files').where({ id: input.id });
      return { success: true };
    }),
});

export const fileRouter = createTRPCRouter({
    upload: publicProcedure
      .input(z.object({ file: z.string(), userId: z.string() }))
      .mutation(async ({ input }) => {
        const metadata = await handleFileUpload(input.file); // Call UploadThing or another service
        const fileRecord = await db.insert('files').values({
          filename: metadata.filename,
          size: metadata.size,
          userId: input.userId,
        }).returning('*');
        return fileRecord;
      }),
  });
  
