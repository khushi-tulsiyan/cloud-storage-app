import { db } from './db';
import { files } from './schema/file';
import { eq } from 'drizzle-orm/expressions';

// Create a new file
export const createFile = async (userId: number, filename: string, fileSize: number) => {
  return db.insert(files).values({ userId, filename, fileSize }).returning('*');
};

// Get a file by ID
export const getFileById = async (id: number) => {
  return db.select().from(files).where(eq(files.id, id)).limit(1);
};

// Get all files
export const getAllFiles = async () => {
  return db.select().from(files);
};

// Update a file's details
export const updateFile = async (id: number, filename: string, fileSize: number) => {
  return db.update(files).set({ filename, fileSize }).where(eq(files.id, id)).returning('*');
};

// Delete a file by ID
export const deleteFile = async (id: number) => {
  return db.delete(files).where(eq(files.id, id)).returning('*');
};
