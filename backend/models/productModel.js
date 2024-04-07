import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please Enter Product Name"],
  },
  description: {
    type: String,
    require: [true, "Please Enter Product Description"],
  },
  price: {
    type: Number,
    require: [true, "Please Enter Product Price"],
    maxLength: [8, "price cannot exceed 8 characters"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        require: true,
      },
      url: {
        type: String,
        require: true,
      },
    },
  ],
  category: {
    type: String,
    require: [true, "Please Enter Product Category"],
  },
  stock: {
    type: Number,
    require: [true, "Please Enter Product Stock"],
    maxLength: [4, "stock cannot exceed 4 characters"],
    default: 1,
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        require: true,
      },
      rating: {
        type: Number,
        require: true,
      },
      comment: {
        type: String,
        require: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Products = mongoose.model("Product", ProductSchema);

export default Products;
