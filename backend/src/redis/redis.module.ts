import { Global, Module } from '@nestjs/common';
import { createClient } from 'redis';
import { RedisService } from './redis.service';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: async () => {
        const client = createClient({
          url: process.env.REDIS_URL ?? 'redis://localhost:6379',
        });

        client.on('error', (err) => console.error('Redis error:', err));

        await client.connect();
        return client;
      },
    },
    RedisService,
  ],
})
export class RedisModule {}
