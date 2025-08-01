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
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const auth = (...userRequested) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const accessTokenString = req.headers.authorization;
        const accessToken = accessTokenString.split(' ')[1];
        if (!accessToken) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Forbidden Access...!!!');
        }
        const decoded = jsonwebtoken_1.default.verify(accessToken, config_1.default.ACCESS_TOKEN_SECRET);
        const { role, email, iat } = decoded;
        if (userRequested && !userRequested.includes(role)) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized Access....!!!');
        }
        req.user = decoded;
        next();
    }));
};
exports.default = auth;
