import { Request, Response } from 'express';
import { MethodNotAllowedException } from '@nestjs/common';

export function AllowedMethodsMiddleware(
  req: Request,
  res: Response,
  next: Function,
) {
  if (req.method !== 'POST') {
    throw new MethodNotAllowedException('Method not supported');
  }

  return next();
}
