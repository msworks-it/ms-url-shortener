import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ShortUrl } from '@prisma/client';
import { CreateUrlDTO } from './dto/create-url.dto';
import { UUID } from 'crypto';

@Injectable()
export class UrlService {
  constructor(private readonly prismaService: PrismaService) {}

  async getTarget(slug: string): Promise<ShortUrl | null> {
    const target = await this.prismaService.shortUrl.findFirst({
      where: { slug },
    });

    if (!target) throw new Error(`${slug} not found!`);

    return target;
  }

  async createTarget(userId: string, data: CreateUrlDTO): Promise<ShortUrl> {
    return await this.prismaService.shortUrl.create({
      data: {
        userId,
        slug: data.slug,
        targetUrl: data.target,
        ...(data.password && { password: data.password }),
        ...(data.expiration && { expiration: data.expiration }),
      },
    });
  }

  async updateTarget(
    slug: string,
    userId: string,
    data: CreateUrlDTO,
  ): Promise<ShortUrl> {
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

    return updated;
  }

  async deleteTarget(id: UUID) {
    const deleted = await this.prismaService.shortUrl.delete({
      where: {
        id,
      },
    });

    if (!deleted) throw new Error(`Target ${id} not found!`);

    return deleted;
  }
}
