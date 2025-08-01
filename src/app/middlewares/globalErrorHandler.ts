/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { TErrorSources } from '../interface/error';

import handleZodError from '../Errors/handeZodError';
import handleMongooseValidationError from '../Errors/handleMongooseValidationError';
import handleMongooseCastError from '../Errors/handleMongooseCastError';
import handleMongooseDuplicateError from '../Errors/handleMongooseDuplicateError';
import AppError from '../Errors/AppError';
import handleAppError from '../Errors/handleAppError';
import handleError from '../Errors/handleError';
import config from '../config';

const globalErrorHandler: ErrorRequestHandler = (
  error: any,
  _req: Request,
  res: Response,
  _next:NextFunction,
) => {
  let statusCode = 500;
  let message = 'Something Went WERONG......!!!';
  let errorSources: TErrorSources[] = [
    {
      path: '',
      message,
    },
  ];

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError?.statusCode;
    errorSources = simplifiedError?.errorSources;
    message = simplifiedError?.message;
  } else if (error?.name === 'ValidationError') {
    const simplifiedError = handleMongooseValidationError(error);
    statusCode = simplifiedError?.statusCode;
    errorSources = simplifiedError?.errorSources;
    message = simplifiedError?.message;
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleMongooseCastError(error);
    statusCode = simplifiedError?.statusCode;
    errorSources = simplifiedError?.errorSources;
    message = simplifiedError?.message;
  } else if (error?.code === 11000) {
    const simplifiedError = handleMongooseDuplicateError(error);
    statusCode = simplifiedError?.statusCode;
    errorSources = simplifiedError?.errorSources;
    message = simplifiedError?.message;
  } else if (error instanceof AppError) {
    const simplifiedError = handleAppError(error);
    statusCode = simplifiedError?.statusCode;
    errorSources = simplifiedError?.errorSources;
    message = simplifiedError?.message;
  } else {
    const simplifiedError = handleError(error);
    statusCode = simplifiedError?.statusCode;
    errorSources = simplifiedError?.errorSources;
    message = simplifiedError?.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? error?.stack : null,
    // error,
  });
};

export default globalErrorHandler;
