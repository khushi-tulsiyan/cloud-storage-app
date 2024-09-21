import { db } from './db';
import { users } from './schema/user';
import { eq } from 'drizzle-orm/expressions';

// Create a new user
export const createUser = async (email: string) => {
  return db.insert(users).values({ email }).returning('*');
};

// Get user by ID
export const getUserById = async (id: number) => {
  return db.select().from(users).where(eq(users.id, id)).limit(1);
};

// Get all users
export const getAllUsers = async () => {
  return db.select().from(users);
};

// Update a user's email
export const updateUser = async (id: number, email: string) => {
  return db.update(users).set({ email }).where(eq(users.id, id)).returning('*');
};

// Delete a user by ID
export const deleteUser = async (id: number) => {
  return db.delete(users).where(eq(users.id, id)).returning('*');
};
