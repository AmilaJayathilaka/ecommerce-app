import * as orderService from "../services/order.service.js";
import * as productService from "../../product-service/services/product.service.js";
import { createValidator, updateValidator } from "../validators/order.validator.js";

export const getAllOrders = async (req, res, next) => {
  try {
    const ordersProducts = [];
    const orders = await orderService.getAllOrders();

    for (const order of orders) {
      const orderProducts = await orderService.getOrderProducts(order.id);
      ordersProducts.push({ ...order, products: orderProducts.length })
    }
    res.status(200).json({ success: true, data: ordersProducts });
  } catch (error) {
    next(error);
  }
};

export const getOrdersById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const order = await orderService.getOrdersById(id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    const orderProducts = await orderService.getOrderProducts(id);
    let allProducts = await productService.getAllProducts();

    //get all ordered and non-ordered products
    const orderProductsIds = orderProducts.map(item => item.id);
    allProducts = allProducts.map(item => {
      if (orderProductsIds.includes(item.id)) {
        return { ...item, ordered: true };
      } else {
        return { ...item, ordered: false };
      }
    });
    res.status(200).json({ success: true, data: { ...order, products: allProducts } });
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req, res, next) => {
  try {
    const { error } = createValidator.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.message });

    const { orderDescription, products } = req.body;
    const newOrder = await orderService.createOrder(orderDescription, products);

    res.status(200).json({ success: true, data: newOrder });
  } catch (error) {
    next(error);
  }
};

export const updateOrderById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { error } = updateValidator.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.message });

    const { orderDescription, products } = req.body;
    const updatedOrder = await orderService.updateOrderById(id, orderDescription, products);
    if (!updatedOrder) return res.status(404).json({ success: false, message: 'Order not found' });

    res.status(200).json({ success: true, data: updatedOrder });
  } catch (error) {
    next(error);
  }
};

export const deleteOrderById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedOrder = await orderService.deleteOrderById(id);
    if (!deletedOrder) return res.status(404).json({ success: false, message: 'Order not found' });
    res.status(200).json({ success: true, message: 'Order deleted' });
  } catch (error) {
    next(error);
  }
};
