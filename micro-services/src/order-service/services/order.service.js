import { getAllOrdersDB, getOrdersByIdDB, getOrderProductsDB, createOrderDB, updateOrderByIdDB, deleteOrderByIdDB } from "../models/order.model.js";

export const getAllOrders = async () => {
  return await getAllOrdersDB();
};

export const getOrdersById = async (id) => {
  return await getOrdersByIdDB(id);
};

export const getOrderProducts = async (id) => {
  return await getOrderProductsDB(id);
};

export const createOrder = async (orderDescription, products) => {
  return await createOrderDB(orderDescription, products);
};

export const updateOrderById = async (id, orderDescription, products) => {
  return await updateOrderByIdDB(id, orderDescription, products);
};

export const deleteOrderById = async (id) => {
  return await deleteOrderByIdDB(id);
};
