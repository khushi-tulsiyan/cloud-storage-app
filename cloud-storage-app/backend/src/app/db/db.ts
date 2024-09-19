import { drizzle } from 'drizzle-orm';
import { Pool } from 'pg';
import { PrismaClient } from '@prisma/client';



// Create a PostgreSQL connection pool
const pool = new Pool({
  user: 'cloud_user',
  host: 'localhost',
  database: 'cloud_storage',
  password: '2805',
  port: 5432,
});

// Initialize Drizzle ORM with the PostgreSQL pool
const db = drizzle(pool);
export const prisma = new PrismaClient();
export { db };
