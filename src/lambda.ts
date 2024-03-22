import serverlessExpress from '@codegenie/serverless-express';
import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyHandlerV2,
  APIGatewayProxyResultV2,
  Callback,
  Context,
} from 'aws-lambda';
import { createApp } from './app';

let server: APIGatewayProxyHandlerV2;

async function bootstrap() {
  const app = await createApp();
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: APIGatewayProxyHandlerV2 = async (
  event: APIGatewayProxyEventV2,
  context: Context,
  callback: Callback,
): Promise<APIGatewayProxyResultV2> => {
  server = server ?? (await bootstrap());
  const result = await server(event, context, callback);
  return result || {};
};
