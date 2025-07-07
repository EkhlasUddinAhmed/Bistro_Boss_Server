import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthService } from './Auth.service';
import status from 'http-status';
const logInUser = catchAsync(async (req, res, next) => {
  const result = await AuthService.loginUserFromDB(req.body);

  const { refreshToken, ...remainingResult } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV !== 'production',
    httpOnly: true,
    sameSite: 'none', //When Front-End And Back-End in seperate Domain..sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 365, // How log refresh Token will active in the Cookie
  });
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User is loggedin successfully...!!!!',
    data: remainingResult,
  });
});

const logOutUser = catchAsync(async (req, res, next) => {
  res.clearCookie('refreshToken', {
    secure: config.NODE_ENV !== 'production',
    httpOnly: true,
    sameSite: 'none', //When Front-End And Back-End in seperate Domain..sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 365, // How log refresh Token will active in the Cookie
  });
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User is loggedout successfully...!!!!',
    data: 'User Logged Out',
  });
});

const changePassword = catchAsync(async (req, res, next) => {
  const result = await AuthService.changePasswordInToDB(req.user, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Password is changed successfully...!!!!',
    data: result,
  });
});

const createAccessToken = catchAsync(async (req, res, next) => {
  const { refreshToken } = req.cookies;
  console.log(
    'From CreateAccessToken Controller: refreshToken is',
    refreshToken,
  );

  const result =
    await AuthService.createAccessTokenByRefreshToken(refreshToken);

  // Clear Previous RefreshToken............
  res.clearCookie('refreshToken', {
    secure: config.NODE_ENV !== 'production',
    httpOnly: true,
    sameSite: 'none', //When Front-End And Back-End in seperate Domain..sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 365, // How log refresh Token will active in the Cookie
  });

  res.cookie('refreshToken', result.refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'none', //When Front-End And Back-End in seperate Domain..sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 365, // How log refresh Token will active in the Cookie
  });
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'New Access Token is created successfully...!!!!',
    data: {
      accessToken: result.accessToken,
    },
  });
});

const forgetPassword = catchAsync(async (req, res, next) => {
  const { userId } = req.body;
  const result = await AuthService.forgetPasswordFromDB(userId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Reset Password Link is successfully sent to your email...!!!!',
    data: result,
  });
});

const resetNewPassword = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization as string;
  const { newPassword } = req.body;
  const result = await AuthService.resetNewPasswordInDB(token, newPassword);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Reset new password is  successfull...!!!!',
    data: result,
  });
});

export const AuthController = {
  logInUser,
  changePassword,
  createAccessToken,
  forgetPassword,
  resetNewPassword,
  logOutUser,
};
