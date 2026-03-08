import { Inject, Injectable } from '@nestjs/common';
import type { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  constructor(
    @Inject('REDIS_CLIENT')
    private readonly client: RedisClientType,
  ) {}

  async set(key: string, value: unknown, ttl?: number) {
    const serialized = JSON.stringify(value);

    if (ttl) {
      await this.client.set(key, serialized, { EX: ttl });
    } else {
      await this.client.set(key, serialized);
    }
  }

  async get<T>(key: string): Promise<T | null> {
    const raw = await this.client.get(key);
    return raw ? (JSON.parse(raw) as T) : null;
  }

  async del(key: string) {
    await this.client.del(key);
  }
}
