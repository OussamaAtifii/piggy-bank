import express, { Express, NextFunction, Request, Response } from 'express';
import { PORT } from './config/config';
import { corsMiddleware } from './middlewares/corsMiddleware';
import cookieParser from 'cookie-parser';
import authMiddleware from './middlewares/authenticationMiddleware';
import userRouter from './routes/users';

const app: Express = express();

app.disable('x-powered-by');

app.use(express.json());
app.use(corsMiddleware);
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Se viene Piggy-Bank pa.');
});

app.use('/user', userRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
