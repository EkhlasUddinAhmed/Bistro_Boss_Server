"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleMongooseDuplicateError = (error) => {
    var _a, _b, _c;
    const extractedMessage = ((_c = (_b = (_a = error === null || error === void 0 ? void 0 : error.errorResponse) === null || _a === void 0 ? void 0 : _a.errmsg) === null || _b === void 0 ? void 0 : _b.split('{ name: "')[1]) === null || _c === void 0 ? void 0 : _c.split('"')[0]) || null;
    const errorSources = [
        {
            path: '',
            message: extractedMessage + ' is already existing',
        },
    ];
    const statusCode = 409;
    return {
        statusCode,
        message: 'Duplicate Error',
        errorSources,
    };
};
exports.default = handleMongooseDuplicateError;
