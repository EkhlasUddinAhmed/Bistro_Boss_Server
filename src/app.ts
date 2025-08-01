import express, { Application, Request, Response } from 'express';

import cors from 'cors';

import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import applicationRoute from './app/applicationRoute';
import cookieParser from 'cookie-parser';
import config from './app/config';

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [`${config.REACT_UI_LINK}`, `${config.REACT_UI_LINK2}`],
    credentials: true,
  }),
);

app.use('/api/v1', applicationRoute);
app.get('/', (req: Request, res: Response) => {
  res.status(200).send('WELLCOME TO BISTROBOSS SERVER');
});

app.use(notFound);
app.use(globalErrorHandler);
export default app;
