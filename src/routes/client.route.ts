import express, { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.middleware';
import { createClient, getClient, getClients, loginClient, updateClient } from '../controllers/client.controller';

const router: Router = express.Router();
router.post('/', createClient);
router.post('/login', loginClient);
router.get('/', authenticate, getClients);
router.get('/:id', authenticate, getClient);
router.put('/:id', authenticate, updateClient);

export default router;