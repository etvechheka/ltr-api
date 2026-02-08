import express, { Router } from 'express';
import {  getUsers } from '../controllers/users.controller';
import { authenticate } from '../middlewares/authenticate.middleware';


const router: Router = express.Router();
router.get('/', authenticate, getUsers);

export default router;