import express from "express";
import {
  deleteOrder,
  getAllOrders,
  getSingleOrder,
  myOrders,
  newOrder,
  updateOrder,
} from "../controller/orderController.js";
import { authenticatedRoles, isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/order/new", isAuthenticatedUser, newOrder);
router.get("/order/:id", isAuthenticatedUser, getSingleOrder);
router.get("/orders/me", isAuthenticatedUser, myOrders);
router.get(
  "/orders",
  isAuthenticatedUser,
  authenticatedRoles("admin"),
  getAllOrders
);
router.patch(
  "/order/:id",
  isAuthenticatedUser,
  authenticatedRoles("admin"),
  updateOrder
);
router.delete(
  "/order/:id",
  isAuthenticatedUser,
  authenticatedRoles("admin"),
  deleteOrder
);

export default router;
