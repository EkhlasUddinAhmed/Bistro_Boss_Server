import mongoose, { Schema } from 'mongoose';

import { TUser } from './User.Interface';

const UserSchema: Schema = new Schema<TUser>(
  {
    name: String,
    email: String,
    role: {
      type: String,
      enum: ['superAdmin', 'admin', 'user'],
      default: 'user',
    },

    status: {
      type: String,
      enum: ['is-Active', 'blocked'],
      default: 'is-Active',
    },
    isGoogleLogin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const UserModel =
  mongoose.models.User || mongoose.model<TUser>('User', UserSchema);
