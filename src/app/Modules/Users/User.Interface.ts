export type TUser = {
  userId: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  email: string;
  role: 'superAdmin'|'admin' | 'faculty' | 'student';
  status: 'is-Active' | 'blocked';
  isDeleted: boolean;
};
