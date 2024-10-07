

import { pgTable, serial, varchar, timestamp, text } from 'drizzle-orm/pg-core';
import { InferModel } from 'drizzle-orm';

// Define the Note schema
export const Note = pgTable('Note', {
  id: serial('id').primaryKey(), // Primary key
  userId: varchar('user_id', { length: 255 }), // Foreign key referencing User
  content: text('content').notNull(), // Content of the note
  createdAt: timestamp('created_at').defaultNow(), // Timestamp for when the note was created
});

// Type inference for the Note model
export type NoteModel = InferModel<typeof Note, 'insert'>;
export type NoteSelect = InferModel<typeof Note, 'select'>;