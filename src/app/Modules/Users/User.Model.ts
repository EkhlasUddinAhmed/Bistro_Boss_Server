import mongoose, { Schema } from 'mongoose';

import bcrypt from 'bcryptjs';
import config from '../../config';
import { TUser } from './User.Interface';

const UserSchema: Schema = new Schema<TUser>(
  {
    userId: { type: String, unique: true },
    password: { type: String, select: 0 },
    needsPasswordChange: { type: Boolean, default: true },
    passwordChangedAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ['superAdmin','admin', 'faculty', 'student'],
    },
    email: String,
    status: {
      type: String,
      enum: ['is-Active', 'blocked'],
      default: 'is-Active',
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

UserSchema.pre('save', async function (next) {
  const hashedPassword = await bcrypt.hash(
    this?.password as string,
    Number(config.BCRYPT_SALT_ROUND),
  );
  this.password = hashedPassword;
  next();
});

UserSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const UserModel = mongoose.model<TUser>('User', UserSchema);
