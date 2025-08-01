import { USER_ROLE } from './Auth.constant';

export type TLogIn = {
  email: string;
  password: string;
};

export type TLoggedUser = {
  role: string;
  email: string;
};

export type TChangePassword = {
  oldPassword: string;
  newPassword: string;
};

export type TUSER_ROLE = keyof typeof USER_ROLE;
