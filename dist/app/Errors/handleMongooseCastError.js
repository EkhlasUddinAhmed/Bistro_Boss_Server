"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleMongooseCastError = (error) => {
    var _a;
    const extractedMessage = ((_a = error === null || error === void 0 ? void 0 : error.message.split('for model "')[1]) === null || _a === void 0 ? void 0 : _a.split('"')[0]) || null;
    const errorSources = [
        {
            path: error === null || error === void 0 ? void 0 : error.path,
            message: extractedMessage,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: 'Invalid _id',
        errorSources,
    };
};
exports.default = handleMongooseCastError;
