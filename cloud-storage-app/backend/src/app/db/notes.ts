import { db } from './db'; 
import { notes } from './schema/note';

export const createNote = async (userId: number, title: string, content: string) => {
  return db.insert(notes).values({ userId, title, content }).returning('*');
};

export const getNoteById = async (id: number) => {
  return db.select().from(notes).where(notes.id.equals(id)).first();
};

export const getAllNotes = async () => {
  return db.select().from(notes);
};

export const updateNote = async (id: number, title: string, content: string) => {
  return db.update(notes).set({ title, content }).where(notes.id.equals(id)).returning('*');
};

export const deleteNote = async (id: number) => {
  return db.delete().from(notes).where(notes.id.equals(id));
};
