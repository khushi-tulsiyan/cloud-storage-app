import { router, publicProcedure } from './trpc';
import { z } from 'zod';

// tRPC router for file upload operations
export const fileRouter = router({
  uploadDocument: publicProcedure
    .input(
      z.object({
        filename: z.string(),
        fileData: z.string(), // For simplicity, we are assuming base64 encoded files, you can change this as needed
      })
    )
    .mutation(async ({ input }) => {
      // Logic for saving the file to storage (e.g., S3, local storage, etc.)
      const { filename, fileData } = input;
      // Save the file data and return success response
      return { success: true, filename };
    }),
});
