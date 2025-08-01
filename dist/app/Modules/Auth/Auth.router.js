"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import validateRequest from '../../utils/validateRequest';
// import { AuthValidation } from './Auth.validation';
const Auth_controller_1 = require("./Auth.controller");
const authRouter = express_1.default.Router();
authRouter.post('/create-token', Auth_controller_1.AuthController.createAccessAndRefreshTokenController);
exports.default = authRouter;
