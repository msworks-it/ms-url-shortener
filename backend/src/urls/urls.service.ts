import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ShortUrl } from '@prisma/client';
import { CreateUrlDTO } from './dto/create-url.dto';

@Injectable()
export class UrlService {
  constructor(private readonly prismaService: PrismaService) {}

  async getTarget(slug: string): Promise<ShortUrl | null> {
    return await this.prismaService.shortUrl.findFirst({
      where: { slug },
    });
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
    return await this.prismaService.shortUrl.update({
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
  }
}
