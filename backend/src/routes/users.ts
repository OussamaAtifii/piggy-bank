import { Router } from 'express';
import UserController from '../controllers/UserController';
import authenticationMiddleware from '../middlewares/authenticationMiddleware';
import authorizationMiddleware from '../middlewares/authorizationMiddleware';

const userRouter = Router();

userRouter.get('/', UserController.getAllUsers);

userRouter.post('/register', UserController.register);
userRouter.post('/login', UserController.login);

userRouter.get('/:id', UserController.getUserById);
userRouter.patch(
  '/:id',
  authenticationMiddleware,
  authorizationMiddleware,
  UserController.updateUser
);
userRouter.delete(
  '/:id',
  authenticationMiddleware,
  authorizationMiddleware,
  UserController.deleteUser
);

export default userRouter;
