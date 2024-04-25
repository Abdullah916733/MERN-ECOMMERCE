import express from "express";
import { isAuthenticatedUser } from "../middleware/auth.js";
import {
  processPayment,
  sendStripeApiKey,
} from "../controller/paymentController.js";

const router = express.Router();

router.post("/payment/process", isAuthenticatedUser, processPayment);
router.get("/stripeapikey", isAuthenticatedUser, sendStripeApiKey);

export default router;
