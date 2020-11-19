import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express/interfaces/nest-express-application.interface';
import { Validator } from './validator';
import { AllowedMethodsMiddleware } from './allowed-methods.middleware';

const PORT = +process.env.PORT || 3000;

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
  app.use(AllowedMethodsMiddleware);
  app.useGlobalPipes(Validator);
  await app.listen(PORT);
}
bootstrap();
