import express, { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.middleware';
import { getOrderLists, orderItem } from '../controllers/order.controller';

const router: Router = express.Router();
router.post('/', authenticate, orderItem);
router.get('/', authenticate, getOrderLists);

export default router;