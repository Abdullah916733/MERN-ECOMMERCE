import Products from "../models/productModel.js";
import { ApiFeatures } from "../utils/apiFeatures.js";

// GET ALL PRODUCT
export const getAllProducts = async (req, res, next) => {
  try {
    const resultPerPage = 8;
    const productCount = await Products.countDocuments();
    const apiFeature = new ApiFeatures(Products.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);
    const products = await apiFeature.query;

    const apiFeatureFilter = new ApiFeatures(Products.find(), req.query)
      .search()
      .filter();
    const productsFilter = await apiFeatureFilter.query;

    let filterProductCount = productsFilter.length;

    res.status(200).json({
      success: true,
      products,
      productCount,
      resultPerPage,
      filterProductCount,
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

// CREATE PRODUCT -- ADMIN
export const createProduct = async (req, res) => {
  try {
    req.body.user = req.user.id;
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

// CREATE NEW REVIEW OR UPDATE REVIEW
export const createProductReview = async (req, res, next) => {
  try {
    const { productId, comment, rating } = req.body;
    const review = {
      user: req.user._id,
      name: req.user.name,
      comment,
      rating: Number(rating),
    };
    const product = await Products.findById(productId);
    if (!product)
      return res
        .status(400)
        .json({ success: false, message: "Product not found" });
    const isReviewed = product.reviews.find((rev) => {
      return rev.user.toString() === req.user._id.toString();
    });
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString()) {
          rev.comment = comment;
          rev.rating = rating;
        }
      });
    } else {
      product.reviews.push(review);
      product.numberOfReviews = product.reviews.length;
    }
    let avg = 0;
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL REVIEWS OF A PRODUCT
export const getAllReviews = async (req, res, next) => {
  try {
    const product = await Products.findById(req.query.id);
    if (!product)
      return res
        .status(400)
        .json({ success: false, message: "Page not found" });
    res.status(200).json({ success: true, reviews: product.reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE REVIEW
export const deleteReview = async (req, res, next) => {
  try {
    const product = await Products.findById(req.query.productId);
    if (!product)
      return res
        .status(400)
        .json({ success: false, message: "Product not found." });
    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );
    let avg = 0;
    product.reviews.forEach((rev) => (avg += rev.rating));
    const ratings = avg / product.reviews.length;
    const numberOfReviews = product.reviews.length;
    await Products.findByIdAndUpdate(
      req.query.productId,
      { ratings, numberOfReviews, reviews },
      { new: true }
    );
    res
      .status(200)
      .json({ success: true, message: "Review deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
