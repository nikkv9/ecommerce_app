import express from "express";
import { getStripePK, processPayment } from "../controllers/payment-ctrl.js";
import { authToken } from "../middlewares/auth.js";

const router = express.Router();

router.post("/payment/process", authToken, processPayment);

router.get("/stripe-pk", authToken, getStripePK);

export default router;
