import { USER_ROLE } from '../Auth/Auth.constant';



import express, { NextFunction, Request, Response } from 'express';

import validateRequest from '../../utils/validateRequest';


import auth from '../Auth/Auth.authorization';
import { upload } from '../../utils/sendImageToCloudinary';
import { UserController } from './User.Controller';

const userRouter = express.Router();
userRouter.post(
  '/create-student',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  // validateRequest(StudentValidations.StudentCreationValidationSchema),
  // UserController.createANewStudent,
);



userRouter.get(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  UserController.getMe,
);
export default userRouter;
