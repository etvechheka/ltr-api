import express, { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.middleware';
import { addShippingAddress, getAddressByCustomerId, updateAddress} from '../controllers/shippingAddress.controller';

const router: Router = express.Router();
router.post('/', authenticate, addShippingAddress);
router.get('/:customer_id', authenticate, getAddressByCustomerId);
router.put('/:id', authenticate, updateAddress);

export default router;