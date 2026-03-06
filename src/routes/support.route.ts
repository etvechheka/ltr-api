import express, { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.middleware';
import { AddContact } from '../controllers/support.controller';


const router: Router = express.Router();
router.post('/', AddContact);

export default router;