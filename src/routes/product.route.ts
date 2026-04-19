import express from 'express';
import { productControllers } from '../controllers/product.controller';
const router = express.Router();

router.get('/service-requests', productControllers.getServiceRequests);
router.get('/service-requests/:id', productControllers.getServiceRequestById);
router.post('/service-requests', productControllers.createServiceRequest);
router.delete('/service-requests/:id', productControllers.deleteServiceRequest);

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
