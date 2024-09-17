import { db } from './db';

export const getUserById = async (id: number) => {
  return await db.selectFrom('users').where('id', '=', id).execute();
};

export const createNote = async (userId: number, title: string, content: string) => {
  return await db.insertInto('notes').values({ user_id: userId, title, content }).execute();
};
