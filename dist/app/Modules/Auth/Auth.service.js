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
exports.AuthService = void 0;
const config_1 = __importDefault(require("../../config"));
const Auth_utils_1 = require("./Auth.utils");
const createAccessAndRefreshToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const loggedUser = {
        role: payload === null || payload === void 0 ? void 0 : payload.role,
        email: payload === null || payload === void 0 ? void 0 : payload.email,
    };
    const accessToken = yield (0, Auth_utils_1.generateToken)(loggedUser, config_1.default.ACCESS_TOKEN_SECRET, config_1.default.ACCESS_TOKEN_SECRET_EXPIRES_IN);
    const refreshToken = yield (0, Auth_utils_1.generateToken)(loggedUser, config_1.default.REFRESH_TOKEN_SECRET, config_1.default.REFRESH_TOKEN_SECRET_EXPIRES_IN);
    return {
        accessToken,
        refreshToken,
    };
});
exports.AuthService = {
    createAccessAndRefreshToken,
};
