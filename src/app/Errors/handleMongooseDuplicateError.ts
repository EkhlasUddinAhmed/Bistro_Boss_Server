import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleMongooseDuplicateError = (error: any): TGenericErrorResponse => {
  const extractedMessage =
    error?.errorResponse?.errmsg?.split('{ name: "')[1]?.split('"')[0] || null;
  const errorSources: TErrorSources[] = [
    {
      path: '',
      message: extractedMessage+" is already existing",
    },
  ];

  const statusCode = 409;
  return {
    statusCode,
    message: 'Duplicate Error',
    errorSources,
  };
};

export default handleMongooseDuplicateError;
