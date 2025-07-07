import config from '../../config';
import AppError from '../../Errors/AppError';
import { UserModel } from '../Users/User.Model';
import { TChangePassword, TLoggedUser, TLogIn } from './Auth.interface';
import status from 'http-status';
import {
  checkingUserExistDeletedBlocked,
  checkingUserExistPasswordCorrectDeletedBlocked,
  generateToken,
  makeAPasswordHashed,
  sendEmail,
  tokenCreationTimeSmallerThanPasswordChangingTime,
} from './Auth.utils';
import jwt, { JwtPayload } from 'jsonwebtoken';

const loginUserFromDB = async (payload: TLogIn) => {
  const user = await checkingUserExistPasswordCorrectDeletedBlocked(payload);

  // Creating Access Token..................

  const loggedUser = {
    userId: user?.userId,
    role: user?.role,
    email: user?.email,
  };

  const accessToken = await generateToken(
    loggedUser,
    config.ACCESS_TOKEN_SECRET as string,
    config.ACCESS_TOKEN_SECRET_EXPIRES_IN as string,
  );

  // Creating  Refresh Token..................
  const refreshToken = await generateToken(
    loggedUser,
    config.REFRESH_TOKEN_SECRET as string,
    config.REFRESH_TOKEN_SECRET_EXPIRES_IN as string,
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};



const changePasswordInToDB = async (
  user: JwtPayload,
  payload: TChangePassword,
) => {
  // Checking User is Exists ,Deleted , Blocked....or Not
  const checkUser = {
    userId: user?.userId,
    password: payload?.oldPassword,
  };

  const isUserExists =
    await checkingUserExistPasswordCorrectDeletedBlocked(checkUser);
  const hashedNewPassword = await makeAPasswordHashed(
    payload.newPassword as string,
  );
  const updatedUser = await UserModel.findOneAndUpdate(
    {
      userId: isUserExists?.userId,
      role: isUserExists?.role,
      email: isUserExists?.email,
    },
    {
      password: hashedNewPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
    {
      new: true,
      runValidators: true,
    },
  );

  return null;
};

const createAccessTokenByRefreshToken = async (Token: string) => {
  console.log("From Auth Service, refresh token is:",Token)
  
  const decoded = jwt.verify(Token, config.REFRESH_TOKEN_SECRET as string);
  console.log("From Auth Service, decoded is:",decoded)

  const { userId, iat, role, email } = decoded as JwtPayload;
  const isUserExists = await checkingUserExistDeletedBlocked(userId);
  // Checking Password Change Time......................!!!!!!
  const isPasswordChangingTimeGreater =
    await tokenCreationTimeSmallerThanPasswordChangingTime(
      iat as number,
      isUserExists?.passwordChangedAt as Date,
    );

  if (isUserExists?.passwordChangedAt && isPasswordChangingTimeGreater) {
    throw new AppError(status.UNAUTHORIZED, 'UnAuthorized Access...!!');
  }

  const loggedUser = {
    userId,
    role,
    email,
  };

  const accessToken = await generateToken(
    loggedUser,
    config.ACCESS_TOKEN_SECRET as string,
    config.ACCESS_TOKEN_SECRET_EXPIRES_IN as string,
  );

  // Creating  Refresh Token..................
  const refreshToken = await generateToken(
    loggedUser,
    config.REFRESH_TOKEN_SECRET as string,
    config.REFRESH_TOKEN_SECRET_EXPIRES_IN as string,
  );

  

  return { accessToken, refreshToken };
};

const forgetPasswordFromDB = async (userId: string) => {
  const isUserExists = await checkingUserExistDeletedBlocked(userId);

  const loggedUser = {
    userId: isUserExists?.userId,
    role: isUserExists?.role,
    email: isUserExists?.email,
  };

  const resetPasswordToken = await generateToken(
    loggedUser,
    config.FORGET_PASSWORD_TOKEN_SECRET as string,
    config.FORGET_PASSWORD_TOKEN_SECRET_EXPIRES_IN,
  );

  const resetLink = `${config.REACT_UI_LINK}?userId=${isUserExists.userId}&token=${resetPasswordToken}`;

  await sendEmail(isUserExists.email, resetLink);
};

const resetNewPasswordInDB = async (
  forgetPasswordToken: string,
  newPassword: string,
) => {
  
  const decoded = jwt.verify(
    forgetPasswordToken,
    config.FORGET_PASSWORD_TOKEN_SECRET as string,
  );
  const { userId } = decoded as JwtPayload;
  const isUserExists = await checkingUserExistDeletedBlocked(userId);
  const hashedNewPassword = await makeAPasswordHashed(newPassword);
  const userWithNewPassword = await UserModel.findOneAndUpdate(
    {
      userId: isUserExists.userId,
      role: isUserExists.role,
      email: isUserExists.email,
    },
    {
      password: hashedNewPassword,
    },
    {
      new: true,
      runValidators: true,
    },
  );
  return userWithNewPassword;
};
export const AuthService = {
  loginUserFromDB,
  changePasswordInToDB,
  createAccessTokenByRefreshToken,
  forgetPasswordFromDB,
  resetNewPasswordInDB,
};

// dddr vvdb nhwi hsnb

// decoded: {
//   userId: 'A-0004',
//   role: 'admin',
//   email: 'mujibur@example.com',
//   iat: 1747070629,
//   exp: 1747934629
// }

// isUserExists: {
//   _id: new ObjectId('68209bad605c15e13ee46543'),
//   userId: 'A-0004',
//   password: '$2b$12$yfJS.HfxS4qKoTX0fbUAFOoaoKorh5QuQUNZ2GwAso3OfoIbR1L0W',
//   needsPasswordChange: false,
//   role: 'admin',
//   email: 'mujibur@example.com',
//   status: 'is-Active',
//   isDeleted: false,
//   createdAt: 2025-05-11T12:44:29.900Z,
//   updatedAt: 2025-05-12T12:48:05.336Z,
//   __v: 0,
//   passwordChangedAt: 2025-05-12T12:48:05.335Z
// }
