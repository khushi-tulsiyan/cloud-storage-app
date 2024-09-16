import { pgTable, serial, varchar, integer, timestamp } from 'drizzle-orm/pg-core';

export const files = pgTable('files', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(), // Foreign key to User
  filename: varchar('filename', { length: 255 }).notNull(),
  fileSize: integer('file_size').notNull(),
  uploadedAt: timestamp('uploaded_at').defaultNow(),
});
