export type TErrorSources = {
  path: string | number | undefined;
  message: string | null;
};

export type TGenericErrorResponse = {
  statusCode: number;
  errorSources: TErrorSources[];
  message: string;
};
