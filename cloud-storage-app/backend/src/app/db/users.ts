import { db } from './db'; // Assuming you have a db instance
import { users } from './schema/user';

export const createUser = async (email: string) => {
  return db.insert(users).values({ email }).returning('*');
};

export const getUserById = async (id: number) => {
  return db.select().from(users).where(users.id.equals(id)).first();
};

export const getAllUsers = async () => {
  return db.select().from(users);
};

export const updateUser = async (id: number, email: string) => {
  return db.update(users).set({ email }).where(users.id.equals(id)).returning('*');
};

export const deleteUser = async (id: number) => {
  return db.delete().from(users).where(users.id.equals(id));
};
