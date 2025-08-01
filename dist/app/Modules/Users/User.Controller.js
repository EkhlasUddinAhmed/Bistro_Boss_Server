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
exports.UserController = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const User_Service_1 = require("./User.Service");
const createANewUser = (0, catchAsync_1.default)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield User_Service_1.UserService.createANewUserIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'A New User is created successfully...!!',
        data: result,
    });
}));
const getANewUser = (0, catchAsync_1.default)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    const result = yield User_Service_1.UserService.getAUserFromDB(email);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'A User is retrieved successfully...!!',
        data: result,
    });
}));
const getAllUsers = (0, catchAsync_1.default)((_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield User_Service_1.UserService.getAllUsersFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All Users are retrieved successfully...!!',
        data: result,
    });
}));
const makeUserAdmin = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    const result = yield User_Service_1.UserService.makeUserAdminInDB(_id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User is made admin successfully...!!',
        data: result,
    });
}));
// const getMe = catchAsync(async (req, res, next) => {
//   const result = await UserService.getMeFromDB(req.user);
//   sendResponse(res, {
//     statusCode: status.OK,
//     success: true,
//     message: 'Your data  is retrieved successfully...!!',
//     data: result,
//   });
// });
exports.UserController = {
    createANewUser,
    getANewUser,
    getAllUsers,
    makeUserAdmin,
};
