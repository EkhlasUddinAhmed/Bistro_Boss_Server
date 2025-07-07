import express from 'express';
import userRouter from '../Modules/Users/User.Router';

const applicationRoute = express.Router();

const allRoutes = [
  {
    path: '/user',
    route: userRouter,
  },
];

allRoutes.forEach((route) => applicationRoute.use(route?.path, route.route));

export default applicationRoute;
