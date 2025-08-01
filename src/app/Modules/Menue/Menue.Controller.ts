import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

import { MenueService } from './Menue.Service';
import httpStatus from 'http-status';
const getAllMenues = catchAsync(async (req, res, next) => {
  const allFoodMenues = await MenueService.getAllMenuesFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All food menues are retrieved successfully',
    data: allFoodMenues,
  });
});

const addItem = catchAsync(async (req, res, next) => {
  const newItem = await MenueService.createNewItemIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'A New Item is Created successfully',
    data: newItem,
  });
});

const createANewOrder = catchAsync(async (req, res, next) => {
  const result = await MenueService.createOrderIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'A New Order is Created successfully...!!!',
    data: result,
  });
});

const getCartItems = catchAsync(async (req, res, next) => {
  const result = await MenueService.getItemsFromCart(req.user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Items From Cart are retrieved successfully...!!!',
    data: result,
  });
});

const deleteItemFromCart = catchAsync(async (req, res, next) => {
  const { _id } = req.params;
  const result = await MenueService.deleteOrderedItemFromCart(_id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Items From Cart is deleted successfully...!!!',
    data: result,
  });
});

export const MenueController = {
  getAllMenues,
  createANewOrder,
  getCartItems,
  deleteItemFromCart,
  addItem,
};
