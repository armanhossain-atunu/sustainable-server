"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productControllers = void 0;
const product_model_1 = require("../models/product.model");
const serviceRequest_model_1 = require("../models/serviceRequest.model");
// Create product
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const savedProduct = yield product_model_1.Event.create(req.body);
        res.status(201).json({
            success: true,
            message: 'product created successfully',
            data: savedProduct,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to create product',
            error: err.message,
        });
    }
});
// Get all products
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search } = req.query;
        let filter = {};
        if (search && typeof search === 'string') {
            const regex = new RegExp(search, 'i');
            filter = {
                $or: [
                    { title: regex },
                    { description: regex },
                    { category: regex },
                ],
            };
        }
        const products = yield product_model_1.Event.find(filter);
        res.status(200).json({
            success: true,
            message: 'product fetched successfully',
            data: products,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch product',
            error: err.message,
        });
    }
});
// Get single product
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_model_1.Event.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'product not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'product fetched successfully',
            data: product,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch product',
            error: err.message,
        });
    }
});
// Update product
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedProduct = yield product_model_1.Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: 'product not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'product updated successfully',
            data: updatedProduct,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to update product',
            error: err.message,
        });
    }
});
// Delete product
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedProduct = yield product_model_1.Event.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: 'product not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'product deleted successfully',
            data: null,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete product',
            error: err.message,
        });
    }
});
const createServiceRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const savedServiceRequest = yield serviceRequest_model_1.ServiceRequest.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Service request created successfully',
            data: savedServiceRequest,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to create service request',
            error: err.message,
        });
    }
});
const getServiceRequests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search } = req.query;
        let filter = {};
        if (search && typeof search === 'string') {
            const regex = new RegExp(search, 'i');
            filter = {
                $or: [
                    { userName: regex },
                    { email: regex },
                    { productName: regex },
                    { modelNumber: regex },
                    { phoneNumber: regex },
                    { location: regex },
                ],
            };
        }
        const serviceRequests = yield serviceRequest_model_1.ServiceRequest.find(filter).sort({
            createdAt: -1,
        });
        res.status(200).json({
            success: true,
            message: 'Service requests fetched successfully',
            data: serviceRequests,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch service requests',
            error: err.message,
        });
    }
});
const getServiceRequestById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serviceRequest = yield serviceRequest_model_1.ServiceRequest.findById(req.params.id);
        if (!serviceRequest) {
            return res.status(404).json({
                success: false,
                message: 'Service request not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Service request fetched successfully',
            data: serviceRequest,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch service request',
            error: err.message,
        });
    }
});
const deleteServiceRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedServiceRequest = yield serviceRequest_model_1.ServiceRequest.findByIdAndDelete(req.params.id);
        if (!deletedServiceRequest) {
            return res.status(404).json({
                success: false,
                message: 'Service request not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Service request deleted successfully',
            data: null,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete service request',
            error: err.message,
        });
    }
});
exports.productControllers = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    createServiceRequest,
    getServiceRequests,
    getServiceRequestById,
    deleteServiceRequest,
};
