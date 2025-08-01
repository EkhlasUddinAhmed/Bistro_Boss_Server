"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const LoginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({ required_error: 'User Id is must required...!!' }),
        password: zod_1.z.string({
            required_error: 'User Password is must required...!!',
        }),
    }),
});
const ChangePasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z
            .string({ required_error: 'Old Password is  required...!!' })
            .min(8, 'Old Password must be at least 8 characters'),
        newPassword: zod_1.z
            .string({ required_error: 'New Password is  required...!!' })
            .min(8, 'New Password must be at least 8 characters'),
    }),
});
const refreshTokenValidationSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'RefreshToken is  required...!!',
        }),
    }),
});
const forgetPasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z
            .string({
            required_error: 'UserId is  required...!!',
        })
            .min(1, 'UserId must be at least 1 character'),
    }),
});
const resetNewPasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        newPassword: zod_1.z
            .string({
            required_error: 'New Password  is  required...!!',
        })
            .min(8, 'New Password Must be at least 8 characters....!!'),
    }),
});
exports.AuthValidation = {
    LoginValidationSchema,
    ChangePasswordValidationSchema,
    refreshTokenValidationSchema,
    forgetPasswordValidationSchema,
    resetNewPasswordValidationSchema,
};
