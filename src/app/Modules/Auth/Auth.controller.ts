/* eslint-disable @typescript-eslint/no-unused-vars */
import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthService } from './Auth.service';
import status from 'http-status';
const createAccessAndRefreshTokenController = catchAsync(
  async (req, res, next) => {
    const result = await AuthService.createAccessAndRefreshToken(req.body);

    const { accessToken, refreshToken } = result;

    res.cookie('refreshToken', refreshToken, {
      secure: config.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'none', //When Front-End And Back-End in seperate Domain..sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 365, // How log refresh Token will active in the Cookie
    });
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Access and Refresh Token are Created Successfully...!!!!',
      data: accessToken,
    });
  },
);

export const AuthController = {
  createAccessAndRefreshTokenController,
};
