import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ShortUrl } from '@prisma/client';
import { CreateUrlDTO } from './dto/create-url.dto';
import { hash, UUID } from 'crypto';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class UrlService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly redisService: RedisService,
  ) {}

  async getAllUrls(userId: UUID): Promise<ShortUrl[]> {
    const urls = await this.prismaService.shortUrl.findMany({
      where: {
        userId,
      },
    });

    if (!urls) throw new Error(`${userId} has no urls saved`);

    return urls;
  }

  SHA256(password?: string) {
    const hashedPassword = password ? hash('sha256', password) : undefined;
    return hashedPassword;
  }

  async getTarget(
    slug: string,
    opts?: {
      includePassword: boolean;
    },
  ): Promise<ShortUrl | null> {
    const cachedValue = await this.redisService.get<ShortUrl>(slug);
    if (cachedValue)
      return {
        ...cachedValue,
        password: opts?.includePassword ? cachedValue.password : null,
      };

    const target = await this.prismaService.shortUrl.findFirst({
      where: { slug },
      select: {
        id: true,
        slug: true,
        targetUrl: true,
        expiration: true,
        userId: true,
        password: opts?.includePassword ?? false,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!target) throw new Error(`${slug} not found!`);

    await this.redisService.set(slug, target);

    return target;
  }

  async getAccess(slug: string, password?: string): Promise<ShortUrl> {
    const hashed = this.SHA256(password);

    const targetData = await this.getTarget(slug, { includePassword: true });
    if (!targetData) throw new Error(`${slug} not found!`);
    if (!targetData.password) return targetData;

    if (targetData.password && !password) throw new UnauthorizedException();
    if (targetData.password != hashed) throw new UnauthorizedException();

    return targetData;
  }

  async createTarget(userId: string, data: CreateUrlDTO): Promise<ShortUrl> {
    const hashedPassword = this.SHA256(data.password);

    const created = await this.prismaService.shortUrl.create({
      data: {
        userId,
        slug: data.slug,
        targetUrl: data.target,
        ...(data.password && { password: hashedPassword }),
        ...(data.expiration && { expiration: data.expiration }),
      },
    });

    await this.redisService.set(data.slug, created);

    return created;
  }

  async updateTarget(
    slug: string,
    userId: string,
    data: CreateUrlDTO,
  ): Promise<ShortUrl> {
    const cached = await this.redisService.get<ShortUrl>(slug);
    if (cached) await this.redisService.del(slug);

    const updated = await this.prismaService.shortUrl.update({
      where: {
        slug,
        userId,
      },
      data: {
        slug: data.slug,
        targetUrl: data.target,
        ...(data.expiration && { expiration: data.expiration }),
        ...(data.password && { password: data.password }),
      },
    });

    if (!updated) throw new Error(`${slug} for ${userId} not found!`);

    await this.redisService.set(data.slug, updated);

    return updated;
  }

  async deleteTarget(id: UUID) {
    const deleted = await this.prismaService.shortUrl.delete({
      where: {
        id,
      },
    });

    if (!deleted) throw new Error(`Target ${id} not found!`);

    await this.redisService.del(deleted.slug);

    return deleted;
  }
}
