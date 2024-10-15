import { Router } from 'express';
import authenticationMiddleware from '../middlewares/authenticationMiddleware';
import BankController from '../controllers/BankController';

const bankRouter = Router();

bankRouter.get('/', authenticationMiddleware, BankController.getAllUserBanks);
bankRouter.post('/create', authenticationMiddleware, BankController.createBank);

export default bankRouter;
