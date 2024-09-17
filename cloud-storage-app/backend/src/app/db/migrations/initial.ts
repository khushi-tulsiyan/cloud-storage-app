import { sql } from 'drizzle-orm';

export const up = async () => {
  await sql`CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL
  )`;

  await sql`CREATE TABLE files (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    filename VARCHAR(255),
    size INT,
    upload_date TIMESTAMP
  )`;

  await sql`CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    title VARCHAR(255),
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`;
};

export const down = async () => {
  await sql`DROP TABLE notes`;
  await sql`DROP TABLE files`;
  await sql`DROP TABLE users`;
};
