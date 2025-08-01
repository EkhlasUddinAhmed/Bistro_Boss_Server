import { UserModel } from './User.Model';

import { TUser } from './User.Interface';

const createANewUserIntoDB = async (payload: TUser) => {
  payload.role = 'user';
  payload.status = 'is-Active';

  const isUserExists = await UserModel.findOne({
    email: payload.email,
  });

  if (isUserExists) {
    if (!isUserExists.isGoogleLogin) {
      const result = await UserModel.findOneAndUpdate(
        { email: isUserExists.email },
        {
          isGoogleLogin: true,
        },
        {
          new: true,
          runValidators: true,
        },
      );
      return {
        ...result,
        old: true,
      };
    } else {
      return {
        email: isUserExists.email,
        isGoogleLogin: true,
        old: true,
      };
    }
  } else {
    const result = await UserModel.create(payload);
    return result;
  }
};

const getAUserFromDB = async (email: string) => {
  // const result = await UserModel.findOne({ email, isGoogleLogin: true });
  const result = await UserModel.findOne({ email });
  return result;
};
const getAllUsersFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

const makeUserAdminInDB = async (_id: string) => {
  const result = await UserModel.findByIdAndUpdate(
    _id,
    {
      role: 'admin',
    },
    {
      new: true,
      runValidators: true,
    },
  );

  return result;
};

export const UserService = {
  createANewUserIntoDB,
  getAUserFromDB,
  getAllUsersFromDB,
  makeUserAdminInDB,
};
