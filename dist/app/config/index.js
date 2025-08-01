"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    DB_CONNECTION_URL: process.env.DB_CONNECTION_URL,
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND,
    DEFAULT_PASSWORD: process.env.DEFAULT_PASSWORD,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_SECRET_EXPIRES_IN: process.env.ACCESS_TOKEN_SECRET_EXPIRES_IN,
    REFRESH_TOKEN_SECRET_EXPIRES_IN: process.env.REFRESH_TOKEN_SECRET_EXPIRES_IN,
    FORGET_PASSWORD_TOKEN_SECRET: process.env.FORGET_PASSWORD_TOKEN_SECRET,
    FORGET_PASSWORD_TOKEN_SECRET_EXPIRES_IN: process.env.FORGET_PASSWORD_TOKEN_SECRET_EXPIRES_IN,
    REACT_UI_LINK: process.env.REACT_UI_LINK,
    REACT_UI_LINK2: process.env.REACT_UI_LINK2,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD,
};
