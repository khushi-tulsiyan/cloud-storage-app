import { inferAsyncReturnType } from '@trpc/server';
import { type CreateNextContextOptions } from '@trpc/server/adapters/next';
import { getSession } from 'next-auth/react';
import { drizzle } from 'drizzle-orm/libsql';
import sqlite3 from 'sqlite3';

// Create the SQLite3 database connection
const sqlite = sqlite3.verbose();
const db = new sqlite.Database('../backend/db/database'); // Adjust the path accordingly

// Create Drizzle ORM instance
const drizzleDb = drizzle(db);

// Define the createContext function
export const createContext = async (opts: CreateNextContextOptions) => {
  const { req } = opts;

  // Get the session from NextAuth
  const session = await getSession({ req });

  // Return the context object which contains the database instance and session
  return {
    db: drizzleDb,
    session,
  };
};

// Infer the context type using inferAsyncReturnType utility
export type Context = inferAsyncReturnType<typeof createContext>;
