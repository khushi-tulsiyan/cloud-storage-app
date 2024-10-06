// src/context.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createContext = () => {
  return {
    db: prisma,
  };
};

export type Context = ReturnType<typeof createContext>;
