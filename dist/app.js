"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const applicationRoute_1 = __importDefault(require("./app/applicationRoute"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const config_1 = __importDefault(require("./app/config"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: [`${config_1.default.REACT_UI_LINK}`, `${config_1.default.REACT_UI_LINK2}`],
    credentials: true,
}));
app.use('/api/v1', applicationRoute_1.default);
app.get('/', (req, res) => {
    res.status(200).send('WELLCOME TO BISTROBOSS SERVER');
});
app.use(notFound_1.default);
app.use(globalErrorHandler_1.default);
exports.default = app;
