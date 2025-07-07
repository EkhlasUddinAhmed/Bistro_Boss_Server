import { ZodError, ZodIssue } from 'zod';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleZodError = (error: ZodError):TGenericErrorResponse  => {
  const errorSources: TErrorSources[] = error?.issues.map((issue: ZodIssue)=> {
    return {
      path: issue?.path.pop(),
      message: issue?.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    errorSources,
    message: error?.name,
  };
};
export default handleZodError;

