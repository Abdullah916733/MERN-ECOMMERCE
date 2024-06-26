import { ErrorHandler } from "../utils/errorHandler.js";

const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error.";

  res.status(err.statusCode).json({ success: false, err: err });
};

export default errorMiddleware;
