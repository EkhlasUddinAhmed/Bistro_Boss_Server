import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../Errors/AppError';
import status from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { TUSER_ROLE } from './Auth.interface';

const auth = (...userRequested: TUSER_ROLE[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const accessTokenString = req.headers.authorization;

    const accessToken = (accessTokenString as string).split(' ')[1];

    if (!accessToken) {
      throw new AppError(status.FORBIDDEN, 'Forbidden Access...!!!');
    }

    const decoded = jwt.verify(
      accessToken,
      config.ACCESS_TOKEN_SECRET as string,
    );

    const { role, email, iat } = decoded as JwtPayload;

    if (userRequested && !userRequested.includes(role)) {
      throw new AppError(status.UNAUTHORIZED, 'Unauthorized Access....!!!');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
