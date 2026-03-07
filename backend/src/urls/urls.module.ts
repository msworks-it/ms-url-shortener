import { Module } from '@nestjs/common';
import { UrlController } from './urls.controller';
import { UrlService } from './urls.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [UrlController],
  providers: [UrlService],
  imports: [PrismaModule],
})
export class UrlsModule {}
