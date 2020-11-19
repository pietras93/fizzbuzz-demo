import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

export const Validator = new ValidationPipe({
  whitelist: true,
  exceptionFactory: (errors: ValidationError[]) =>
    new BadRequestException({
      response: '',
      error: `Invalid input. ${errors.join(', ')}`,
    }),
});
