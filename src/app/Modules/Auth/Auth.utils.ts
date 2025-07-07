import AppError from '../../Errors/AppError';
import { TLoggedUser, TLogIn } from './Auth.interface';
import status from 'http-status';
import bcrypt from 'bcryptjs';
import { UserModel } from '../Users/User.Model';
import config from '../../config';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
export const checkingUserExistDeletedBlocked = async (userId: string) => {
  //   Checking User is Exists Or Not.........!!!
  const isUserExists = await UserModel.findOne({
    userId: userId,
  }).select('+password');
  if (!isUserExists) {
    throw new AppError(status.NOT_FOUND, `User With Id:${userId} not found`);
  }

  //   Checking User is Deleted Or Not...............!!!

  if (isUserExists?.isDeleted) {
    throw new AppError(
      status.BAD_REQUEST,
      `This User is Already Deleted...!!!`,
    );
  }

  //   Checking User is Deleted Or Not...............!!!

  if (isUserExists?.status === 'blocked') {
    throw new AppError(
      status.BAD_REQUEST,
      `This User is Already Blocked...!!!`,
    );
  }

  return isUserExists;
};

export const checkingUserExistPasswordCorrectDeletedBlocked = async (
  payload: TLogIn,
) => {
  const isUserExists = await checkingUserExistDeletedBlocked(
    payload.userId as string,
  );

  //   Checking Password is Correct Or Not.........!!!

  const isPasswordCorrect = await bcrypt.compare(
    payload.password as string,
    isUserExists.password,
  );

  if (!isPasswordCorrect) {
    throw new AppError(status.NOT_FOUND, `Wrong Password...!!!`);
  }

  return isUserExists;
};

export const generateToken = async (
  loggedUser: TLoggedUser,
  secretKey: string,
  expiresIn: any,
) => {
  const accessToken = await jwt.sign(loggedUser, secretKey, { expiresIn });
  return accessToken;
};

export const makeAPasswordHashed = async (password: string) => {
  const hash = await bcrypt.hash(password, Number(config.BCRYPT_SALT_ROUND));
  return hash;
};

export const tokenCreationTimeSmallerThanPasswordChangingTime = async (
  tokenCreationTime: number,
  PasswordChangingTime: Date,
) => {
  const convertPasswordChangingTime =
    new Date(PasswordChangingTime).getTime() / 1000;
  return convertPasswordChangingTime > tokenCreationTime;
};

export const sendEmail = async (to: string, html: string) => {
  // Create a test account or replace with real credentials.
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production', // true for 465, false for other ports
    auth: {
      user: 'matrixedu14@gmail.com',
      pass: 'dddr vvdb nhwi hsnb',
    },
  });

  // Wrap in an async IIFE so we can use await.
  (async () => {
    const info = await transporter.sendMail({
      from: 'matrixedu14@gmail.com',
      to,
      subject: 'Forget Password...????✔',
      text: 'Reset Password within 10 minits...!!!', // plain‑text body
      html: `<h2 style="color: red; font-size: 24px;">Click On the link below and reset your password within 10 minits ...!!</h2>
            <h2>${html}</h2>`,
    });

    console.log('Message sent:', info.messageId);
  })();
};
