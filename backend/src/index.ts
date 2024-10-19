import express, { Express, NextFunction, Request, Response } from 'express';
import { PORT } from './config/config';
import { corsMiddleware } from './middlewares/corsMiddleware';
import cookieParser from 'cookie-parser';
import userRouter from './routes/users';
import bankRouter from './routes/banks';
import tagRouter from './routes/tags';

const app: Express = express();

app.disable('x-powered-by');

app.use(express.json());
app.use(corsMiddleware);
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Se viene Piggy-Bank pa.');
});

app.use('/user', userRouter);
app.use('/bank', bankRouter);
app.use('/tag', tagRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
