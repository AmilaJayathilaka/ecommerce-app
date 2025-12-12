import * as productService from "../services/product.service.js";

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts();  
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
};