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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const User_Model_1 = require("./User.Model");
const createANewUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.role = 'user';
    payload.status = 'is-Active';
    const isUserExists = yield User_Model_1.UserModel.findOne({
        email: payload.email,
    });
    if (isUserExists) {
        if (!isUserExists.isGoogleLogin) {
            const result = yield User_Model_1.UserModel.findOneAndUpdate({ email: isUserExists.email }, {
                isGoogleLogin: true,
            }, {
                new: true,
                runValidators: true,
            });
            return Object.assign(Object.assign({}, result), { old: true });
        }
        else {
            return {
                email: isUserExists.email,
                isGoogleLogin: true,
                old: true,
            };
        }
    }
    else {
        const result = yield User_Model_1.UserModel.create(payload);
        return result;
    }
});
const getAUserFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    // const result = await UserModel.findOne({ email, isGoogleLogin: true });
    const result = yield User_Model_1.UserModel.findOne({ email });
    return result;
});
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield User_Model_1.UserModel.find();
    return result;
});
const makeUserAdminInDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield User_Model_1.UserModel.findByIdAndUpdate(_id, {
        role: 'admin',
    }, {
        new: true,
        runValidators: true,
    });
    return result;
});
exports.UserService = {
    createANewUserIntoDB,
    getAUserFromDB,
    getAllUsersFromDB,
    makeUserAdminInDB,
};
