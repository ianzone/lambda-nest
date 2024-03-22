import { createApp } from './app';

async function bootstrap() {
  const app = await createApp();
  await app.listen(3000);
  console.log('Swagger UI available at http://localhost:3000/docs');
}
bootstrap();
