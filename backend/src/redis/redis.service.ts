import { Inject, Injectable } from '@nestjs/common';
import type { RedisClientType } from 'redis';

const MIN_TTL = 7200;

@Injectable()
export class RedisService {
  constructor(
    @Inject('REDIS_CLIENT')
    private readonly client: RedisClientType,
  ) {}

  async set<T>(key: string, value: unknown, ttl?: number): Promise<T | null> {
    const serialized = JSON.stringify(value);

    ttl = MIN_TTL ?? undefined;

    if (!ttl) return (await this.client.set(key, serialized)) as T;

    return (await this.client.set(key, serialized, {
      ...(ttl ? { expiration: { type: 'EX', value: ttl } } : {}),
    })) as T;
  }

  async get<T>(key: string): Promise<T | null> {
    const raw = await this.client.get(key);
    return raw ? (JSON.parse(raw) as T) : null;
  }

  async del(key: string) {
    await this.client.del(key);
  }

  async getOrSet<T>(
    key: string,
    value: unknown,
    ttl?: number,
  ): Promise<T | null> {
    const cached = await this.get<T>(key);
    if (!cached) return await this.set<T>(key, value, ttl);
    return cached;
  }
}
