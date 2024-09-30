import { Router } from 'express';
import UserController from '../controllers/UserController';

const userRouter = Router();

userRouter.get('/', UserController.getAllUsers);

userRouter.post('/register', UserController.register);
userRouter.post('/login', UserController.login);

userRouter.get('/:id', UserController.getUserById);
userRouter.patch('/:id', UserController.updateUser);
userRouter.delete('/:id', UserController.deleteUser);

export default userRouter;
