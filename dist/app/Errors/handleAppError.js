"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleAppError = (error) => {
    const errorSources = [
        {
            path: '',
            message: error === null || error === void 0 ? void 0 : error.message,
        },
    ];
    const statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
    return {
        statusCode,
        message: error === null || error === void 0 ? void 0 : error.message,
        errorSources,
    };
};
exports.default = handleAppError;
