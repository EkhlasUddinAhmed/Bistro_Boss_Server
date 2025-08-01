import express from 'express';
// import validateRequest from '../../utils/validateRequest';
// import { AuthValidation } from './Auth.validation';
import { AuthController } from './Auth.controller';

const authRouter = express.Router();

authRouter.post(
  '/create-token',
  AuthController.createAccessAndRefreshTokenController,
);

export default authRouter;
