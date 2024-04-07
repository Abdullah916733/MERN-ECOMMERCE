import Products from "../models/productModel.js";
import { ApiFeatures } from "../utils/apiFeatures.js";

// GET ALL PRODUCT
export const getAllProducts = async (req, res) => {
  try {
    const resultPerPage = 2;
    const productCount = await Products.countDocuments();
    const apiFeature = new ApiFeatures(Products.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);
    const products = await apiFeature.query;
    res.status(200).json({ success: true, products, productCount });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

// CREATE PRODUCT -- ADMIN
export const createProduct = async (req, res) => {
  try {
    const product = await Products.create(req.body);
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

// UPDATE PRODUCT -- ADMIN
export const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const findProduct = await Products.findById(id);
    if (!findProduct)
      return res
        .status(500)
        .json({ success: false, message: "product not found." });

    const product = await Products.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

// DELETE PRODUCT -- ADMIN
export const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Products.findById(id);

    if (!product)
      res.status(5000).json({ success: false, message: "product not found!" });

    await Products.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Product delete successfully.",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET PRODUCT DETAILS
export const getProductDetails = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Products.findById(id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "product not found." });
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
