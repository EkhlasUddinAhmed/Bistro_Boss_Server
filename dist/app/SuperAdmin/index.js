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
const config_1 = __importDefault(require("../config"));
const Auth_constant_1 = require("../Modules/Auth/Auth.constant");
const User_Model_1 = require("../Modules/Users/User.Model");
const SuperAdmin = {
    userId: 'superAdmin2025',
    password: config_1.default.SUPER_ADMIN_PASSWORD,
    needsPasswordChange: false,
    email: 'ekhlas.hcLawyer@gmail.com',
    role: Auth_constant_1.USER_ROLE.superAdmin,
    status: 'is-Active',
    isDeleted: false,
};
const seedSuperAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const isSuperAdminAlreadyExits = yield User_Model_1.UserModel.findOne({
        role: Auth_constant_1.USER_ROLE.superAdmin,
    });
    if (!isSuperAdminAlreadyExits) {
        User_Model_1.UserModel.create(SuperAdmin);
    }
});
exports.default = seedSuperAdmin;
