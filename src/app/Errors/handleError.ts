/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleError = (error: any): TGenericErrorResponse => {
  const errorSources: TErrorSources[] = [
    {
      path: '',
      message: error?.message,
    },
  ];

  const statusCode = 500;
  return {
    statusCode,
    message: error?.message,
    errorSources,
  };
};

export default handleError;
