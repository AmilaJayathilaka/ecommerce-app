import { getAllProductsDB } from "../models/product.model.js";

export const getAllProducts = async () => {
  return await getAllProductsDB();
};
