import type { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

function setSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Demo API')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}

export async function createApp() {
  const app = await NestFactory.create(AppModule);
  setSwagger(app);
  return app;
}
