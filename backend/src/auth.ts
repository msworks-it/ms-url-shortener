import { prismaAdapter } from 'better-auth/adapters/prisma';
import { betterAuth } from 'better-auth';
import { PrismaService } from './prisma/prisma.service';

const client = new PrismaService();

export const auth = betterAuth({
  database: prismaAdapter(client, {
    provider: 'postgresql',
  }),
  appName: 'backend',
  plugins: [],
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:5000',
});
