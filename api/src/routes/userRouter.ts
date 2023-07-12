import { Router } from 'express';

import { getUser } from '../controllers/userController';

const usersRouter = Router();

usersRouter.route('/user').post(getUser);

export default usersRouter;
