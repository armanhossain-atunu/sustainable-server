"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controllers/product.controller");
const router = express_1.default.Router();
// Get all events
router.get('/', product_controller_1.productControllers.getProducts);
// Get single event
router.get('/:id', product_controller_1.productControllers.getProductById);
// Create event
router.post('/', product_controller_1.productControllers.createProduct);
// Update event
router.put('/:id', product_controller_1.productControllers.updateProduct);
// Delete event
router.delete('/:id', product_controller_1.productControllers.deleteProduct);
exports.ProductRoutes = router;
