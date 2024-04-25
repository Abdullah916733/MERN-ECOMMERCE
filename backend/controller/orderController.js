import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

// CREATE NEW ORDER
export const newOrder = async (req, res, next) => {
  try {
    const {
      shippingInfo,
      paymentInfo,
      itemsPrice,
      orderItems,
      totalPrice,
      shippingPrice,
      taxPrice,
    } = req.body;
    const order = await Order.create({
      shippingInfo,
      paymentInfo,
      orderItems,
      itemsPrice,
      totalPrice,
      shippingPrice,
      taxPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });
    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: true, message: error.message });
  }
};

// GET SINGLE ORDER
export const getSingleOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found." });
    res.status(200).json({ message: true, order });
  } catch (error) {
    res.status(500).json({ success: true, message: error.message });
  }
};

// GET LOGGED USER ORDERS / MY ORDERS
export const myOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    if (!orders)
      return res
        .status(404)
        .json({ success: false, message: "You have no order." });

    res.status(200).json({ message: true, orders });
  } catch (error) {
    res.status(500).json({ success: true, message: error.message });
  }
};

// GET ALL ORDERS -- ADMIN
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order) => (totalAmount += order.totalPrice));

    res.status(200).json({ message: true, orders, totalAmount });
  } catch (error) {
    res.status(500).json({ success: true, message: error.message });
  }
};

// UPDATE ORDER STATUS -- ADMIN
export const updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order)
      return res
        .status(400)
        .json({ success: false, message: "Order not found with this Id." });
    if (order.status === "Delivered") {
     return  res
        .status(400)
        .json({ success: false, message: "Product already delivered." });
    }
    order.orderItems.forEach(
      async (order) => await updateStock(order.product, order.quantity)
    );
    order.orderStatus = req.body.status;
    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }
    await order.save({ validateBeforeSave: false });
    res.status(201).json({ success: true, message: "Product status updated." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

// ORDER DELETE -- ADMIN
export const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order)
    return  res.status(404).json({ success: false, message: "Order not found." });
    await Order.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "order deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: true, message: error.message });
  }
};
