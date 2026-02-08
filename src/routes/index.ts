import express, { Router } from 'express';
import { login, create } from '../controllers/auth.controller';
import validateResource from '../middlewares/validate.middleware';
import userSchema, { loginSchema } from '../schema/userValid.schema';

const router: Router = express.Router();
router.post('/create', validateResource(userSchema), create);
router.post('/login', validateResource(loginSchema), login);

export default router;