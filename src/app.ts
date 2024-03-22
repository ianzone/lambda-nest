import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { makeDocs } from 'src/utils';
import { AppModule } from './app.module';

export async function createApp() {
  const isDev = process.env.NODE_ENV === 'dev';
  const app = await NestFactory.create(AppModule, {
    logger: isDev ? undefined : console,
  });
  app.useGlobalPipes(
    // https://docs.nestjs.com/techniques/validation#using-the-built-in-validationpipe
    new ValidationPipe({
      whitelist: true, // strips away any properties that do not have any decorators in DTO
      forbidNonWhitelisted: true, // if a property is not in the DTO, throw an error
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
        exposeUnsetFields: false, // remove undefined properties
      },
    }),
  );
  makeDocs(app);
  return app;
}
