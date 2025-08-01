"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (error) => {
    const errorSources = error === null || error === void 0 ? void 0 : error.issues.map((issue) => {
        return {
            path: issue === null || issue === void 0 ? void 0 : issue.path.pop(),
            message: issue === null || issue === void 0 ? void 0 : issue.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        errorSources,
        message: error === null || error === void 0 ? void 0 : error.name,
    };
};
exports.default = handleZodError;
