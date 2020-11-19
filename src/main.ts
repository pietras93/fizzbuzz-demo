import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express/interfaces/nest-express-application.interface';
import {
  BadRequestException,
  MethodNotAllowedException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.set('trust proxy', 1);
  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 10 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per 10 minutes
    }),
  );
  app.use((req: Request, res: Response, next: Function) => {
    if (req.method !== 'POST') {
      throw new MethodNotAllowedException('Method not supported');
    }

    return next();
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (errors: ValidationError[]) =>
        new BadRequestException({
          response: '',
          error: `Invalid input. ${errors.join(', ')}`,
        }),
    }),
  );
  await app.listen(3000);
}
bootstrap();
