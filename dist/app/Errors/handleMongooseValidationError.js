"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleMongooseValidationError = (error) => {
    const errorSources = Object.values(error === null || error === void 0 ? void 0 : error.errors).map((issue) => {
        return {
            path: issue === null || issue === void 0 ? void 0 : issue.path,
            message: issue.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        errorSources,
        message: error === null || error === void 0 ? void 0 : error.name,
    };
};
exports.default = handleMongooseValidationError;
