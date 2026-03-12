import { Module } from '@nestjs/common';
import { UrlController } from './urls.controller';
import { UrlService } from './urls.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RedisModule } from 'src/redis/redis.module';
import { RedisService } from 'src/redis/redis.service';

@Module({
  controllers: [UrlController],
  providers: [UrlService, RedisService],
  imports: [PrismaModule, RedisModule],
})
export class UrlsModule {}
