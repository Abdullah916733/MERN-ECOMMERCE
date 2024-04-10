import express from "express";
import {
  createProduct,
  createProductReview,
  deleteProduct,
  deleteReview,
  getAllProducts,
  getAllReviews,
  getProductDetails,
  updateProduct,
} from "../controller/productController.js";
import { isAuthenticatedUser, authenticatedRoles } from "../middleware/auth.js";

const router = express.Router();

router.get("/product", isAuthenticatedUser, getAllProducts);
router.get("/product/:id", getProductDetails);
router.post(
  "/admin/product/new",
  isAuthenticatedUser,
  authenticatedRoles("admin"),
  createProduct
);
router.patch(
  "/admin/product/:id",
  isAuthenticatedUser,
  authenticatedRoles("admin"),
  updateProduct
);
router.delete(
  "/admin/product/:id",
  isAuthenticatedUser,
  authenticatedRoles("admin"),
  deleteProduct
);
router.patch("/review", isAuthenticatedUser, createProductReview);
router.get("/review", getAllReviews);
router.delete("/review", deleteReview);

export default router;
