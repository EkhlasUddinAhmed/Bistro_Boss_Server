import { AnyZodObject } from 'zod';
import catchAsync from './catchAsync';
import { NextFunction, Request, Response } from 'express';
const validateRequest = (validationSchema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await validationSchema.parseAsync({
      body: req.body,
      cookies: req.cookies,
    });
    next();
  });
};

export default validateRequest;
