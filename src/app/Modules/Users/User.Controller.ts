import sendResponse from '../../utils/sendResponse';
import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { UserService } from './User.Service';

const createANewStudent = catchAsync(async (req, res, next) => {
  const { student, password } = req.body;

  const file = req.file;
  const result = await UserService.createANewStudentIntoDB(
    // student,
    // password,
    // file,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'A New Student is created successfully...!!',
    data: result,
  });
});

const getMe = catchAsync(async (req, res, next) => {
  const result = await UserService.getMeFromDB(req.user);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Your data  is retrieved successfully...!!',
    data: result,
  });
});

export const UserController = {
  createANewStudent,

  getMe,
};
