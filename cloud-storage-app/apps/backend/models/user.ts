// apps/backend/models/user.ts
import { z } from 'zod';
import { drizzle } from 'drizzle-orm/mysql2';

export const UserSchema = {
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    createdAt: z.date(),
    updatedAt: z.date(),
};

// Export your model
export const UserModel = drizzle('users', UserSchema);
