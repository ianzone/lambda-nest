import fs from 'fs';
import path from 'path';
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

function bufferFile(filename: string) {
  return fs.readFileSync(path.join(path.resolve(), 'node_modules/swagger-ui-dist/', filename));
}

@Injectable()
export class DocsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const filename = req.url.split('/').pop() || '';
    const extension = filename.split('.').pop();

    switch (extension) {
      case 'html':
        res.setHeader('Content-Type', 'text/html');
        break;
      case 'css':
        res.setHeader('Content-Type', 'text/css');
        break;
      case 'js':
        if (filename.includes('swagger-ui-init.js')) {
          return next();
        }
        res.setHeader('Content-Type', 'application/javascript');
        break;
      case 'map':
        res.setHeader('Content-Type', 'application/json');
        break;
      case 'png':
        res.setHeader('Content-Type', 'image/png');
        break;
      default:
        return next();
    }

    res.write(bufferFile(filename));
    res.end();
    return next();
  }
}
