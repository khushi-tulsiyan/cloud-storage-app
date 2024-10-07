// drizzle.ts

import { createContext } from './src/context';
import { initTRPC } from '@trpc/server';
import { inferAsyncReturnType } from '@trpc/server';
import { drizzle } from 'drizzle-orm/libsql';
import sqlite3 from 'sqlite3';


// Initialize the SQLite3 database
const sqlite = sqlite3.verbose();
export const db = drizzle(new sqlite.Database('../backend/db/database'));

// Define the context creation function
export const createTRPCContext = async ({ req, res }: any) => {
  // Add any custom logic needed here for your context, like authentication, etc.
  return {
    db,
    req,
    res,
  };
};

// Define tRPC
const t = initTRPC.context<inferAsyncReturnType<typeof createTRPCContext>>().create();

// Export the router and other utilities
export const router = t.router;
export const publicProcedure = t.procedure;
