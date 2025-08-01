/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleAppError = (error: any): TGenericErrorResponse => {
  const errorSources: TErrorSources[] = [
    {
      path: '',
      message: error?.message,
    },
  ];

  const statusCode = error?.statusCode;
  return {
    statusCode,
    message: error?.message,
    errorSources,
  };
};

export default handleAppError;
