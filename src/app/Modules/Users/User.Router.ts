import express from 'express';

import auth from '../Auth/Auth.authorization';

import { UserController } from './User.Controller';
import { USER_ROLE } from '../Auth/Auth.constant';

const userRouter = express.Router();
userRouter.post(
  '/create-user',

  UserController.createANewUser,
);

userRouter.get(
  '/:email',
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  UserController.getANewUser,
);
userRouter.get(
  '/',
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  UserController.getAllUsers,
);

userRouter.patch(
  '/:_id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  UserController.makeUserAdmin,
);
userRouter.get(
  '/',

  (req, res) => {
    res.status(200).json({ server: 'OK' });
  },
);

// userRouter.get(
//   '/me',
//   auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
//   UserController.getMe,
// );
export default userRouter;
