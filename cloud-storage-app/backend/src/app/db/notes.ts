import { db } from './db';
import { notes } from './schema/note';
import { eq } from 'drizzle-orm/expressions';

// Create a new note
export const createNote = async (userId: number, title: string, content: string) => {
  return db.insert(notes).values({ userId, title, content }).returning('*');
};

// Get a note by ID
export const getNoteById = async (id: number) => {
  return db.select().from(notes).where(eq(notes.id, id)).limit(1);
};

// Get all notes
export const getAllNotes = async () => {
  return db.select().from(notes);
};

// Update a note
export const updateNote = async (id: number, title: string, content: string) => {
  return db.update(notes).set({ title, content }).where(eq(notes.id, id)).returning('*');
};

// Delete a note by ID
export const deleteNote = async (id: number) => {
  return db.delete(notes).where(eq(notes.id, id)).returning('*');
};
