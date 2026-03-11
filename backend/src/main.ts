import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: false,
    bodyParser: false,
  });

  const config = new DocumentBuilder()
    .setTitle("M's URL Shortener ")
    .setDescription('URL Shortener API')
    .setVersion('1.0')
    .addTag('shorturl')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'X-Api-Version',
  });

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
