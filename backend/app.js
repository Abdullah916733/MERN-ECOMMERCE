import express from "express";
import product from "./routes/productRoute.js";
import user from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import order from "./routes/orderRoute.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

//  Route Import
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

export default app;
