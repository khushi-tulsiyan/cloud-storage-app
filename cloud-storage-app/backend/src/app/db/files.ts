import { db } from './db'; 
import { files } from './schema/file';

export const createFile = async (userId: number, filename: string, fileSize: number) => {
  return db.insert(files).values({ userId, filename, fileSize }).returning('*');
};

export const getFileById = async (id: number) => {
  return db.select().from(files).where(files.id.equals(id)).first();
};

export const getAllFiles = async () => {
  return db.select().from(files);
};

export const updateFile = async (id: number, filename: string, fileSize: number) => {
  return db.update(files).set({ filename, fileSize }).where(files.id.equals(id)).returning('*');
};

export const deleteFile = async (id: number) => {
  return db.delete().from(files).where(files.id.equals(id));
};
