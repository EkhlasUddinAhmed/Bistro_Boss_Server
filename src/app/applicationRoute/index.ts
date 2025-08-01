import express from 'express';
import userRouter from '../Modules/Users/User.Router';
import menueRouter from '../Modules/Menue/Menue.Router';
import authRouter from '../Modules/Auth/Auth.router';

const applicationRoute = express.Router();

const allRoutes = [
  {
    path: '/users',
    route: userRouter,
  },
  {
    path: '/menues',
    route: menueRouter,
  },
  {
    path: '/jwt',
    route: authRouter,
  },
];

allRoutes.forEach((route) => applicationRoute.use(route?.path, route.route));

export default applicationRoute;
