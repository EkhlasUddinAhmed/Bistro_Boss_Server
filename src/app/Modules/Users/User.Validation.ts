import { z } from 'zod';

export const UserCreationValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .min(6, 'Password must be at least 6 characters long')
    .optional(),
});

export const UserValidation = {
  UserCreationValidationSchema,
};
