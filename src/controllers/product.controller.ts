import { Request, Response } from 'express';
import { Event } from '../models/product.model';
import { ServiceRequest } from '../models/serviceRequest.model';

// Create product
 const createProduct = async (req: Request, res: Response) => {
  try {
    const savedProduct = await Event.create(req.body);
    res.status(201).json({
      success: true,
      message: 'product created successfully',
      data: savedProduct,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to create product',
      error: err.message,
    });
  }
};

// Get all products
 const getProducts = async (req: Request, res: Response) => {
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
    const products = await Event.find(filter);
    res.status(200).json({
      success: true,
      message: 'product fetched successfully',
      data: products,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product',
      error: err.message,
    });
  }
};

// Get single product
 const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Event.findById(req.params.id);
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
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product',
      error: err.message,
    });
  }
};

// Update product
 const updateProduct = async (req: Request, res: Response) => {
  try {
    const updatedProduct = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
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
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to update product',
      error: err.message,
    });
  }
};

// Delete product
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deletedProduct = await Event.findByIdAndDelete(req.params.id);
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
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete product',
      error: err.message,
    });
  }
};

const createServiceRequest = async (req: Request, res: Response) => {
  try {
    const savedServiceRequest = await ServiceRequest.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Service request created successfully',
      data: savedServiceRequest,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to create service request',
      error: err.message,
    });
  }
};

const getServiceRequests = async (req: Request, res: Response) => {
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

    const serviceRequests = await ServiceRequest.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      message: 'Service requests fetched successfully',
      data: serviceRequests,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch service requests',
      error: err.message,
    });
  }
};

const getServiceRequestById = async (req: Request, res: Response) => {
  try {
    const serviceRequest = await ServiceRequest.findById(req.params.id);

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
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch service request',
      error: err.message,
    });
  }
};

const deleteServiceRequest = async (req: Request, res: Response) => {
  try {
    const deletedServiceRequest = await ServiceRequest.findByIdAndDelete(
      req.params.id
    );

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
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete service request',
      error: err.message,
    });
  }
};

export const productControllers = {
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
