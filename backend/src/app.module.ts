import { Module } from '@nestjs/common';
import { UrlsModule } from './urls/urls.module';

@Module({
  imports: [UrlsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
