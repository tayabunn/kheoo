import type { PrismaConfig } from 'prisma';
import dotenv from 'dotenv';

dotenv.config();

const config: PrismaConfig = {
  schema: 'prisma/schema.prisma',
  datasource: {
    url: process.env.DATABASE_URL,
  },
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
};

export default config;
