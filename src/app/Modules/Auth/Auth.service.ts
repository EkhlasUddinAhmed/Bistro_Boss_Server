import config from '../../config';

import { TLoggedUser } from './Auth.interface';

import { generateToken } from './Auth.utils';

const createAccessAndRefreshToken = async (payload: TLoggedUser) => {
  const loggedUser = {
    role: payload?.role,
    email: payload?.email,
  };

  const accessToken = await generateToken(
    loggedUser,
    config.ACCESS_TOKEN_SECRET as string,
    config.ACCESS_TOKEN_SECRET_EXPIRES_IN as string,
  );

  const refreshToken = await generateToken(
    loggedUser,
    config.REFRESH_TOKEN_SECRET as string,
    config.REFRESH_TOKEN_SECRET_EXPIRES_IN as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthService = {
  createAccessAndRefreshToken,
};
