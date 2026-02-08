import express, { Router } from 'express';
import { getUser, getUsers, updateUser } from '../controllers/users.controller';
import { authenticate } from '../middlewares/authenticate.middleware';
import { authorizeRoles } from '../middlewares/role-authenticate.mddleware';


const router: Router = express.Router();
router.get('/', authenticate, authorizeRoles(['admin']), getUsers);
router.get('/:id', authenticate, getUser);
router.put('/:id', authenticate, updateUser);

export default router;