import { Router } from "express";
import { getAllOrders, getOrdersById, createOrder, updateOrderById, deleteOrderById } from "../order-service/controllers/order.controller.js";

const router = Router();

router.get("/", getAllOrders);
router.get("/:id", getOrdersById);
router.post("/", createOrder);
router.put("/:id", updateOrderById);
router.delete("/:id", deleteOrderById);

export default router;
