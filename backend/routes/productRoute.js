import express from "express";
import { getAllProducts } from "../controller/productController.js";

const router = express.Router();

router.get("/product", getAllProducts);

export default router;
