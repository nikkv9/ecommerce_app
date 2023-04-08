import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrder,
  getUserOrders,
  updateOrder,
} from "../controllers/order-ctrl.js";

import { authRole, authToken } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create-order", authToken, createOrder);

router.get("/orders", authToken, getAllOrders);

router.get("/order/:id", authToken, getOrder);

router.get("/user-orders", authToken, authRole("admin"), getUserOrders);

router.put("/order/:id", authToken, authRole("admin"), updateOrder);

router.delete("/order/:id", authToken, authRole("admin"), deleteOrder);

export default router;
