import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  app: 'app-name',
  service: 'lambda-name',

  frameworkVersion: '3',
  configValidationMode: 'error',

  provider: {
    name: 'aws',
    runtime: 'nodejs20.x',
    architecture: 'arm64',
    timeout: 29, // the maximum api gateway timeout is 29s
    tags: {
      developer: 'devName',
      project: '${self:app}',
      service: '${self:service}',
    },
    logRetentionInDays: 60,
    environment: {
      STAGE: '${sls:stage}',
      STAGE_PATH_PREFIX: '/${sls:stage}',
      NODE_OPTIONS: '--enable-source-maps',
    },
  },

  package: {
    individually: true,
  },

  functions: {
    api: {
      handler: 'dist/lambda.handler',
      package: {
        patterns: ['public/**/*', 'views/**/*', 'node_modules/swagger-ui-dist/**/*'],
      },
      events: [
        {
          http: {
            method: 'ANY',
            path: '{proxy+}',
            cors: true, // https://www.serverless.com/framework/docs/providers/aws/events/apigateway#enabling-cors
          },
        },
      ],
    },
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
