import express, { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.middleware';
import { addNewCategory, deleteCategory, getCategories, getCategory, updateCategory } from '../controllers/category.controller';


const router: Router = express.Router();
router.post('/', authenticate, addNewCategory);
router.get('/', getCategories);
router.get('/:id', getCategory);
router.put('/:id', authenticate, updateCategory);
router.delete('/:id', authenticate, deleteCategory);

export default router;