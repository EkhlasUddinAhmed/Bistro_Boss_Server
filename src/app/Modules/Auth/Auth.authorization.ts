import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../Errors/AppError';
import status from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { TUSER_ROLE } from './Auth.interface';
import {
  checkingUserExistDeletedBlocked,
  tokenCreationTimeSmallerThanPasswordChangingTime,
} from './Auth.utils';

const auth = (...userRequested: TUSER_ROLE[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization;

    // Check Where Access Token is Sent Or Not..........!!!!
    if (!accessToken) {
      throw new AppError(status.FORBIDDEN, 'Forbidden Access...!!!');
    }

    const decoded = jwt.verify(
      accessToken,
      config.ACCESS_TOKEN_SECRET as string,
    );

   

    const { role, userId, iat } = decoded as JwtPayload;

    const isUserExists = await checkingUserExistDeletedBlocked(userId);
    const isPasswordChangingTimeGreater =
      await tokenCreationTimeSmallerThanPasswordChangingTime(
        iat as number,
        isUserExists?.passwordChangedAt as Date,
      );

    if (isUserExists?.passwordChangedAt && isPasswordChangingTimeGreater) {
      throw new AppError(status.UNAUTHORIZED, 'UnAuthorized Access...!!');
    }

    if (userRequested && !userRequested.includes(role)) {
      throw new AppError(status.UNAUTHORIZED, 'Unauthorized Access....!!!');
    }

    // console.log({ decoded });

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;

// decoded: {
//   userId: 'A-0004',
//   role: 'admin',
//   email: 'mujibur@example.com',
//   iat: 1746982379,
//   exp: 1747846379
// }
