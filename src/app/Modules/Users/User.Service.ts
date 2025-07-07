import mongoose, { Query } from 'mongoose';
import AppError from '../../Errors/AppError';
import config from '../../config';



import { UserModel } from './User.Model';

import status from 'http-status';

import { JwtPayload } from 'jsonwebtoken';
import {
  deleteImageFileFromUploadsFolder,
  sendImageToCloudinary,
} from '../../utils/sendImageToCloudinary';
const createANewStudentIntoDB = async (
  // student: TStudent,
  // password: string,
  // file: any,
) => {
  // const user: Partial<TUser> = {};

  // const isStudentExists = await StudentModel.findOne({ email: student?.email });

  // if (isStudentExists) {
  //   throw new AppError(
  //     status.CONFLICT,
  //     `User with email:${student?.email} is already existing...!!`,
  //   );
  // }

  // user.password = password || (config.DEFAULT_PASSWORD as string);

  // const academicSemester = await AcademicSemesterModel.findById(
  //   student?.admissionSemester,
  // );

  // if (!academicSemester) {
  //   throw new AppError(
  //     status.NOT_FOUND,
  //     'Student Admission Semester does not exist....!!',
  //   );
  // }

  ;

  // user.role = 'student';
  // user.email = student.email;
  // // CLOUDINARY RELATED FUNCTIONALITY STARTS HERE......................!!!!
  // if (file) {
  //   const imageName = `${student?.name?.firstName}-${user.userId}`;
  //   const cloudinaryResult = await sendImageToCloudinary(file.path, imageName);

  //   const profileImage = cloudinaryResult?.secure_url;
  //   student.profileImage = profileImage;
  // }

  // CLOUDINARY RELATED FUNCTIONALITY ENDS HERE......................!!!!
  const session = await mongoose.startSession();
  // try {
  //   await session.startTransaction();
  //   const newUser = await UserModel.create([user], { session });

  //   if (!newUser.length) {
  //     throw new AppError(status.BAD_REQUEST, 'Failed to create user...!!!');
  //   }

    // student.id = newUser[0].userId;
    // student.user = newUser[0]._id;

    // const createdNewStudent = await StudentModel.create([student], { session });

    // if (!createdNewStudent.length) {
    //   throw new AppError(status.BAD_REQUEST, 'Failed to create Student...!!!');
    // }

    // await session.commitTransaction();
    // await session.endSession();
    // deleteImageFileFromUploadsFolder(file.path);
    // return createdNewStudent[0];
  // } catch (error: any) {
  //   await session.abortTransaction();
  //   await session.endSession();
  //   throw new AppError(status.BAD_REQUEST, error?.message);
  // }
};





const getMeFromDB = async (user: JwtPayload) => {
  // let getUser = null;

  // const { userId, role, email } = user;
  // if (role === 'admin') {
  //   getUser = await AdminModel.findOne({
  //     id: userId,
  //     email,
  //   }).populate('user');
  // }
  // if (role === 'faculty') {
  //   getUser = await FacultyModel.findOne({
  //     id: userId,
  //     email,
  //   }).populate('user');
  // }
  // if (role === 'student') {
  //   getUser = await StudentModel.findOne({
  //     id: userId,
  //     email,
  //   }).populate('user');
  // }

  // return getUser;
};
export const UserService = {
  createANewStudentIntoDB,
  
  getMeFromDB,
};
