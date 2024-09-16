import { DrizzleConfig } from 'drizzle-orm';
import { users } from '../db/schema/user';
import { files } from '../db/schema/file';
import { notes } from '../db/schema/note';

const config: DrizzleConfig = {
  connectionString: process.env.DATABASE_URL || 'postgresql://username:password@localhost:5432/mydb',
  schema: [users, files, notes],
};

export default config;
