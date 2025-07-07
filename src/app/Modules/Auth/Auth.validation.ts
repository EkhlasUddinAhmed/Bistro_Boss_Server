import { z } from 'zod';

const LoginValidationSchema = z.object({
  body: z.object({
    userId: z.string({ required_error: 'User Id is must required...!!' }),
    password: z.string({
      required_error: 'User Password is must required...!!',
    }),
  }),
});

const ChangePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z
      .string({ required_error: 'Old Password is  required...!!' })
      .min(8, 'Old Password must be at least 8 characters'),
    newPassword: z
      .string({ required_error: 'New Password is  required...!!' })
      .min(8, 'New Password must be at least 8 characters'),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'RefreshToken is  required...!!',
    }),
  }),
});

const forgetPasswordValidationSchema = z.object({
  body: z.object({
    userId: z
      .string({
        required_error: 'UserId is  required...!!',
      })
      .min(1, 'UserId must be at least 1 character'),
  }),
});

const resetNewPasswordValidationSchema = z.object({
  body: z.object({
    newPassword: z
      .string({
        required_error: 'New Password  is  required...!!',
      })
      .min(8, 'New Password Must be at least 8 characters....!!'),
  }),
});

export const AuthValidation = {
  LoginValidationSchema,
  ChangePasswordValidationSchema,
  refreshTokenValidationSchema,
  forgetPasswordValidationSchema,
  resetNewPasswordValidationSchema,
};
