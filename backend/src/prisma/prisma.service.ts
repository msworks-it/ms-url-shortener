/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const prismaOptions: Prisma.PrismaClientOptions = {
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  }),
};

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super(prismaOptions);
  }
}
