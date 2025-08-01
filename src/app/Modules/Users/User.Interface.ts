export type TUser = {
  name: string;
  email: string;
  role: 'superAdmin' | 'admin' | 'user';
  status: 'is-Active' | 'blocked';
  isGoogleLogin: boolean;
};
