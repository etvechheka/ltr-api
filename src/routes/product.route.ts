import express, { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.middleware';
import { addNewProduct, addProductImage, deleteMultipleProductImage, deleteProduct, 
    getAllMultipleProductImage, getCategoryProduct, getFeatureProduct, getMultipleProductImage,
     getProduct, getProducts, updateProduct 
    } from '../controllers/product.controller';

const router: Router = express.Router();
router.post('/', authenticate, addNewProduct);
router.post('/images', authenticate, addProductImage);
router.get('/images', authenticate, getAllMultipleProductImage);
router.get('/images/:id', getMultipleProductImage);
router.delete('/images/:id', authenticate, deleteMultipleProductImage);
router.get('/', getProducts);
router.get('/feature', getFeatureProduct);
router.get('/category/:id', getCategoryProduct);
router.get('/:id', getProduct);
router.put('/:id', authenticate, updateProduct);
router.delete('/:id', authenticate, deleteProduct);

export default router;