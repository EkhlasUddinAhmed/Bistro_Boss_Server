"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_authorization_1 = __importDefault(require("../Auth/Auth.authorization"));
const User_Controller_1 = require("./User.Controller");
const Auth_constant_1 = require("../Auth/Auth.constant");
const userRouter = express_1.default.Router();
userRouter.post('/create-user', User_Controller_1.UserController.createANewUser);
userRouter.get('/:email', 
// auth(USER_ROLE.superAdmin, USER_ROLE.admin),
User_Controller_1.UserController.getANewUser);
userRouter.get('/', 
// auth(USER_ROLE.superAdmin, USER_ROLE.admin),
User_Controller_1.UserController.getAllUsers);
userRouter.patch('/:_id', (0, Auth_authorization_1.default)(Auth_constant_1.USER_ROLE.superAdmin, Auth_constant_1.USER_ROLE.admin), User_Controller_1.UserController.makeUserAdmin);
userRouter.get('/', (req, res) => {
    res.status(200).json({ server: 'OK' });
});
// userRouter.get(
//   '/me',
//   auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
//   UserController.getMe,
// );
exports.default = userRouter;
