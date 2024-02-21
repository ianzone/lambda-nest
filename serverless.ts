import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  app: 'app',
  service: '${self:app}-api',

  frameworkVersion: '3',
  configValidationMode: 'error',

  provider: {
    name: 'aws',
    runtime: 'nodejs20.x',
    memorySize: 512,
    architecture: 'arm64',
    timeout: 29, // the maximum api gateway timeout is 30s
    tags: {
      developer: 'devName',
      project: '${self:app}',
      service: '${self:service}',
    },
    logRetentionInDays: 60,
    environment: {
      STAGE: '${sls:stage}',
      NODE_OPTIONS: '--enable-source-maps',
    },
    httpApi: {
      cors: { allowedOrigins: ['*'], allowCredentials: true },
    },
  },

  // https://www.serverless.com/framework/docs/providers/aws/events/http-api
  functions: {
    api: {
      handler: 'dist/lambda.handler',
      name: '${self:app}-${sls:stage}-api',
      package: {
        patterns: ['public/**/*', 'views/**/*', 'node_modules/swagger-ui-dist/**/*'],
      },
      events: [
        {
          httpApi: '*',
        },
      ],
    },
  },

  package: {
    individually: true,
  },

  // https://github.com/floydspace/serverless-esbuild
  plugins: ['serverless-esbuild', 'serverless-offline'],

  custom: {
    esbuild: {
      minify: true,
      keepNames: true, // nestjs relies on the name property for registration and binding purposes
      sourcemap: true,
      packager: 'pnpm',
      exclude: [
        'class-transformer/storage',
        '@nestjs/websockets',
        '@nestjs/microservices',
        'swagger-ui-dist',
      ],
    },
  },
};

module.exports = serverlessConfiguration;
