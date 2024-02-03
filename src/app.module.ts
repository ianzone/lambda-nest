import { MiddlewareConsumer, Module } from '@nestjs/common';
import { DocsMiddleware } from './middlewares';
import { RoutesModule } from './routes/routes.module';
@Module({
  imports: [RoutesModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DocsMiddleware).forRoutes('/docs', '/docs/(.*)', '/docs-json');
  }
}
