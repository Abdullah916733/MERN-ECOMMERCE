import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductDetails,
  updateProduct,
} from "../controller/productController.js";

const router = express.Router();

router.get("/product", getAllProducts);
router.get("/product/:id", getProductDetails);
router.post("/product/new", createProduct);
router.patch("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

export default router;
