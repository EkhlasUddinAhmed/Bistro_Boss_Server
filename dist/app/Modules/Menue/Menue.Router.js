"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Menue_Controller_1 = require("./Menue.Controller");
const Auth_authorization_1 = __importDefault(require("../Auth/Auth.authorization"));
const Auth_constant_1 = require("../Auth/Auth.constant");
const menueRouter = express_1.default.Router();
menueRouter.get('/', Menue_Controller_1.MenueController.getAllMenues);
menueRouter.post('/neworders', Menue_Controller_1.MenueController.createANewOrder);
menueRouter.post('/addItem', (0, Auth_authorization_1.default)(Auth_constant_1.USER_ROLE.admin, Auth_constant_1.USER_ROLE.superAdmin), Menue_Controller_1.MenueController.addItem);
menueRouter.get('/cartitems', (0, Auth_authorization_1.default)(Auth_constant_1.USER_ROLE.admin, Auth_constant_1.USER_ROLE.superAdmin, Auth_constant_1.USER_ROLE.user), Menue_Controller_1.MenueController.getCartItems);
menueRouter.delete('/cartitems/:_id', Menue_Controller_1.MenueController.deleteItemFromCart);
exports.default = menueRouter;
