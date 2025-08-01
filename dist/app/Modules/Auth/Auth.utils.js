"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = exports.tokenCreationTimeSmallerThanPasswordChangingTime = exports.makeAPasswordHashed = exports.generateToken = exports.checkingUserExistPasswordCorrectDeletedBlocked = exports.checkingUserExistDeletedBlocked = void 0;
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_Model_1 = require("../Users/User.Model");
const config_1 = __importDefault(require("../../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const checkingUserExistDeletedBlocked = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    //   Checking User is Exists Or Not.........!!!
    const isUserExists = yield User_Model_1.UserModel.findOne({
        userId: userId,
    }).select('+password');
    if (!isUserExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `User With Id:${userId} not found`);
    }
    //   Checking User is Deleted Or Not...............!!!
    if (isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.isDeleted) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `This User is Already Deleted...!!!`);
    }
    //   Checking User is Deleted Or Not...............!!!
    if ((isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.status) === 'blocked') {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `This User is Already Blocked...!!!`);
    }
    return isUserExists;
});
exports.checkingUserExistDeletedBlocked = checkingUserExistDeletedBlocked;
const checkingUserExistPasswordCorrectDeletedBlocked = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield (0, exports.checkingUserExistDeletedBlocked)(payload.email);
    //   Checking Password is Correct Or Not.........!!!
    const isPasswordCorrect = yield bcryptjs_1.default.compare(payload.password, isUserExists.password);
    if (!isPasswordCorrect) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `Wrong Password...!!!`);
    }
    return isUserExists;
});
exports.checkingUserExistPasswordCorrectDeletedBlocked = checkingUserExistPasswordCorrectDeletedBlocked;
const generateToken = (loggedUser, secretKey, expiresIn) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = yield jsonwebtoken_1.default.sign(loggedUser, secretKey, { expiresIn });
    return accessToken;
});
exports.generateToken = generateToken;
const makeAPasswordHashed = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = yield bcryptjs_1.default.hash(password, Number(config_1.default.BCRYPT_SALT_ROUND));
    return hash;
});
exports.makeAPasswordHashed = makeAPasswordHashed;
const tokenCreationTimeSmallerThanPasswordChangingTime = (tokenCreationTime, PasswordChangingTime) => __awaiter(void 0, void 0, void 0, function* () {
    const convertPasswordChangingTime = new Date(PasswordChangingTime).getTime() / 1000;
    return convertPasswordChangingTime > tokenCreationTime;
});
exports.tokenCreationTimeSmallerThanPasswordChangingTime = tokenCreationTimeSmallerThanPasswordChangingTime;
const sendEmail = (to, html) => __awaiter(void 0, void 0, void 0, function* () {
    // Create a test account or replace with real credentials.
    const transporter = nodemailer_1.default.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: config_1.default.NODE_ENV === 'production', // true for 465, false for other ports
        auth: {
            user: 'matrixedu14@gmail.com',
            pass: 'dddr vvdb nhwi hsnb',
        },
    });
    // Wrap in an async IIFE so we can use await.
    (() => __awaiter(void 0, void 0, void 0, function* () {
        const info = yield transporter.sendMail({
            from: 'matrixedu14@gmail.com',
            to,
            subject: 'Forget Password...????✔',
            text: 'Reset Password within 10 minits...!!!', // plain‑text body
            html: `<h2 style="color: red; font-size: 24px;">Click On the link below and reset your password within 10 minits ...!!</h2>
            <h2>${html}</h2>`,
        });
        console.log('Message sent:', info.messageId);
    }))();
});
exports.sendEmail = sendEmail;
