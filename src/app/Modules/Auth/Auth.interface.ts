import { USER_ROLE } from './Auth.constant';

export type TLogIn = {
  email: String;
  password: String;
};

export type TLoggedUser = {
  role: string;
  email: string;
};

export type TChangePassword = {
  oldPassword: String;
  newPassword: String;
};

export type TUSER_ROLE = keyof typeof USER_ROLE;
