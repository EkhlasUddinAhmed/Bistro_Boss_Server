import { JwtPayload } from 'jsonwebtoken';

import { TFoodMenue, TNewOrder } from './Menue.Interface';
import { FoodMenueModel, NewOrderModel } from './Menue.Model';

const getAllMenuesFromDB = async () => {
  const result = await FoodMenueModel.find();

  return result;
};

const createNewItemIntoDB = async (payload: TFoodMenue) => {
  const result = await FoodMenueModel.create(payload);
  return result;
};

const createOrderIntoDB = async (payload: TNewOrder) => {
  const result = await NewOrderModel.create(payload);
  return result;
};

const getItemsFromCart = async (payload: JwtPayload) => {
  const result = await NewOrderModel.find({
    userEmail: payload?.email,
  });
  return result;
};

const deleteOrderedItemFromCart = async (_id: string) => {
  const result = await NewOrderModel.findByIdAndDelete(_id);
  return result;
};

export const MenueService = {
  getAllMenuesFromDB,
  createOrderIntoDB,
  getItemsFromCart,
  deleteOrderedItemFromCart,
  createNewItemIntoDB,
};
