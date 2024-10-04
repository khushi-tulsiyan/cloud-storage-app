// apps/backend/drizzle.ts
import { drizzle } from 'drizzle-orm/mysql2';
import { sqlite3 } from 'sqlite3';
import { resolve } from 'path';
import { Database } from 'sqlite3';

const sqlitePath = resolve(__dirname, 'db/database.sqlite');
const db = new Database(sqlitePath);

export const dbInstance = drizzle(db);
