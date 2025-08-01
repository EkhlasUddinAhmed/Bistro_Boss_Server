import express from 'express';
import { MenueController } from './Menue.Controller';
import auth from '../Auth/Auth.authorization';
import { USER_ROLE } from '../Auth/Auth.constant';
const menueRouter = express.Router();

menueRouter.get('/', MenueController.getAllMenues);
menueRouter.post('/neworders', MenueController.createANewOrder);
menueRouter.post(
  '/addItem',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  MenueController.addItem,
);

menueRouter.get(
  '/cartitems',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.user),
  MenueController.getCartItems,
);

menueRouter.delete('/cartitems/:_id', MenueController.deleteItemFromCart);

export default menueRouter;
