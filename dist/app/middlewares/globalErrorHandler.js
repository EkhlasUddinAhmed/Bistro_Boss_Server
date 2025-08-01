"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const handeZodError_1 = __importDefault(require("../Errors/handeZodError"));
const handleMongooseValidationError_1 = __importDefault(require("../Errors/handleMongooseValidationError"));
const handleMongooseCastError_1 = __importDefault(require("../Errors/handleMongooseCastError"));
const handleMongooseDuplicateError_1 = __importDefault(require("../Errors/handleMongooseDuplicateError"));
const AppError_1 = __importDefault(require("../Errors/AppError"));
const handleAppError_1 = __importDefault(require("../Errors/handleAppError"));
const handleError_1 = __importDefault(require("../Errors/handleError"));
const globalErrorHandler = (error, req, res, next) => {
    let statusCode = 500;
    let message = 'Something Went WERONG......!!!';
    let errorSources = [
        {
            path: '',
            message,
        },
    ];
    if (error instanceof zod_1.ZodError) {
        const simplifiedError = (0, handeZodError_1.default)(error);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        errorSources = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSources;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
    }
    else if ((error === null || error === void 0 ? void 0 : error.name) === 'ValidationError') {
        const simplifiedError = (0, handleMongooseValidationError_1.default)(error);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        errorSources = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSources;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
    }
    else if ((error === null || error === void 0 ? void 0 : error.name) === 'CastError') {
        const simplifiedError = (0, handleMongooseCastError_1.default)(error);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        errorSources = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSources;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
    }
    else if ((error === null || error === void 0 ? void 0 : error.code) === 11000) {
        const simplifiedError = (0, handleMongooseDuplicateError_1.default)(error);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        errorSources = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSources;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
    }
    else if (error instanceof AppError_1.default) {
        const simplifiedError = (0, handleAppError_1.default)(error);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        errorSources = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSources;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
    }
    else {
        const simplifiedError = (0, handleError_1.default)(error);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        errorSources = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSources;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        // stack: config.NODE_ENV === 'development' ? error?.stack : null,
        // error,
    });
};
exports.default = globalErrorHandler;
