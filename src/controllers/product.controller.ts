import { Request, Response } from 'express';
import { Event } from '../models/product.model';

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
    const products = await Event.find();
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

export const productControllers = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
}