import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: false,
    bodyParser: false,
  });

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
