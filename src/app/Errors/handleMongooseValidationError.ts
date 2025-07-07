import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleMongooseValidationError = (
  error: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const errorSources: TErrorSources[] = Object.values(error?.errors).map(
    (issue: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: issue?.path,
        message: issue.message,
      };
    },
  );
  const statusCode = 400;
  return {
    statusCode,
    errorSources,
    message: error?.name,
  };
};
export default handleMongooseValidationError;
