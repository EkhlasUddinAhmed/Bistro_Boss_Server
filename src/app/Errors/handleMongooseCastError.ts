import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleMongooseCastError = (
  error: mongoose.Error.CastError,
): TGenericErrorResponse => {
    const extractedMessage = error?.message.split('for model "')[1]?.split('"')[0] || null;
  const errorSources: TErrorSources[] = [
    {
      path: error?.path,
      message: extractedMessage,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'Invalid _id',
    errorSources,
  };
};

export default handleMongooseCastError;
