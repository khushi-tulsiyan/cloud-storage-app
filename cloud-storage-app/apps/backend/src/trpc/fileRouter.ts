
import { createTRPCRouter, publicProcedure } from '../../pages/api/trpc/[trpc]'; 
import { z } from 'zod';
import { S3 } from 'aws-sdk';

// Initialize S3 client (configure this based on your credentials and region)
const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Ensure bucket name is defined
const bucketName = process.env.AWS_S3_BUCKET_NAME;
if (!bucketName) {
  throw new Error("Missing AWS S3 Bucket Name in environment variables");
}

export const fileRouter = createTRPCRouter({
  upload: publicProcedure
    .input(
      z.object({
        fileName: z.string(),
        fileType: z.string(),
        fileData: z.string(), // This should be a base64 string or the raw file data
      })
    )
    .mutation(async ({ input }) => {
      const { fileName, fileType, fileData } = input;

      // Save the file to storage
      const fileId = await saveFileToStorage(fileName, fileType, fileData);
      return { success: true, fileId };
    }),

  getFile: publicProcedure
    .input(z.object({ fileId: z.string() }))
    .query(async ({ input }) => {
      const { fileId } = input;

      // Fetch the file from storage
      const file = await getFileFromStorage(fileId);
      return file;
    }),

  deleteFile: publicProcedure
    .input(z.object({ fileId: z.string() }))
    .mutation(async ({ input }) => {
      const { fileId } = input;

      // Delete the file from storage
      await deleteFileFromStorage(fileId);
      return { success: true };
    }),
});

// Implement logic to save, retrieve, and delete files
async function saveFileToStorage(fileName: string, fileType: string, fileData: string) {
  const buffer = Buffer.from(fileData, 'base64'); // Convert base64 to buffer
  const params = {
    Bucket: bucketName as string, // Ensure bucketName is of type string
    Key: fileName, // File name you want to save
    Body: buffer,
    ContentType: fileType,
  };

  // Save the file to S3
  const s3Response = await s3.upload(params).promise();
  return s3Response.Key; // Return the file ID (Key)
}

async function getFileFromStorage(fileId: string) {
  const params = {
    Bucket: bucketName as string, // Ensure bucketName is of type string
    Key: fileId,
  };

  // Fetch the file from S3
  const s3Response = await s3.getObject(params).promise();
  const fileData = s3Response.Body?.toString('base64'); // Convert buffer to base64 if needed

  return {
    fileName: fileId,
    fileType: s3Response.ContentType,
    fileData: fileData,
  };
}

async function deleteFileFromStorage(fileId: string) {
  const params = {
    Bucket: bucketName as string, // Ensure bucketName is of type string
    Key: fileId,
  };

  // Delete the file from S3
  await s3.deleteObject(params).promise();
}
