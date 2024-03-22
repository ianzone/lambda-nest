import { NestFactory } from '@nestjs/core';
import { makeDocs } from 'src/utils';
import { AppModule } from './app.module';

export async function createApp() {
  const isDev = process.env.NODE_ENV !== 'dev';
  const app = await NestFactory.create(AppModule, {
    logger: isDev ? undefined : console,
  });
  makeDocs(app);
  return app;
}
