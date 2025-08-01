import sendResponse from '../../utils/sendResponse';
import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { UserService } from './User.Service';

const createANewUser = catchAsync(async (req, res, next) => {
  const result = await UserService.createANewUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'A New User is created successfully...!!',
    data: result,
  });
});

const getANewUser = catchAsync(async (req, res, next) => {
  const { email } = req.params;
  const result = await UserService.getAUserFromDB(email);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'A User is retrieved successfully...!!',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res, next) => {
  const result = await UserService.getAllUsersFromDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'All Users are retrieved successfully...!!',
    data: result,
  });
});

const makeUserAdmin = catchAsync(async (req, res, next) => {
  const { _id } = req.params;
  const result = await UserService.makeUserAdminInDB(_id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User is made admin successfully...!!',
    data: result,
  });
});

// const getMe = catchAsync(async (req, res, next) => {
//   const result = await UserService.getMeFromDB(req.user);

//   sendResponse(res, {
//     statusCode: status.OK,
//     success: true,
//     message: 'Your data  is retrieved successfully...!!',
//     data: result,
//   });
// });

export const UserController = {
  createANewUser,
  getANewUser,
  getAllUsers,
  makeUserAdmin,
};
