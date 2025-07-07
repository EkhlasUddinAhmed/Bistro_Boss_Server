import { USER_ROLE } from './Auth.constant';

export type TLogIn = {
  userId: String;
  password: String;
};

export type TLoggedUser = {
  userId: string;
  role: string;
  email: string;
};

export type TChangePassword = {
  oldPassword: String;
  newPassword: String;
};

export type TUSER_ROLE = keyof typeof USER_ROLE;
