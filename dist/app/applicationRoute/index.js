"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_Router_1 = __importDefault(require("../Modules/Users/User.Router"));
const Menue_Router_1 = __importDefault(require("../Modules/Menue/Menue.Router"));
const Auth_router_1 = __importDefault(require("../Modules/Auth/Auth.router"));
const express_1 = __importDefault(require("express"));
const applicationRoute = express_1.default.Router();
const allRoutes = [
    {
        path: '/users',
        route: User_Router_1.default,
    },
    {
        path: '/menues',
        route: Menue_Router_1.default,
    },
    {
        path: '/jwt',
        route: Auth_router_1.default,
    },
];
allRoutes.forEach((route) => applicationRoute.use(route === null || route === void 0 ? void 0 : route.path, route.route));
exports.default = applicationRoute;
