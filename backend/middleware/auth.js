import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;
  try {
    if (!token) {
      res.status(400).json({
        success: false,
        message: "Please login to access this resource.",
      });
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);

    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const authenticatedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: `Role: ${req.user.role} is not allowed to access this resource.`,
      });
    }
    next();
  };
};
