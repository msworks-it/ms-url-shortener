import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: false,
    bodyParser: false,
  });

  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'X-Api-Version',
  });

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
