// import express from 'express';
// import validateRequest from '../../utils/validateRequest';
// import { AuthValidation } from './Auth.validation';
// import { AuthController } from './Auth.controller';
// import auth from './Auth.authorization';
// import { USER_ROLE } from './Auth.constant';

// const authRouter = express.Router();

// authRouter.post(
//   '/login',
//   validateRequest(AuthValidation.LoginValidationSchema),
//   AuthController.logInUser,
// );
// authRouter.post(
//   '/logout',

//   AuthController.logOutUser,
// );

// authRouter.post(
//   '/change-password',
//   auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
//   validateRequest(AuthValidation.ChangePasswordValidationSchema),
//   AuthController.changePassword,
// );

// authRouter.post(
//   '/refresh-token',

//   validateRequest(AuthValidation.refreshTokenValidationSchema),
//   AuthController.createAccessToken,
// );

// authRouter.post(
//   '/forget-password',
//   auth(
//     USER_ROLE.superAdmin,
//     USER_ROLE.admin,
//     USER_ROLE.faculty,
//     USER_ROLE.student,
//   ),
//   validateRequest(AuthValidation.forgetPasswordValidationSchema),
//   AuthController.forgetPassword,
// );
// authRouter.post(
//   '/reset-password',
//   auth(
//     USER_ROLE.superAdmin,
//     USER_ROLE.admin,
//     USER_ROLE.faculty,
//     USER_ROLE.student,
//   ),
//   validateRequest(AuthValidation.resetNewPasswordValidationSchema),
//   AuthController.resetNewPassword,
// );

// export default authRouter;
