import { Module } from '@nestjs/common';
import { UrlsModule } from './urls/urls.module';
import { PrismaService } from './prisma/prisma.service';
import { auth } from './auth';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    UrlsModule,
    AuthModule.forRoot({ auth }),
    PrismaModule,
    RedisModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
