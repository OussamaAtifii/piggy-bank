import { Router } from 'express';
import authenticationMiddleware from '../middlewares/authenticationMiddleware';
import TagController from '../controllers/TagController';
import tagMiddleware from '../middlewares/tagMiddleware';

const tagRouter = Router();

tagRouter.use(authenticationMiddleware);

tagRouter.get('/bank/:id', TagController.getBankTags);
tagRouter.post('/', TagController.createTag);
tagRouter.patch('/:id', tagMiddleware, TagController.updateTag);
tagRouter.delete('/:id', tagMiddleware, TagController.deleteTag);

export default tagRouter;
