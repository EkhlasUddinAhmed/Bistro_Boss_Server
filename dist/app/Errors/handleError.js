"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleError = (error) => {
    const errorSources = [
        {
            path: '',
            message: error === null || error === void 0 ? void 0 : error.message,
        },
    ];
    const statusCode = 500;
    return {
        statusCode,
        message: error === null || error === void 0 ? void 0 : error.message,
        errorSources,
    };
};
exports.default = handleError;
