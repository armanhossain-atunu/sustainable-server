import express from 'express';
import { productControllers } from '../controllers/product.controller';
const router = express.Router();
// Get all events
router.get('/', productControllers.getProducts);
// Get single event
router.get('/:id', productControllers.getProductById);
// Create event
router.post('/', productControllers.createProduct);
// Update event
router.put('/:id', productControllers.updateProduct);
// Delete event
router.delete('/:id', productControllers.deleteProduct);

export const ProductRoutes = router;
